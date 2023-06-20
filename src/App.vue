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
		<div
			class="tw-container relative flex flex-col min-h-screen px-6 py-8 mx-auto"
		>
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

			<!-- <section class="flex items-center flex-1">
				<div class="flex flex-col w-full">
					<p class="text-5xl font-extrabold text-center lg:text-7xl 2xl:text-8xl">
						<span
							class="text-transparent bg-gradient-to-br bg-clip-text from-purple-500 via-green-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500"
						>
							The
						</span>

						<span
							class="text-transparent bg-gradient-to-tr bg-clip-text from-purple-500 via-green-500 to-red-500 dark:from-sky-300 dark:via-pink-300 dark:to-red-500"
						>
							Haunting
						</span>
					</p>

					<p
						class="max-w-3xl mx-auto mt-6 text-lg text-center text-gray-700 dark:text-white md:text-xl"
					></p>
					<div id="log" class="text-white"></div>

					<p
						class="mt-8 text-center text-gray-700 dark:text-white text-md md:text-xl"
					></p>
				</div>
			</section> -->
			<main>
				<RouterView />
			</main>

			<!-- <footer
				class="flex flex-col items-center mt-12 sm:flex-row sm:justify-between"
			>
				<a
					href="#"
					class="text-gray-700 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
				>
					Privacy Policy
				</a>

				<div class="mt-4 -mx-4 md:mt-0">
					<a
						href="#"
						class="px-4 text-gray-700 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
					>
						Facebook</a
					>

					<a
						href="#"
						class="px-4 text-gray-700 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
						>Instagram</a
					>

					<a
						href="#"
						class="px-4 text-gray-700 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
					>
						LinkedIn</a
					>
				</div>
			</footer> -->
		</div>
	</section>
</template>

<style>
/* nav .nav-link:hover,
nav .nav-link.router-link-active,
nav .nav-link.router-link-exact-active {
	background-color: black;
	cursor: pointer;
} */
</style>
