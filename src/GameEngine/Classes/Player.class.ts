import type { GameEngine } from "@/GameEngine/GameEngine"
import { getScale, pixelsToMapSize } from "../utils"

const mainPlayer = {
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
}
export class Player {
	animations: Array<any>
	currentAnimation: string = "idle"
	x: number = 5
	y: number = 200
	dir = 1 // -1 is north, 1 is going to be south
	rot = 0 // -1 is going to be west facing, 1 is going to be east
	speed = 2.5
	acceleration = 0.1 // moving? (speed = 1) or backwards (speed = 0).
	moveSpeed = 0.1 // how far (in map units) does the player move each step/update
	rotSpeed = 5 // how much does the player rotate each step/update (in radians)

	constructor(game: GameEngine, p5: any) {
		this.animations = mainPlayer.animations
	}

	public passable(xAhead: number, yAhead: number, map?: any) {
		const size = map!.size
		const mapAhead = map.tiles[`${pixelsToMapSize(xAhead, size)}`][`${pixelsToMapSize(yAhead, size)}`]
		console.log(mapAhead)
		if (mapAhead === 0) {
			return true
		} else {
			return false
		}
	}

	public loadPlayerAnimations = (p5: any, player: any, scale?: number) => {
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
		this.animations = animations
	}

	public playPlayerAnimations(p5: any, char: any, map: any) {
		// contained to one spritesheet
		const characterAnimation = {
			walk: () =>
				p5.animation(
					char.animations[1], //SpriteAnim
					char.x + 1 * (map.size + map.size / 2), //position of the animation on the canvas
					char.y + 1 * (map.size + map.size / 2), //position of the animation on the canvas
					char.rot, //rotation
					getScale(0.1, map.size), // scale
					getScale(0.1, map.size) // scale
				),
			idle: () =>
				p5.animation(
					char.animations[0], //SpriteAnim
					char.x + 1 * (map.size + map.size / 2), //position of the animation on the canvas

					char.y + 1 * (map.size + map.size / 2), //position of the animation on the canvas
					char.rot, //rotation
					getScale(0.1, map.size), // scale
					getScale(0.1, map.size) // scale
				),
		}

		if (p5.kb.pressing("w") || p5.kb.pressing("s") || p5.kb.pressing("a") || p5.kb.pressing("d")) {
			//https://p5play.org/docs/
			char.currentAnimation = "walk"
			characterAnimation.walk()
		} else {
			characterAnimation.idle()
		}

		var originalSpeed = 2.5 // for 100
		char.speed = getScale(originalSpeed, map.size)

		if (p5.kb.holding("w") && p5.kb.holding("a") && this.passable(char.y - char.speed, char.x - char.speed, map)) {
			if (char.rot !== 135) char.rot -= 5
			char.y -= char.speed
			char.x -= char.speed
		} else if (p5.kb.holding("d") && p5.kb.holding("w") && this.passable(char.y - char.speed, char.x + char.speed, map)) {
			if (char.rot !== 225) char.rot += 5
			char.y -= char.speed
			char.x += char.speed
		} else if (p5.kb.holding("d") && p5.kb.holding("s") && this.passable(char.y + char.speed, char.x + char.speed, map)) {
			if (char.rot !== 315) char.rot = 315
			char.y += char.speed
			char.x += char.speed
		} else if (
			p5.kb.holding("a") &&
			p5.kb.holding("s") &&
			this.passable((char.y += char.speed), char.x - char.speed, map)
		) {
			if (char.rot !== 45) char.rot = 45
			char.y += char.speed
			char.x -= char.speed
		} else if (p5.kb.pressing("w") && this.passable(char.y - char.speed, char.x, map)) {
			char.rot = 180
			char.y -= char.speed
		} else if (p5.kb.pressing("a") && this.passable(char.y, char.x - char.speed, map)) {
			char.rot = 90
			char.x -= char.speed
		} else if (p5.kb.pressing("d") && this.passable(char.y, char.x + char.speed, map)) {
			char.rot = 270
			char.x += char.speed
		} else if (p5.kb.pressing("s") && this.passable(char.y + char.speed, char.x, map)) {
			char.rot = 0
			char.y += char.speed
		}
	}
}
