import { genericDoorAnimations } from "../GameEngine/Animations/door"
import { BedroomAssets, AtticAssets, BathroomAssets, ParentsBedroomAssets } from "@/GameEngine/2dTilesObjects/Assets"

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
	constructor(name: any, tiles: any, size?: any) {
		this.name = name
		this.tiles = tiles
		this.size = size || 100
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
