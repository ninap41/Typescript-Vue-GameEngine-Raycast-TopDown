import {
	tileRotationAndLocation,
	rotationConditions,
	toRadians,
	logger,
	pixelsToMapSize,
	arrayOf9ths,
} from "@/scripts/utils"
import { Map } from "@/classes/Map.class"

export const map3 = new Map("Hallway", [
	//12x8
	[2, 1, 2],
	[3, 0, 3],
	[1, 0, 1],
	[1, 0, 1],
	[1, 0, 1],
	[2, 3, 2],
])

export const map2 = new Map("Bathroom", [
	//12x8
	[2, 1, 1, 1, 2],
	[1, 0, 0, 0, 3],
	[2, 1, 1, 1, 2],
])

export const map1 = new Map("Bedroom", [
	//12x8
	[2, 1, 1, 1, 2],
	[1, 0, 0, 0, 1],
	[1, 0, 0, 0, 3],
	[3, 0, 0, 0, 1],
	[2, 1, 1, 1, 2],
])
