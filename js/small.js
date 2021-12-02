addLayer("Smallprestige", {
    name: "Smallprestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#1C4482",
    requires: new Decimal(4), // Can be a function that takes requirement increases into account
    resource: "Small prestiges", // Name of prestige currency
    baseResource: "Miniprestiges", // Name of resource prestige is based on
    baseAmount() {return player.Miniprestige.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: 4,
    branches: ["Miniprestige"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "S: Reset for Small Prestiges", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    
    upgrades: {

    },
    achievements: {
        11: {
            name: "Not so impossible",
            done() {return player.Smallprestige.points.gte(1)},
            tooltip: "Small Prestige for the first time. You can now get Broken layers. Also multiplies point gain more based on Smallprestiges.",
            effect() {
                return Decimal.pow("1e25", player.Smallprestige.points.plus(1));
            }
        },
        12: {
            name: "Mandatory feature unlock",
            done() {return player.Nanoprestige.points.gte(20000)},
            tooltip: "Get 20,000 Nanoprestiges. Unlocks new Micro upgrades."
        },
        13: {
            name: "That kinda blew up",
            done() {return player.Nanoprestige.points.gte(200000)},
            tooltip: "Get 200,000 Nanoprestiges. Unlocks new Micro upgrades."

        },
        14: {
            name: "That really blew up",
            done() {return player.Nanoprestige.points.gte(2000000)},
            tooltip: "Get 2,000,000 Nanoprestiges. Unlocks new Micro upgrades."

        },
        21: {
            name: "Confused?",
            done() {return player.Smallprestige.points.gte(2)},
            tooltip: "Small Prestige for the second time. Multiplies Nanoprestige Point gain based on Miniprestiges.",
            effect() {
                return Decimal.pow("3", player.Miniprestige.points.plus(1));
            },
        },
        23: {
            name: "Mandatory 69 joke",
            done() {return player.BrokenNano.points.gte(1e69)},
            tooltip: "Get 1e69 Nanoprestige Points."
        },
        22: {
            name: "Actually challenged?",
            done() {return hasChallenge("Microprestige", 11)},
            tooltip: "Complete Microblock."
        },
        24: {
            name: "1.105",
            done() {return hasUpgrade("Nanoprestige", 74)},
            tooltip: "Get NanoIX"
        },
        31: {
            name: "It got even worse",
            done() {return player.Smallprestige.points.gte("3")},
            tooltip: "Small prestige for the third time. Increases power of Nanoskewer, Nanopierce, and Nanomuscle, and you no longer lose upgrades on Small resets."
        },
        32: {
            name: "Infinite Again",
            done() {return player.BrokenNano.points.gte("1.79e308")},
            tooltip: "Get infinite Nanoprestige points."
        },
        33: {
            name: "One hundred thousand",
            done() {return player.points.gte("1e150000")},
            tooltip: "Get 1e150,000 points. Have you noticed the point softcaps yet?"
        },
        34: {
            name: "The Nanoprestige Abyss",
            done() {return hasUpgrade("Nanoprestige", 56)},
            tooltip: "Purchase NanoXXV."
        },
        41: {
            name: "It got worse again",
            done() {return player.Smallprestige.points.gte("4")},
            tooltip: "Small Prestige for the fourth time. You can now break Micro, and buy max Mini."
        },
        42: {
            name: "Break it again",
            done() {return player.BrokenMicro.points.gte(1)},
            tooltip: "Break Microprestige"
        },
        43: {
            name: "Jealousy",
            done() {return player.Miniprestige.points.gte(600)},
            tooltip: "Get 600 Miniprestiges."
        },
        44: {
            name: "End of an era",
            done() {return player.BrokenMicro.points.gte(1e9)},
            tooltip: "Get 1e9 Microprestige Points."
        }
    },
    tabFormat: {
        "Upgrades": {
            content: ["main-display", "resource-display", "prestige-button", "upgrades"],
            unlocked() {return true}
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
            unlocked() {return true}

        }
    },
    doReset(layer) {
        let keep = [];
        keep.push("achievements")
        if (layer.row == this.row) return
        else if (layer == "Partialprestige") {
            layerDataReset(this.layer, keep)
        }

    },
    layerShown(){
        return player.Miniprestige.best.gte(3) || player.Smallprestige.best.gte(1)}
})