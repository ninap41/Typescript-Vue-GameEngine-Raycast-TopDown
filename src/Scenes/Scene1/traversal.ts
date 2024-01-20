import type { GameEngine } from "@/GameEngine/GameEngine"
import { map1, map2, map3, map4, map5, map6, map7, map8 } from "@/Classes/Map.class"
import { pixelsToMapSize } from "@/scripts/utils"

const doorChangeConditionMaker = (mapX: number, mapY: number, rot: number, button: string, p5: any, game) => {
	if (
		pixelsToMapSize(game.player.x, game.map.size) === mapX &&
		pixelsToMapSize(game.player.y, game.map.size) === mapY &&
		game.player.rot === rot &&
		p5.kb.presses(button)
	) {
		return true
	}
}
const doorChangeConditions: any = {
	Bathroom: (game: GameEngine, p5: any) => {
		if (doorChangeConditionMaker(3, 1, 270, "space", p5, game)) {
			game.cutscene = { state: true, ref: "Bathroom -> Bedroom" }
		}
	},
	Bedroom: (game: GameEngine, p5: any) => {
		if (doorChangeConditionMaker(0, 3, 90, "space", p5, game)) {
			game.cutscene = { state: true, ref: "Bedroom -> Bathroom" }
		}
		if (doorChangeConditionMaker(3, 1, 270, "space", p5, game)) {
			game.cutscene = { state: true, ref: "Bedroom -> Hallway" }
		}
	},
	Hallway: (game: GameEngine, p5: any) => {
		if (doorChangeConditionMaker(0, 0, 90, "space", p, game5)) {
			game.cutscene = { state: true, ref: "Hallway -> Bedroom" }
		}
		if (doorChangeConditionMaker(0, 4, 0, "space", p5, game)) {
			game.cutscene = { state: true, ref: "Hallway -> Kitchen" }
		}
		if (doorChangeConditionMaker(0, 1, 0, "space", p5, game)) {
			// alert("Hallway -> Kitchen")
			game.cutscene = { state: true, ref: "Hallway -> Parent's Bedroom" }
		}
		if (doorChangeConditionMaker(0, 2, 0, "space", p5, game)) {
			game.cutscene = { state: true, ref: "Hallway -> Basement" }
		}
		if (doorChangeConditionMaker(0, 2, 0, "space", p5, game)) {
			game.cutscene = { state: true, ref: "Hallway -> Living Room" }
		}
	},
	"Parent's Bedroom": (game: GameEngine, p5: any) => {
		if (doorChangeConditionMaker(0, 0, 90, "space", p5, game)) {
			game.cutscene = { state: true, ref: "Parent's Bedroom -> Hallway" }
		}
	},
	Attic: (game: GameEngine, p5: any) => {
		if (doorChangeConditionMaker(0, 0, 90, "space", p5, game)) {
			game.cutscene = { state: true, ref: "Attic -> Hallway" }
		}
	},
	Kitchen: (game: GameEngine, p5: any) => {
		if (doorChangeConditionMaker(0, 0, 90, "space", p5, game)) {
			game.cutscene = { state: true, ref: "Kitchen -> Hallway" }
		}
	},
	Basement: (game: GameEngine, p5: any) => {
		if (doorChangeConditionMaker(0, 0, 90, "space", p5, game)) {
			game.cutscene = { state: true, ref: "Basement -> Hallway" }
		}
	},
	"Living Room": (game: GameEngine, p5: any) => {
		if (doorChangeConditionMaker(0, 0, 90, "space", p, game5)) {
			game.cutscene = { state: true, ref: "Living Room -> Hallway" }
		}
	},
}

export var beginning_rooms = {
	Bathroom: map2,
	Bedroom: map1,
	Hallway: map3,
	"Parent's Bedroom": map4,
	Kitchen: map5,
	Basement: map6,
	Attic: map7,
	"Living Room": map8,
}

export const traversals = (game: GameEngine, p5: any) => {
	if (game.currentRoom === "Bedroom") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Bathroom") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Hallway") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Kitchen") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Parent's Bedroom") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Attic") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Basement") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Living Room") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else {
		alert("No room. You done goofed, Nina. Good luck figuring this one out!")
	}
}
