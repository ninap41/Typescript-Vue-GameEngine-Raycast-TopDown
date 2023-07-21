import type { GameEngine } from "@/GameEngine/GameEngine"
import { pixelsToMapSize } from "@/scripts/utils"

const doorChangeConditions: any = {
	Bedroom: (game: GameEngine, p5: any) => {
		if (
			pixelsToMapSize(game.player.x, game.map.size) === 3 &&
			pixelsToMapSize(game.player.y, game.map.size) === 1 &&
			game.player.rot === 270 &&
			p5.kb.presses("space")
		) {
			game.cutscene = { state: true, ref: "Bedroom -> Bathroom" }
		}
		if (game.map.changeSceneCondition(game.map, game.player) === "Bedroom -> Hallway") {
			game.cutscene = { state: true, ref: "Bedroom -> Hallway" }
		}
	},
}
export const TheBeginning = (game: GameEngine, p5: any) => {
	if (game.currentRoom === "Bedroom") {
		if (game.map.changeSceneCondition(game.map, game.player, p5) === "Bedroom -> Bathroom") {
			game.cutscene = { state: true, ref: "Bedroom -> Bathroom" }
		}
		if (game.map.changeSceneCondition(game.map, game.player, p5) === "Bedroom -> Hallway") {
			game.cutscene = { state: true, ref: "Bedroom -> Hallway" }
		}
	} else if (game.currentRoom === "Bathroom") {
		p5.clear()
		if (game.map.changeSceneCondition(game.map, game.player, p5) === "Bathroom -> Hallway") {
			game.cutscene = { state: true, ref: "Bathroom -> Hallway" }
		}
		if (game.map.changeSceneCondition(game.map, game.player, p5) === "Bathroom -> Bedroom") {
			game.cutscene = { state: true, ref: "Bathroom -> Bedroom" }
		}

		game.drawMap(game.map, "topDown", p5)
		game.playPlayerAnimations(p5, game.loadedPlayer)
	} else if (game.currentRoom === "Hallway") {
		p5.clear()
		if (game.map.changeSceneCondition(game.map, game.player, p5) === "Hallway -> Bedroom") {
			game.cutscene = { state: true, ref: "Hallway -> Bedroom" }
		}

		game.drawMap(game.map, "topDown", p5)
		game.playPlayerAnimations(p5, game.loadedPlayer)
	} else {
		console.log("No room ")
	}
}
