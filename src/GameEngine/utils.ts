import type { GameEngine } from "@/GameEngine/GameEngine"
import type { Map } from "@/GameEngine/Classes/Map.class"
import { HitBoxColors } from "./Classes/HitBoxColors.enum"
export const toRadians = (degrees: number) => degrees * (Math.PI / 180)
/* hint? https://editor.p5js.org/tonio.bevacqui/sketches/8Bcf_i8QT */
export const generateHitBoxes = (objList: any[], game: GameEngine, p5: any /* list of object class*/) => {
	return
}
export const rotationConditions = (
	map: any,
	x: any,
	y: any,
	type: "corner" | "wall" | "door", // wall includes doors
	angle: number
) => {
	const angles: any = {
		90: {
			corner: (): boolean => x === map.tiles[0].length - 1 && y === 0,
			wall: () => x === map.tiles[0].length - 1,
		},
		180: {
			corner: (): boolean => x === map.tiles[0].length - 1 && y === map.tiles.length - 1,
			wall: () => y === map.tiles.length - 1,
		},
		270: {
			corner: (): boolean => y === map.tiles.length - 1 && x === 0,
			wall: () => x === 0,
		},
		360: {
			corner: () => true,
			wall: () => y === 0 && x === 0,
		},
	}
	return angles[angle][type]()
}

export const tileRotationAndLocation = (
	map: any,
	x: any,
	y: any,
	tile: any,
	type: "corner" | "wall",
	p5: any
): number[] => {
	/* spent a whole damn day on this, never forget, persistance pays off don't be lazy */
	var { cellX, cellY } = { cellX: map.tiles[0].length, cellY: map.tiles.length }
	var { width, height } = { width: p5.width / cellX, height: p5.height / cellY }
	let { XY, degrees } = { XY: [0, 0], degrees: 0 }
	p5.translate(x * width, y * height)
	if (rotationConditions(map, x, y, type, 90)) {
		// right
		degrees = 90
		XY = [width - map.size, height - map.size * 2]
	} else if (rotationConditions(map, x, y, type, 180)) {
		// bottom
		degrees = 180
		XY = [width - map.size * 2, height - map.size * 2]
	} else if (rotationConditions(map, x, y, type, 270)) {
		// left
		degrees = 270
		XY = [width - map.size * 2, height - map.size]
	} else if (rotationConditions(map, x, y, type, 360)) {
		XY = [x * map.size, y * map.size]
	}
	p5.rotate(degrees)
	return XY
}

export const percentageConverter = (map: Map, p5: any) => {
	const numberOfTilesX = map.tiles[0].length
	// const numberOfTilesY = map.tiles.length
	const relativeUnit = Math.floor(p5.screenWidth / numberOfTilesX)
	const difference = numberOfTilesX * relativeUnit - numberOfTilesX * map.size
	difference > 0 ? "increase" : "decrease"

	//cellSize * baselineSize=
	//const mapWidth = mapCellNumber
	//const mapHeight = mapcellnumber
	//const cellSize = cellSize
	//whatever is the largest of the two
	//const screenwidth = p5.windowWidth
	//Math.floor(screenWidth / mapWidth)
}

export const clearCanvas = () => {
	window.document.getElementById("defaultCanvas0")?.remove()
}

export const getScale = (size: any, mapSize: number, default_: number = 100) => {
	if (mapSize === default_) return size
	if (mapSize !== default_) return (mapSize * size) / 100
}

export const pixelsToMapSize = (value: number | undefined, size: number) => {
	if (value) return Math.abs(Math.ceil(value / size + 0.5))
}

export const mapToPixelSize = (value: number, size: number) => {
	return Math.abs(Math.ceil(value * size - 0.5))
}
export function reinitializeChangeScene(scene: any) {
	window.document.getElementById("defaultCanvas0")?.remove()
}

export const getLighting = (p5: any, type?: string) => {
	p5.push()
	p5.blendMode(p5.MULTIPLY)

	p5.rect(0, 0, p5.width, p5.height)
	p5.fill(p5.color(95, [p5.alpha(100)]))

	p5.pop()
}
let fade = 0
var fadeAmount = 1
export const fadeIn = (p5: any, animation: any) => {
	p5.clear()
	p5.fill(0, 0, 0, fade)
	p5.rect(0, 0, p5.width, p5.height)
	if (fade > 0) {
		fadeAmount = 255
	}

	if (fade > 255) {
		fadeAmount = +10
		animation()
	}

	fade += fadeAmount * 0.04
}

export const arrayOf9ths = [9, 18, 27, 36, 45, 54, 63]
/**
 * Returns a boolean to tell if tile character is FACING is passible
 *
 * @remarks
 * @param character - Array<number> - character coordinates, ex: [1,2]
 * @param direction - any - whether character is facing north south east west
 * @param map - Array<number> - map coordinates of next tile character is facing ex: [1,2]
 * @param passibleUnits - Array<number> - and array of acceptible tiles the user can pass through

 * @returns boolean
 *
 * @beta
 */
const passable = (character: Array<number>, direction: any, map: number, passibleUnits: Array<number>) => {
	// do
}
export const logger = (child: number, value: any, prefix?: any) => {
	const st: any = String(value)
	var output = document.getElementById("output")?.children[child]

	if (output && st) output.innerHTML = prefix ? `${prefix} : ${st}` : st // log what I want
}

export const distanceTool = (p5: any) => {
	let x1: number
	let y1: number
	let x2: number
	let y2: number
	p5.mousePressed = async () => {
		x1 = p5.mouseX
		y1 = p5.mouseY
	}
	p5.mouseReleased = async () => {
		x2 = p5.mouseX
		y2 = p5.mouseY
		let content = `Distance: ${Math.floor(p5.dist(x1, y1, x2, y2))}px.... Coordinates: x: ${Math.floor(
			p5.mouseX
		)} y: ${Math.floor(p5.mouseY)}`
		// alert(content)
	}
}

export const debuggerTool = (type: any, game: GameEngine, p5?: any) => {
	if (game && game.player) {
		logger(0, `${game?.player?.x}`, "Player x")
		logger(1, `${game?.player?.y}`, "Player y")
		logger(2, `${game?.player?.rot}`, "Rotation degrees")
		logger(3, `${pixelsToMapSize(game?.player?.x, game.rooms[game.currentRoom].size)}`, "Player x converted")
		logger(4, `${pixelsToMapSize(game?.player?.y, game.rooms[game.currentRoom].size)}`, "Player y converted")
		logger(5, `${game.currentRoom}`, "current room")

		logger(
			6,
			`mouseX: ${p5.mouseX} / ${pixelsToMapSize(p5.mouseX, game.rooms[game.currentRoom].size)} mouseY: ${
				p5.mouseY
			} / ${pixelsToMapSize(p5.mouseY, game.rooms[game.currentRoom].size)} Player Direction ${game?.player?.rot}`
		)
	} else {
		logger(0, `Debugger Tool: args are undefined (game or game.player)`)
	}
}
