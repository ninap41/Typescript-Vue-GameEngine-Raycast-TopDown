<template>
	<ul v-for="stuff in stuffToDo">
		<li>
			<h1>{{ stuff }}</h1>
		</li>
	</ul>
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
} from "../scripts/utils"
// @ts-ignore
import { GameEngine } from "@/GameEngine/GameEngine"

// storeGame https://p5js.org/reference/#/p5/storeItem

var game: GameEngine

const stuffToDo = ["fix map sizing"]

onMounted(async () => {
	game = await new GameEngine("Bedroom")
	game.startGame()
})
</script>

<style scoped>
@media (min-width: 1024px) {
	.about {
		min-height: 100vh;
		display: flex;
		align-items: center;
	}
}
* {
	color: white;
}

#defaultCanvas0 {
	margin: 0 auto;
}
</style>
