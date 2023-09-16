import type { GameEngine } from "@/GameEngine/GameEngine"
enum EVENTS {
	itemFind = "itemFound ",
}

export const AllEvents: { [key: string]: {} } = {
	[EVENTS.itemFind]: {
		displayName: "You Found",
		type: "item",
		onEvent: () => {
			return { 0: { text: "You found a thing!", actions: { item: "Item Here" } } }
		},

		description: "",
		action: "picked up",
	},
}
class Event {
	type: "cutscene" | "item" | "simple_event" | "choice" | "exitScene" | "dialogue" | undefined
	constructor(type: any) {
		this.type = type
	}
}
