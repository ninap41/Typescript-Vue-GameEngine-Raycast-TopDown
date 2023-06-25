// import * as p5 from "p5"
import {
	tileRotationAndLocation,
	rotationConditions,
	toRadians,
	logger,
	pixelsToMapSize,
	getLighting,
	fadeIn,
} from "../utility"
import { map1, map2 } from "./Maps"

var loadedPlayer: any

// https://editor.p5js.org/ericalimsongyi/sketches/lzo9sfBjW
// https://editor.p5js.org/codingtrain/sketches/vhnFx1mml

export const gameCycle = (game: any) => {
	console.log(game, "game Instance in Sketch!")
	return function (p5?: any) {
		p5.preload = (_: any) => {
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
