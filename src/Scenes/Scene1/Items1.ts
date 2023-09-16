export enum ITEMS {
	bible = "Bible",
	mothersLetter = "Mother's Letter",
	polaroid1 = "Polaroid 1",
	polaroid2 = "Polaroid 2",
	message1 = "Sadie's Message Pt 1",
	message2 = "Sadie's Message Pt 2",
	pager = "Pager",
	magnifyingGlass = "Magnifying Glass",
	mothersRosary = "Mother's Rosary",
	familyPhoto = "Family Photo",
	tornPhoto1 = "Torn Photo 1",
	tornPhoto2 = "Torn Photo 2",
	will = "will",
}

class Item {
	id: String
	src: String
	displayName: String
	opt: any = {
		description: String,
		onUse: () => {},
		onCombine: () => {},
		onDrop: () => {},
		canDrop: Boolean,
		qty: Number,
	}
	constructor(value: String, { ...args }) {
		this.id = String(Math.floor(Math.random() * 999999))
		this.src = `assets/items/${value.replace(/ /g, "_").replace(/'/g, "").toLocaleLowerCase()}.png`
		this.displayName = value
		Object.keys(this.opt).forEach((key: any) => {
			this.opt[`${key}`] = args[`${key}`] || undefined
		})
	}

	public lookAtItem() {
		//code look for bag. webGL?
	}
}

const AllItems = {
	// yellow
	[ITEMS.tornPhoto1]: {
		displayName: ITEMS.tornPhoto1,
		onUse: () => {},
		onCombine: () => {},
		canDrop: false,
	},
	[ITEMS.tornPhoto2]: {
		displayName: ITEMS.tornPhoto2,
		onUse: () => {},
		onCombine: () => {},
		canDrop: false,
	},
	[ITEMS.familyPhoto]: {
		displayName: ITEMS.familyPhoto,
		onUse: () => {},
		onCombine: () => {},
		canDrop: false,
	},
	[ITEMS.mothersLetter]: {
		displayName: ITEMS.mothersLetter,
		onUse: () => {},
		onCombine: () => {},
		canDrop: true,
	},
	[ITEMS.bible]: {
		displayName: "Bible KJV",
		canDrop: true,
		onDrop: () => {
			console.log("are you sure condition")
			console.log("place in world")
		},
	},
	[ITEMS.will]: {
		displayName: ITEMS.will,
		canDrop: true,
		onLook: () => {},
	},
	[ITEMS.magnifyingGlass]: {
		displayName: ITEMS.magnifyingGlass,
	},
	[ITEMS.polaroid1]: {
		displayName: ITEMS.polaroid1,
	},
	[ITEMS.polaroid2]: {
		displayName: ITEMS.polaroid2,
	},

	[ITEMS.message1]: {
		displayName: ITEMS.message1,
	},

	[ITEMS.message2]: {
		displayName: ITEMS.message2,
	},

	[ITEMS.mothersRosary]: {
		displayName: ITEMS.mothersRosary,
	},
	[ITEMS.pager]: {
		displayName: ITEMS.pager,
	},
}

//@ts-ignore
export const Items1 = Object.keys(AllItems).map((key: String) => new Item(key, { ...AllItems[key] }))
