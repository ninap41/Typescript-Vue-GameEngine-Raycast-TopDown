import type { GameEngine } from "@/GameEngine/GameEngine"
import { map1, map2, map3, map4, map5, map6 } from "@/Classes/Map.class"
import { pixelsToMapSize } from "@/scripts/utils"

const doorChangeConditions: any = {
	Bathroom: (game: GameEngine, p5: any) => {
		if (game.doorChangeConditionMaker(3, 1, 270, "space", p5)) {
			game.cutscene = { state: true, ref: "Bathroom -> Bedroom" }
		}
	},
	Bedroom: (game: GameEngine, p5: any) => {
		if (game.doorChangeConditionMaker(0, 3, 90, "space", p5)) {
			game.cutscene = { state: true, ref: "Bedroom -> Bathroom" }
		}
		if (game.doorChangeConditionMaker(3, 1, 270, "space", p5)) {
			game.cutscene = { state: true, ref: "Bedroom -> Hallway" }
		}
	},
	Hallway: (game: GameEngine, p5: any) => {
		if (game.doorChangeConditionMaker(0, 0, 90, "space", p5)) {
			game.cutscene = { state: true, ref: "Hallway -> Bedroom" }
		}
		if (game.doorChangeConditionMaker(0, 4, 0, "space", p5)) {
			game.cutscene = { state: true, ref: "Hallway -> Kitchen" }
		}
		if (game.doorChangeConditionMaker(0, 1, 0, "space", p5)) {
			// alert("Hallway -> Kitchen")
			game.cutscene = { state: true, ref: "Hallway -> Parent's Room" }
		}
		if (game.doorChangeConditionMaker(0, 2, 0, "space", p5)) {
			game.cutscene = { state: true, ref: "Hallway -> Basement" }
		}
	},
}

export var beginning_rooms = {
	Bathroom: map2,
	Bedroom: map1,
	Hallway: map3,
	"Parent's Room": map4,
	Kitchen: map5,
	Basement: map6,
}

export const TheBeginning = (game: GameEngine, p5: any) => {
	if (game.currentRoom === "Bedroom") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Bathroom") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Hallway") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Kitchen") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Parent's Room") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else if (game.currentRoom === "Basement") {
		doorChangeConditions[game.currentRoom](game, p5)
	} else {
		alert("No room. You done goofed, Nina. Good luck figuring this one out!")
	}
}
