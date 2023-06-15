export const apiUrl = "https://www.dnd5eapi.co/api/"

export const getData = () => {
	// async function retrieveSpellData() {
	// 	const spellListRequests = character.spells.map(
	// 		(spell) =>
	// 			apiURL +
	// 			"spells/" +
	// 			spell
	// 				.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
	// 				.replace(" ", "-")
	// 				.toLowerCase() // convert camelCase to kebab casing
	// 	)
	// 	const spells: any[] = []
	// 	const requests = await spellListRequests.map(async (endpoint) => {
	// 		try {
	// 			await axios.get(endpoint).then((response) => {
	// 				console.log(response)
	// 				spells.push(response.data)
	// 			})
	// 		} catch (err) {
	// 			console.log(err)
	// 		}
	// 	})
	// 	Promise.all(requests).then(() => {
	// 		character.displaySpells = spells as any
	// 		console.log(JSON.stringify(spells))
	// 	})
	// }
}
