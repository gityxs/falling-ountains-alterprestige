addLayer("Nanoprestige", {
    name: "Nanoprestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#5BCEFA",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Nanoprestiges", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base() {
        base = 1.5
        if (hasUpgrade("Nanoprestige", 35)) base = 1.46
        return base
    } ,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("Microprestige", 12)) mult = mult.div(3)
        if (hasUpgrade("Microprestige", 13)) mult = mult.div(upgradeEffect("Microprestige", 13))
        if (hasUpgrade("Nanoprestige", 21)  && !inChallenge("Nanoprestige", 21)&& !inChallenge("Nanoprestige", 11)) mult = mult.div(buyableEffect("Nanoprestige", 21))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("Nanoprestige", 42) && !inChallenge("Nanoprestige", 21)) mult = mult.times(1.04)
        if (hasUpgrade("Nanoprestige", 25) && !inChallenge("Nanoprestige", 21)) mult = mult.times(1.06)
        if (hasChallenge("Nanoprestige", 11)) mult = mult.times(1.1)
        if (hasChallenge("Nanoprestige", 21)) mult = mult.times(1.3)
        if (hasUpgrade("Nanoprestige", 51) && !inChallenge("Nanoprestige", 21)) mult = mult.times(1.1)
        if (hasUpgrade("Nanoprestige", 55)) mult = mult.times(1.23)
        return mult
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: Reset for Nanoprestiges", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    buyables: {
        11: {
            cost(x) {
                var cost
                cost = new Decimal("40").plus(Decimal.mul("5", x))
                if (hasUpgrade("Nanoprestige", 34) && !inChallenge("Nanoprestige", 12)) cost = cost.div(buyableEffect("Nanoprestige", 13))
                if (x.gte(110)) cost = cost.times(Decimal.pow(1.05, Decimal.sub(x, 110)))
                return cost;
            },
            title() { return "Nanobuff"},
            display() {
                var display;
                display = "Multiply Point gain by " + format(this.effect())+"<br><br>"
                display += "Cost: "+format(this.cost()) + " Nanoprestiges."
                return display;
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if (!hasUpgrade("Nanoprestige", 34)) player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                if (hasUpgrade("Nanoprestige",13)) {
                    return true
                } else return false

            },
            effect() {
                let eff = new Decimal(3).pow(player[this.layer].buyables[this.id])
                return eff
            },
            
        },
        12: {
            cost(x) {
                var cost;
                cost = new Decimal("85").plus(Decimal.mul("15", x))
                if (hasUpgrade("Nanoprestige", 34) && !inChallenge("Nanoprestige", 11)) cost = cost.div(buyableEffect("Nanoprestige", 13))
                if (x.gte(35)) cost = cost.times(Decimal.pow(1.05, Decimal.sub(x, 35)))
                return cost
            
            },
            title() { return "Nanogains"},
            display() {
                var display;
                display = "Multiply Point gain by " + format(this.effect())+"<br><br>"
                display += "Cost: "+format(this.cost()) + " Nanoprestiges."
                return display;
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if (!hasUpgrade("Nanoprestige", 34)) player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                if (hasUpgrade("Nanoprestige",33)) {
                    return true
                } else return false

            },
            effect() {
                let eff = new Decimal(4).pow(player[this.layer].buyables[this.id])
                return eff
            }
        },
        13: {
            title() {return "Nanomuscle"},
            cost(x) {return new Decimal("150").times(Decimal.pow(1.5, x))},
            display() {
            var display;
                display = "Divide buyable requirements by 1.05<br><br>"
                display += "Cost: "+format(this.cost()) + " Nanoprestiges."
                return display;
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if (!hasUpgrade("Nanoprestige", 34)) player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                if (hasUpgrade("Nanoprestige",34)) {
                    return true
                } else return false
            },
            effect() {
                var base = new Decimal(1.05)
                if (hasChallenge("Nanoprestige", 12)) base = new Decimal(1.1)
                let eff = new Decimal(base).pow(player[this.layer].buyables[this.id])
                return eff;
            }
        },
        21: {
            title() {return "Nanopierce"},
            cost(x) {
                var cost;
                cost = new Decimal("600").plus(Decimal.mul("50", x))
                if (hasUpgrade("Nanoprestige", 34) && !inChallenge("Nanoprestige", 11)) cost = cost.div(buyableEffect("Nanoprestige", 13))
                if (x.gte(100) && !hasUpgrade("Nanoprestige", 55)) { 
                    cost = cost.times(Decimal.pow(1.05, Decimal.sub(x, 100)))
                } else if (x.gte(125)) cost = cost.times(Decimal.pow(1.05, Decimal.sub(x, 125)))
                return cost
            },
            display() {
                var display;
                display = "Divide Nano and Microprestige requirements by 1.13<br><br>"
                display += "Cost: "+format(this.cost()) + " Nanoprestiges."
                return display;
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if (!hasUpgrade("Nanoprestige", 34)) player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                if (hasUpgrade("Nanoprestige",43)) {
                    return true
                } else return false
            },
            effect() {
                var base = new Decimal(1.13)
                if (hasUpgrade("Nanoprestige", 45)) base = base.plus(0.09)
                let eff = new Decimal(base).pow(player[this.layer].buyables[this.id])
                return eff;
            }
        },
        22: {
            title() {return "Nanophase"},
            cost(x) {
                var cost;
                cost = new Decimal("3500").plus(Decimal.mul("200", x))
                if (hasUpgrade("Nanoprestige", 34) && !inChallenge("Nanoprestige", 11)) cost = cost.div(buyableEffect("Nanoprestige", 13))
                if (x.gte(5)) cost = cost.times(Decimal.pow(1.05, Decimal.sub(x, 5)))
                return cost
            },
            display() {
                var display;
                display = "Increase Point gain exponent to ^1.01<br><br>"
                display += "Cost: "+format(this.cost()) + " Nanoprestiges."
                return display;
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if (!hasUpgrade("Nanoprestige", 34)) player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                if (hasUpgrade("Nanoprestige",52)) {
                    return true
                } else return false
            },
            effect() {
                var base = new Decimal(1.01)
                let eff = new Decimal(base).pow(player[this.layer].buyables[this.id])
                return eff;
            }
        }

    },
    upgrades: {
        11: {
            name: "Nanopoint",
            title: "Nanopoint",
            description: "Point gain is multiplied by 7.",
            cost: new Decimal(14),
            effect() {
                return player[this.layer].points.add(1);

            },
            unlocked() {return player.Miniprestige.points.gte(1)},
        },
        12: {
            name: "Nanopush",
            title: "Nanopush",
            description: "Point gain is multiplied by 7.",
            cost: new Decimal(20),
            unlocked() {return player.Miniprestige.points.gte(1)},
        },
        13: {
            name: "Nanobuy",
            title: "Nanobuy",
            description: "Unlock a Nanoprestige buyable.",
            cost: new Decimal(46),
            unlocked() {return player.Microprestige.points.gte(5)},

        },
        14: {
            name: "Nanorecharge",
            title: "Nanorecharge",
            description: "Divide Microprestige requirement by 1.3, and buyables no longer reset on Microprestige",
            cost: new Decimal(150),
            unlocked() {return hasUpgrade("Microprestige", 21)}
        
        },
        15: {
            name: "Nanohelp",
            title: "Nanohelp",
            description: "Divide Microprestige requirement based on Miniprestiges.",
            cost: new Decimal(1190),
            unlocked() {return hasUpgrade("Microprestige", 23)},
            effect() {return player.Miniprestige.points.pow(2).plus(1)},
            effectDisplay() {return format(player.Miniprestige.points.pow(2).plus(1))}
        },
        21: {
            name: "Nanoclick",
            title: "Nanoclick",
            description: "Point gain is multiplied by 7.",
            cost: new Decimal(26),
            unlocked() {return player.Miniprestige.points.gte(1)},
        },
        22: {
            name: "Nanoshove",
            title: "Nanoshove",
            description: "Point gain is multiplied by 7.",
            cost: new Decimal(32),
            unlocked() {return player.Miniprestige.points.gte(1)},

        },
        23: {
            name: "Nanosell",
            title: "Nanosell",
            description: "Automatically buy Nanoprestiges, and you can buy max Nanoprestiges.",
            cost: new Decimal(50),
            unlocked() {
                if (hasUpgrade("Nanoprestige", 13)) {
                    return true;
                } else return false;
            },

        },
        24: {
            name: "Nanodecharge",
            title: "Nanodecharge",
            description: "Divide Microprestige requirement by 1.3, and multiply point gain by 7.",
            cost: new Decimal(200),
            unlocked() {return hasUpgrade("Microprestige", 21)}
        
        },
        25: {
            name: "Nanoexpo",
            title: "Nanoexpo",
            description: "Reduce Nano cost scaling by a small amount.",
            cost: new Decimal(1205),
            unlocked() {return hasUpgrade("Microprestige", 23)},
        },
        31: {
            name: "Nanolove",
            title: "Nanolove",
            description: "Point gain is multiplied by 7.",
            cost: new Decimal(57),
            unlocked() {
                return hasUpgrade("Nanoprestige", 23)
            }

        },
        32: {
            name: "Nanohate",
            title: "Nanohate",
            description: "Point gain is multiplied by 7.",
            cost: new Decimal(64),
            unlocked() {
                return hasUpgrade("Nanoprestige", 23)
            }

        },
        33: {
            name: "Nanonull",
            title: "Nanonull",
            description: "Unlock another Nanoprestige buyable.",
            cost: new Decimal(104),
            unlocked() {
                return hasUpgrade("Nanoprestige", 23)
            }

        },
        34: {
            name: "Nanocharge",
            title: "Nanocharge",
            description: "Buyables no longer cost anything, and unlock a new one",
            cost: new Decimal(215),
            unlocked() {return hasUpgrade("Microprestige", 21)}
        
        },
        35: {
            name: "Nanoupward",
            title: "Nanoupward",
            description: "Reduce Nano base by a small amount.",
            cost: new Decimal(1300),
            unlocked() {return hasUpgrade("Microprestige", 23)},
        },
        41: {
            name: "NanoI",
            title: "NanoI",
            description: "Miniprestige no longer resets Nano upgrades or buyables, and point gain is multiplied by 7.",
            cost: new Decimal(610),
            unlocked() {return hasUpgrade("Microprestige", 22)}
        },
        42: {
            name: "NanoII",
            title: "NanoII",
            description: "Slightly decrease requirement for Nanoprestige.",
            cost: new Decimal(615),
            unlocked() {return hasUpgrade("Microprestige", 22)}
        },
        43: {
            name: "NanoIII",
            title: "NanoIII",
            description: "Unlock another Nanoprestige buyable.",
            cost: new Decimal(640),
            unlocked() {return hasUpgrade("Microprestige", 22)}

        },
        44: {
            name: "NanoIV",
            title: "NanoIV",
            description: "Unlock 2 Nanoprestige challenges",
            cost: new Decimal(650),
            unlocked() {return hasUpgrade("Microprestige", 22)}
        },
        45: {
            name: "NanoV",
            title: "NanoV",
            description: "Slightly increase power of Nanopierce, and you keep Challenges on Micro resets",
            cost: new Decimal(1405),
            unlocked() {return hasUpgrade("Microprestige", 23)},
        },
        51: {
            name: "Nanoscale",
            title: "Nanoscale",
            description: "Slightly reduce Nanoprestige cost scaling.",
            cost: new Decimal(3170),
            unlocked() {return hasUpgrade("Microprestige", 33)}
        },
        52: {
            name: "Nanobalance",
            title: "Nanobalance",
            description: "Unlock a new Nanoprestige buyable.",
            cost: new Decimal(3525),
            unlocked() {return hasUpgrade("Microprestige", 33)}

        },
        53: {
            name: "Nanomass",
            title: "Nanomass",
            description: "Slightly reduce Microprestige cost scaling.",
            cost: new Decimal(4115),
            unlocked() {return hasUpgrade("Microprestige", 33)}

        },
        54: {
            name: "Nanoweight",
            title: "Nanoweight",
            description: "Unlock 2 new Nanoprestige challenges.",
            cost: new Decimal(4545),
            unlocked() {return hasUpgrade("Microprestige", 33)}
        },
        55: {
            name: "Nanofinale",
            title: "Nanofinale",
            description: "Buyable 21's cost scaling occurs 100 upgrades later. Reduce base scaling for Nano.",
            cost: new Decimal(7290),
            unlocked() {return hasChallenge("Nanoprestige", 22)}
        }
    },
    challenges: {
        11: {
            name: "Nanoblock",
            challengeDescription: "Point gain is raised to ^1/10.",
            goalDescription: "2e12 points",
            canComplete: function() {return player.points.gte(2e12)},
            rewardDescription: "Point gain is raised to ^11/10, and Nanoprestige cost is reduced.",
            unlocked() {return hasUpgrade("Nanoprestige", 44)}
        },
        12: {
            name: "Muckraking",
            challengeDescription: "Buyables do not do anything.",
            goalDescription: "3.33e33 points",
            canComplete:function() {return player.points.gte(3.33e33)},
            rewardDescription: "Buyable 13's power is increased.",
            unlocked() {return hasUpgrade("Nanoprestige", 44)}
        },
        21: {
            name: "Nano?",
            challengeDescription: "Nano upgrades which multiply points have no effect. Buyables which multiply points have no effect.",
            goalDescription: "2e322 points",
            canComplete: function() {return player.points.gte("2e322")},
            rewardDescription: "Decrease Nanoprestige cost scaling significantly, and raise Point gain to ^1.1",
            unlocked() {return hasUpgrade("Nanoprestige", 54)}
        },
        22: {
            name: "Nanofuse",
            challengeDescription: "All previous challenges at once.",
            goalDescription: "2e38 points",
            canComplete: function() {return player.points.gte("2e38")},
            rewardDescription: "Unlock the final Nanoprestige upgrade (before Small Prestige resets).",
            unlocked() {return hasUpgrade("Nanoprestige", 54)},
            countsAs: [11, 12, 21]
        }


    },
    autoPrestige() {
        return hasUpgrade("Nanoprestige", 23)
    },
    doReset(layer) {
        let keep = [];
        if (layer.row == this.row) return
        else if (layer == "Microprestige") {
            if (hasUpgrade("Microprestige", 13) || hasUpgrade("Nanoprestige", 41)) keep.push("upgrades")
            if (hasUpgrade("Nanoprestige", 14) || hasUpgrade("Nanoprestige", 41)) keep.push("buyables")
            if (hasUpgrade("Nanoprestige", 45)) keep.push ("challenges")
            layerDataReset(this.layer, keep)
        } else if (layer == "Miniprestige") {
            if (hasUpgrade("Nanoprestige", 41)) {
                keep.push("upgrades")
                keep.push("buyables")
            }
            layerDataReset(this.layer, keep)

        } else if (layer == "Smallprestige") {
            layerDataReset(this.layer, keep)


        }
    },
    canBuyMax() {
        return hasUpgrade("Nanoprestige", 23)
    },
    tabFormat: {
        "Upgrades": {
            content: ["main-display", "resource-display", "prestige-button", "upgrades"],
            unlocked() {return player.Miniprestige.points.gte(1)}
        },
        "Buyables": {
            content: ["main-display", "resource-display", "prestige-button", "buyables"],
            unlocked() {return hasUpgrade("Nanoprestige",13)}          
        },
        "Challenges": {
            content: ["main-display", "resource-display", "prestige-button", "challenges"],
            unlocked() {return hasUpgrade("Nanoprestige", 44)}

        }




    },
    layerShown(){return true}
})
