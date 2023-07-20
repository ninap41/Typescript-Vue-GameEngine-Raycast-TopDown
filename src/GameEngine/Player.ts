/* Add to game instance*/
export class Player {
	animations: Array<any> = [
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
	]

	currentAnimation: string = "idle"
	x: number = 1
	y: number = 1
	dir: number = 1 // -1 is north, 1 is going to be south
	rot: number = 0 // -1 is going to be west facing, 1 is going to be east
	speed: number = 2.5
	acceleration: number = 0.1 // moving? (speed = 1) or backwards (speed = 0).
	moveSpeed: number = 0.1 // how far (in map units) does the player move each step/update
	rotSpeed: number = (3 * Math.PI) / 180 // how much does the player rotate each step/update (in radians)
	mapSize: number = 100
	characterAnimation: any
	constructor(p5: any, mapSize: number) {
		this.characterAnimation = {
			walk: () =>
				p5.animation(
					this.animations[1], //SpriteAnim
					this.x + 1 * (this.mapSize + this.mapSize / 2), //position of the animation on the canvas

					this.y + 1 * (this.mapSize + this.mapSize / 2), //position of the animation on the canvas
					this.rot, //rotation
					0.1, // scale
					0.1 // scale
				),
			idle: () =>
				p5.animation(
					this.animations[0], //SpriteAnim
					this.x + 1 * (this.mapSize + this.mapSize / 2), //position of the animation on the canvas

					this.y + 1 * (this.mapSize + this.mapSize / 2), //position of the animation on the canvas
					this.rot, //rotation
					0.1, // scale
					0.1 // scale
				),
		}
	}

	public playPlayerAnimations(p5: any, char: any) {
		// p5.noLoop()
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
			this.currentAnimation = "walk"
			this.characterAnimation.walk()
			// console.log(this.animations[0])
		} else {
			// idle
			this.characterAnimation.idle()
		}

		if (p5.kb.pressing("ArrowUp") || p5.kb.pressing("w")) {
			this.y -= this.speed
			this.rot = 180
		}
		if (p5.kb.pressing("ArrowDown") || p5.kb.pressing("s")) {
			this.y += this.speed
			this.rot = 0
		}
		if (p5.kb.pressing("ArrowLeft" || p5.kb.pressing("a"))) {
			this.x -= this.speed
			this.rot = 90
		}
		if (p5.kb.pressing("ArrowRight") || p5.kb.pressing("d")) {
			this.x += this.speed
			this.rot = 270
		}
	}
}
