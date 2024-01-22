import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "game", //@ts-ignore
			component: () => import("@/views/Game.vue"),
			props: true,
		},

		{
			path: "/playground",
			name: "playground", //@ts-ignore
			component: () => import("@/views/Playground.vue"),
			props: true,
		},

		{
			path: "/help",
			name: "help", //@ts-ignore
			component: () => import("@/views/Help.vue"),
			props: true,
		},

		{
			path: "/scene-planner",
			name: "scene-planner", //@ts-ignore
			component: () => import("@/views/ScenePlanner.vue"),
			props: true,
		},
		{
			path: "/raycaster",
			name: "raycaster",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("@/views/Raycaster.vue"),
		},
	],
})

export default router
