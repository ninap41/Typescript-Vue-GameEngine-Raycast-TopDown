// https://editor.p5js.org/ericalimsongyi/sketches/lzo9sfBjW
// https://editor.p5js.org/codingtrain/sketches/vhnFx1mml

import { debuggerTool, distanceTool } from "@/scripts/utils"

export const gameCycle = (game: any) => {
	console.log(game, "game Instance in Sketch!")
	let x1: number
	let y1: number
	let x2: number
	let y2: number
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
			debuggerTool("player", game, p5)
		}
		distanceTool(p5)
	}
}
