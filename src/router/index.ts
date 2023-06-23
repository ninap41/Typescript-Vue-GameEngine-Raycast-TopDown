import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../views/GameView.vue"),
			props: true,
		},

		{
			path: "/game",
			name: "game",
			component: () => import("../views/GameView.vue"),
			props: true,
		},

		{
			path: "/help",
			name: "help",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("../views/Help.vue"),
			props: true,
		},
	],
})

export default router