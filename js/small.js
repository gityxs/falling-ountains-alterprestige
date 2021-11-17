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
            description: "Miniprestige requirements are divided by 3, and Microprestige requirements are divided by 4.",
            cost: new Decimal(1),
            effect() {
                return Decimal.pow("1e25", player.Smallprestige.points.plus(1));
            },
            unlocked() {
                return player.Smallprestige.points.gte(1) || hasUpgrade("Smallprestige", 11)
            },
        }
    },
    
    layerShown(){
        return player.Miniprestige.points.gte(3) || player.Smallprestige.points.gte(1)}
})