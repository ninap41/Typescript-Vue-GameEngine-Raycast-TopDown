<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import Planck from "planck-js" /** Import the planck-js library (required by p5.play) */
import Navigation from "@/components/Navigation.vue"
import { ref } from "vue"

window.planck = Planck
const menuOpen = ref()
</script>

<template>
	<Navigation />
	<main>
		<RouterView />
	</main>
	<div id="output">
		<div class="child"></div>
		<div class="child"></div>
		<div class="child"></div>
		<div class="child"></div>
		<div class="child"></div>
		<div class="child"></div>
		<div class="child"></div>
		<div class="child"></div>
		<div class="child"></div>
		<div class="child"></div>
		<div class="child"></div>
		<div class="child"></div>
	</div>
</template>

<style>
html,
body {
	background-color: black;
}
</style>
