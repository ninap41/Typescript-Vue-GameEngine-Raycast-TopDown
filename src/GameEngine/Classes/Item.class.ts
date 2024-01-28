import type { Objects } from "../2dTilesObjects/Tiles.enum"
import type { GameEngine } from "../GameEngine"

class Item {
	img?: keyof Objects
	size?: number
	spriteLocation?: Array<number> // In sprite sheet
	XY?: Array<number>
	animated?: boolean
	showConditions?: Array<any>
	interactions?: () => {}
	game?: GameEngine
	p5?: any

	constructor(
		img: keyof Objects,
		size: number,
		spriteLocation: Array<number>,
		XY: Array<number>,
		animated: boolean,
		showConditions: Array<any>,
		interactions: () => {},
		game: GameEngine,
		p5: any
	) {
		this.img = img
		this.size = size
		this.spriteLocation = spriteLocation
		this.XY = XY
		this.animated = animated
		this.showConditions = showConditions
		this.interactions = interactions
		this.game = game
		this.p5 = p5
	}

	showInWorld(): Boolean {
		return true
	}
}
