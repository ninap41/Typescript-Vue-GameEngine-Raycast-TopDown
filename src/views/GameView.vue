<template>
	<div class="game"></div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useCounterStore } from "@/stores/counter"
import { defineComponent, onMounted, ref, computed } from "vue"
import { template } from "./template"

async function makeCanvas(choice?: string, changeScene?: any) {
	window.document.getElementById("defaultCanvas0")?.remove()
	// @ts-ignore
	new p5(template, window.document.getElementById("game"))
}

onMounted(() => {
	makeCanvas()
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
