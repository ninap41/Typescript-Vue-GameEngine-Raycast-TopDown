<template>
	<div id="canvas"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { clearCanvas } from "@/scripts/utils"
var map_ = [
	[1, 1, 1, 1],
	[1, 0, 0, 1],
	[1, 0, 0, 1],
	[1, 0, 0, 1],
	[1, 1, 1, 1],
]

var canvasSize = () => {
	var mapY = map_.length
	var mapX = map_[0].length
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

const startGameLoop = (game: any) => {
	console.log(game, "game Instance in Sketch!")
	var canvas
	return function (p5?: any) {
		p5.preload = (_: any) => {
			console.log("preload")
		}

		p5.setup = (_: any) => {
			canvas = p5.createCanvas(adj.w, adj.h)
			canvas.parent("canvas")
		}

		p5.windowResized = (_: any) => {
			p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
		}

		p5.draw = async (_: any) => {
			p5.background("green")
			for (var y = 0; y < map_.length; y++) {
				for (var x = 0; x < map_[y].length; x++) {
					if (map_[y][x] == 1) {
						p5.fill(220, 20, 60)
						p5.rect(x * adj.size, y * adj.size, adj.size, adj.size)
					} else {
						p5.fill(240, 230, 140)
						p5.rect(x * adj.size, y * adj.size, adj.size, adj.size)
					}
				}
			}
		}
	}
}
const sketch = ref()
onMounted(() => {
	clearCanvas()
	window.document.getElementById("defaultCanvas0")?.remove() // @ts-ignore
	sketch.value = new p5(startGameLoop())
})
</script>

<style></style>
