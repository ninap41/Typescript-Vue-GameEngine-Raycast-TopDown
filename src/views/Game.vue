<template>
	<div class="container notes">
		<div>Dev Notes:</div>
		<div v-for="stuff in stuffToDo">
			{{ stuff }}
		</div>
	</div>
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
const stuffToDo = [
	"* have relative map sizing based on the size of the window !!",
	"* Be able to view canvas in window and signal on mabile to rotate device !! ",
	"* Have a set aspect ratio",

	"* hit box debugger, with a drawn line in red when d is pressed",
]

onMounted(async () => {
	game = await new GameEngine("Bedroom")
})
</script>

<style scoped>
@media (min-width: 1024px) {
	/* media query example - 
	show hide the touch controls */
}
* {
	color: white;
}
</style>
../GameEngine/utils
