<template>
	<div v-if="game">
		<h2>{{ game.currentRoom }}</h2>
		<div class="game"></div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useCounterStore } from "@/stores/counter"
import { defineComponent, onMounted, ref, computed } from "vue"
import {
	tileRotationAndLocation,
	rotationConditions,
	toRadians,
	logger,
	pixelsToMapSize,
	arrayOf9ths,
	fadeIn,
	debuggerTool,
} from "./utility"
import { template } from "./Scene"
import * as animations from "./animations"

import { map1, map2 } from "./maps"
import { Game } from "./Game"

// storeGame https://p5js.org/reference/#/p5/storeItem

var game: Game

onMounted(async () => {
	game = await new Game("Bedroom")
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
