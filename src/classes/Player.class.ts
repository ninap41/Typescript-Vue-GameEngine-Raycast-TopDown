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
}
