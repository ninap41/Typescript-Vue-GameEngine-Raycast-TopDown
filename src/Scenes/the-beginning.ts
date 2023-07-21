import type { GameEngine } from "@/GameEngine/GameEngine"
import { pixelsToMapSize } from "@/scripts/utils"

const doorChangeConditions: any = {
	Bathroom: (game: GameEngine, p5: any) => {
		if (
			pixelsToMapSize(game.player.x, game.map.size) === 3 &&
			pixelsToMapSize(game.player.y, game.map.size) === 1 &&
			game.player.rot === 270 &&
			p5.kb.presses("space")
		) {
			game.cutscene = { state: true, ref: "Bathroom -> Bedroom" }
		}
	},
	Bedroom: (game: GameEngine, p5: any) => {
		if (
			pixelsToMapSize(game.player.x, game.map.size) === 0 &&
			pixelsToMapSize(game.player.y, game.map.size) === 3 &&
			game.player.rot === 90 &&
			p5.kb.presses("space")
		) {
			game.cutscene = { state: true, ref: "Bedroom -> Bathroom" }
		}
		if (
			pixelsToMapSize(game.player.x, game.map.size) === 3 &&
			pixelsToMapSize(game.player.y, game.map.size) === 1 &&
			game.player.rot === 270 &&
			p5.kb.presses("space")
		) {
			game.cutscene = { state: true, ref: "Bedroom -> Hallway" }
		}
	},
	Hallway: (game: GameEngine, p5: any) => {
		if (
			pixelsToMapSize(game.player.x, game.map.size) === 0 &&
			pixelsToMapSize(game.player.y, game.map.size) === 0 &&
			game.player.rot === 90 &&
			p5.kb.presses("space")
		) {
			game.cutscene = { state: true, ref: "Hallway -> Bedroom" }
		}
		if (
			pixelsToMapSize(game.player.x, game.map.size) === 0 &&
			pixelsToMapSize(game.player.y, game.map.size) === 4 &&
			game.player.rot === 0 &&
			p5.kb.presses("space")
		) {
			game.cutscene = { state: true, ref: "Hallway -> Kitchen" }
		}
	},
}

const eventConditions: any = {}
export const TheBeginning = (game: GameEngine, p5: any) => {
	if (game.currentRoom === "Bedroom") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Bathroom") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Hallway") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Kitchen") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else {
		alert("No room. You done goofed, Nina. Good luck figuring this one out!")
	}
}
