<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import Planck from "planck-js" /** Import the planck-js library (required by p5.play) */
import { ref } from "vue"
window.planck = Planck
const menuOpen = ref()
const classStringLink =
	"block text-gray-600 transition-colors duration-300 dark:text-white md:px-6 hover:text-blue-500 dark:hover:text-blue-400"
</script>

<template>
	<div class="container-fluid" id="app">
		<nav class="navbar">
			<div class="col-xs-6">
				<div class="logo">
					<span class="logo2">The Haunting</span>
				</div>
			</div>
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
			<ul class="navlist">
				<li class="navlistitem">
					<RouterLink :class="classStringLink" @click="menuOpen = !menuOpen" to="/">Game</RouterLink>
				</li>
				<li class="navlistitem">
					<RouterLink :class="classStringLink" @click="menuOpen = !menuOpen" to="/help">Help</RouterLink>
				</li>
			</ul>
		</div>
	</div>
	<main>
		<RouterView />
	</main>
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
</template>

<style>
html,
* {
	background-color: black;
}
.navbar {
	height: 50px;
	display: flex;
	flex-direction: row;
	border-radius: 0px;
}

.logo1 {
	color: red;
}

.logo2 {
	color: grey;
}

.logo,
.hamburger-wrap {
	width: 100px;
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
	width: 45px;
	height: 45px;
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
	margin-top: 7px;
	margin-bottom: 7px;
}

.hamburger__middle {
	width: 20px;
	margin-left: 10px;
}

.dropdown {
	margin-top: 50px;
	height: 0px;
	background-color: black;
	transition: height 0.2s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.dropdown-after {
	height: calc(100vh - 50px);
	transition: height 0.2s ease;
}

.navlist {
	list-style: none;
}

.navlistitem {
	text-transform: uppercase;
	text-align: center;
	padding: 20px;
}

.navlistitem a {
	color: #ffffff;
}
</style>
