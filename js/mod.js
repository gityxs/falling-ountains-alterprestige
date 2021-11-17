let modInfo = {
	name: "Falling Mountain's PRESTIGE",
	id: "stolenIdea",
	author: "Falling Mountain",
	pointsName: "points",
	modFiles: ["nano.js", "tree.js", "micro.js", "mini.js", "small.js", "achievements.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "A Small update",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.2</h3><br>
		- Added new prestige layer, Small Prestiges.<br>
		- Current endgame at 1 Small Prestige.<br>
		- 4 normal achievements<br>
		- 16 Mini achievements<br>
		- 5 new Nano upgrades<br>
		- 1 new Nano buyable<br>
		- 3 new Micro upgrades<br>
		- 1 new Mini upgrade<br>
	<h3>v0.1</h3><br>
		- Added first 3 prestige layers.<br>
		- Current endgame at 3 Miniprestiges.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	gain = gain.times(upgradeEffect("Nanoprestige", 11))
	if (hasUpgrade("Nanoprestige", 11) && !inChallenge("Nanoprestige", 21)) gain = gain.times(7)
	if (hasUpgrade("Nanoprestige", 12) && !inChallenge("Nanoprestige", 21)) gain = gain.times(7)
	if (hasUpgrade("Nanoprestige", 21) && !inChallenge("Nanoprestige", 21)) gain = gain.times(7)
	if (hasUpgrade("Nanoprestige", 22) && !inChallenge("Nanoprestige", 21)) gain = gain.times(7)
	if (hasUpgrade("Nanoprestige", 13) && !inChallenge("Nanoprestige", 21) && !inChallenge("Nanoprestige", 12)) gain = gain.times(buyableEffect("Nanoprestige", 11))
	if (hasUpgrade("Nanoprestige", 33) && !inChallenge("Nanoprestige", 21) && !inChallenge("Nanoprestige", 12)) gain = gain.times(buyableEffect("Nanoprestige", 12))
	if (hasUpgrade("Nanoprestige", 31) && !inChallenge("Nanoprestige", 21)) gain = gain.times(7)
	if (hasUpgrade("Nanoprestige", 32) && !inChallenge("Nanoprestige", 21)) gain = gain.times(7)
	if (hasUpgrade("Nanoprestige", 24) && !inChallenge("Nanoprestige", 21)) gain = gain.times(7)
	if (hasUpgrade("Nanoprestige", 45) && !inChallenge("Nanoprestige", 21)) gain = gain.times(7)
	gain = gain.times(upgradeEffect("Microprestige", 11))
	if (hasUpgrade("Microprestige", 11)) gain = gain.times(7)
	if (hasUpgrade("Microprestige", 21)) gain = gain.times(upgradeEffect("Microprestige", 21))
	if (hasUpgrade("Microprestige", 22)) gain = gain.times(upgradeEffect("Microprestige", 22))
	if (hasUpgrade("Microprestige", 23)) gain = gain.times(upgradeEffect("Microprestige", 23))
	if (hasUpgrade("Microprestige", 31)) gain = gain.times(7)
	if (hasUpgrade("Microprestige", 32)) gain = gain.times(2401)
	if (hasUpgrade("Microprestige", 33)) gain = gain.times(upgradeEffect("Microprestige", 33))
	gain = gain.times(upgradeEffect("Miniprestige", 11))
	if (hasUpgrade("Miniprestige", 11)) gain = gain.times(7)
	if (hasUpgrade("Miniprestige", 12)) gain = gain.times(7)
	if (hasUpgrade("Smallprestige", 11)) gain = gain.times(upgradeEffect("Smallprestige", 11))
	if (hasChallenge("Nanoprestige", 11)) gain = gain.pow(1.1)
	if (hasChallenge("Nanoprestige", 21)) gain = gain.pow(1.1)
	if (hasUpgrade("Nanoprestige", 52) && !inChallenge("Nanoprestige", 21) && !inChallenge("Nanoprestige", 12)) gain = gain.pow(buyableEffect("Nanoprestige", 22))
	if (inChallenge("Nanoprestige", 11)) gain = gain.pow(0.1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.Smallprestige.points.gte(new Decimal(1))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}