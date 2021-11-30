addLayer("Partialprestige", {
    name: "Partialprestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#5BCEFA",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "Partial prestiges", // Name of prestige currency
    baseResource: "Small prestiges", // Name of resource prestige is based on
    baseAmount() {return player.Smallprestige.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: 5,
    branches: ["Smallprestige"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "p: Reset for Partial Prestiges", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    
    upgrades: {
     
    },
    achievements: {
        11: {
            name: "Partially responsible",
            done() {return player.Partialprestige.points.gte(1)},
            tooltip: "Partial Prestige for the first time. In the next update, this unlocks Tokens."
        },
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
        return player.Smallprestige.best.gte(4) || player.Partialprestige.best.gte(1)}
})