import {
	tileRotationAndLocation,
	fadeIn,
	debuggerTool,
	distanceTool,
	pixelsToMapSize,
	mapToPixelSize,
	generateHitBoxes,
	percentageConverter,
} from "@/GameEngine/utils"

import { TheBeginning, beginning_rooms } from "@/Scenes/Scene1/the-beginning"
import { Player } from "@/GameEngine/Classes/Player.class"
import type { ROOM_NAMES } from "./Classes/Map.class"

var sprite: any

const config = {
	devMode: true,
	immediateStart: true,
}

export class Renderer {
	static loadTileImages(obj: any, imgsKey: string, loadedImgsKey: string, p5: any) {
		Object.keys(obj[imgsKey]).forEach((key: any) => {
			obj[loadedImgsKey][key] = {}
			obj[loadedImgsKey][key] = p5.loadImage(obj[imgsKey][key]) /* Room.loadedImages map{} of p5 LOADIMAGE instance */
		})
	}

	static loadStaticImages(obj: any, imgsKey: string, loadedImgsKey: string, p5: any) {
		Object.keys(obj[imgsKey]).forEach((key: any) => {
			if (obj[imgsKey]) {
				obj[loadedImgsKey][key] = {}
				obj[loadedImgsKey][key] = p5.loadImage(obj[imgsKey][key].img)
			}
		})
	}

	static doorChangeConditionMaker(mapX: number, mapY: number, rot: number, button: string, game: GameEngine, p5: any) {
		if (!game.player) {
			throw new Error("Player undefined in Render Condition Maker")
		}
		if (
			pixelsToMapSize(game.player!.x, game.map.size) === mapX &&
			pixelsToMapSize(game.player!.y, game.map.size) === mapY &&
			game.player!.rot === rot &&
			p5.kb.presses(button)
		) {
			return true
		}
	}

	static loadAnimations(obj: any, animationsKey: string, loadedAnimationsKey: string, p5?: any, game?: GameEngine) {
		Object.keys(obj[animationsKey]).forEach((key: any) => {
			/* Room.ANIMATIONS Loop (DOOR) */
			obj[loadedAnimationsKey][obj[animationsKey][key].name] = p5.loadAni(obj[animationsKey][key].img, {
				/* Room.loadedAnimations map{} of p5 LOADIMAGE instance */
				frameSize: [obj[animationsKey][key].frameSize[0], obj[animationsKey][key].frameSize[1]],
				frames: obj[animationsKey][key].frames,
				frameDelay: obj[animationsKey][key].frameDelay,
				scale: obj[animationsKey][key].scale,
			})
			const ani = obj[loadedAnimationsKey][obj[animationsKey][key].name] /* Get Animation Instance  */
			obj[loadedAnimationsKey][obj[animationsKey][key].name].looping = ani.looping /* check if looping */
			obj[loadedAnimationsKey][obj[animationsKey][key].name].onComplete = async () => {
				/* assign onComplete call back for non looped animations */
				p5.clear()
				await obj[animationsKey][key]?.onComplete(game, p5) // call back to remove animations
			}
		})
	}
	constructor(public game: GameEngine) {
		this.game = game
	}

	public drawTextSprite(spriteRef: any, p5: any) {
		sprite = new p5.Sprite()
		sprite.color = "black"
		sprite.y = 50
		sprite.x = 200
		sprite.w = 200
		sprite.h = 50
		sprite.textSize = 12
		sprite.textColor = "white"
		sprite.text = "Welcome To The Game"
	}

	public getGameCycle() {
		return (p5?: any) => {
			p5.preload = () => this.game.preload(p5)
			p5.setup = () => this.game.setup(p5)
			p5.draw = () => {
				p5.clear()
				this.game.draw(p5)
				if (this.game.config.devMode)
					debuggerTool("player", this.game, p5) /* player coordinates, map name, and mouse coordinates(px) */
			}
			if (this.game.config.devMode) distanceTool(p5) /* for mouse clicking between two points */
		}
	}
}

export class GameEngine {
	config = config
	startingRoomKey: any
	sketch: any
	dialogueBox: any
	player: Player | undefined
	phase: any = (game: GameEngine, p5: any) => TheBeginning(game, p5)
	gameStart: any
	fade = 0
	p5: any
	fadeAmount = 1
	loadedPlayer: any
	cutscene: any = {
		state: false,
		ref: null,
	}
	rooms: any // instead of PHASE for now
	map: any
	currentRoom: ROOM_NAMES
	constructor(startingRoomKey: any, mapChange?: any) {
		this.rooms = beginning_rooms
		this.currentRoom = startingRoomKey
		this.gameStart = true
		this.map = this.rooms[this.currentRoom]
		this.startGame() /* load game */
	}

	private getMap() {
		this.currentRoom === undefined ? alert("currentRoom Not Defined.") : ""
		return this.rooms[this.currentRoom as any] as any
	}

	private startGame() {
		if (this.gameStart === true) {
			window.document.getElementById("defaultCanvas0")?.remove() // @ts-ignore
			this.sketch = new p5(new Renderer(this, p5).getGameCycle())
		}
	}

	public preload(p5: any) {
		this.player = new Player(this, p5)
		this.player.loadPlayerAnimations(p5, this.player)
		this.map.loadRooms(this, p5)
	}
	public setup(p5: any) {
		this.map = this.getMap()
		p5.createCanvas(this.map.tiles[0].length * this.map.size, this.map.tiles.length * this.map.size)
		p5.angleMode(p5.DEGREES)
		/*this.drawTextSprite(p5)*/
	}

	async draw(p5: any) {
		p5.clear()
		p5.background(51)
		if (this.cutscene.state) {
			fadeIn(p5, () => {
				// instance of a sprite animation, not creating and moving things on p5
				this.playAnimation(this.cutscene.ref, this.map.loadedAnimations, p5)
			})
		} else {
			/* Game Running */
			p5.clear()
			if (this.map === undefined) {
				this.map = this.rooms[`${this.currentRoom}`]
			} else {
				this.map.drawMap(this, this.map, "topDown", p5)
				this.map.drawAssets(this.map, "topDown", p5)
				this.player?.playPlayerAnimations(p5, this.player, this.map)

				if (this.config.devMode) {
					const directionFacing = this.player?.rot
					// make Renderer.drawHitBoxes("player", directionFacing, mapX, mapY)
					// make Renderer.drawHitBoxes("door", directionFacing, mapX, mapY)
				}
				this.phase(this, p5)
			}
		}
	}

	public playAnimation(animationKey: string, source: any, p5: any) {
		const map = this.getMap()

		//example: ("brownDoor", map.loadedAnimations, p5)
		return p5.animation(
			source[animationKey], //SpriteAnim
			(map.tiles[0].length * map.size) / 2, //position of the animation on the canvas

			(map.tiles.length * map.size) / 2, //position of the animation on the canvas
			0,
			source[animationKey].scale, // scale
			source[animationKey].scale // scale
		)
	}

	async rerenderCanvas(roomChange: any, newPlayerCoordinates: any, p5: any) {
		this.currentRoom = roomChange
		this.cutscene = false
		this.map = this.getMap()
		this.player!.x = newPlayerCoordinates[0]
		this.player!.y = newPlayerCoordinates[1]
		this.player!.rot = newPlayerCoordinates[2]
		this.cutscene = false
		p5.resizeCanvas(this.map.tiles[0].length * this.map.size, this.map.tiles.length * this.map.size)
	}
}
