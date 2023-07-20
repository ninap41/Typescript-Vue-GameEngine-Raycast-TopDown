import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home", //@ts-ignore
			component: () => import("@/views/Game.vue"),
			props: true,
		},

		{
			path: "/help",
			name: "help",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("@/views/Help/Help.vue"),
			props: true,
		},
	],
})

export default router
