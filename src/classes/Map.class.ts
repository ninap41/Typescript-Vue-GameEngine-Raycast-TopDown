import { TheBeginning } from "@/Scenes/the-beginning"
import { genericDoorAnimations } from "../GameEngine/Animations"

export const BedroomAssets = {
	tiles: {
		// tile ref
		0: "src/assets/walls/floor_300_wood.png",
		1: "src/assets/walls/wall_300_clean.png",
		2: "src/assets/walls/wall_300_corner.png", // 2 is the corner
		3: "src/assets/walls/wall_300_door.png", // 3 is a door
	},
	items: {
		rug: {
			img: "src/assets/bedroom/bedroom_rug.png",
			size: [290, 300],
			XY: [1, 1 - 0.2],
			animated: false,
			shownConditions: [],
			interactions: () => {},
		},
		window: {
			img: "src/assets/bedroom/bedroom_window_view_day.png",
			size: [143, 85],
			XY: [1.7, 0.15],
			animated: false,
			shownConditions: [],
			interactions: () => {},
		},
		desk: {
			img: "src/assets/bedroom/bedroom_desk.png",
			size: [90, 170],
			XY: [3.1, 1 - 0.6],
			animated: false,
			shownConditions: [],
			interactions: () => {},
		},
		bed: { img: "src/assets/bedroom/bedroom_bed.png", size: [190, 100], XY: [1 - 0.5, 1 - 0.1], animated: false },
		// window: { img: "src/assets/bedroom_bed.png", size: [180, 90], XY: [1 - 0.5, 1 - 0.1], animated: false },
	},
}

export class Map {
	name: any
	tiles: any
	// interactable: any
	changeSceneCondition: any
	size: any = 100
	scale: any = 1
	//Tiles
	imgs = BedroomAssets.tiles // default
	loadedImages: any = {}
	// assets
	staticImages: any = []
	loadedStaticImages: any = {}
	// transition animations and others
	animations: any = { ...genericDoorAnimations }
	loadedAnimations: any = {}
	playerStart: any
	constructor(name: any, tiles: any) {
		this.name = name
		this.tiles = tiles
		if (this.name === "Bedroom") {
			this.staticImages = BedroomAssets.items
			this.imgs = BedroomAssets.tiles
		}
	}
}
