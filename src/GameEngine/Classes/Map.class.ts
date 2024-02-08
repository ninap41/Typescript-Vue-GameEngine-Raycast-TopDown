import { genericDoorAnimations } from "../Animations/door"
import {
	BedroomAssets,
	AtticAssets,
	BathroomAssets,
	ParentsBedroomAssets,
	HallwayAssets,
} from "@/GameEngine/2dTilesObjects/Assets"
import { GameEngine, Renderer } from "../GameEngine"
import { percentageConverter, tileRotationAndLocation, getScale } from "../utils"

export type ROOM_NAMES =
	| "Bedroom"
	| "Bathroom"
	| "DoorAnimation"
	| "Hallway"
	| "Kitchen"
	| "Living Room"
	| "Parents Room"
	| "Attic"

export class Map {
	name: any // unique ID
	changeSceneCondition: any
	size: any = 100 // base size in pixels
	//tiles
	tiles: any // ones, zeros, etc
	tileImgs = BedroomAssets.tiles //asset path
	loadedImages: any = {} // p5 image instance

	// assets
	staticImages: any = [] // item type in room placement data
	loadedStaticImages: any = {} //loaded p5 instance

	// animations
	animations: any = { ...genericDoorAnimations }
	loadedAnimations: any = {}

	constructor(name: any, tiles: any, size?: any) {
		this.name = name
		this.tiles = tiles
		this.size = size || 100
		if (this.name === "Bedroom") {
			this.staticImages = BedroomAssets.items
			this.tileImgs = BedroomAssets.tiles
		} else if (this.name === "Attic") {
			this.staticImages = AtticAssets.items
			this.tileImgs = AtticAssets.tiles
		} else if (this.name === "Bathroom") {
			this.staticImages = BathroomAssets.items
			this.tileImgs = BathroomAssets.tiles
		} else if (this.name === "Parent's Bedroom") {
			this.staticImages = ParentsBedroomAssets.items
			this.tileImgs = ParentsBedroomAssets.tiles
		} else if (this.name === "Hallway") {
			this.staticImages = HallwayAssets.items
			this.tileImgs = HallwayAssets.tiles
		}
	}
	public loadRooms(game: GameEngine, p5: any) {
		/* ROOM Loop */ //game.rooms is for Object.keys
		Object.keys(game.rooms as Array<Map>).forEach((key: string) => {
			const map = game.rooms[key] /* current in loop */
			/* tiles */ Renderer.loadTileImages(map, "tileImgs", "loadedImages", p5)
			/* animations */ Renderer.loadAnimations(map, "animations", "loadedAnimations", p5, game)
			/* static items */ Renderer.loadStaticImages(map, "staticImages", "loadedStaticImages", p5)
		})
	}

	public drawMap(game: GameEngine, map: any, type: "topDown" | "raycast" | "sideScroll", p5: any) {
		/* only have top down support atm, RayCasting is in another project, but stored at
		 */
		// ratio will be used for resizing
		const ratio = percentageConverter(map, p5)
		map.tiles.forEach((row: any, y_: any) => {
			row.forEach((tile: any, x_: any) => {
				let XY = undefined

				p5.push()
				let devModeOffset = 0
				if (game.config.devMode) {
					devModeOffset = 1
				}
				if (tile === 2) {
					XY = [x_ * map.size, y_ * map.size]
					p5.image(map.loadedImages[0], XY[0], XY[1], map.size, map.size) /*add floor to space*/
					XY = tileRotationAndLocation(map, x_, y_, tile, "corner", p5) /*corners */
				} else if (tile === 1 || tile === 4 || tile === 3) {
					XY = [x_ * map.size, y_ * map.size]
					p5.image(map.loadedImages[0], XY[0], XY[1], map.size, map.size) /*add floor to space */
					XY = tileRotationAndLocation(map, x_, y_, tile, "wall", p5) /* walls */
				} else if (tile === 8) {
					XY = [x_ * map.size, y_ * map.size]
					p5.fill("black")

					p5.square(XY[0], XY[1], map.size, map.size) /*add floor to space */
					p5.pop()
				} else {
					/* tile === 0 */
					XY = [x_ * map.size, y_ * map.size]
				}

				if (game.config.devMode) {
					p5.strokeWeight(4)
					p5.stroke("white")
				}
				p5.image(map.loadedImages[tile], XY[0], XY[1], map.size - devModeOffset, map.size - devModeOffset)
				p5.pop()
			})
		})
	}

	drawAssets(map: any, type: "topDown" | "raycast" | "sideScroll", p5: any) {
		Object.keys(map.loadedStaticImages).forEach((assetKey: any) => {
			p5.image(
				map.loadedStaticImages[assetKey],
				map.staticImages[assetKey].XY[0] * map.size,
				map.staticImages[assetKey].XY[1] * map.size,
				getScale(map.staticImages[assetKey].size[0], map.size),
				getScale(map.staticImages[assetKey].size[1], map.size)
			)
		})
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
	[3, 0, 0, 0, 1],
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
