export const BathroomAssets = {
	tiles: {
		// tile ref
		0: `src/assets/tiles/floor_300_tile.png`,
		1: `src/assets/tiles/wall_300_floral.png`,
		2: `src/assets/tiles/wall_300_floral_corner.png`, // 2 is the corner
		3: `src/assets/tiles/wall_300_floral.png`, // 3 is a door, but render door as wall so door can be an object
	},
	items: {},
}
export const AtticAssets = {
	tiles: {
		// tile ref
		0: `src/assets/tiles/floor_300_attic.png`,
		1: `src/assets/tiles/wall_300_attic.png`,
		2: `src/assets/tiles/wall_300_attic_corner.png`, // 2 is the corner
		3: `src/assets/tiles/wall_300_attic.png`, // 3 is a door, but render door as wall so door can be an object
	},
	items: {},
}

export const ParentsBedroomAssets = {
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
		door1: {
			img: "src/assets/bedroom/bedroom_window_view_day.png",
			size: [143, 85],
			XY: [1.7, 0.15],
			animated: false,
			shownConditions: [],
			interactions: () => {},
		},
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
	},
}
