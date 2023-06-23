import { animation, playerAnimations } from "./animations"
import {
	tileRotationAndLocation,
	rotationConditions,
	toRadians,
	logger,
	pixelsToMapSize,
	arrayOf9ths,
} from "./utility"

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
			return "Bathroom"
		}
		if (
			pixelsToMapSize(player.x, map.size) === 3 &&
			pixelsToMapSize(player.y, map.size) === 1 &&
			player.rot === 270 &&
			p5.kb.presses("space")
		) {
			return "Hallway"
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
	animations: {
		0: {
			name: "brownDoor",
			frames: 11,
			img: "src/assets/door_450_520_brown.png",
			frameDelay: 10,
			frameSize: [450, 520],
			scale: 5,
			looping: false,
			roomChange: "Bathroom",
			onComplete: (gameInstance: any) => {
				console.log("ANOTHER GAME INSTANCE", gameInstance)
				gameInstance.rerenderCanvas("Bathroom", map2)
				console.log("DONE!!!!!!!!!!")
				return
			},
		},
	},
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
			return "Bathroom"
		}
		if (
			pixelsToMapSize(player.x, map.size) === 3 &&
			pixelsToMapSize(player.y, map.size) === 1 &&
			player.rot === 270 &&
			p5.kb.presses("space")
		) {
			return "Hallway"
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
	animations: {
		0: {
			name: "brownDoor",
			frames: 11,
			img: "src/assets/door_450_520_brown.png",
			frameDelay: 10,
			frameSize: [450, 520],
			scale: 5,
			looping: false,
			roomChange: "Bathroom",
			onComplete: (gameInstance: any) => {
				console.log("ANOTHER GAME INSTANCE", gameInstance)
				gameInstance.rerenderCanvas("Bathroom", map2)
				console.log("DONE!!!!!!!!!!")
			},
		},
	},
	playerStart: (coordinates: any) => coordinates || [1, 1],
	loadedImages: {},
	loadedAnimations: {},
} as any

// export function drawMap(
// 	map: any,
// 	type: "topDown" | "raycast" | "sideScroll",
// 	p5: any
// ) {
// 	map.tiles.forEach((row: any, y_: any) => {
// 		row.forEach((tile: any, x_: any) => {
// 			let XY = undefined
// 			p5.push()
// 			if (tile === 2) {
// 				XY = tileRotationAndLocation(map, x_, y_, tile, "corner", p5) /*corners */
// 			} else if (tile === 1 || tile === 4) {
// 				XY = tileRotationAndLocation(map, x_, y_, tile, "wall", p5) /* walls */
// 			} else if (tile === 3) {
// 				XY = tileRotationAndLocation(map, x_, y_, tile, "wall", p5) /* door */
// 			} else {
// 				XY = [x_ * map.size, y_ * map.size]
// 			}
// 			p5.image(map.loadedImages[tile], XY[0], XY[1], map.size, map.size)
// 			p5.pop()
// 		})
// 	})
// }
// export var player: any = {
// 	animations: [
// 		{
// 			name: "idle",
// 			frames: 59,
// 			img: "src/assets/character_900_idle.png",
// 			frameDelay: 1,
// 		},
// 		{
// 			name: "walk",
// 			frames: 37,
// 			img: "src/assets/character_900_walk.png",
// 			frameDelay: -1.4,
// 		},
// 	],
// 	currentAnimation: "idle",
// 	x: 1,
// 	y: 1,
// 	dir: 1, // -1 is north, 1 is going to be south
// 	rot: 0, // -1 is going to be west facing, 1 is going to be east
// 	speed: 2.5,
// 	acceleration: 0.1, // moving? (speed = 1) or backwards (speed = 0).
// 	moveSpeed: 0.1, // how far (in map units) does the player move each step/update
// 	rotSpeed: (3 * Math.PI) / 180, // how much does the player rotate each step/update (in radians)
// }

// export const loadPlayerAnimations = (p5: any, player: any) => {
// 	console.log("PLAYER ANIMATION", player)
// 	var animations: any = []
// 	let ani

// 	player.animations.forEach((animationObject: any) => {
// 		ani = p5.loadAni(animationObject.img, {
// 			frameSize: [900, 900],
// 			frames: animationObject.frames,
// 			frameDelay: animationObject.frameDelay,
// 		})
// 		animations.push(ani)
// 	})

// 	return animations
// }

// export function playPlayerAnimations(p5: any, char: any) {
// 	// p5.noLoop()
// 	const characterAnimation = {
// 		walk: () =>
// 			p5.animation(
// 				char.animations[1], //SpriteAnim
// 				char.x + 1 * (map1.size + map1.size / 2), //position of the animation on the canvas

// 				char.y + 1 * (map1.size + map1.size / 2), //position of the animation on the canvas
// 				char.rot, //rotation
// 				0.1, // scale
// 				0.1 // scale
// 			),
// 		idle: () =>
// 			p5.animation(
// 				char.animations[0], //SpriteAnim
// 				char.x + 1 * (map1.size + map1.size / 2), //position of the animation on the canvas

// 				char.y + 1 * (map1.size + map1.size / 2), //position of the animation on the canvas
// 				char.rot, //rotation
// 				0.1, // scale
// 				0.1 // scale
// 			),
// 	}
// 	if (
// 		p5.kb.pressing("ArrowUp") ||
// 		p5.kb.pressing("w") ||
// 		p5.kb.pressing("ArrowDown") ||
// 		p5.kb.pressing("s") ||
// 		p5.kb.pressing("ArrowLeft" || p5.kb.pressing("a")) ||
// 		p5.kb.pressing("ArrowRight") ||
// 		p5.kb.pressing("d")
// 	) {
// 		//https://p5play.org/docs/
// 		char.currentAnimation = "walk"
// 		characterAnimation.walk()
// 		// console.log(char.animations[0])
// 	} else {
// 		// idle
// 		characterAnimation.idle()
// 	}

// 	if (p5.kb.pressing("ArrowUp") || p5.kb.pressing("w")) {
// 		char.y -= char.speed
// 		char.rot = 180
// 	}
// 	if (p5.kb.pressing("ArrowDown") || p5.kb.pressing("s")) {
// 		char.y += player.speed
// 		char.rot = 0
// 	}
// 	if (p5.kb.pressing("ArrowLeft" || p5.kb.pressing("a"))) {
// 		char.x -= char.speed
// 		char.rot = 90
// 	}
// 	if (p5.kb.pressing("ArrowRight") || p5.kb.pressing("d")) {
// 		char.x += char.speed
// 		char.rot = 270
// 	}
// }
