<template>
	<div class="game"></div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useCounterStore } from "@/stores/counter"
import { defineComponent, onMounted, ref, computed } from "vue"
import { template } from "./template"
// import {
// 	tileRotationAndLocation,
// 	rotationConditions,
// 	toRadians,
// 	logger,
// 	pixelsToMapSize,
// 	getLighting,
// 	fadeIn,
// } from "./utility"
// import * as animations from "./animations"
import { map1, map2 } from "./maps"
var game
class Game {
	startingRoomKey: any
	sketch: any
	player: any
	gameStart: any
	fade = 0
	fadeAmount = 1
	loadedPlayer: any
	currentRoom: "Bedroom" | "Bathroom" | "DoorAnimation" | "Hallway" = "Bedroom"
	currentMap: any
	constructor(startingRoomKey: any) {
		this.startingRoomKey = startingRoomKey
		this.gameStart = true
		this.startGame()
	}

	startGame() {
		if (this.gameStart === true) {
			console.log("game started")
			window.document.getElementById("defaultCanvas0")?.remove() // @ts-ignore
			this.sketch = new p5(template(this), window.document.getElementById("game"))
		} else {
			console.log("game not started")
		}
	}

	// rerenderCanvas() {
	// 	window.document.getElementById("defaultCanvas0")?.remove()
	// 	this.sketch = new p5(template(this), window.document.getElementById("game"))
	// }
}
onMounted(() => {
	game = new Game("Bedroom")
	game.startGame()
})
</script>

<style>
@media (min-width: 1024px) {
	.about {
		min-height: 100vh;
		display: flex;
		align-items: center;
	}
}

#defaultCanvas0 {
	margin: 0 auto;
}
</style>
