import {
	tileRotationAndLocation,
	fadeIn,
	debuggerTool,
	pixelsToMapSize,
	mapToPixelSize,
	percentageConverter,
} from "@/scripts/utils"
import { gameCycle } from "@/GameEngine/Scene"
import { TheBeginning, beginning_rooms } from "@/Scenes/Scene1/the-beginning"
var sprite: any

export class GameEngine {
	startingRoomKey: any
	sketch: any
	player: any = {
		phase: (game: GameEngine, p5: any) => TheBeginning(game, p5),
		animations: [
			{
				name: "idle",
				frames: 59,
				img: "src/assets/character_900_idle.png",
				frameDelay: 1,
			},
			{
				name: "walk",
				frames: 37,
				img: "src/assets/character_900_walk.png",
				frameDelay: -1.4,
			},
		],
		currentAnimation: "idle",
		x: 5,
		y: 200,
		dir: 1, // -1 is north, 1 is going to be south
		rot: 0, // -1 is going to be west facing, 1 is going to be east
		speed: 2.5,
		acceleration: 0.1, // moving? (speed = 1) or backwards (speed = 0).
		moveSpeed: 0.1, // how far (in map units) does the player move each step/update
		rotSpeed: 5, // how much does the player rotate each step/update (in radians)
	}
	gameStart: any
	fade = 0
	globalScale = 1
	fadeAmount = 1
	loadedPlayer: any
	cutscene: any = {
		state: false,
		ref: null,
	}
	rooms: any // instead of PHASE for now
	map: any
	currentRoom:
		| "Bedroom"
		| "Bathroom"
		| "DoorAnimation"
		| "Hallway"
		| "Kitchen"
		| "Living Room"
		| "Parents Room"
		| "Attic"
		| any

	constructor(startingRoomKey: any, mapChange?: any) {
		this.rooms = beginning_rooms

		this.currentRoom = startingRoomKey
		this.gameStart = true
		//this.player
		this.map = this.rooms[this.currentRoom]
		this.startGame()
	}

	private getMap() {
		// this.currentRoom === undefined ? alert("currentRoom Not Defined.") : ""
		// console.log(this.rooms[this.currentRoom as any])
		return this.rooms[this.currentRoom as any] as any
	}

	private startGame() {
		if (this.gameStart === true) {
			window.document.getElementById("defaultCanvas0")?.remove() // @ts-ignore
			this.sketch = new p5(gameCycle(this))
			// console.log(this.sketch)
		}
	}

	// public drawTextSprite(p5: any) {
	// 	sprite = new p5.Sprite()
	// 	sprite.color = "black"
	// 	sprite.y = 50
	// 	sprite.x = 200
	// 	sprite.w = 200
	// 	sprite.h = 50
	// 	sprite.textSize = 12
	// 	sprite.textColor = "white"
	// 	sprite.text = "Welcome To The Game"
	// }

	public preload(p5: any) {
		this.loadPlayerAnimations(p5, this.player)
		this.loadRooms(p5)
	}
	public setup(p5: any) {
		this.map = this.getMap()
		p5.createCanvas(this.map.tiles[0].length * this.map.size, this.map.tiles.length * this.map.size)
		p5.angleMode(p5.DEGREES)
		// this.drawTextSprite(p5)
	}

	private loadRooms(p5: any) {
		Object.keys(this.rooms).forEach((key: string) => {
			// iterate over all the rooms on the game map!

			// load room Tiles
			const map = this.rooms[key]
			Object.keys(map.imgs).forEach((key: any) => {
				// console.log(map.imgs[key], "IMAGE EXAMPLE")
				map.loadedImages[key] = p5.loadImage(map.imgs[key])
			})
			// Door Animations
			Object.keys(map.animations).forEach((animationKey: any) => {
				map.loadedAnimations[map.animations[animationKey].name] = p5.loadAni(map.animations[animationKey].img, {
					//ex brown door
					frameSize: [map.animations[animationKey].frameSize[0], map.animations[animationKey].frameSize[1]],
					frames: map.animations[animationKey].frames,
					frameDelay: map.animations[animationKey].frameDelay,
					scale: map.animations[animationKey].scale,
				})
				const ani = map.loadedAnimations[map.animations[animationKey].name]
				map.loadedAnimations[map.animations[animationKey].name].looping = ani.looping
				map.loadedAnimations[map.animations[animationKey].name].onComplete = async () => {
					p5.clear()
					await map.animations[animationKey].onComplete(this, p5)
				}
			})
			// loadAssets for room inside
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
	async draw(p5: any) {
		p5.clear()
		p5.background(51)
		// if (sprite.mouse.pressed()) {
		// 	sprite.remove()
		// }
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
				this.drawMap(this.map, "topDown", p5)
				this.drawAssets(this.map, "topDown", p5)
				this.playPlayerAnimations(p5, this.player)
				this.player.phase(this, p5)
			}
		}
	}

	public drawMap(map: any, type: "topDown" | "raycast" | "sideScroll", p5: any) {
		/* only have top down support atm*/
		// console.log(map)
		// console.log
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

	public drawAssets(map: any, type: "topDown" | "raycast" | "sideScroll", p5: any) {
		// iterate over static images

		Object.keys(map.loadedStaticImages).forEach((assetKey: any) => {
			p5.image(
				map.loadedStaticImages[assetKey],
				map.staticImages[assetKey].XY[0] * map.size,
				map.staticImages[assetKey].XY[1] * map.size,
				map.staticImages[assetKey].size[0],
				map.staticImages[assetKey].size[1]
			)
		})
	}

	public doorChangeConditionMaker(mapX: number, mapY: number, rot: number, button: string, p5: any) {
		if (
			pixelsToMapSize(this.player.x, this.map.size) === mapX &&
			pixelsToMapSize(this.player.y, this.map.size) === mapY &&
			this.player.rot === rot &&
			p5.kb.presses(button)
		) {
			return true
		}
	}

	private loadPlayerAnimations = (p5: any, player: any) => {
		var animations: any = []
		let ani

		player.animations.forEach((animationObject: any) => {
			ani = p5.loadAni(animationObject.img, {
				frameSize: [900, 900],
				frames: animationObject.frames,
				frameDelay: animationObject.frameDelay,
			})
			animations.push(ani)
		})
		this.player.animations = animations
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

	public playPlayerAnimations(p5: any, char: any) {
		const characterAnimation = {
			walk: () =>
				p5.animation(
					char.animations[1], //SpriteAnim
					char.x + 1 * (this.map.size + this.map.size / 2), //position of the animation on the canvas
					char.y + 1 * (this.map.size + this.map.size / 2), //position of the animation on the canvas
					char.rot, //rotation
					0.1, // scale
					0.1 // scale
				),
			idle: () =>
				p5.animation(
					char.animations[0], //SpriteAnim
					char.x + 1 * (this.map.size + this.map.size / 2), //position of the animation on the canvas

					char.y + 1 * (this.map.size + this.map.size / 2), //position of the animation on the canvas
					char.rot, //rotation
					0.1, // scale
					0.1 // scale
				),
		}
		if (
			p5.kb.pressing("ArrowUp") ||
			p5.kb.pressing("w") ||
			p5.kb.pressing("ArrowDown") ||
			p5.kb.pressing("s") ||
			p5.kb.pressing("ArrowLeft" || p5.kb.pressing("a")) ||
			p5.kb.pressing("ArrowRight") ||
			p5.kb.pressing("d")
		) {
			//https://p5play.org/docs/
			char.currentAnimation = "walk"
			characterAnimation.walk()
			// console.log(char.animations[0])
		} else {
			// idle
			characterAnimation.idle()
		}

		if (p5.kb.holding("ArrowUp") && p5.kb.holding("ArrowLeft")) {
			// console.log("yo")
			char.y -= char.speed
			char.x -= char.speed
			if (char.rot !== 135) {
				char.rot -= 5
			}
		} else if (p5.kb.holding("ArrowRight") && p5.kb.holding("ArrowUp")) {
			char.y -= char.speed
			char.x += char.speed
			if (char.rot !== 225) {
				char.rot += 5
			}
		} else if (p5.kb.pressing("ArrowRight") && p5.kb.pressing("ArrowDown")) {
			char.y += char.speed
			char.x += char.speed
			if (char.rot !== 315) {
				char.rot = 315
			}
		} else if (p5.kb.pressing("ArrowLeft") && p5.kb.pressing("ArrowDown")) {
			char.y += char.speed
			char.x -= char.speed
			if (char.rot !== 45) {
				char.rot = 45
			}
		} else if (p5.kb.pressing("ArrowUp")) {
			char.y -= char.speed
			char.rot = 180
		} else if (p5.kb.pressing("ArrowLeft")) {
			char.x -= char.speed
			char.rot = 90
		} else if (p5.kb.pressing("ArrowRight")) {
			char.x += char.speed
			char.rot = 270
		} else if (p5.kb.pressing("ArrowDown")) {
			char.y += char.speed
			char.rot = 0
		}
	}

	async rerenderCanvas(roomChange: any, newPlayerCoordinates: any, p5: any) {
		this.currentRoom = roomChange
		this.cutscene = false
		this.map = this.getMap()

		// alert(newPlayerCoordinates[0])
		// alert(newPlayerCoordinates[1])
		this.player.x = newPlayerCoordinates[0]
		// mapToPixelSize(newPlayerCoordinates[0], this.map.size)

		this.player.y = newPlayerCoordinates[1]
		// mapToPixelSize(newPlayerCoordinates[1], this.map.size)

		this.player.rot = newPlayerCoordinates[2]

		this.cutscene = false

		p5.resizeCanvas(this.map.tiles[0].length * this.map.size, this.map.tiles.length * this.map.size)
	}
}
