<template>
	<div v-if="game">
		<div class="game"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { GameEngine } from "@/GameEngine/GameEngine"
// storeGame https://p5js.org/reference/#/p5/storeItem

var game: GameEngine
//❗ ✅

// const stuffToDo = [
// 	"* have relative map sizing based on the size of the window !",
// 	"* Be able to view canvas in window and signal on mabile to rotate device ! ",
// 	"* Have a set aspect ratio",
// 	"* hit box debugger, with a drawn line in red when d is pressed",
// ]

/* ~~~~~~~~  Pass A Game Save Here, Not Room ~~~~~~~~~~~~ */

onMounted(async () => {
	game = await new GameEngine("Bedroom")
})
</script>

<style scoped>
@media (min-width: 1024px) {
}
* {
	color: white;
}

.game {
	position: relative;
}
</style>
