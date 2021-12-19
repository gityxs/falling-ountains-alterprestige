
addLayer("Miniprestige", {
    name: "Miniprestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(3), // Can be a function that takes requirement increases into account
    resource: "Miniprestiges", // Name of prestige currency
    baseResource: "Microprestiges", // Name of resource prestige is based on
    baseAmount() {return player.Microprestige.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: 3,
    effect() {
        return player.Miniprestige.points.plus(1)
    },
    effectDescription() {
        var desc;
        desc = "which are multiplying Point gain by "
        desc += format(tmp.Miniprestige.effect) + "x"
        return desc
    },
    branches: ["Microprestige"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("Microprestige", 51)) mult = mult.div(upgradeEffect("Microprestige", 51))
        if (hasUpgrade("Microprestige", 52)) mult = mult.div(upgradeEffect("Nanoprestige", 91))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("Nanoprestige", 56)) mult = mult.times(1.47189)
        return new Decimal(mult)
    },
    directMult() {
        mult = new Decimal(1)
        if (hasMilestone("BNCapital", 0)) mult = mult.times(new Decimal(1.2).pow(player.BNCapital.points))
        return mult
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "m: Reset for Miniprestiges", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    
    upgrades: {
        11: {
            name: "Minirelax",
            title: "Minirelax",
            description: "You no longer lose Nanoprestige upgrades on Small resets. Nanoprestige buyable autobuyers unlocked.",
            cost: new Decimal(4),
            unlocked() {return hasAchievement("Unlockers", 24)}
        },
        12: {
            name: "Miniforce",
            title: "Miniforce",
            description: "Square Microagression and Microstrawman.",
            cost: new Decimal(5),
            unlocked() {return hasAchievement("Unlockers", 24)}
        },
        13: {
            name: "Minishark",
            title: "Minishark",
            description: "Unlock some Broken Nanoprestige upgrades. Change the log10()s in Nano upgrade 64 to log2()s",
            cost: new Decimal(9),
            unlocked() {return hasUpgrade("Microprestige", 42)}
        },
        21: {
            name: "Miniplead",
            title: "Miniplead",
            description: "Autobuy Microprestige buyables, and unlock a new one.",
            cost: new Decimal(17),
            unlocked() {return hasAchievement("Smallprestige", 21)}
        },
        22: {
            name: "Minirelief",
            title: "Minirelief",
            description: "Microprestige no longer resets anything, and its scaling is decreased.",
            cost: new Decimal(71),
            unlocked() {return hasAchievement("Smallprestige", 31)}
        },
        23: {
            name: "Miniexplode",
            title: "Miniexplode",
            description: "MicroV also boosts the Nanoprestige Point gain exponent.",
            cost: new Decimal(511),
            unlocked() {return hasMilestone("BrokenMicro", 1)}
        }
    },
    achievements:{
        11: {
            name: "To begin (for real this time)",
            done() {return player.Miniprestige.points.gte(1)},
            tooltip: "Miniprestige for the first time. Unlocks the Upgrade subtab on all layers."
        },
        12: {
            name: "Dynamic Upgraing",
            done() {return player.Microprestige.points.gte(6)},
            tooltip: "Get 6 Microprestiges. Microprestige no longer resets Nanoprestige upgrades."
        },
        13: {
            name: "Buy, buy again",
            done() {return hasUpgrade("Nanoprestige", 33)},
            tooltip: "Unlock 2 buyables."
        },
        14: {
            name: "Close enough for comfort",
            done() {return player.Microprestige.points.gte(8)},
            tooltip: "Get 8 Microprestiges."
        },
        31: {
            name: "Put in the effort",
            done() {return player.Miniprestige.points.gte(2)},
            tooltip: "Get 2 Miniprestiges. Multiplies point gain by 49, divides Microprestige requirement by 2, and adds new upgrades."
        },
        32: {
            name: "Stacked",
            done() {return player.Nanoprestige.buyables[21].gte(1)},
            tooltip: "Purchase Nanopierce at least once."
        },
        33: {
            name: "Gilded Age",
            done() {return hasChallenge("Nanoprestige", 12)},
            tooltip: "Complete Muckraking for the first time."
        },
        34: {
            name: "Shen Bapiro",
            done() {return hasUpgrade("Microprestige", 23)},
            tooltip: "Purchase Microstrawman."
        },
        41: {
            name: "Prefacing conclusions",
            done() {return player.Miniprestige.points.gte(3)},
            tooltip: "Get 3 Miniprestiges. You now keep Micro upgrades on Miniprestige."
        },
        42: {
            name: "Stacked II",
            done() {return challengeCompletions("Nanoprestige", 12) >= 3},
            tooltip: "Complete Muckraking 3 times."

        },
        43: {
            name: "Leg Day",
            done() {return player.Nanoprestige.buyables[11].gte(125)},
            tooltip: "Buy Nanobuff 125 times."
        },
        44: {
            name: "Triple Threat",
            done() {return hasChallenge("Nanoprestige", 22)},
            tooltip: "Complete Nanofuse."
        }
        
    },
    canBuyMax() {
        return hasAchievement("Smallprestige", 41)
    },
    tabFormat: {
        "Upgrades": {
            content: ["main-display", "resource-display", "prestige-button", "upgrades"],
            unlocked() {return player.Miniprestige.points.gte(1)}
        },
        "Buyables": {
            content: ["main-display", "resource-display", "prestige-button", "buyables"],
            unlocked() {return false}          
        },
        "Challenges": {
            content: ["main-display", "resource-display", "prestige-button", "challenges"],
            unlocked() {return false}

        },
        "Achievements": {
            content: ["main-display", "resource-display", "achievements"],
            unlocked() {return player.Miniprestige.points.gte(1)}

        }
    },
    doReset(layer) {
        let keep = [];
        keep.push("achievements")
        if (layer.row == this.row) return
        else if (layer == "Smallprestige") {
            if (hasUpgrade("Smallprestige", 21)) keep.push("upgrades")
            layerDataReset(this.layer, keep)
        }
        else if (layer == "Partialprestige") {
            layerDataReset(this.layer, keep)
        }
    },
    layerShown(){
        return player.Microprestige.best.gte(1) || player.Miniprestige.best.gte(1) || player. Smallprestige.best.gte(1)}
})
