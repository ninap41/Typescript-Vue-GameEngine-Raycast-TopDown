import { TheBeginning } from "@/Scenes/the-beginning"
import { genericDoorAnimations } from "../GameEngine/Animations"

export class Map {
	name: any
	tiles: any
	// interactable: any
	changeSceneCondition: any
	size: any = 100
	scale: any = 1
	//Tiles
	imgs: any = {
		// tile ref
		0: "src/assets/floor_300_wood.png",
		1: "src/assets/wall_300_clean.png",
		2: "src/assets/wall_300_corner.png",
		3: "src/assets/wall_300_door.png",
	}
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
			this.staticImages = {
				desk: {
					img: "src/assets/bedroom_desk.png",
					size: [100, 180],
					XY: [3 - 0.1, 1 - 0.6],
					animated: false,
				},
				bed: { img: "src/assets/bedroom_bed.png", size: [180, 90], XY: [1 - 0.5, 1 - 0.1], animated: false },
				// window: { img: "src/assets/bedroom_bed.png", size: [180, 90], XY: [1 - 0.5, 1 - 0.1], animated: false },
			}
		}
	}
}
