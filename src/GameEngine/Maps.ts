import {
	tileRotationAndLocation,
	rotationConditions,
	toRadians,
	logger,
	pixelsToMapSize,
	arrayOf9ths,
} from "@/scripts/utils"
import { Map } from "@/classes/Map.class"

export var map3 = new Map(
	"Hallway",
	[
		//12x8
		[2, 1, 2],
		[3, 0, 3],
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[2, 3, 2],
	],
	(map: any, player: any, p5: any) => {
		// console.log("change")

		if (
			pixelsToMapSize(player.x, map.size) === 0 &&
			pixelsToMapSize(player.y, map.size) === 1 &&
			player.rot === 90 &&
			p5.kb.presses("space")
		) {
			return "Hallway -> Bedroom"
		}
		if (
			pixelsToMapSize(player.x, map.size) === 3 &&
			pixelsToMapSize(player.y, map.size) === 1 &&
			player.rot === 270 &&
			p5.kb.presses("space")
		) {
			return "Hallway -> Kitchen"
		}
	}
)

export var map2 = new Map(
	"Bathroom",
	[
		//12x8
		[2, 1, 1, 1, 2],
		[1, 0, 0, 0, 3],
		[2, 1, 1, 1, 2],
	],
	(map: any, player: any, p5: any) => {
		// console.log("change from bathroom")
		if (
			pixelsToMapSize(player.x, map.size) === 3 &&
			pixelsToMapSize(player.y, map.size) === 1 &&
			player.rot === 270 &&
			p5.kb.presses("space")
		) {
			return "Bathroom -> Bedroom"
		}
	}
)

export var map1 = new Map(
	"Bedroom",
	[
		//12x8
		[2, 1, 1, 1, 2],
		[1, 0, 0, 0, 1],
		[1, 0, 0, 0, 3],
		[3, 0, 0, 0, 1],
		[2, 1, 1, 1, 2],
	],

	(map: any, player: any, p5: any) => {
		// console.log("change from bedroom")

		if (
			pixelsToMapSize(player.x, map.size) === 0 &&
			pixelsToMapSize(player.y, map.size) === 3 &&
			player.rot === 90 &&
			p5.kb.presses("space")
		) {
			return "Bedroom -> Bathroom"
		}
		if (
			pixelsToMapSize(player.x, map.size) === 3 &&
			pixelsToMapSize(player.y, map.size) === 1 &&
			player.rot === 270 &&
			p5.kb.presses("space")
		) {
			return "Bedroom -> Hallway"
		}
	}
)
