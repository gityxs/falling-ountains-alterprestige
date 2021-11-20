
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
    branches: ["Microprestige"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("BrokenNano", 11)) mult = mult.div(buyableEffect("Nanoprestige", 31))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("Nanoprestige", 65)) mult = mult.times(1.2)
        return new Decimal(mult)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "M", description: "M: Reset for Miniprestiges", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    
    upgrades: {
        11: {
            name: "Minicut",
            title: "Minicut",
            description: "Microprestige requirements are divided by 2, and Point gain is multiplied by 7.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1);
            },
            unlocked() {return (player.Miniprestige.points.gte(1) || hasUpgrade("Miniprestige", 11))},
        },
        12: {
            name: "Minilife",
            title: "Minilife",
            description: "Add 2 new Microprestige upgrades, and multiply Point gain by 7",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade("Miniprestige", 11)}
        },
        21: {
            name: "Ministab",
            title: "Ministab",
            description: "Every Miniprestige upgrade adds new Microprestige upgrades. Keep Microprestige upgrades on Miniprestige.",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade("Miniprestige", 12)}
        },
        22: {
            name: "Minirelax",
            title: "Minirelax",
            description: "You no longer lose Nanoprestige upgrades on Small resets. Nanoprestige buyable autobuyers unlocked.",
            cost: new Decimal(4),
            unlocked() {return hasAchievement("Smallprestige",11)}
        },
        13: {
            name: "Miniforce",
            title: "Miniforce",
            description: "Square Microagression and Microstrawman. Break Nano by an additional 33%.",
            cost: new Decimal(5),
            unlocked() {return hasAchievement("Smallprestige", 11)}
        },
        23: {
            name: "Minishark",
            title: "Minishark",
            description: "Unlock some Broken Nanoprestige upgrades. Divide Microprestige cost by 10.",
            cost: new Decimal(7),
            unlocked() {return hasUpgrade("Microprestige", 42)}
        }
    },
    achievements:{
        11: {
            name: "To begin (for real this time)",
            done() {return player.Miniprestige.points.gte(1)},
            tooltip: "Miniprestige for the first time. Unlocks the Upgrade subtab on all layers."
        },
        12: {
            name: "Possibly capitalism",
            done() {return hasUpgrade("Nanoprestige", 11)},
            tooltip: "Get the first Nanoprestige upgrade."
        },
        13: {
            name: "Upgrade after upgrade",
            done() {return hasUpgrade("Nanoprestige", 22)},
            tooltip: "Get the fourth Nanoprestige upgrade."
        },
        14: {
            name: "Definitely capitalism",
            done() {return hasUpgrade("Nanoprestige", 13)},
            tooltip: "Unlock the first Nanoprestige buyable."
        },
        21: {
            name: "Dynamic upgrades",
            done() {return hasUpgrade("Microprestige", 13)},
            tooltip: "Get the third Microprestige upgrade."
        },
        23: {
            name: "Not so nano",
            done() {return hasUpgrade("Nanoprestige", 34)},
            tooltip: "Get the 12th Nanoprestige upgrade."
        },
        22: {
            name: "3x3",
            done() {return hasUpgrade("Nanoprestige", 33)},
            tooltip: "Get the first 9 Nanoprestige upgrades.",

        },
        24: {
            name: "μ's",
            done() {return player.Microprestige.points.gte(9)},
            tooltip: "Get 9 Microprestiges."
        },
        31: {
            name: "Put in the effort",
            done() {return player.Miniprestige.points.gte(2)},
            tooltip: "Get 2 Miniprestiges."
        },
        32: {
            name: "Effortless",
            done() {return hasUpgrade("Miniprestige", 12)},
            tooltip: "Buy the second Miniprestige upgrade."
        },
        33: {
            name: "Not so micro",
            done() {return hasUpgrade("Microprestige", 22)},
            tooltip: "Buy the fifth Microprestige upgrade."
        },
        34: {
            name: "Slightly challenged",
            done() {return hasChallenge("Nanoprestige", 12)},
            tooltip: "Complete Muckraking"
        },
        41: {
            name: "Prefacing conclusions",
            done() {return player.Miniprestige.points.gte(3)},
            tooltip: "Get 3 Miniprestiges."

        },
        42: {
            name: "Y2K",
            done() {return player.Nanoprestige.points.gte(2000)},
            tooltip: "Get 2000 Nanoprestiges."
        },
        44: {
            name: "Life, the Universe, and Everything",
            done() {return player.Microprestige.points.gte(42)},
            tooltip: "Get 42 Microprestiges."
        },
        43: {
            name: "Infinity?",
            done() {return player.points.gte("1.79e308")},
            tooltip: "Get over 1.79e308 points."
        },
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
        if (layer.row == this.row) return
        else if (layer == "Smallprestige") {
            keep.push("achievements")
            layerDataReset(this.layer, keep)
        }

    },
    layerShown(){
        return player.Microprestige.best.gte(2) || player.Miniprestige.best.gte(1) || player. Smallprestige.best.gte(1)}
})
