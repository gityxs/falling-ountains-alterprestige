let modInfo = {
	name: "Falling Mountain's AlterPrestige",
	id: "alterPrestige",
	author: "Falling Mountain, original by Makiki99",
	pointsName: "points",
	modFiles: ["nano.js", "tree.js", "micro.js", "mini.js", "small.js", "partial.js", "achievements.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3.2a Beta",
	name: "The Great Rebalance, phase 2",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>Ping @Falling Mountain#4706 on discord to report bugs!</h3><br>
	<h3>v0.3.2a</h3><br>
		- Clickables are now still hidden, you'll unlock them later
		- Buyables now display costs at Infinity when you reach the cap (5000)
		- Buyable cap decreased 5001 -> 5000
		- Miniprestige achievement "Put in the effort" now actually gives the point bonus
		- Fixed description for Microprestige upgrade 44
	<h3>v0.3.2</h3><br>
		Great Rebalance, part 2 (Small prestige #1)<br>
		- Even more upgrades have changed<br>
		- Rebalanced challenges, now all of them have better requirements and rewards<br>
		- Broken Nanoprestige has also changed, and is now a buyable-based system<br>
		- Achievements have changed as well.<br>
		- Endgame at 16 Miniprestiges<br><br>
	<h3>v0.3.1</h3><br>
		Pre-Smallprestige section of the Great Rebalance.<br>
		- Upgrades have changed:<br>
		- Most have reduced costs, and changed effects.<br>
		- Buyables now have much different cost scalings.<br>
		- 2nd (Nano) buyable now increases in power every time you gain an upgrade.<br>
		- 3rd buyable buffed.<br>
		- 4th buyable increases the power of the 3rd buyable.<br>
		- Challenges can now be completed multiple times for extra rewards.<br>
		- 5th buyable increases the power of the 1st buyable.<br><br>
	<h3>v0.3b</h3><br>
		- Fixed upgrade problems from last hotfix.<br><br>
	<h3>v0.3a</h3><br>
		- Colors of Microprestige and Smallprestige changed to remove confusion with unpurchasable things<br>
		- Broken Microprestige starts with subtab of "preparation" open.<br>
		- Next update will deal with other complaints<br><br>
	<h3>v0.3</h3><br>
		- New Partial Prestige and Broken Microprestige layers.<br>
		- Current endgame at 1 Partial Prestige.<br>
		- New achievements<br>
		- New upgrades<br>
		- Fixed a bug where the bar showing progress to Broken Nanoprestige could only reach 99%<br>
		- Inflation... sorta?<br><br>
	<h3>v0.2.1 (Indev)</h3><br>
		- New layer added, Broken Nanoprestige.<br>
		- Current endgame at 2 Small Prestiges.<br>
		- 5 Small achievements<br>
		- 5 new Nano upgrades<br>
		- 2 new Nano buyables<br>
		- 7 new Micro upgrades<br>
		- 3 new Mini upgrades<br>
		- You can get a ton more Nanoprestiges now.<br><br>
	<h3>v0.2 (Indev)</h3><br>
		- Added new prestige layer, Small Prestiges.<br>
		- Current endgame at 1 Small Prestige.<br>
		- 4 normal achievements<br>
		- 16 Mini achievements<br>
		- 5 new Nano upgrades<br>
		- 1 new Nano buyable<br>
		- 3 new Micro upgrades<br>
		- 1 new Mini upgrade<br><br>
	<h3>v0.1 (Indev)</h3><br>
		- Added first 3 prestige layers.<br>
		- Current endgame at 3 Miniprestiges.`

let winText = `You've done enough prestiging for now. Why not take a break? Oh yeah, and trying to "keep going" is broken.`

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
	if(!canGenPoints()) return new Decimal(0)

	let gain = new Decimal(1)
	gain = gain.times(tmp.Nanoprestige.effect)
	if (hasUpgrade("Nanoprestige", 11)) gain = gain.times(7)
	if (hasUpgrade("Nanoprestige", 12)) gain = gain.times(7)
	if (hasUpgrade("Nanoprestige", 21)) gain = gain.times(7)
	if (hasUpgrade("Nanoprestige", 22)) gain = gain.times(7)
	if (hasUpgrade("Nanoprestige", 13)  && !inChallenge("Nanoprestige", 12)) gain = gain.times(buyableEffect("Nanoprestige", 11))
	if (hasUpgrade("Nanoprestige", 33)  && !inChallenge("Nanoprestige", 12)) gain = gain.times(buyableEffect("Nanoprestige", 12))
	if (hasUpgrade("Nanoprestige", 31)) gain = gain.times(7)
	if (hasUpgrade("Nanoprestige", 32)) gain = gain.times(7)
	if (hasUpgrade("Nanoprestige", 24)) gain = gain.times(7)
	if (hasUpgrade("Nanoprestige", 45)) gain = gain.times(7)
	gain = gain.times(tmp.Microprestige.effect)
	if (hasUpgrade("Microprestige", 11)) gain = gain.times(7)
	if (hasUpgrade("Microprestige", 22)) gain = gain.times(upgradeEffect("Microprestige", 22))
	if (hasUpgrade("Microprestige", 23)) gain = gain.times(upgradeEffect("Microprestige", 23))
	if (hasUpgrade("Microprestige", 31)) gain = gain.times(7)
	if (hasUpgrade("Microprestige", 32)) gain = gain.times(2401)
	if (hasUpgrade("Microprestige", 33)) gain = gain.times(upgradeEffect("Microprestige", 33))
	if (hasUpgrade("Microprestige", 14)) gain = gain.times(buyableEffect("Microprestige", 11))
	gain = gain.times(tmp.Miniprestige.effect)
	if (hasAchievement("Miniprestige", 31)) gain = gain.times(49)
	if (hasAchievement("Smallprestige", 11)) gain = gain.times(Decimal.pow("1e25", player.Smallprestige.points.plus(1)))
	if (hasChallenge("Nanoprestige", 11)) gain = gain.pow(1.1)
	//if (hasChallenge("Nanoprestige", 21)) gain = gain.pow(1.1)
	if (hasUpgrade("Nanoprestige", 75)) gain = gain.pow(1.15)
	if (inChallenge("Nanoprestige", 11)) gain = gain.pow(0.1)

	if (inChallenge("Microprestige", 11)) gain = gain.pow(0.01)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Current endgame at 16 Miniprestiges!", "Continuing past that is broken."
]

// Determines when the game "ends"
function isEndgame() {
	return player.Miniprestige.points.gte(new Decimal(16))
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