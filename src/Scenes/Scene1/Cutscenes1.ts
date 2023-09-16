export enum CUTSCENE {
	dreamOfDemonDrugs = "Dream a Demon (Drugs)",
	goToBedEarly = "Go To Bed Early",
	dreamOfParentsBeingMurderedByDemon = "Dream of Parents Being Murdered by Demon",
	sadiesComing = "Sadie’s Coming",
	goToBedPeacefully = "Go To Bed Peacefully",
}

class Cutscene {
	displayName: String
	opt: any = {
		description: String,
		frames: Array<any>,
	}
	constructor(value: String, { ...args }) {
		this.displayName = value
		Object.keys(this.opt).forEach((key: any) => {
			this.opt[`${key}`] = args[`${key}`] || undefined
		})
	}
}

export const AllCutscenes: { [key: string]: {} } = {
	[CUTSCENE.dreamOfDemonDrugs]: {
		displayName: [CUTSCENE.dreamOfDemonDrugs],
		conditionToTrigger: () => {},
		frames: [],
	},
	[CUTSCENE.goToBedEarly]: {
		displayName: [CUTSCENE.goToBedEarly],
		conditionToTrigger: () => {},
		frames: [],
	},
	[CUTSCENE.dreamOfParentsBeingMurderedByDemon]: {
		displayName: [CUTSCENE.dreamOfParentsBeingMurderedByDemon],
		conditionToTrigger: () => {},
		frames: [],
	},
	[CUTSCENE.sadiesComing]: {
		displayName: [CUTSCENE.sadiesComing],
		conditionToTrigger: () => {},
		frames: [],
	},
	[CUTSCENE.goToBedPeacefully]: {
		displayName: [CUTSCENE.goToBedPeacefully],
		conditionToTrigger: () => {},
		frames: [],
	},
}

//@ts-ignore
export const Cutsscenes1 = Object.keys(AllCutscenes).map((key: String) => new Cutscene(key, { ...AllCutscenes[key] }))
