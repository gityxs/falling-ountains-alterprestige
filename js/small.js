addLayer("Smallprestige", {
    name: "Smallprestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#F5A9B8",
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
        11: {
            name: "Small world",
            title: "Small world",
            description: "Multiply Point gain based on Small prestiges",
            cost: new Decimal(1),
            effect() {
                return Decimal.pow("1e25", player.Smallprestige.points.plus(1));
            },
            unlocked() {
                return player.Smallprestige.points.gte(1) || hasUpgrade("Smallprestige", 11)
            },
        }
    },
    achievements: {
        11: {
            name: "Not so impossible",
            done() {return player.Smallprestige.points.gte(1)},
            tooltip: "Small Prestige for the first time. You can now get Broken layers."
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
            tooltip: "Small Prestige for the second time."
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
    layerShown(){
        return player.Miniprestige.best.gte(3) || player.Smallprestige.best.gte(1)}
})