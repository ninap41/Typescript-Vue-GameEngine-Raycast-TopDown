import { animation, playerAnimations } from "./animations"
import {
	tileRotationAndLocation,
	rotationConditions,
	toRadians,
	logger,
	pixelsToMapSize,
	arrayOf9ths,
} from "./utility"
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
			gameInstance.rerenderCanvas("Bathroom", [2, 2], p5)
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
			gameInstance.rerenderCanvas("Bedroom", [2, 2], p5)
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
			gameInstance.rerenderCanvas("Bathroom", [2, 2], p5)
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
			gameInstance.rerenderCanvas("Bathroom", [2, 2], p5)
		},
	},
}
export var map2 = {
	name: "Bathroom",
	tiles: [
		//12x8
		[2, 1, 1, 1, 2],
		[3, 0, 0, 0, 1],
		[2, 1, 1, 1, 2],
	],
	interactable: [{ coordinates: [1, 3] }],
	decoration: [{ coordinates: [1, 2] }],
	changeSceneCondition: (map: any, player: any, p5: any) => {
		if (
			pixelsToMapSize(player.x, map.size) === 0 &&
			pixelsToMapSize(player.y, map.size) === 1 &&
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
			return "Bathroom -> Bedroom"
		}
	},
	size: 100,
	scale: 1,
	imgs: {
		0: "src/assets/floor_300_wood.png",
		1: "src/assets/wall_300_clean.png",
		2: "src/assets/wall_300_corner.png",
		3: "src/assets/wall_300_door.png",
	},
	animations: { ...genericDoorAnimations },
	playerStart: (coordinates: any) => coordinates || [1, 1],
	loadedImages: {},
	loadedAnimations: {},
} as any

export var map1 = {
	name: "Bedroom",
	tiles: [
		//12x8
		[2, 1, 1, 1, 2],
		[3, 0, 0, 0, 1],
		[1, 0, 0, 0, 3],
		[1, 0, 0, 0, 1],
		[2, 1, 1, 1, 2],
	],
	interactable: [{ coordinates: [1, 3] }],
	decoration: [{ coordinates: [1, 2] }],
	changeSceneCondition: (map: any, player: any, p5: any) => {
		if (
			pixelsToMapSize(player.x, map.size) === 0 &&
			pixelsToMapSize(player.y, map.size) === 1 &&
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
	},
	size: 100,
	scale: 1,
	imgs: {
		0: "src/assets/floor_300_wood.png",
		1: "src/assets/wall_300_clean.png",
		2: "src/assets/wall_300_corner.png",
		3: "src/assets/wall_300_door.png",
	},
	animations: { ...genericDoorAnimations },

	playerStart: (coordinates: any) => coordinates || [1, 1],
	loadedImages: {},
	loadedAnimations: {},
} as any
