<template>
	<div class="about">
		<div class="d-flex justify-content-center" id="gameCanvas"></div>
		<div v-for="scene of sceneChoice">
			<button
				@click="
					() => {
						makeCanvas(scene)
					}
				"
			>
				{{ String(scene) }}
			</button>
		</div>
		<!------------------------------------------------------------------------
  Base64 encoded images for floor and ceiling.
  This is to prevent "canvas has been tainted by cross-origin data" errors.
  ------------------------------------------------- ----------------------->

		<img id="wallsImage" :src="textures.wallTest" style="display: none" />
		<img id="floorimg" :src="textures.woodFloor" style="display: none" />
		<img id="ceilingimg" :src="textures.ceiling" style="display: none" />
		<img id="sprite1" crossOrigin="anonymous" :src="textures.manWalking" style="display: none" />
		<div id="screen">
			<canvas id="mainCanvas"></canvas>
		</div>
		<div style="display: flex; flex-direction: row; justify-content: center; align-content: center">
			<table cellspacing="10">
				<tr>
					<td>Ceiling Height</td>
					<td>
						<select name="ceilingHeight" id="ceilingHeight" onchange="javascript:this.blur()">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</select>
					</td>
				</tr>
			</table>
			<div id="minimapcontainer">
				<canvas id="minimap"></canvas>
				<canvas id="minimapobjects"></canvas>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue"
import { useLocalStore } from "@/stores/local"
import { onBeforeMount, onMounted } from "vue"
import * as p5 from "p5"
import * as textures from "../GameEngine/Classes/Raycaster/textures"
import { intro } from "../GameEngine/Classes/Raycaster/intro"
import { Raycaster } from "../GameEngine/Classes/Raycaster/RayCaster.class"
const sceneChoice: any = ["intro", "raycast"]

var { writeTo, readFrom } = useLocalStore()
/*
blue brick = 1
blueBrickCage = 2
grayBrick= 3
wood= 4

*/
var map = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 3, 0, 3, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1],
	[1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
	[1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 4, 0, 0, 4, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 4, 3, 3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

var lighting
var game: CanvasCaptureMediaStreamTrack
var raycaster: Raycaster
async function makeCanvas(choice?: string) {
	window.document.getElementById("defaultCanvas0")?.remove()
	// if (choice === "intro") {
	// 	alert("intro")
	// await writeTo("scene", choice)
	new p5(intro)
	// } else {
	alert("raycast")
	raycaster = await new Raycaster(document.getElementById("mainCanvas"), map)
	await raycaster.init()
	// }
}

onBeforeMount(async () => {})
onMounted(async () => {
	await makeCanvas()
})

function reload() {
	window.location.reload()
}
</script>

<style>
/* For canvas resizing without blur the image */
canvas {
	image-rendering: optimizeSpeed; /* Older versions of FF          */
	image-rendering: -moz-crisp-edges; /* FF 6.0+                       */
	image-rendering: -webkit-optimize-contrast; /* Safari                        */
	image-rendering: -o-crisp-edges; /* OS X & Windows Opera (12.02+) */
	image-rendering: pixelated; /* Awesome future-browsers       */
	-ms-interpolation-mode: nearest-neighbor; /* IE                            */
}

html {
	box-sizing: border-box;
}

*,
*::before,
*::after {
	box-sizing: inherit;
}

/* body {
  background-color: rgb(25,65,65);
  height: 100%; overflow: hidden;
  color: white;
} */
table {
	font-family: "Courier New";
	font-size: 12pt;
}
div#minimapcontainer {
}
canvas#minimap {
	position: absolute;
}
canvas#minimapobjects {
	position: absolute;
}

#mainCanvas {
	position: absolute;
	background-color: none;
	/*
 Do not set canvas dimensions via CSS, use HTML attributes instead
 https://stackoverflow.com/a/27706093/1645045
 */
}

#screen {
	margin-left: auto;
	margin-right: auto;
	/*width: 480px;
 height: 320px;*/
	border-top: 4px solid rgb(25, 25, 25);
	border-left: 4px solid rgb(25, 25, 25);
	border-right: 4px solid #1b625e;
	border-bottom: 4px solid #1b625e;
	overflow: hidden;
}
</style>
