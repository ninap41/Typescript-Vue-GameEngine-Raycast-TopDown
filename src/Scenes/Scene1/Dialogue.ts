import type { GameEngine } from "@/GameEngine/GameEngine"

class Dialogue {
	public conversation
	public convoIndex = 0
	public branchKey = "main"
	public gameInstance: any
	constructor(convo: any, game: GameEngine) {
		this.gameInstance = game
		this.conversation = convo
	}

	public playDialogue() {
		//if next.... reset the convo index and convo branchkey
	}
}

/*

phone dialogue overview

main1 ....
ARE YOU SOBER?
    1)yesSoberLie (lie)  - gain 'lied to rachel'
    2)she congratuates you and overs to come over

    3)yesSoberTruth (truth) - gain 'you told the truth to rachel'
        she congratuates you and offers to come over ...
    notSober -  gain 'you admitted you were not sober'
        she admires your honesty & overs TO COME OVER?
            1)comeOver
            2)noVisit
            
main2
HEARTSDESIRE
    1) God I hate this house (hint at paranormal)
        They hint at the fact that they did ouija board there around the time his sister died. 
    2) Miss Amy
        They reminisce about Amy. 
        IF I COULD BRING MY AUNT BACK - I WOULD
            1) Yeah.  (gain 'Calling to the dead I' )

            2) Always move forward, never move back. 

    3) But What ('Antagonistic')

            




*/

const areYouSober = {
	choices: [
		{
			content: "Yes (truth)",
			next: "yesSoberTruth",
			visible: () => {
				//if sober
			},
		},
		{
			content: "Yes (lie)",
			next: "yesSoberLie",
			visible: () => {
				//if not sober
			},
		},
		{
			content: "No.",
			next: "notSober",
		},
	],
}

const heartsDesire = {
	choices: [
		{
			content: "I hate this house.",
			next: "houseHate",
			visible: () => {},
		},
		{
			content: "I miss Amy too.",
			onSelect: () => {},
			next: "missAmy",
		},
		{
			content: "But What?",
			onSelect: () => {
				console.log("You lied to Rachel. Fear increase by one.")
			},
			next: "butWhat",
			visible: () => {},
		},
	],
}

const comeOver = {
	choices: [
		{
			content: "Yes.",
			onSelect: () => {
				console.log("you invited rachel over.")
			},
			next: "comeOver",
		},
		{
			content: "No, I'm okay.",
			onSelect: () => {
				console.log("you declined.")
			},
			next: "noVisit",
		},
	],
}
const phoneRachelDialogue = {
	main: {
		0: {
			speaking: "Rachel",
			content: "Tom, Hi. Are you okay?",
			sound: "assets/sound",
		},
		1: {
			speaking: "Thomas",
			content: "Hi Rachel.",
			sound: "assets/sound",
		},
		2: {
			speaking: "Thomas",
			content: "Yeah, I ... haven't been checking my phone.",
			sound: "assets/sound",
		},

		3: {
			speaking: "Rachel",
			content: "Well, that's nothing really unusual for you, but it freaked me out a bit...",
			sound: "assets/sound",
		},
		4: {
			speaking: "Thomas",
			content: "I'm sorry...",
			sound: "assets/sound",
			choices: undefined,
		},
		5: {
			speaking: "Rachel",
			content: "... You don't need to apologize... but - I worry.",
			sound: "assets/sound",
			choices: undefined,
		},
		6: {
			speaking: "Thomas",
			content: "I know. I just check out mentally and -",
			sound: "assets/sound",
			choices: undefined,
		},
		7: {
			speaking: "Rachel",
			content: "... No Tom. Sobriety is so hard on top of everything else. Are you... sober?",
			sound: "assets/sound",
			choices: areYouSober,
		},
	},
	main2: {
		0: {
			speaking: "Rachel",
			content: "I heard about your parents so late I felt embarrased to reach out. I feel like an asshole...",
			sound: "assets/sound",
			choices: areYouSober,
		},
		1: {
			speaking: "Thomas",
			content: "...",
			sound: "assets/sound/sigh",
		},
		2: {
			speaking: "Rachel",
			content: "You're in their house now right?",
			sound: "assets/sound/sigh",
		},
		3: {
			speaking: "Thomas",
			content: "Yeah. How'd you hear?",
			sound: "assets/sound/sigh",
		},
		4: {
			speaking: "Rachel",
			content: "Jacob told me. We miss you.",
			sound: "assets/sound/sigh",
		},
		5: {
			speaking: "Thomas",
			content: "really?",
			sound: "assets/sound/sigh",
			next: (game: GameEngine) => {},
		},
		6: {
			speaking: "Rachel",
			content: "Don't ask dumb questions.",
			sound: "assets/sound/sigh",
		},

		7: {
			speaking: "Rachel",
			content: "Do your parents still have that goofy old clock?",
			sound: "assets/sound/sigh",
		},
		8: {
			speaking: "Thomas",
			content: "oh man, this house looks exactly how it was when I was a kid … my parents didn’t really like change.",
			sound: "assets/sound/sigh",
		},
		9: {
			speaking: "Rachel",
			content: "Yeah they didn't but --",
			sound: "assets/sound/sigh",
		},
		10: {
			speaking: "Tom",
			content: "...",
			sound: "assets/sound/sigh",
		},
		11: {
			speaking: "Rachel",
			content: "Tom?",
			sound: "assets/sound/sigh",
			choices: heartsDesire,
		},
	},
	comeOver: {
		0: {
			speaking: "Thomas",
			content: "Yeah, Rachel. I really would - If it's not too much trouble. I just feel - off",
			sound: "assets/sound",
			choices: undefined,
		},
		1: {
			speaking: "Rachel",
			content: "I'll come by tomorrow. Take your time with whatever you have to do.",
			sound: "assets/sound",
			cutScene: "nighttime",
			end: true,
		},
	},
	noVisit: {
		0: {
			speaking: "Thomas",
			content: "No. Tonight is not the night. But I'm okay",
			sound: "assets/sound",
			choices: undefined,
		},
		1: {
			speaking: "Rachel",
			content: "Promise?",
			sound: "assets/sound",
		},
		2: {
			speaking: "Thomas",
			content: "Promise",
			sound: "assets/sound",
			next: "main2",
		},
	},
	houseHate: {
		0: {
			speaking: "Thomas",
			content: "God, I hate this house.",
			sound: "assets/sound",
			choices: undefined,
		},

		1: {
			speaking: "Rachel",
			content: "Complete honesty? I don't think it's healthy to be in there anymore than you need to.",
			sound: "assets/sound",
			choices: undefined,
		},
		2: {
			speaking: "Thomas",
			content: "ah. Are you remembering the board?",
			sound: "assets/sound",
			choices: undefined,
		},
		3: {
			speaking: "Rachel",
			content: "Ha. Are YOU remembering the board?",
			sound: "assets/sound",
			choices: undefined,
		},

		4: {
			speaking: "Thomas",
			content: "It's too late. Moved in.",
			sound: "assets/sound",
			choices: undefined,
		},
		5: {
			speaking: "Rachel",
			content: "...Thomas.",
			sound: "assets/sound",
			choices: undefined,
		},
		6: {
			speaking: "Thomas",
			content:
				"Hey, creepy grandfather clock or not... No one wants rent. Especially the guy in charge of all those funeral costs.",
			sound: "assets/sound",
			choices: undefined,
		},
		7: {
			speaking: "Rachel",
			content: "*shivers* ugh...",
			sound: "assets/sound",
			choices: undefined,
		},

		8: {
			speaking: "Thomas",
			content: "Are you. Are you gonna sage my house?",
			sound: "assets/sound",
			choices: undefined,
		},
		9: {
			speaking: "Rachel",
			content: "No... No more than needed.",
			sound: "assets/sound",
			choices: undefined,
		},
		10: {
			speaking: "Thomas",
			content: "Heh. It was coicidence Rachel. The board",
			sound: "assets/sound",
			choices: undefined,
		},
		11: {
			speaking: "Rachel",
			content: "I don't really believe in coicidence. Whatever you say. See you soon?",
			sound: "assets/sound",
			choices: undefined,
		},
		12: {
			speaking: "Thomas",
			content: "yeah. I have to... wrap up all this unboxing for the estate sale.",
			sound: "assets/sound",
			choices: undefined,
		},
		13: {
			speaking: "Rachel",
			content: "Ok. Let me know when and if you need any help with it. I'll see you soon.",
			sound: "assets/sound",
			choices: undefined,
		},
		14: {
			speaking: "Thomas",
			content: "I'll see you soon.",
			sound: "assets/sound",
			choices: undefined,
		},
	},
	butWhat: {
		0: {
			speaking: "Thomas",
			content: "but what?...",
			sound: "assets/sound",
			choices: undefined,
		},
		1: {
			speaking: "Rachel",
			content: "but, it’s been a lot of change",
			sound: "assets/sound",
			choices: undefined,
		},
		2: {
			speaking: "Rachel",
			content: "It kinda feels like you're minimizing what happened to you.",
			sound: "assets/sound",
			choices: undefined,
		},
		3: {
			speaking: "Thomas",
			content: "I'm not.",
			sound: "assets/sound",
			choices: undefined,
		},
		4: {
			speaking: "Rachel",
			content: "Thomas. - You lost your sister and parents in a span of two years.",
			sound: "assets/sound",
			choices: undefined,
		},
		5: {
			speaking: "Thomas",
			content: "Damn it! Rachel! ",
			sound: "assets/sound",
			choices: undefined,
		},
		6: {
			speaking: "Rachel",
			content: "I'm sorry. ",
			sound: "assets/sound",
			choices: undefined,
		},
		7: {
			speaking: "Thomas",
			content: "I wish I could go one damn minute without you reminding me how unlucky I am.",
			sound: "assets/sound",
			choices: undefined,
		},
		8: {
			speaking: "Rachel",
			content:
				"You're not unlucky! Tom, you can't even say the words-- you should be able to say the words! you're not talking to your friends you're not even talking to a therapist and you --",
			sound: "assets/sound/rachelyelling",
			choices: undefined,
		},
		9: {
			speaking: "Thomas",
			content: "STOP!!!!",
			sound: "assets/sound/rachelyelling",
			choices: undefined,
		},
		10: {
			speaking: "Rachel",
			content: "Stop what? Thomas, you're not yourself since we did that --",
			sound: "assets/sound/rachelyelling",
			choices: undefined,
		},
		11: {
			speaking: "Thomas",
			content:
				"Stop. Stop, Stop, Stop, Okay? Do not bring up the board. I said it once already. I'm sorry. I'm hanging up.",
			sound: "assets/sound/rachelyelling",
			choices: undefined,
		},
		12: {
			speaking: "Thomas",
			content: "*Hangs Up*",
			sound: "assets/sound/click",
			choices: undefined,
			end: true,
			cutScene: "nighttime",
		},
	},
	missAmy: {
		0: {
			speaking: "Thomas",
			content: "I miss Amy...",
			sound: "assets/sound",
		},
		1: {
			speaking: "Rachel",
			content: "She was the best. ",
			sound: "assets/sound",
		},
		2: {
			speaking: "Thomas",
			content:
				"I found a couple photo albums of us in High School. I don't think they're a picture of her without you by her.",
			sound: "assets/sound",
		},
		4: {
			speaking: "Rachel",
			content: "Yeah. Maybe sometime we can go through those soon?",
			sound: "assets/sound",
		},
		5: {
			speaking: "Thomas",
			content: "Soon.", // add to affects. Living In Spirit.
			sound: "assets/sound",
			next: "getGoing",
		},
	},
	getGoing: {
		0: {
			speaking: "Thomas",
			content: "I should get going. I'll see you soon?",
			sound: "assets/sound",
		},
		1: {
			speaking: "Rachel",
			content: "Yeah I'll see you soon.",
			sound: "assets/sound",
			cutScene: "nighttime",
			end: true,
		},
	},
	yesSoberLie: {
		// LIE lies about sobriety - drinking
		0: {
			speaking: "Thomas",
			content: "I got my 12 month chip last week-",
			sound: "assets/sound",
			choices: undefined,
		},
		1: {
			speaking: "Rachel",
			content: "Ayyyy. That's awesome to hear Tom. Your parents would be proud. I'm proud.",
			sound: "assets/sound",
			choices: undefined,
		},
		2: {
			speaking: "Thomas",
			content: "Can we we talk about them?", // downtrodden
			sound: "assets/sound",
			choices: undefined,
		},
		12: {
			speaking: "Rachel",
			content: "Yeah, of course.",
			sound: "assets/sound",
		},

		14: {
			speaking: "Rachel",
			content: " Would you like me to come over?",
			sound: "assets/sound/comeoverNUETRAL",
			choices: comeOver,
		},
	},
	yesSoberTruth: {
		//TRUTH 1 admits sober - no drinking
		0: {
			speaking: "Thomas",
			content: "I got my 12 month chip last week-",
			sound: "assets/sound",
			choices: undefined,
		},
		1: {
			speaking: "Rachel",
			content: "Ayyyy. That's awesome to hear Tom. Your parents would be proud. I'm proud.",
			sound: "assets/sound",
			choices: undefined,
		},
		2: {
			speaking: "Thomas",
			content: "Can we talk about them?", //upbeat
			sound: "assets/sound",
			choices: undefined,
			next: " main2",
		},
		3: {
			speaking: "Rachel",
			content: "Yeah, of course.",
			sound: "assets/sound",
			choices: undefined,
		},
		4: {
			speaking: "Rachel",
			content:
				"You've gone through something most people can't even fathom. I can't imagine what you're going through. What your parents were going through before- ",
			sound: "assets/sound",
		},
		5: {
			speaking: "Thomas",
			content: "....",
			sound: "assets/sound/",
			next: "main16",
		},
	},
	notSober: {
		// TRUTH 2 admits not sober - drinking
		0: { speaking: "Thomas", content: "Can we talk?", sound: "assets/sound", choices: undefined },
		1: { speaking: "Rachel", content: "Yeah. Of Course", sound: "assets/sound", choices: undefined },
		2: { speaking: "Thomas", content: "I started drinking again.", sound: "assets/sound", choices: undefined },
		3: {
			speaking: "Rachel",
			content: "I don't hold it against you.",
			sound: "assets/sound",
		},
		4: {
			speaking: "Thomas",
			content: "I have it more under control now.",
			sound: "assets/sound",
		},
		5: {
			speaking: "Rachel",
			content: "You always appear to have it under control. That's what makes it scary.",
			sound: "assets/sound",
		},
		6: {
			speaking: "Thomas",
			content: "I really do.",
			sound: "assets/sound",
		},
		7: {
			speaking: "Rachel",
			content: "I mean to say, I wouldn't hold it against you if you didn't. ",
			sound: "assets/sound",
		},
		8: {
			speaking: "Thomas",
			content: "I know.",
			sound: "assets/sound",
		},
		9: {
			speaking: "Rachel",
			content: "Thank you for your honesty. ",
			sound: "assets/sound",
		},
		10: {
			speaking: "Thomas",
			content: "....",
			sound: "assets/sound/sigh",
		},

		11: {
			speaking: "Rachel",
			content:
				"You've gone through something most people can't even fathom. I can't imagine what you're going through. What your parents were going through before- ",
			sound: "assets/sound",
		},
		12: {
			speaking: "Thomas",
			content: "-Can we talk about them?",
			sound: "assets/sound",
		},
		13: {
			speaking: "Rachel",
			content: "-Yeah, of course.",
			sound: "assets/sound",
		},

		14: {
			speaking: "Rachel",
			content: "Would you like me to come over?",
			sound: "assets/sound/comeoverWORRIED",
			choices: comeOver,
		},
	},
}
