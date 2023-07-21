import { map1, map2, map3 } from "@/GameEngine/Maps"
import { tileRotationAndLocation, fadeIn, debuggerTool } from "@/scripts/utils"
import { gameCycle } from "@/GameEngine/Scene"
import { TheBeginning } from "@/Scenes/the-beginning"
// import * as animations from "./animations"
export class GameEngine {
	startingRoomKey: any
	sketch: any
	player: any = {
		phase: (game: GameEngine, p5: any) => TheBeginning(game, p5),
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
		x: 5,
		y: 200,
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
	cutscene: any = {
		state: false,
		ref: null,
	}
	rooms = {
		Bathroom: map2,
		Bedroom: map1,
		Hallway: map3,
		Kitchen: map2,
	} as any
	map: any
	currentRoom: "Bedroom" | "Bathroom" | "DoorAnimation" | "Hallway" | "Kitchen" | "Living Room" | "Parents Room" | any

	constructor(startingRoomKey: any, mapChange?: any) {
		this.currentRoom = startingRoomKey
		this.gameStart = true
		this.loadedPlayer = this.player
		this.startGame
	}

	private getMap() {
		this.currentRoom === undefined ? alert("currentRoom Not Defined.") : ""
		return this.rooms[this.currentRoom as any] as any
	}

	private startGame() {
		if (this.gameStart === true) {
			window.document.getElementById("defaultCanvas0")?.remove() // @ts-ignore
			this.sketch = new p5(gameCycle(this))
			console.log(this.sketch)
		}
	}

	public preload(p5: any) {
		this.loadPlayerAnimations(p5, this.loadedPlayer)
		this.loadRooms(p5)
	}

	public setup(p5: any) {
		this.map = this.getMap()
		p5.createCanvas(this.map.tiles[0].length * this.map.size, this.map.tiles.length * this.map.size)
		p5.angleMode(p5.DEGREES)
	}

	private loadRooms(p5: any) {
		Object.keys(this.rooms).forEach((key: string) => {
			// iterate over all the rooms on the game map!

			// load room Tiles
			const map = this.rooms[key]
			Object.keys(map.imgs).forEach((key: any) => {
				console.log(map.imgs[key], "IMAGE EXAMPLE")
				map.loadedImages[key] = p5.loadImage(map.imgs[key])
			})
			// Door Animations
			Object.keys(map.animations).forEach((animationKey: any) => {
				map.loadedAnimations[map.animations[animationKey].name] = p5.loadAni(map.animations[animationKey].img, {
					//ex brown door
					frameSize: [map.animations[animationKey].frameSize[0], map.animations[animationKey].frameSize[1]],
					frames: map.animations[animationKey].frames,
					frameDelay: map.animations[animationKey].frameDelay,
					scale: map.animations[animationKey].scale,
				})
				const ani = map.loadedAnimations[map.animations[animationKey].name]
				map.loadedAnimations[map.animations[animationKey].name].looping = ani.looping
				map.loadedAnimations[map.animations[animationKey].name].onComplete = async () => {
					p5.clear()
					await map.animations[animationKey].onComplete(this, p5)
				}
			})
			// loadAssets for room inside
			Object.keys(map.staticImages).forEach((key2: any) => {
				if (map.staticImages) {
					map.loadedStaticImages[key2] = {}
					map.loadedStaticImages[key2] = p5.loadImage(map.staticImages[key2].img)
				} else {
					alert("no static images for this map")
				}
			})
		})
	}
	async draw(p5: any) {
		p5.clear()
		p5.background(51)
		const map = this.getMap()
		if (this.cutscene.state) {
			fadeIn(p5, () => {
				// instance of a sprite animation, not creating and moving things on p5
				this.playAnimation(this.cutscene.ref, map.loadedAnimations, p5)
			})
		} else {
			/* Game Running */
			p5.clear()
			this.drawMap(map, "topDown", p5)
			this.drawAssets(map, "topDown", p5)
			this.playPlayerAnimations(p5, this.loadedPlayer)

			this.loadedPlayer.phase(this, p5)
		}
		debuggerTool("player", this, p5)
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

	public drawAssets(map: any, type: "topDown" | "raycast" | "sideScroll", p5: any) {
		// iterate over static images

		Object.keys(map.loadedStaticImages).forEach((assetKey: any) => {
			p5.image(
				map.loadedStaticImages[assetKey],
				map.staticImages[assetKey].XY[0] * map.size,
				map.staticImages[assetKey].XY[1] * map.size,
				map.staticImages[assetKey].size[0],
				map.staticImages[assetKey].size[1]
			)
		})
	}

	private loadPlayerAnimations = (p5: any, player: any) => {
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
		this.loadedPlayer.animations = animations
	}

	public playAnimation(animationKey: string, source: any, p5: any) {
		const map = this.getMap()

		//example: ("brownDoor", map.loadedAnimations, p5)
		return p5.animation(
			source[animationKey], //SpriteAnim
			(map.tiles[0].length * map.size) / 2, //position of the animation on the canvas

			(map.tiles.length * map.size) / 2, //position of the animation on the canvas
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

	async rerenderCanvas(roomChange: any, newPlayerCoordinates: any, p5: any) {
		this.currentRoom = roomChange
		this.player.x = newPlayerCoordinates[0]
		this.player.y = newPlayerCoordinates[1]
		this.player.rot = newPlayerCoordinates[2]
		this.cutscene = false
		this.map = this.getMap()

		this.map === undefined ? alert("You forgot to add the new room to the map.") : ""

		p5.resizeCanvas(this.map.tiles[0].length * this.map.size, this.map.tiles.length * this.map.size)
	}
}
