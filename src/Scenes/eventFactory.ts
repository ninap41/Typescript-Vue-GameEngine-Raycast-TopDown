import type { GameEngine } from "@/GameEngine/GameEngine"

class ViewItem {
	name: string
	wheels: number
	constructor(name: string) {
		this.name = "Truck"
		this.wheels = 8
	}
	turnOn = () => console.log("RRRRRRRRUUUUUUUUUMMMMMMMMMM!!")
}

class ItemEvent {
	name: string
	type: "ItemFind" | "ItemView" | "ItemUse"
	constructor(type) {
		this.type = type
	}

	before = () => console.log("RRRRRRRRUUUUUUUUUMMMMMMMMMM!!")

	after = () => console.log("RRRRRRRRUUUUUUUUUMMMMMMMMMM!!")
}

// And and abstract factory that works as a single point of interaction for our clients
// Given the type parameter it receives, it will call the corresponding concrete factory
const EventFactory = {
	createEvent: function (type) {
		switch (type) {
			case "ItemFind":
				return new ItemEvent(type)
			case "ItemView":
				return new ItemEvent(type)
			case "ItemView":
				return new ItemEvent(type)
			default:
				return null
		}
	},
}

const find1 = EventFactory.createEvent("ItemFind") // Car { turnOn: [Function: turnOn], name: 'Car', wheels: 4 }
const view1 = EventFactory.createEvent("ItemView") // Truck { turnOn: [Function: turnOn], name: 'Truck', wheels: 8 }
const use1 = EventFactory.createEvent("ItemUse") // Motorcycle { turnO
