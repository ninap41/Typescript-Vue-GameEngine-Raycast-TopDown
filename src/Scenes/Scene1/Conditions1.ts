export enum CONDITION {
	markOfThree = "Mark Of Three",
	tookXanax = "Took Xanax",
	lightsOn = "Lights On",
	fuckedUp = "Fucked Up",
	messagedSadie = "Messaged Sadie",
	rockieTime = "Rockie Time",
	leavebookOnGround = "Leave Book On Ground",
	suspiciousNeighbor = "Suspicious Neighbor",
	voicesInEar = "Voices In Ear",
}

const allConditions: { [key: string]: {} } = {
	[CONDITION.markOfThree]: {
		canView: { needs: [["inspect_open kitchen cabinets"], "all"] },
		onAquire: () => {},
		affectEachTurn: () => {},
		onLook: () => {},
		cancelCondition: () => {},
	},
	[CONDITION.tookXanax]: {},
	[CONDITION.lightsOn]: {},
	[CONDITION.fuckedUp]: {},
	[CONDITION.messagedSadie]: {},
	[CONDITION.rockieTime]: {},
	[CONDITION.leavebookOnGround]: {},
	[CONDITION.suspiciousNeighbor]: {},
	[CONDITION.voicesInEar]: {},
}

export const conditions1 = {
	//mapColor: blue!!!
	//shows up in important Markers
	"condition_mark of three": {
		beforeAquire: () => {
			console.log("trigger cutscene mark of three")
		},
		onAquire: () => {
			console.log("a toast for the user")
		},
		affectEachTurn: () => {
			//subtract fear to
		},
		displayName: "Mark Of Three",
		playerCanSee: true,
		cancelCondition: () => {},
		needsAll: ["inspect_open kitchen cabinets"],
		needsOne: ["inspect_took xanax"],
	},
	"condition_took xanax": {},
	"condition_lights on": {},
	"condition_fucked up": {},
	"condition_messaged sadie": {},
	"condition_rockie time": {},
	"condition_leave book on ground": {},
	"condition_suspicious neighbor": {},

	"condition_voices in ear": {
		affectEachTurn: () => {
			console.log(`every room entered a sound clip will play. will happen 50% chance as entering room`)
		},
	},
}

// //@ts-ignore
// export const Items1 = Object.keys(AllItems).map((key: String) => new Item(key, { ...AllItems[key] }))
