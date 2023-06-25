import {
	tileRotationAndLocation,
	rotationConditions,
	toRadians,
	logger,
	pixelsToMapSize,
	arrayOf9ths,
} from "../utility"

const genericDoorAnimations = {
	"Bedroom -> Bathroom": {
		//{...load door animations as }
		name: "Bedroom -> Bathroom",
		frames: 11,
		img: "src/assets/door_450_520_brown.png",
		frameDelay: 10,
		frameSize: [450, 520],
		scale: 5,
		looping: false,
		roomChange: "Bathroom",
		onComplete: (gameInstance: any, p5: any) => {
			gameInstance.rerenderCanvas("Bathroom", [2, 2, 270], p5)
		},
	},
	"Bathroom -> Bedroom": {
		//{...load door animations as }
		name: "Bathroom -> Bedroom",
		frames: 11,
		img: "src/assets/door_450_520_brown.png",
		frameDelay: 10,
		frameSize: [450, 520],
		scale: 5,
		looping: false,
		roomChange: "Bathroom",
		onComplete: (gameInstance: any, p5: any) => {
			gameInstance.rerenderCanvas("Bedroom", [2, 2, 270], p5)
		},
	},

	"Bedroom -> Hallway": {
		//{...load door animations as }
		name: "Bedroom -> Hallway",
		frames: 11,
		img: "src/assets/door_450_520_brown.png",
		frameDelay: 10,
		frameSize: [450, 520],
		scale: 5,
		looping: false,
		roomChange: "Hallway",
		onComplete: (gameInstance: any, p5: any) => {
			gameInstance.rerenderCanvas("Hallway", [2, 2, 270], p5)
		},
	},

	"Hallway -> Bedroom": {
		//{...load door animations as }
		name: "Hallway -> Bedroom",
		frames: 11,
		img: "src/assets/door_450_520_brown.png",
		frameDelay: 10,
		frameSize: [450, 520],
		scale: 5,
		looping: false,
		roomChange: "Bedroom",
		onComplete: (gameInstance: any, p5: any) => {
			gameInstance.rerenderCanvas("Bathroom", [2, 2, 90], p5)
		},
	},
}

class Map {
	name: any
	tiles: any

	interactable: any
	decoration: any
	changeSceneCondition: any
	size: any = 100
	scale: any = 1
	imgs: any = {
		0: "src/assets/floor_300_wood.png",
		1: "src/assets/wall_300_clean.png",
		2: "src/assets/wall_300_corner.png",
		3: "src/assets/wall_300_door.png",
	}
	animations: any = { ...genericDoorAnimations }
	playerStart: any
	loadedImages: any = {}
	loadedAnimations: any = {}
	constructor(name: any, tiles: any, changeSceneCondition: any) {
		this.name = name
		this.tiles = tiles
		this.changeSceneCondition = changeSceneCondition || null
	}
}

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
		if (
			pixelsToMapSize(player.x, map.size) === 0 &&
			pixelsToMapSize(player.y, map.size) === 1 &&
			player.rot === 90 &&
			p5.kb.presses("space")
		) {
			console.log("change")

			return "Bathroom -> Bedroom"
		}
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

export var map2 = new Map(
	"Bathroom",
	[
		//12x8
		[2, 1, 1, 1, 2],
		[3, 0, 0, 0, 1],
		[2, 1, 1, 1, 2],
	],
	(map: any, player: any, p5: any) => {
		console.log("size", pixelsToMapSize(player.x, map.size))
		if (
			pixelsToMapSize(player.x, map.size) === 0 &&
			pixelsToMapSize(player.y, map.size) === 1 &&
			player.rot === 90 &&
			p5.kb.presses("space")
		) {
			return "Bathroom -> Bedroom"
		}
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
