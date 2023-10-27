import { TheBeginning } from "@/Scenes/Scene1/the-beginning"
import { genericDoorAnimations } from "../GameEngine/Animations"

const BathroomAssets = {
	tiles: {
		// tile ref
		0: `src/assets/tiles/floor_300_tile.png`,
		1: `src/assets/tiles/wall_300_floral.png`,
		2: `src/assets/tiles/wall_300_floral_corner.png`, // 2 is the corner
		3: `src/assets/tiles/wall_300_floral.png`, // 3 is a door, but render door as wall so door can be an object
	},
	items: {},
}
const AtticAssets = {
	tiles: {
		// tile ref
		0: `src/assets/tiles/floor_300_attic.png`,
		1: `src/assets/tiles/wall_300_attic.png`,
		2: `src/assets/tiles/wall_300_attic_corner.png`, // 2 is the corner
		3: `src/assets/tiles/wall_300_attic.png`, // 3 is a door, but render door as wall so door can be an object
	},
	items: {},
}

const ParentsBedroomAssets = {
	tiles: {
		// tile ref
		0: `src/assets/tiles/floor_300_wood.png`,
		1: `src/assets/tiles/wall_300_parentsBedroom.png`,
		2: `src/assets/tiles/wall_300_parentsBedroom_corner.png`, // 2 is the corner
		3: `src/assets/tiles/wall_300_clean.png`, // 3 is a door, but render door as wall so door can be an object
	},
	items: {},
}
export const BedroomAssets = {
	tiles: {
		// tile ref
		0: `src/assets/tiles/floor_300_wood.png`,
		1: `src/assets/tiles/wall_300_clean.png`,
		2: `src/assets/tiles/wall_300_corner.png`, // 2 is the corner
		3: `src/assets/tiles/wall_300_clean.png`, // 3 is a door, but render door as wall so door can be an object
	},
	items: {
		// door1: {
		// 	img: "src/assets/bedroom/bedroom_window_view_day.png",
		// 	size: [143, 85],
		// 	XY: [1.7, 0.15],
		// 	animated: false,
		// 	shownConditions: [],
		// 	interactions: () => {},
		// },
		// rug: {
		// 	img: "src/assets/bedroom/bedroom_rug.png",
		// 	size: [290, 300],
		// 	XY: [1, 1 - 0.2],
		// 	animated: false,
		// 	shownConditions: [],
		// 	interactions: () => {},
		// },
		// window: {
		// 	img: "src/assets/bedroom/bedroom_window_view_day.png",
		// 	size: [143, 85],
		// 	XY: [1.7, 0.15],
		// 	animated: false,
		// 	shownConditions: [],
		// 	interactions: () => {},
		// },
		// desk: {
		// 	img: "src/assets/bedroom/bedroom_desk.png",
		// 	size: [90, 170],
		// 	XY: [3.1, 1 - 0.6],
		// 	animated: false,
		// 	shownConditions: [],
		// 	interactions: () => {},
		// },
		// bed: { img: "src/assets/bedroom/bedroom_bed.png", size: [190, 100], XY: [1 - 0.5, 1 - 0.1], animated: false },
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
		} else if (this.name === "Attic") {
			this.staticImages = AtticAssets.items
			this.imgs = AtticAssets.tiles
		} else if (this.name === "Bathroom") {
			this.staticImages = BathroomAssets.items
			this.imgs = BathroomAssets.tiles
		} else if (this.name === "Parent's Bedroom") {
			this.staticImages = ParentsBedroomAssets.items
			this.imgs = ParentsBedroomAssets.tiles
		} else {
			this.staticImages = BedroomAssets.items
			this.imgs = BedroomAssets.tiles
		}
	}
}

export const map1 = new Map("Bedroom", [
	//12x8
	[2, 1, 1, 1, 2],
	[1, 0, 0, 0, 1],
	[1, 0, 0, 0, 3],
	[3, 0, 0, 0, 1],
	[2, 1, 1, 1, 2],
])

export const map2 = new Map("Bathroom", [
	//12x8
	[2, 1, 1, 1, 2],
	[1, 0, 0, 0, 3],
	[2, 1, 1, 1, 2],
])

export const map3 = new Map("Hallway", [
	//12x8
	[2, 1, 2],
	[3, 0, 3],
	[1, 0, 1],
	[1, 0, 1],
	[1, 0, 1],
	[2, 3, 2],
])

export const map4 = new Map("Parent's Bedroom", [
	//12x8
	[2, 1, 1, 1, 2],
	[1, 0, 0, 0, 1],
	[1, 0, 0, 0, 1],
	[1, 0, 0, 0, 1],
	[2, 1, 1, 1, 2],
])

export const map5 = new Map("Kitchen", [
	//12x8

	[2, 1, 1, 1, 1, 2],
	[1, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0],
	[2, 1, 1, 1, 1, 2],
])

export const map6 = new Map("Basement", [
	//12x8

	[2, 1, 1, 1, 1, 1, 2],
	[1, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 1],
	[2, 1, 1, 1, 1, 1, 2],
])

export const map7 = new Map("Attic", [
	[2, 1, 2],
	[1, 0, 1],
	[1, 0, 1],
	[1, 0, 1],
	[1, 0, 1],
	[1, 0, 1],
	[1, 0, 1],
	[2, 1, 2],
])

export const map8 = new Map("Living Room", [
	//12x8

	[2, 1, 1, 1, 2],
	[1, 0, 0, 0, 1],
	[1, 0, 0, 0, 1],
	[1, 0, 0, 0, 1],
	[2, 1, 1, 1, 2],
])
