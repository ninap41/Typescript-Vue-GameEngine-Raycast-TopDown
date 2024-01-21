import { genericDoorAnimations } from "../Animations/door"
import { BedroomAssets, AtticAssets, BathroomAssets, ParentsBedroomAssets } from "@/GameEngine/2dTilesObjects/Assets"
import type { GameEngine } from "../GameEngine"
import { percentageConverter, tileRotationAndLocation } from "../utils"
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
	name: any
	// interactable: any
	changeSceneCondition: any
	size: any = 100
	scale: any = 1
	//tiles
	tileImgs = BedroomAssets.tiles
	tiles: any
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
		} else {
			this.staticImages = BedroomAssets.items
			this.tileImgs = BedroomAssets.tiles
		}
	}
	public loadRooms(game: GameEngine, p5: any) {
		/* ROOM Loop */
		Object.keys(game.rooms as Array<Map>).forEach((key: string) => {
			const map = game.rooms[key] /* current in loop */
			/* ROOM.IMGS Loop (TILES) */
			Object.keys(map.tileImgs).forEach((key: any) => {
				map.loadedImages[key] = p5.loadImage(map.tileImgs[key]) /* Room.loadedImages map{} of p5 LOADIMAGE instance */
			})
			Object.keys(map.animations).forEach((animationKey: any) => {
				/* Room.ANIMATIONS Loop (DOOR) */
				map.loadedAnimations[map.animations[animationKey].name] = p5.loadAni(map.animations[animationKey].img, {
					/* Room.loadedAnimations map{} of p5 LOADIMAGE instance */
					frameSize: [map.animations[animationKey].frameSize[0], map.animations[animationKey].frameSize[1]],
					frames: map.animations[animationKey].frames,
					frameDelay: map.animations[animationKey].frameDelay,
					scale: map.animations[animationKey].scale,
				})
				const ani = map.loadedAnimations[map.animations[animationKey].name] /* Get Animation Instance  */
				map.loadedAnimations[map.animations[animationKey].name].looping = ani.looping /* check if looping */
				map.loadedAnimations[map.animations[animationKey].name].onComplete = async () => {
					/* assign onComplete call back for non looped animations */
					p5.clear()
					await map.animations[animationKey].onComplete(game, p5)
				}
			})
			/* static items */
			Object.keys(map.staticImages).forEach((key2: any) => {
				if (map.staticImages) {
					map.loadedStaticImages[key2] = {}
					map.loadedStaticImages[key2] = p5.loadImage(map.staticImages[key2].img)
				} else {
					// alert("no static images for this map")
				}
			})
		})
	}

	public drawMap(game: GameEngine, map: any, type: "topDown" | "raycast" | "sideScroll", p5: any) {
		/* only have top down support atm*/
		// ratio will be used for resizing
		const ratio = percentageConverter(map, p5)
		map.tiles.forEach((row: any, y_: any) => {
			row.forEach((tile: any, x_: any) => {
				let XY = undefined
				p5.push()
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

				p5.image(map.loadedImages[tile], XY[0], XY[1], map.size, map.size)
				p5.pop()
			})
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
