<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
// import HelloWorld from '@/components/HelloWorld.vue'

/** Import the planck-js library (required by p5.play) */
import Planck from "planck-js"
import { ref } from "vue"

/** Create the planck global. This is required for p5.play to load correctly */
window.planck = Planck

const classStringLink =
	"block text-gray-600 transition-colors duration-300 dark:text-white md:px-6 hover:text-blue-500 dark:hover:text-blue-400"
</script>

<template>
	<div id="output" class="flex flex-col container">
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
	<section class="w-full tw-min-h-screen dark:bg-gray-900">
		<div class="tw-container relative flex flex-col min-h-screen px-6 py-8 mx-auto">
			<nav class="md:flex md:items-center md:justify-around">
				<div class="flex items-center justify-around">
					<div>
						<a
							class="text-2xl font-bold text-gray-800 transition-colors duration-300 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
							href="#"
							>Brand</a
						>
					</div>
				</div>

				<div
					class="absolute inset-x-0 z-20 w-full px-6 py-8 mt-8 space-y-6 transition-all duration-300 ease-in-out dark:bg-gray-900 top-16 md:bg-transparent md:dark:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:space-y-0 md:-mx-6 md:flex md:items-center"
				>
					<RouterLink :class="classStringLink" to="/game">Game</RouterLink>
					<RouterLink :class="classStringLink" to="/help">Help</RouterLink>
				</div>
			</nav>

			<main>
				<RouterView />
			</main>
		</div>
	</section>
</template>

<style></style>
