const generic = {
	img: "src/assets/door_450_520_brown.png",
	frameDelay: 10,
	frames: 11,
	frameSize: [450, 520],
	scale: 5,
	type: "door",
	looping: false,
}

// export const playerMapCoordinatedToPixelSize = (arr: Array<any>, mapSize: number) => {
// 	arr[0] = arr[0] + 1 * (mapSize + mapSize / 2)

// 	arr[1] = arr[1] + 1 * (mapSize + mapSize / 2)

// 	return [arr[0], arr[1], arr[2]]
// }
export const genericDoorAnimations = {
	"Bedroom -> Bathroom": {
		name: "Bedroom -> Bathroom",
		...generic,
		onComplete: (game: any, p5: any) => {
			game.rerenderCanvas("Bathroom", [215, 1, 90], p5)
		},
	},
	"Bathroom -> Bedroom": {
		name: "Bathroom -> Bedroom",
		...generic,
		onComplete: (game: any, p5: any) => {
			game.rerenderCanvas("Bedroom", [0, 200, 270], p5)
		},
	},

	"Bedroom -> Hallway": {
		name: "Bedroom -> Hallway",
		...generic,
		onComplete: (game: any, p5: any) => {
			game.rerenderCanvas("Hallway", [2, 2, 270], p5)
		},
	},

	"Hallway -> Bedroom": {
		name: "Hallway -> Bedroom",
		...generic,
		onComplete: (game: any, p5: any) => {
			game.rerenderCanvas("Bedroom", [200, 94, 90], p5)
		},
	},
	"Hallway -> Kitchen": {
		//{...load door animations as }
		name: "Hallway -> Kitchen",
		...generic,
		onComplete: (game: any, p5: any) => {
			game.rerenderCanvas("Kitchen", [2, 2, 90], p5)
		},
	},
	"Hallway -> Parent's Bedroom": {
		//{...load door animations as }
		name: "Hallway -> Parent's Bedroom",
		...generic,
		onComplete: (game: any, p5: any) => {
			game.rerenderCanvas("Parent's Bedroom", [2, 2, 90], p5)
		},
	},
	"Hallway -> Basement": {
		//{...load door animations as }
		name: "Hallway -> Basement",
		...generic,
		onComplete: (game: any, p5: any) => {
			game.rerenderCanvas("Basement", [2, 2, 90], p5)
		},
	},
	"Hallway -> Attic": {
		//{...load door animations as }
		name: "Hallway -> Attic",
		...generic,
		onComplete: (game: any, p5: any) => {
			game.rerenderCanvas("Attic", [2, 2, 90], p5)
		},
	},
	"Hallway -> Living Room": {
		//{...load door animations as }
		name: "Hallway -> Living Room",
		...generic,
		onComplete: (game: any, p5: any) => {
			game.rerenderCanvas("Living Room", [2, 2, 90], p5)
		},
	},
}
