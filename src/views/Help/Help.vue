<template>
	<div class="container flex flex-col text-white">
		<div class="ts-card">
			<h3>Controls</h3>
			<p>Movement: WASD or Arrow Keys</p>
			<p>Action: Spacebar</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useCounterStore } from "@/stores/counter"
import { defineComponent, onMounted, ref, computed } from "vue"
import { gameCycle } from "../Game/Scene"
import { clearCanvas } from "../utility"

onMounted(() => {
	clearCanvas()
})
</script>

<style></style>
