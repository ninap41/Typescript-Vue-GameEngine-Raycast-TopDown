// import * as p5 from "p5"
import {
	tileRotationAndLocation,
	rotationConditions,
	toRadians,
	logger,
	pixelsToMapSize,
} from "./utility"
import { map1 } from "./maps"
import * as animations from "./animations"
import { player, playPlayerAnimations, loadAnimations, drawMap } from "./maps"
//https://editor.p5js.org/ericalimsongyi/sketches/lzo9sfBjW

function loadImages(map: any, p5: any) {
	Object.keys(map.imgs).forEach((key: any) => {
		map.loadedImages[key] = p5.loadImage(map.imgs[key])
	})
}
// https://editor.p5js.org/codingtrain/sketches/vhnFx1mml

/* key */
var loadedPlayer: any
const template = function (p5: any) {
	// NOTE: Set up is here
	p5.preload = (_: any) => {
		loadedPlayer = player
		loadedPlayer.animations = loadAnimations(p5, loadedPlayer)

		loadImages(map1, p5)
	}
	p5.setup = (_: any) => {
		p5.createCanvas(
			map1.tiles[0].length * map1.size,
			map1.tiles.length * map1.size
		)
		p5.background(51)
		p5.angleMode(p5.DEGREES)
	}
	// NOTE: Draw is here
	p5.draw = (_: any) => {
		p5.clear()

		drawMap(map1, "topDown", p5)
		playPlayerAnimations(p5, loadedPlayer)
	}
}

export { template }
