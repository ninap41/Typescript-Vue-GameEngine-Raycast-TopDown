function generateSpriteIncrements(x: number, frames: number, image: string) {
	let increments = []
	let increment = x

	while (increment <= frames) {
		increments.push(increment)
		increment += x
	}

	return increments
}
const increments_300: any = (frameLength: number) =>
	generateSpriteIncrements(frameLength * 300, frameLength, "")

/* player */

class TopDownSprite {
	x: any
	y: any
	animation: any
	playerAnimations: any
	w: any
	h: any
	len: any
	speed: any
	index: any
	p5: any
	constructor(player: any, p5: any) {
		this.x = player.x
		this.y = player.y
		this.animation = player.animation
		this.index = player.index
		this.w = player.animation[0].width
		this.h = player.animation[0].height
		this.len = player.animation.length
		this.speed = player.speed
		this.p5 = p5
	}

	show() {
		let index = Math.floor(this.index) % this.len
		this.p5.image(this.animation[this.index], this.x, this.y)
	}

	animate() {
		this.index += this.speed
		this.x += this.speed * 15

		if (this.x > this.p5.width) {
			this.x = -this.w
		}
	}
	makeAnimation(
		type: "walking" | "idle" | "running",
		path: string,
		speed: number,
		frames: number
	) {
		var start
		if (type === "walking") {
			start = 0
		} else if (type === "idle") {
			start = 1
		} else {
			start = 2
		}
		const createFrames = () => {
			var arr = []
			for (var i = frames; i <= frames; i++) {
				arr.push({
					position: {
						x: increments_300[i](frames),
						y: 0,
						w: 300,
						h: 300,
					},
				})
			}
		}
		return {
			spriteSheet: path,
			walking: {
				startingRow: start,
				speed: speed,
				frames: createFrames(),
			},
		}
	}
}

export const allPlayerAnimations: any = {
	spriteSheet: "src/assets/walking_only_sprite.png",
	walking: {
		startingRow: 0,
		speed: 15,
		frames: [
			{
				position: {
					x: increments_300[0],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[1],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[2],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[3],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[4],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[5],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[6],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[7],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[8],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[9],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[10],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[11],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[12],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[13],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[14],
					y: 0,
					w: 300,
					h: 300,
				},
			},
			{
				position: {
					x: increments_300[15],
					y: 0,
					w: 300,
					h: 300,
				},
			},
		],
	},
}

export let animation = []

export let playerAnimations = []
