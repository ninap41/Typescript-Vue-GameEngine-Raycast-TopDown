export enum INSPECTS {
	lookInMirror = "Look in Mirror",
	takeOffCloth = "Take Off Cloth",
	makeSandwich = "Make Sandwich",
	turnOnLight = "Turn On Light",
	parentsDressor = "Parent's Dressor",
	lookUnderBed = "Look Under Bed",
	openCabinet = "Open Cabinet",
	sipOnWhiskey = "Sip On Whiskey",
	finishTheBottle = "Finish The Bottle",
	openSafe = "Open Safe",
	surfPhone = "Surf Phone",
	sleep = "Sleep",
	lookAtSadieMessage = "Look At Sadie Message",
	goOnComputer = "Go On Computer",
	messageSadie = "Message Sadie",
	dontOpenSafe = "Don’t Open Safe",
	shufflePapers = "Shuffle Papers",
	readLetter = "Read Letter",
	dustOffBook = "Dust Off Book",
	lookoutwindow = "Look Out Window",
}

class Inspect {
	displayName: any
	opt: any = {
		description: String,
		location: String,
		conditionToAccess: () => {},
		conditionToView: () => {},
		onInspect: () => {},
	}
	constructor(value: any, { ...args }) {
		this.displayName = value
		Object.keys(this.opt).forEach((key: any) => {
			this.opt[`${key}`] = args[`${key}`] || undefined
		})
	}

	public lookAtItem() {
		//code look for bag. webGL?
	}
}
const AllInspects: { [key: string]: {} } = {
	[INSPECTS.lookInMirror]: {
		displayName: [INSPECTS.lookInMirror],
		location: "Bathroom",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.takeOffCloth]: {
		displayName: [INSPECTS.takeOffCloth],
		location: "Hallway",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.makeSandwich]: {
		displayName: "Make Sandwhich",
		location: "Kitchen",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.turnOnLight]: {
		displayName: [INSPECTS.turnOnLight],
		location: "Bedroom",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.parentsDressor]: {
		displayName: [INSPECTS.parentsDressor],
		location: "Parent's Bedroom",
		onInspect: () => {
			// stop movement during dialogue
			const dialogue = [{ description: "You rummaged through your parents dressor.", choice: null, next: () => {} }]
		},
	},
	[INSPECTS.lookUnderBed]: {
		displayName: [INSPECTS.lookUnderBed],
		location: "Bedroom",
		onInspect: () => {},
	},
	[INSPECTS.openCabinet]: {
		displayName: [INSPECTS.openCabinet],
		location: "Bathroom",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.sipOnWhiskey]: {
		displayName: [INSPECTS.sipOnWhiskey],
		location: "Bedroom",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.finishTheBottle]: {
		displayName: [INSPECTS.finishTheBottle],
		location: "",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.openSafe]: {
		displayName: [INSPECTS.openSafe],
		location: "Basement",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.surfPhone]: {
		displayName: [INSPECTS.surfPhone],
		location: "Bed",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.sleep]: {
		displayName: [INSPECTS.sleep],
		location: "Bed",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.lookAtSadieMessage]: {
		displayName: [INSPECTS.lookAtSadieMessage],
		location: "Bed",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.goOnComputer]: {
		displayName: [INSPECTS.goOnComputer],
		location: "Bedroom",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.messageSadie]: {
		displayName: [INSPECTS.messageSadie],
		location: "Bed",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.dontOpenSafe]: {
		displayName: [INSPECTS.dontOpenSafe],
		location: "Basement",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.shufflePapers]: {
		displayName: [INSPECTS.shufflePapers],
		location: "Attic",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.readLetter]: {
		displayName: [INSPECTS.readLetter],
		location: "Attic",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.dustOffBook]: {
		displayName: [INSPECTS.dustOffBook],
		location: "Attic",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
	[INSPECTS.lookoutwindow]: {
		displayName: [INSPECTS.lookoutwindow],
		location: "Bedroom",
		onInspect: () => {},
		conditionToAccess: () => {},
	},
}

//@ts-ignore
export const Inspects1 = Object.keys(AllInspects).map((key: String) => new Inspect(key, { ...AllInspects[key] }))
