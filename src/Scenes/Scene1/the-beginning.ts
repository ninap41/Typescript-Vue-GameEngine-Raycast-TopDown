import type { GameEngine } from "@/GameEngine/GameEngine"
import { map1, map2, map3, map4, map5, map6, map7, map8 } from "@/GameEngine/Classes/Map.class"
import { pixelsToMapSize } from "@/GameEngine/utils"
import { Renderer } from "../../GameEngine/GameEngine"

const doorChangeConditions: any = {
	Bathroom: (game: GameEngine, p5: any) => {
		if (Renderer.doorChangeConditionMaker(3, 1, 270, "space", game, p5)) {
			game.cutscene = { state: true, ref: "Bathroom -> Bedroom" }
		}
	},
	Bedroom: (game: GameEngine, p5: any) => {
		if (Renderer.doorChangeConditionMaker(1, 3, 90, "space", game, p5)) {
			game.cutscene = { state: true, ref: "Bedroom -> Bathroom" }
		}
		if (Renderer.doorChangeConditionMaker(3, 2, 270, "space", game, p5)) {
			game.cutscene = { state: true, ref: "Bedroom -> Hallway" }
		}
	},
	Hallway: (game: GameEngine, p5: any) => {
		if (Renderer.doorChangeConditionMaker(1, 1, 90, "space", game, p5)) {
			game.cutscene = { state: true, ref: "Hallway -> Bedroom" }
		}
		if (Renderer.doorChangeConditionMaker(1, 5, 0, "space", game, p5)) {
			game.cutscene = { state: true, ref: "Hallway -> Kitchen" }
		}
		if (Renderer.doorChangeConditionMaker(1, 1, 270, "space", game, p5)) {
			// alert("Hallway -> Kitchen")
			game.cutscene = { state: true, ref: "Hallway -> Parent's Bedroom" }
		}
		if (Renderer.doorChangeConditionMaker(0, 2, 0, "space", game, p5)) {
			game.cutscene = { state: true, ref: "Hallway -> Basement" }
		}
		if (Renderer.doorChangeConditionMaker(0, 2, 0, "space", game, p5)) {
			game.cutscene = { state: true, ref: "Hallway -> Living Room" }
		}
	},
	"Parent's Bedroom": (game: GameEngine, p5: any) => {
		if (Renderer.doorChangeConditionMaker(1, 1, 90, "space", game, p5)) {
			game.cutscene = { state: true, ref: "Parent's Bedroom -> Hallway" }
		}
	},
	Attic: (game: GameEngine, p5: any) => {
		if (Renderer.doorChangeConditionMaker(0, 0, 90, "space", game, p5)) {
			game.cutscene = { state: true, ref: "Attic -> Hallway" }
		}
	},
	Kitchen: (game: GameEngine, p5: any) => {
		if (Renderer.doorChangeConditionMaker(0, 0, 90, "space", game, p5)) {
			game.cutscene = { state: true, ref: "Kitchen -> Hallway" }
		}
	},
	Basement: (game: GameEngine, p5: any) => {
		if (Renderer.doorChangeConditionMaker(0, 0, 90, "space", game, p5)) {
			game.cutscene = { state: true, ref: "Basement -> Hallway" }
		}
	},
	"Living Room": (game: GameEngine, p5: any) => {
		if (Renderer.doorChangeConditionMaker(0, 0, 90, "space", game, p5)) {
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

export const TheBeginning = (game: GameEngine, p5: any) => {
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
