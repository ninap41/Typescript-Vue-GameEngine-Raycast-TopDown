const generic = {
	img: "src/assets/door_450_520_brown.png",
	frameDelay: 10,
	frames: 11,
	frameSize: [450, 520],
	scale: 5,
	looping: false,
}

export const genericDoorAnimations = {
	"Bedroom -> Bathroom": {
		name: "Bedroom -> Bathroom",
		...generic,
		onComplete: (gameInstance: any, p5: any) => {
			gameInstance.rerenderCanvas("Bathroom", [2, 2, 270], p5)
		},
	},
	"Bathroom -> Bedroom": {
		name: "Bathroom -> Bedroom",
		...generic,
		onComplete: (gameInstance: any, p5: any) => {
			gameInstance.rerenderCanvas("Bedroom", [2, 2, 270], p5)
		},
	},

	"Bedroom -> Hallway": {
		name: "Bedroom -> Hallway",
		...generic,
		onComplete: (gameInstance: any, p5: any) => {
			gameInstance.rerenderCanvas("Hallway", [2, 2, 270], p5)
		},
	},

	"Hallway -> Bedroom": {
		//{...load door animations as }
		name: "Hallway -> Bedroom",
		...generic,
		onComplete: (gameInstance: any, p5: any) => {
			gameInstance.rerenderCanvas("Bedroom", [2, 2, 90], p5)
		},
	},
}
