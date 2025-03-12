import { Tiles, Objects } from "./Tiles.enum"
import { HitBoxColors } from "../Classes/HitBoxColors.enum"

export const BathroomAssets = {
	tiles: {
		// tile ref
		0: Tiles.TileFloor,
		1: Tiles.FloralWall,
		2: Tiles.FloralCorner, // 2 is the corner
		3: Tiles.FloralWall, // 3 is a door, but render door as wall so door can be an object
		4: Tiles.WoodFloor,
	},
	items: {},
}
export const AtticAssets = {
	tiles: {
		// tile ref
		0: Tiles.AtticFloor,
		1: Tiles.AtticWall,
		2: Tiles.AtticCorner, // 2 is the corner
		3: Tiles.DoorWood, // 3 is a door, but render door as wall so door can be an object
		4: Tiles.WoodFloor,
	},
	items: {},
}

export const HallwayAssets = {
	tiles: {
		// tile ref
		0: Tiles.WoodFloor,
		1: Tiles.CleanWall,
		2: Tiles.CleanCorner, // 2 is the corner
		3: Tiles.DoorWood, // 3 is a door, but render door as wall so door can be an object
		4: Tiles.WoodFloor,
	},
	items: {},
}
export const ParentsBedroomAssets = {
	tiles: {
		// tile ref
		0: Tiles.WoodFloor,
		1: Tiles.ParentsWall,
		2: Tiles.ParentsCorner, // 2 is the corner
		3: Tiles.DoorWood, // 3 is a door, but render door as wall so door can be an object
		4: Tiles.WoodFloor,
	},
	items: {},
}

export const BedroomAssets = {
	tiles: {
		// tile ref
		0: Tiles.WoodFloor,
		1: Tiles.CleanWall,
		2: Tiles.CleanCorner, // 2 is the corner
		3: Tiles.DoorWood, // 3 is a door, but render door as wall so door can be an object
		4: Tiles.WoodFloor,
	},
	items: {
		rug: {
			img: Objects.Rug,
			size: [290, 300],
			spriteLocation: null,
			XY: [1, 1 - 0.2],
			animated: false,
			shownConditions: [],
			interactions: () => {},
		},
		window: {
			img: Objects.WindowDay, // toggle show
			size: [143, 85],
			spriteLocation: null,
			XY: [1.7, 0.15],
			animated: false,
			shownConditions: [],
			interactions: () => {},
		},
		desk: {
			img: Objects.Desk,
			size: [90, 170],
			spriteLocation: null,
			XY: [3.1, 1 - 0.6],
			animated: false,
			shownConditions: [],
			interactions: () => {},
		},
		bed: { img: Objects.Bed, size: [190, 100], XY: [1 - 0.5, 1 - 0.1], animated: false },
	},
}
