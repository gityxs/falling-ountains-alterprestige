
addLayer("Microprestige", {
    name: "Microprestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "μ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#F5A9B8",
    requires: new Decimal(2), // Can be a function that takes requirement increases into account
    resource: "Microprestiges", // Name of prestige currency
    baseResource: "Nanoprestiges", // Name of resource prestige is based on
    baseAmount() {return player.Nanoprestige.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: 2,
    branches: ["Nanoprestige"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("Nanoprestige", 14)) mult = mult.div(1.3)
        if (hasUpgrade("Nanoprestige", 24)) mult = mult.div(1.3)
        if (hasUpgrade("Nanoprestige", 34)) mult = mult.div(buyableEffect("Nanoprestige", 13))
        if (hasUpgrade("Nanoprestige", 43)) mult = mult.div(buyableEffect("Nanoprestige", 21))
        if (hasUpgrade("Nanoprestige", 15)) mult = mult.div(upgradeEffect("Nanoprestige", 15))
        if (hasUpgrade("Miniprestige", 11)) mult = mult.div(2)
        if (hasUpgrade("Miniprestige", 23)) mult = mult.div(10)
        if (hasUpgrade("BrokenNano", 11)) mult = mult.div(buyableEffect("Nanoprestige", 31))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("Nanoprestige", 53)) mult = mult.times(1.3)
        if (hasUpgrade("Microprestige", 24)) mult = mult.times(1.5)
        if (hasUpgrade("Nanoprestige", 65)) mult = mult.times(1.5)
        if (hasUpgrade("Microprestige", 41)) mult = mult.times(new Decimal(1).plus(Decimal.mul(0.02, player.Nanoprestige.upgrades.length)))
        
        return new Decimal(mult)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: ",", description: ",: Reset for Microprestiges", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    buyables: {
        11: {
            cost(x) {
                var cost
                cost = new Decimal("60").plus(Decimal.mul("5", x))
                if (x.gte(25)) cost = cost.times(Decimal.pow(1.03, Decimal.sub(x, 25)))
                if (x.gte(70)) cost = cost.times(Decimal.pow(1.05, Decimal.sub(x, 2)))
                if (x.gte(25)) cost = cost.pow(1.08)
                if (hasUpgrade("Microprestige",43)) cost = cost.div(buyableEffect("Microprestige", 12))
                if (hasUpgrade("BrokenNano",13)) cost = cost.div(buyableEffect("Nanoprestige", 13))
                return cost;
            },
            title() { return "Microbuff"},
            display() {
                var display;
                display = "Divide Nano scaling by " + format(this.effect())+"<br><br>"
                display += "Cost: "+format(this.cost()) + " Microprestiges."
                return display;
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                if (hasUpgrade("Microprestige",14)) {
                    return true
                } else return false

            },
            effect() {
                var base = new Decimal(1.06)
                if (hasUpgrade("Microprestige",34)) base = base.plus(0.03)
                let eff = new Decimal(base).pow(player[this.layer].buyables[this.id])
                return eff
            },
            
        },
        12: {
            cost(x) {
                var cost
                cost = new Decimal("340").plus(Decimal.mul("5", x))
                if (x.gte(5)) cost = cost.times(Decimal.pow(1.03, Decimal.sub(x, 5)))
                if (x.gte(10)) cost = cost.times(Decimal.pow(1.05, Decimal.sub(x, 10)))
                if (x.gte(25)) cost = cost.pow(1.08)
                return cost;
            },
            title() { return "Micromuscle"},
            display() {
                var display;
                display = "Divide buyable costs by " + format(this.effect())+"<br><br>"
                display += "Cost: "+format(this.cost()) + " Microprestiges."
                display += "<br> This buyable does not work on Nanomuscle."
                return display;
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                if (hasUpgrade("Microprestige", 43)) {
                    return true
                } else return false

            },
            effect() {
                var base = new Decimal(1.03)
                let eff = new Decimal(base).pow(player[this.layer].buyables[this.id])
                return eff
            },
            
        },


    },
    upgrades: {
        11: {
            name: "Micropoint",
            title: "Micropoint",
            description: "Point gain is multiplied by 7.",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1);

            },
            unlocked() {return player.Miniprestige.points.gte(1)},
        },
        12: {
            name: "Micropush",
            title: "Micropush",
            description: "Nanoprestige cost is divided by 3.",
            cost: new Decimal(5),
            unlocked() {return player.Miniprestige.points.gte(1)},
        },
        13: {
            name :"Micromint",
            title: "Micromint",
            description: "Nanoprestige cost divided by nanoprestiges. Upgrades no longer reset on Microprestige.",
            cost: new Decimal(6),
            
            effect() {
                return player.Nanoprestige.points.plus(1);
            },
            effectDisplay() {return "/"+format(player.Nanoprestige.points.plus(1))},
            unlocked() {return player.Miniprestige.points.gte(1)},
        },
        14: {
            name:"Microhelp",
            title: "Microrecharge",
            description: "Unlock a Microprestige buyable.",
            cost: new Decimal(84),
            unlocked() {return hasUpgrade("Miniprestige", 22)}
        },
        21: {
            name:"Microgesture",
            title:"Microgesture",
            description: "Unlock a new set of Nano upgrades, and Nanoprestiges give a bigger boost to point gain.",
            cost: new Decimal(7),
            effect() {
                return player.Nanoprestige.points.plus(1);
            },
            effectDisplay() {return "x"+format(player.Nanoprestige.points.plus(1))},
            unlocked() {return hasUpgrade("Nanoprestige", 33)}
        },
        22: {
            name:"Microagression",
            title:"Microagression",
            description: "Microprestiges give a bigger boost to point gain, and unlock new Nanoprestige upgrades.",
            cost: new Decimal(11),
            unlocked() {return hasUpgrade("Miniprestige", 12)},
            effect() {
                var eff = new Decimal(10).pow(player.Microprestige.points.plus(1))
                if (hasUpgrade("Microprestige", 31)) eff = eff.pow(2)
                if (hasUpgrade("Miniprestige", 13)) eff = eff.pow(2)
                if (eff.gte("1e1000")) {
                    eff = eff.div("1e1000")
                    eff = eff.pow(0.1)
                    eff = eff.mul("1e1000")
                }
                return eff;
            },
            effectDisplay() {
                var eff = new Decimal(10).pow(player.Microprestige.points.plus(1))
                if (hasUpgrade("Microprestige", 31)) eff = eff.pow(2)
                if (hasUpgrade("Miniprestige", 13)) eff = eff.pow(2)
                if (eff.gte("1e1000")) {
                    eff = eff.div("1e1000")
                    eff = eff.pow(0.1)
                    eff = eff.mul("1e1000")
                }
                return "x" + format(eff);
            },

        },
        23: {
            name: "Microstrawman",
            title: "Microstrawman",
            description: "Miniprestiges give a bigger boost to point gain, and unlock new Nanoprestige upgrades.",
            cost: new Decimal(15),
            unlocked() {return hasUpgrade("Miniprestige", 12)},
            effect() { 
                var eff = new Decimal(1e10).pow(player.Miniprestige.points.plus(1))
                if (hasUpgrade("Microprestige", 32)) eff = eff.pow(2)
                if (hasUpgrade("Miniprestige", 13)) eff = eff.pow(2)
                if (hasUpgrade("Nanoprestige", 62)) eff = eff.pow(3)
                return eff;
            },
            effectDisplay() {
                var eff = new Decimal(1e10).pow(player.Miniprestige.points.plus(1))
                if (hasUpgrade("Microprestige", 32)) eff = eff.pow(2)
                if (hasUpgrade("Miniprestige", 13)) eff = eff.pow(2)
                return "x" + format(eff);
            }

        },
        24: {
            name: "Microexpo",
            title: "Microexpo",
            description: "Automatically Microprestige. Microprestige scaling decreased.",
            cost: new Decimal(91),
            unlocked() {return hasAchievement("Smallprestige", 12)}

        },
        31: {
            name: "Microlove",
            title: "Microlove",
            description: "Square Microagression, and multiply Point gain by 7.",
            cost: new Decimal(29),
            unlocked() {return hasUpgrade("Miniprestige", 11) && hasUpgrade("Miniprestige", 21)},
        },
        32: {
            name: "Microhate",
            title: "Microhate",
            description: "Square Microstrawman, and multiply Point gain by 2401.",
            cost: new Decimal(36),
            unlocked() {return hasUpgrade("Miniprestige", 12) && hasUpgrade("Miniprestige", 21)}
        },
        33: {
            name: "Microshove",
            title: "Microshove",
            description: "Multiply point gain based on Micro upgrades gained. Add new Nano upgrades.",
            cost: new Decimal(42),
            unlocked() {return hasUpgrade("Miniprestige", 21)},
            effect() {return new Decimal(1e7).pow(player.Microprestige.upgrades.length)},
            effectDisplay() {return "x" + format(new Decimal(1e7).pow(player.Microprestige.upgrades.length))}
        },
        34: {
            name: "Micronano",
            title: "Micronano",
            description: "Nanoprestiges no longer reset anything, gives 33% progress to breaking Nano, and improves Microbuff.",
            cost: new Decimal(152),
            unlocked() {return hasAchievement("Smallprestige", 12)}
        },
        41: {
            name: "Microfracture",
            title: "Microfracture",
            description: "Microprestige scaling is decreased based on total Nanoprestige upgrades bought. Nano is 33% more broken.",
            cost: new Decimal(164),
            unlocked() {return hasAchievement("Smallprestige", 13)}
        },
        42: {
            name: "Microshatter",
            title: "Microshatter",
            description: "Nano. Nano? N̡̅anō͙. N̠̍ā͎͔̠͉̪̉̀̕͞n̢͓̘̗̐̈̆̋͟͡ò̡̢̇.",
            cost: new Decimal(275),
            unlocked() {return hasUpgrade("Miniprestige", 13)}
        },
        43: {
            name: "Microreduction",
            title: "Microreduction",
            description: "Unlock a new buyable.",
            cost: new Decimal(349),
            unlocked() {return hasUpgrade("Miniprestige", 13)}
        },
        44: {
            name: "Microplummet",
            title: "Microplummet",
            description: "Divide Nanoprestige cost by 1e5000.",
            cost: new Decimal(829),
            unlocked() {return hasUpgrade("Miniprestige", 23)}
        }
    },
    doReset(layer) {
        let keep = [];
        if (layer.row == this.row) return
        else if (layer == "Miniprestige") {
            if (hasUpgrade("Miniprestige", 21)) keep.push("upgrades")
            layerDataReset(this.layer, keep)
        } else if (layer == "Smallprestige") {

            layerDataReset(this.layer, keep)

        }
    },
    autoPrestige() {
        return hasUpgrade("Microprestige", 24)
    },
    canBuyMax() {
        return hasUpgrade("Microprestige", 24)
    },
    tabFormat: {
        "Upgrades": {
            content: ["main-display", "resource-display", "prestige-button", "upgrades"],
            unlocked() {return player.Miniprestige.points.gte(1)}
        },
        "Buyables": {
            content: ["main-display", "resource-display", "prestige-button", "buyables"],
            unlocked() {return hasUpgrade("Microprestige", 14)}          
        },
        "Challenges": {
            content: ["main-display", "resource-display", "prestige-button", "challenges"],
            unlocked() {return false}

        }




    },
    layerShown(){return true}
})
