export class Config {
	opt: any = {
		timeOfDay: "day", // "day" || "night"
		time: undefined,
		lights: {
			bedroom: [], //list of id refs and bools
			kitchen: [],
		},
		events: [],
	}
	constructor(game: any) {}
}
