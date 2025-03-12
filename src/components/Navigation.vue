<template>
	<div class="container-fluid pb-3" id="app">
		<nav class="navbar">
			<div class="col-xs-6"><h2 class="logo2">The Haunting</h2></div>
			<div class="col-xs-6">
				<div class="hamburger-wrap">
					<button class="hamburger" type="button" @click="menuOpen = !menuOpen">
						<span class="hamburger__line"></span>
						<span class="hamburger__middle"></span>
						<span class="icon-bar hamburger__line"></span>
					</button>
				</div>
			</div>
		</nav>
		<div class="row dropdown" :class="{ 'dropdown-after': menuOpen }">
			<ul v-for="route of routes" class="navlist">
				<RouterLink
					class="navlistitem block text-gray-600 transition-colors duration-300 dark:text-white md:px-6 hover:text-blue-500 dark:hover:text-blue-400"
					@click="menuOpen = !menuOpen"
					:to="route.path"
					>{{ route.name }}</RouterLink
				>
			</ul>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted } from "vue"
import { clearCanvas } from "../GameEngine/utils"
import { ref } from "vue"
import { useRouter } from "vue-router"
const menuOpen = ref()

const router = useRouter()
const routes = router.getRoutes()
onMounted(() => {
	clearCanvas()
})
</script>

<style>
.navbar {
	height: 50px;
	display: flex;
	flex-direction: row;
	border-radius: 0px;
	font-size: 3rem;
}

.logo2 {
	color: grey;
}
.dropdown {
	position: static;
}

.logo,
.hamburger-wrap {
	width: 50px;
	height: 100%;
	margin-left: 50px;
	margin-right: 50px;
	display: flex;
	align-items: center;
}

.hamburger-wrap {
	float: right;
	justify-content: flex-end;
}

.hamburger {
	width: 35px;
	height: 35px;
	background-color: black;
	border-radius: 4px;
}

.hamburger:focus {
	outline: none;
}

.hamburger__line,
.hamburger__middle {
	display: block;
	width: 30px;
	height: 2px;
	border-radius: 2px;
	background-color: #ffffff;
	margin-top: 3px;
	margin-bottom: 3px;
}

.hamburger__middle {
	width: 20px;
	margin-left: 10px;
}

.dropdown {
	position: absolute;
	width: 100%;

	height: 0px;
	background-color: black;
	transition: height 0.2s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.dropdown-after {
	height: calc(100vh - 70vh);

	transition: height 0.5s ease;
}

.navlist {
	list-style: none;
}

.navlistitem {
	text-transform: uppercase;
	text-align: center;
	padding: 4px;
}

.navlistitem a {
	color: #ffffff;
}
</style>
