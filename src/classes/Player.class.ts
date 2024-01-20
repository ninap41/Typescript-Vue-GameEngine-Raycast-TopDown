/* Add to game instance*/

import type { GameEngine } from "@/GameEngine/GameEngine"
import { TheBeginning } from "@/Scenes/Scene1/the-beginning"

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
	mapSize: number = 100

	constructor(game: GameEngine, p5: any) {
		this.animations = mainPlayer.animations
	}
	public loadPlayerAnimations = (p5: any, player: any) => {
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
					0.1, // scale
					0.1 // scale
				),
			idle: () =>
				p5.animation(
					char.animations[0], //SpriteAnim
					char.x + 1 * (map.size + map.size / 2), //position of the animation on the canvas

					char.y + 1 * (map.size + map.size / 2), //position of the animation on the canvas
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
		} else {
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
}
