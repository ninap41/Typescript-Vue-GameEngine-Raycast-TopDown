import { ref, computed } from "vue"
import { defineStore } from "pinia"

export const useLocalStore = defineStore("gameStore", () => {
	const readFrom = (store?: any, value?: any) => {
		if (!localStorage.getItem(store)) {
			localStorage.setItem(value, JSON.stringify(store))
			return localStorage.getItem(store)
		} else {
			return JSON.parse(localStorage.getItem(store) ?? "")
		}
	}

	const writeTo = async (storeKey: any, data: any) => localStorage.setItem(storeKey, JSON.stringify(data))

	const clear = async () => {
		await localStorage.clear()
		window.location.reload()
	}
	return { writeTo, readFrom, clear }
})
