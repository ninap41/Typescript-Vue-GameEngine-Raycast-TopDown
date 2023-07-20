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
	staticImages = {
		desk: {
			img: "src/assets/bedroom_desk.png",
			size: [],
			xy: [],
			animated: false,
		},
		bed: { img: "src/assets/bedroom_bed.png", size: [], xy: [], animated: false },
	}
	loadedStaticImages: any = {}
	// transition animations and others
	animations: any = { ...genericDoorAnimations }
	loadedAnimations: any = {}

	playerStart: any
	constructor(name: any, tiles: any, changeSceneCondition: any) {
		this.name = name
		this.tiles = tiles
		this.changeSceneCondition = changeSceneCondition || null
	}
}
