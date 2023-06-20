// import * as p5 from "p5"
import {
	tileRotationAndLocation,
	rotationConditions,
	toRadians,
	logger,
	pixelsToMapSize,
	getLighting,
	fadeIn,
} from "./utility"
import { map1, map2 } from "./maps"
import * as animations from "./animations"
import {
	player,
	playPlayerAnimations,
	drawMap,
	loadPlayerAnimations,
} from "./maps"

let fade = 0
var fadeAmount = 1
var loadedPlayer: any
var room: "Bedroom" | "Bathroom" | "DoorAnimation" | "Hallway" = "Bedroom"
var currentMap = map1
//https://editor.p5js.org/ericalimsongyi/sketches/lzo9sfBjW

// https://editor.p5js.org/codingtrain/sketches/vhnFx1mml

/* key */

export const template = (game: any) => {
	console.log(game, "game Instance in Sketch!")

	return function (p5?: any) {
		/* Preload
	
	*/

		function loadImages(map: any, p5: any) {
			Object.keys(map.imgs).forEach((key: any) => {
				map.loadedImages[key] = p5.loadImage(map.imgs[key])
			})
		}
		function loadDoorAnimations(map: any, p5: any) {
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
				map.loadedAnimations[map.animations[key].name].onComplete = () => {
					currentMap = map2
					room = ani.roomChange
				}
			})
		}

		async function playAnimation(animationKey: string, source: any, p5: any) {
			//example: ("brownDoor", map.loadedAnimations, p5)
			return p5.animation(
				source[animationKey], //SpriteAnim
				(currentMap.tiles[0].length * currentMap.size) / 2, //position of the animation on the canvas

				(currentMap.tiles.length * currentMap.size) / 2, //position of the animation on the canvas
				0,
				source[animationKey].scale, // scale
				source[animationKey].scale // scale
			)
		}

		p5.preload = (_: any) => {
			loadedPlayer = player
			loadedPlayer.animations = loadPlayerAnimations(p5, loadedPlayer)
			loadImages(currentMap, p5)
			loadDoorAnimations(currentMap, p5)
		}

		/* setup
	
	
	*/
		p5.setup = (_: any) => {
			p5.createCanvas(
				currentMap.tiles[0].length * currentMap.size,
				currentMap.tiles.length * currentMap.size
			)
			p5.background(51)
			p5.angleMode(p5.DEGREES)
		}

		/* draw
	
	
	
	
	
	*/

		p5.draw = async (_: any) => {
			p5.clear()
			if (room === "Bedroom") {
				drawMap(currentMap, "topDown", p5)
				playPlayerAnimations(p5, loadedPlayer)
				if (
					currentMap.changeSceneCondition(currentMap, player, p5) === "Bathroom"
				) {
					room = "DoorAnimation"
					p5.clear()
				}
				if (currentMap.changeSceneCondition(currentMap, player, p5) === "Hallway") {
					room = "DoorAnimation"
					p5.clear()
				}
			} else if (room === "Bathroom") {
				p5.clear()

				drawMap(map2, "topDown", p5)
				playPlayerAnimations(p5, loadedPlayer)
			} else if (room === "DoorAnimation") {
				p5.clear()

				fadeIn(p5, () => {
					playAnimation("brownDoor", currentMap.loadedAnimations, p5)
				})
			} else {
				console.log("No room ")
			}

			// logger(0, `${player.x}`, "Player x")
			// logger(1, `${player.y}`, "Player y")
			// logger(2, `${player.rot}`, "Rotation degrees")
			// logger(
			// 	3,
			// 	`${pixelsToMapSize(player.x, currentMap.size)}`,
			// 	"Player x converted"
			// )
			// logger(
			// 	4,
			// 	`${pixelsToMapSize(player.y, currentMap.size)}`,
			// 	"Player y converted"
			// )
		}
	}
}
