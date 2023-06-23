<template>
	<div v-if="game">
		<h2>{{ game.currentRoom }}</h2>
		<div class="game"></div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useCounterStore } from "@/stores/counter"
import { defineComponent, onMounted, ref, computed } from "vue"
import {
	tileRotationAndLocation,
	rotationConditions,
	toRadians,
	logger,
	pixelsToMapSize,
	arrayOf9ths,
	fadeIn,
} from "./utility"
import { template } from "./template"
import * as animations from "./animations"

import { map1, map2 } from "./maps"

// storeGame https://p5js.org/reference/#/p5/storeItem
const createNewInstance = async (roomChange: any, mapChange: any) => {
	window.document.getElementById("defaultCanvas0")?.remove() // @ts-ignore

	game = await new Game(roomChange, mapChange)

	game.startGame()
}
class Game {
	startingRoomKey: any
	sketch: any
	player: any = {
		animations: [
			{
				name: "idle",
				frames: 59,
				img: "src/assets/character_900_idle.png",
				frameDelay: 1,
			},
			{
				name: "walk",
				frames: 37,
				img: "src/assets/character_900_walk.png",
				frameDelay: -1.4,
			},
		],
		currentAnimation: "idle",
		x: 1,
		y: 1,
		dir: 1, // -1 is north, 1 is going to be south
		rot: 0, // -1 is going to be west facing, 1 is going to be east
		speed: 2.5,
		acceleration: 0.1, // moving? (speed = 1) or backwards (speed = 0).
		moveSpeed: 0.1, // how far (in map units) does the player move each step/update
		rotSpeed: (3 * Math.PI) / 180, // how much does the player rotate each step/update (in radians)
	}
	gameStart: any
	fade = 0
	globalScale = 1
	fadeAmount = 1
	loadedPlayer: any
	rooms = {
		Bathroom: map2,
		Bedroom: map1,
		Hallway: map2,
	}
	currentRoom:
		| "Bedroom"
		| "Bathroom"
		| "DoorAnimation"
		| "Hallway"
		| "Kitchen"
		| "Living Room"
		| "Parents Room"
	currentMap: any

	constructor(startingRoomKey: any, mapChange?: any) {
		this.currentRoom = startingRoomKey
		this.gameStart = true
		this.loadedPlayer = this.player
		this.currentMap = mapChange || map1
		this.startGame
	}

	startGame() {
		if (this.gameStart === true) {
			window.document.getElementById("defaultCanvas0")?.remove() // @ts-ignore
			this.sketch = new p5(template(this))
		} else {
			console.log("game not started")
		}
	}

	preload(p5: any) {
		this.loadedPlayer.animations = this.loadPlayerAnimations(
			p5,
			this.loadedPlayer
		)
		this.loadImages(game.currentMap, p5)
		this.loadDoorAnimations(game.currentMap, p5)
		// have bathroom, bedroom, and everything else loaded
	}

	setup(p5: any) {
		p5.createCanvas(
			this.currentMap.tiles[0].length * this.currentMap.size,
			this.currentMap.tiles.length * this.currentMap.size
		)
		p5.background(51)
		p5.angleMode(p5.DEGREES)
	}

	draw(p5: any) {
		p5.background(51)

		if (game.currentRoom === "Bedroom") {
			this.drawMap(this.currentMap, "topDown", p5)
			this.playPlayerAnimations(p5, this.loadedPlayer)
			if (
				this.currentMap.changeSceneCondition(this.currentMap, this.player, p5) ===
				"Bathroom"
			) {
				this.currentRoom = "DoorAnimation"
			}
			if (
				this.currentMap.changeSceneCondition(this.currentMap, this.player, p5) ===
				"Hallway"
			) {
				this.currentRoom = "DoorAnimation"
				p5.clear()
			}
		} else if (this.currentRoom === "Bathroom") {
			this.drawMap(this.rooms.Bathroom, "topDown", p5)
			// this.playPlayerAnimations(p5, this.loadedPlayer)
		} else if (game.currentRoom === "DoorAnimation") {
			fadeIn(p5, () => {
				this.playAnimation("brownDoor", this.currentMap.loadedAnimations, p5)
			})
		} else {
			console.log("No room ")
		}
		logger(0, `${this.player.x}`, "Player x")
		logger(1, `${this.player.y}`, "Player y")
		logger(2, `${this.player.rot}`, "Rotation degrees")
		logger(
			3,
			`${pixelsToMapSize(this.player.x, this.currentMap.size)}`,
			"Player x converted"
		)
		logger(
			4,
			`${pixelsToMapSize(this.player.y, this.currentMap.size)}`,
			"Player y converted"
		)
	}

	public drawMap(map: any, type: "topDown" | "raycast" | "sideScroll", p5: any) {
		map.tiles.forEach((row: any, y_: any) => {
			row.forEach((tile: any, x_: any) => {
				let XY = undefined
				p5.push()
				if (tile === 2) {
					XY = tileRotationAndLocation(map, x_, y_, tile, "corner", p5) /*corners */
				} else if (tile === 1 || tile === 4) {
					XY = tileRotationAndLocation(map, x_, y_, tile, "wall", p5) /* walls */
				} else if (tile === 3) {
					XY = tileRotationAndLocation(map, x_, y_, tile, "wall", p5) /* door */
				} else {
					XY = [x_ * map.size, y_ * map.size]
				}
				p5.image(map.loadedImages[tile], XY[0], XY[1], map.size, map.size)
				p5.pop()
			})
		})
	}
	public loadPlayerAnimations = (p5: any, player: any) => {
		console.log("PLAYER ANIMATION", player)
		var animations: any = []
		let ani

		player.animations.forEach((animationObject: any) => {
			ani = p5.loadAni(animationObject.img, {
				frameSize: [900, 900],
				frames: animationObject.frames,
				frameDelay: animationObject.frameDelay,
			})
			animations.push(ani)
		})

		return animations
	}

	public loadImages(map: any, p5: any) {
		console.log("MAP", map)
		Object.keys(map.imgs).forEach((key: any) => {
			map.loadedImages[key] = p5.loadImage(map.imgs[key])
		})
	}
	public loadDoorAnimations(map: any, p5: any) {
		Object.keys(map.animations).forEach((key: any) => {
			map.loadedAnimations[map.animations[key].name] = p5.loadAni(
				map.animations[key].img,
				{
					//ex brown door
					frameSize: [
						map.animations[key].frameSize[0],
						map.animations[key].frameSize[1],
					],
					frames: map.animations[key].frames,
					frameDelay: map.animations[key].frameDelay,
					scale: map.animations[key].scale,
				}
			)
			const ani = map.loadedAnimations[map.animations[key].name]
			map.loadedAnimations[map.animations[key].name].looping = ani.looping
			map.loadedAnimations[map.animations[key].name].onComplete = async () => {
				p5.clear()
				await map.animations[key].onComplete(game)
			}
		})
	}

	public playAnimation(animationKey: string, source: any, p5: any) {
		//example: ("brownDoor", map.loadedAnimations, p5)
		console.log(source[animationKey])
		return p5.animation(
			source[animationKey], //SpriteAnim
			(this.currentMap.tiles[0].length * this.currentMap.size) / 2, //position of the animation on the canvas

			(this.currentMap.tiles.length * this.currentMap.size) / 2, //position of the animation on the canvas
			0,
			source[animationKey].scale, // scale
			source[animationKey].scale // scale
		)
	}

	public playPlayerAnimations(p5: any, char: any) {
		// p5.noLoop()
		const characterAnimation = {
			walk: () =>
				p5.animation(
					char.animations[1], //SpriteAnim
					char.x + 1 * (map1.size + map1.size / 2), //position of the animation on the canvas

					char.y + 1 * (map1.size + map1.size / 2), //position of the animation on the canvas
					char.rot, //rotation
					0.1, // scale
					0.1 // scale
				),
			idle: () =>
				p5.animation(
					char.animations[0], //SpriteAnim
					char.x + 1 * (map1.size + map1.size / 2), //position of the animation on the canvas

					char.y + 1 * (map1.size + map1.size / 2), //position of the animation on the canvas
					char.rot, //rotation
					0.1, // scale
					0.1 // scale
				),
		}
		if (
			p5.kb.pressing("ArrowUp") ||
			p5.kb.pressing("w") ||
			p5.kb.pressing("ArrowDown") ||
			p5.kb.pressing("s") ||
			p5.kb.pressing("ArrowLeft" || p5.kb.pressing("a")) ||
			p5.kb.pressing("ArrowRight") ||
			p5.kb.pressing("d")
		) {
			//https://p5play.org/docs/
			char.currentAnimation = "walk"
			characterAnimation.walk()
			// console.log(char.animations[0])
		} else {
			// idle
			characterAnimation.idle()
		}

		if (p5.kb.pressing("ArrowUp") || p5.kb.pressing("w")) {
			char.y -= char.speed
			char.rot = 180
		}
		if (p5.kb.pressing("ArrowDown") || p5.kb.pressing("s")) {
			char.y += this.loadedPlayer.speed
			char.rot = 0
		}
		if (p5.kb.pressing("ArrowLeft" || p5.kb.pressing("a"))) {
			char.x -= char.speed
			char.rot = 90
		}
		if (p5.kb.pressing("ArrowRight") || p5.kb.pressing("d")) {
			char.x += char.speed
			char.rot = 270
		}
	}

	async rerenderCanvas(roomChange: any, mapChange: any) {
		await createNewInstance(roomChange, mapChange)
		console.log("roomChange", roomChange)
		console.log("mapChange", mapChange)
		// this.currentRoom = roomChange
		// this.currentMap = mapChange
		// // console.log("another game instance", this)
		// window.document.getElementById("defaultCanvas0")?.remove() // @ts-ignore
		// // this.sketch = new p5(template(this))
	}
}
var game: Game

onMounted(async () => {
	game = await new Game("Bedroom")
	game.startGame()
})
</script>

<style>
@media (min-width: 1024px) {
	.about {
		min-height: 100vh;
		display: flex;
		align-items: center;
	}
}

#defaultCanvas0 {
	margin: 0 auto;
}
</style>
