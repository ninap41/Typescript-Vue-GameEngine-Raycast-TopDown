import * as p5 from "p5"

// https://editor.p5js.org/ri1/sketches/hPXzjEhouJ
// this ladies code was terrible.... but she got the concept across
class AnimationObject {
	posX: number = 0
	posY: number = 0
	height: number = window.innerHeight
	width: number = window.innerWidth
	img: string = "src/assets/house.png"
	animationSpeed: number = 20
	loadedImage = null

	constructor({ ...args }: any) {
		Object.keys(this).forEach((key: any): any => {
			this[key as keyof AnimationObject] = args[key as keyof AnimationObject] as never
		})
	}

	public startOffScreenEnterScreen(val?: number) {
		if (this.posY > (val ? val : 0)) this.posY -= this.animationSpeed
	}

	public offScreenLeftToEnterOffScreenRight(val?: number) {
		if (this.posX < (val ? val : 1000)) {
			this.posX += this.animationSpeed
		}
	}
}
var message = "Start_Game"
var messageX: any = window.innerWidth / 1.5
var messageY: any = window.innerHeight / 1.5
let animatedHouse: any
let house: AnimationObject
let crow1: AnimationObject
let animatedCrow1: any
let crow3: AnimationObject
let animatedCrow3: any
let title: AnimationObject
let animatedTitle: any
let rain: AnimationObject
let animatedRain: any
var startButton: any = null
let font: any
const intro = function (p5: any) {
	p5.preload = () => {
		p5.frameRate(30)
		house = new AnimationObject({
			posX: 0,
			posY: 1000,
			height: window.innerHeight,
			width: window.innerWidth,
			img: "src/assets/intro/house2.png",
			animationSpeed: 20,
		})
		animatedHouse = p5.loadImage(house.img)

		rain = new AnimationObject({
			posX: 0,
			posY: 0,
			height: window.innerHeight,
			width: window.innerWidth,
			img: "src/assets/intro/rain.gif",
			animationSpeed: 20,
		})
		animatedRain = p5.loadImage(rain.img)
		crow1 = new AnimationObject({
			posX: -1500,
			posY: -10,
			height: window.innerHeight / 3,
			width: window.innerWidth / 3,
			img: "src/assets/intro/crow.png",
			animationSpeed: 50,
		})
		animatedCrow1 = p5.loadImage(crow1.img)

		crow3 = new AnimationObject({
			posX: 40,
			posY: 1500,
			height: window.innerHeight / 3,
			width: 200,
			img: "src/assets/intro/crow3.gif",
			animationSpeed: 20,
		})
		animatedCrow3 = p5.loadImage(crow3.img)

		title = new AnimationObject({
			posX: window.innerHeight / 9,
			posY: 1500,
			height: window.innerHeight / 2.5,
			width: window.innerWidth / 2.5,
			img: "src/assets/intro/title.png",
			animationSpeed: 15,
		})
		animatedTitle = p5.loadImage(title.img)
		font = p5.loadFont("src/assets/Roboto/Roboto-Bold.ttf")
	}

	function isMouseInsideText() {
		// only set for 32 size font, have utility for
		const messageWidth = p5.textWidth(message)
		const messageTop = messageY - p5.textAscent()
		const messageBottom = messageY + p5.textDescent()

		return (
			p5.mouseX > messageX && p5.mouseX < messageX + messageWidth && p5.mouseY > messageTop && p5.mouseY < messageBottom
		)
	}

	p5.setup = (_: any) => {
		const ctx = p5.createCanvas(window.innerWidth, window.innerHeight)
		p5.textFont(font)
		p5.textSize(32)
	}
	// NOTE: Draw scene
	p5.draw = (_: any) => {
		p5.background(0)

		p5.image(animatedHouse, house.posX, house.posY, house.width, house.height)
		p5.image(animatedCrow1, crow1.posX, crow1.posY, crow1.width, crow1.height)
		p5.image(animatedCrow3, crow3.posX, crow3.posY, crow3.width, crow3.height)
		p5.image(animatedTitle, title.posX, title.posY, title.width, title.height)
		p5.image(animatedRain, rain.posX, rain.posY, rain.width, rain.height)

		house.startOffScreenEnterScreen()
		crow3.startOffScreenEnterScreen(window.innerHeight / 1.5)

		if (house.posY === 0) {
			crow1.offScreenLeftToEnterOffScreenRight(1800)
			title.startOffScreenEnterScreen(window.innerHeight / 5)
			if (title.posY > window.innerHeight / 2.5) {
				p5.fill(390)
			} else {
				p5.text(message, messageX, messageY)
			}
			if (isMouseInsideText()) {
				p5.cursor(p5.HAND)
				p5.fill(255)
				p5.stroke(0)
			} else {
				p5.cursor(p5.ARROW)
				p5.fill(165, 107, 17)
				p5.stroke(165, 107, 17)
			}
		}
		if (p5.frameCount % 50 === 0) console.log("use logger here") // logger(0, thistolog)
	}

	p5.mouseClicked = (_: any) => {
		if (isMouseInsideText()) {
		}
	}
}

export { intro }
