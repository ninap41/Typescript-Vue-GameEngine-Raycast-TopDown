<template>
	<div v-if="scene" class="container" id="scene-planner">
		<h1>Scene Planner</h1>
		<div class="grid grid-cols-2 gap-2">
			<button @click="clearSettings">clear</button>
			<button @click="saveGame">save</button>
			<button @click="load">load</button>
		</div>
		<h1>Scene Planner</h1>
		<div class="grid grid-cols-2 gap-2">
			<button @click="clearSettings">clear</button>
			<button @click="saveGame">save</button>
			<button @click="load">load</button>
		</div>

		<img :src="scene?.img || null" />
		<pre class="text-sm-start">{{ interactionMap }}</pre>
		<div class="grid grid-cols-4 gap-4">
			<div>
				<div>currentRoom</div>
				<div>enter events</div>
				<div>leave events</div>
				<div>available inspects</div>
				<div>item actions</div>
				<div>--- available events</div>
				<div>--- available events</div>
			</div>
			<div>
				<div>Inventory</div>
				<div>Add Item</div>
			</div>
			<div>
				<div>used Items</div>
				<div>use an item</div>
			</div>

			<div>
				<div>states</div>
				<div>add states</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { clearCanvas, tileRotationAndLocation } from "@/GameEngine/utils"
import p5 from "p5"
// import { scene as scene_ } from "@/scripts/scene-planner.json"
import { INSPECTS } from "@/Scenes/Scene1/Inspects1"
import { CUTSCENE } from "@/Scenes/Scene1/Cutscenes1"
import { ITEMS } from "@/Scenes/Scene1/Items1"

// var scene: any = scene_
const temp = {
	inventory: [],
	inspects: [],
	usedItems: [],
	currentRoom: "Bedroom",
}
let interactionMap = {}
const libMap = computed(() => {
	return {
		inspects: Object.keys(INSPECTS).map((i) => `inspect_${i}`),
		cutscenes: Object.keys(CUTSCENE).map((i) => `cutscene_${i}`),
		item: Object.keys(ITEMS).map((i) => `item_${i}`),
	}
})

onMounted(() => {
	clearCanvas()
	let store = JSON.parse(localStorage.getItem("SceneBuilder") as any)
	interactionMap = store ? store : temp
})

const load = () => {
	let store = JSON.parse(localStorage.getItem("SceneBuilder") as any)
	interactionMap = store ? store : temp
}

const clearSettings = () => {
	interactionMap = temp
	saveGame()
}

const saveGame = () => {
	//@ts-ignore
	localStorage.setItem("SceneBuilder", JSON.stringify(interactionMap))
	alert("saved")
}
</script>

<style>
.container {
	color: white;
}
</style>
@/GameEngine/utils
