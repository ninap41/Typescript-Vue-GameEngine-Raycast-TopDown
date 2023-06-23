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
// import {
// 	player,
// 	playPlayerAnimations,
// 	drawMap,
// 	loadPlayerAnimations,
// } from "./maps"

var loadedPlayer: any
// var room: "Bedroom" | "Bathroom" | "DoorAnimation" | "Hallway" = "Bedroom"
// var currentMap = map1
//https://editor.p5js.org/ericalimsongyi/sketches/lzo9sfBjW

// https://editor.p5js.org/codingtrain/sketches/vhnFx1mml

/* key */

export const template = (game: any) => {
	console.log(game, "game Instance in Sketch!")
	// var Bathroom = map2
	// var Bedroom = map1
	return function (p5?: any) {
		/* Preload
	
	*/

		p5.preload = (_: any) => {
			// console.log("preload again")
			// console.log(game)

			game.preload(p5)
		}

		p5.setup = (_: any) => {
			game.setup(p5)
		}

		p5.draw = async (_: any) => {
			p5.clear()
			game.draw(p5)
		}
	}
}
