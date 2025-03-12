<template>
	<div id="canvas">
		<div id="bagMenu" />
		<div id="menu" />
		<div id="charMenu" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { clearCanvas, tileRotationAndLocation } from "@/GameEngine/utils"
import p5 from "p5"

const loadedImages: any = {}
var canvas
const tileImgs: any = {
	0: `src/assets/tiles/floor_300_wood.png`,
	1: `src/assets/tiles/wall_300_clean.png`,
	2: `src/assets/tiles/wall_300_corner.png`, // 2 is the corner
	3: `src/assets/tiles/wall_300_clean.png`, // 3 is a door, but render door as wall so door can be an object
}
var map_: any = {
	tiles: [
		[2, 1, 1, 1, 2],
		[1, 0, 0, 0, 1],
		[1, 0, 0, 0, 1],
		[1, 0, 0, 0, 1],
		[2, 1, 1, 1, 2],
	],
	size: undefined,
}

var canvasSize = () => {
	var mapY = map_.tiles.length
	var mapX = map_.tiles[0].length
	map_.size = Math.floor(window.innerWidth / mapX)
	return {
		w: window.innerWidth,
		h: window.innerHeight,
		hor: Math.floor(window.innerWidth / mapX),
		vert: Math.floor(window.innerHeight / mapY),
		size: Math.floor(window.innerWidth / mapX),
	}
}

var adj = canvasSize()

addEventListener("resize", (event) => {
	adj = canvasSize()
})

function drawUI() {
	console.log("draw me")
}

const startGameLoop = () => {
	return function (p5?: any) {
		p5.preload = (_: any) => {
			Object.keys(tileImgs).forEach((key: any) => {
				loadedImages[key] = p5.loadImage(tileImgs[key])
			})
		}

		p5.setup = (_: any) => {
			canvas = p5.createCanvas(adj.w, adj.h)
			canvas.parent("canvas")
		}

		p5.windowResized = (_: any) => {
			p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
		}

		p5.draw = async (_: any) => {
			p5.clear()
			map_.tiles.forEach((row: any, y_: any) => {
				row.forEach((tile: any, x_: any) => {
					let XY = undefined
					p5.push()
					if (tile === 2) {
						XY = [x_ * adj.size, y_ * adj.size]
						p5.image(loadedImages[tile], XY[0], XY[1], adj.size, adj.size) /*add floor to space*/
						tileRotationAndLocation(map_, x_, y_, undefined, "corner", p5) /*corners */
					} else if (tile === 1) {
						XY = [x_ * adj.size, y_ * adj.size]
						p5.image(loadedImages[tile], XY[0], XY[1], adj.size, adj.size) /*add floor to space */
						tileRotationAndLocation(map_, x_, y_, undefined, "wall", p5) /* walls */
					} else {
						XY = [x_ * adj.size, y_ * adj.size]
						p5.image(loadedImages[tile], XY[0], XY[1], adj.size, adj.size)
					}
					p5.pop()
				})
			})
		}
	}
}
const sketch = ref()
onMounted(() => {
	clearCanvas()
	new p5(startGameLoop())
})
</script>

<style>
#menu {
	position: absolute;
	left: 0;
	right: 0;
	z-index: 1;
	height: 100px;
	width: 200px;
	background-color: pink;
}

#charMenu {
	position: absolute;
	right: 0;
	bottom: 0;
	z-index: 1;
	height: 100px;
	width: 300px;
	background-color: green;
}

#bagMenu {
	position: absolute;
	right: 0;
	bottom: 0;
	z-index: 1;
	height: 100px;
	width: 300px;
	background-color: green;
}
</style>
