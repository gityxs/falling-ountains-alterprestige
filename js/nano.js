addLayer("Nanoprestige", {
    name: "Nanoprestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        hiddenRows: 0,
        corruptionTick:new Decimal(0),
        corruption:0,
    }},
    color: "#5BCEFA",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Nanoprestiges", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    effect() {
        var eff = player.Nanoprestige.points.plus(1)
        if (hasUpgrade("Microprestige", 21)) eff = eff.pow(2)
        if (hasUpgrade("Nanoprestige", 42)) eff = eff.pow(2)
        if (challengeCompletions("Nanoprestige", 11) >= 1) eff = eff.pow(2)
        if (challengeCompletions("Nanoprestige", 11) >= 2) eff = eff.pow(2)
        if (challengeCompletions("Nanoprestige", 11) >= 5) eff = eff.pow(2)
        if (hasUpgrade("Nanoprestige", 62)) eff = eff.pow(3)
        if (inChallenge("Nanoprestige", 21)) eff = new Decimal(1)
        return eff
    },
    effectDescription() {
        var desc;
        desc = "which are multiplying Point gain by "
        desc += format(tmp.Nanoprestige.effect) + "x"
        if (hasUpgrade("Microprestige", 41) && !hasUpgrade("Microprestige", 42)) return "IT'S GETTING WORSE"
        if (hasUpgrade("Microprestige", 34) && !hasUpgrade("Microprestige", 42)) return "what have you done"
        return desc
    },
    base() {
        base = 1.5
        if (hasUpgrade("Nanoprestige", 35)) base = 1.46
        return base
    } ,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("Microprestige", 12)) mult = mult.div(3)
        if (hasUpgrade("Microprestige", 13)) mult = mult.div(upgradeEffect("Microprestige", 13))
        if (hasUpgrade("Microprestige", 44)) mult = mult.div("1e5000")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        mult = new Decimal(1)
        if (hasChallenge("Nanoprestige", 21)) mult = mult.times(1.3)
        if (hasUpgrade("Nanoprestige", 51)) mult = mult.times(1.1)
        if (hasUpgrade("Nanoprestige", 55)) mult = mult.times(1.2)
        if (hasUpgrade("Microprestige",14)) mult = mult.times(buyableEffect("Microprestige", 11))
        return mult
    },
    directMult() {
        mult = new Decimal(1)
        if (hasUpgrade("Microprestige",14)) mult = mult.times(buyableEffect("Microprestige", 11))
        if(hasUpgrade("Nanoprestige", 84)) mult = mult.times(upgradeEffect("Nanoprestige", 84))
        if(hasUpgrade("Nanoprestige", 16)) mult = mult.times(upgradeEffect("Nanoprestige", 16))
        if(hasUpgrade("Nanoprestige", 26)) mult = mult.times(upgradeEffect("Nanoprestige", 26))
        if(hasUpgrade("BrokenNano", 11)) mult = mult.times(buyableEffect("BrokenNano", 11))
        if(hasUpgrade("BrokenNano", 21)) mult = mult.times(upgradeEffect("BrokenNano", 21))
        if (hasUpgrade("Nanoprestige", 64)) mult = mult.times(upgradeEffect("Nanoprestige", 64))
        if (hasUpgrade("Microprestige", 44)) mult = mult.times(upgradeEffect("Microprestige", 44))
        if (hasChallenge("Microprestige", 11)) mult = mult.times(tmp.Microprestige.effect)
        if (hasUpgrade("Nanoprestige", 71)) mult = mult.times(upgradeEffect("Nanoprestige", 71))
        return mult

    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: Reset for Nanoprestiges", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tickCorruption() {
        if (player.Nanoprestige.corruptionTick.lte(5)) player.Nanoprestige.corruptionTick = player.Nanoprestige.corruptionTick.plus(1)
        else {
            player.Nanoprestige.corruption = Math.random()
            player.Nanoprestige.corruptionTick = new Decimal(0)
        }
        if (hasUpgrade("Microprestige", 42)) player.Nanoprestige.corruption = 0;

    },
    buyables: {
        11: {
            cost(x) {
                var cost
                var base2 = new Decimal(1.12)
                var expo = new Decimal(1.2)
                if (hasUpgrade("Nanoprestige", 41)) expo = 1.1
                if (hasUpgrade("Nanoprestige", 35)) base2 = 1.1
                cost = new Decimal("35").plus(x.pow(1/2).mul(Decimal.pow(base2, x.pow(expo))))
                if (hasUpgrade("Nanoprestige", 14)) cost = cost.div(2)
                if (hasUpgrade("Nanoprestige", 34) && !inChallenge("Nanoprestige", 12)) cost = cost.div(buyableEffect("Nanoprestige", 13))
                if (challengeCompletions("Nanoprestige", 11) >= 4) cost = cost.div(Decimal.pow(1.25, challengeCompletions("Nanoprestige", 11)))
                if (player.Nanoprestige.buyables[11].gte(5000)) cost = Decimal.dInf
                return Decimal.ceil(cost)
            },
            title() { return "Nanobuff"},
            display() {
                var base = new Decimal(3)
                var base2 = new Decimal(1.12)
                var expo = new Decimal(1.2)
                if (hasUpgrade("Nanoprestige", 41)) expo = 1.1
                if (hasUpgrade("Nanoprestige", 35)) base2 = 1.1
                if (hasUpgrade("Microprestige", 22)) base = base.plus(0.5)
                base = base.plus(buyableEffect("Nanoprestige", 22))
                if (hasUpgrade("Nanoprestige", 55)) base = base.plus(buyableEffect("Nanoprestige", 22))
                if (challengeCompletions("Nanoprestige", 12) >= 1) base = base.plus(1)
                if (hasUpgrade("Nanoprestige", 25)) base = base.times(player.points.plus(10).log10().log10().plus(1))
                if (challengeCompletions("Nanoprestige", 12) >= 3 && !(challengeCompletions("Nanoprestige", 12) >= 5)) base = base.times(Decimal.mul(challengeCompletions("Nanoprestige", 12), 1).plus(1))
                if (challengeCompletions("Nanoprestige", 12) >= 5) base = base.times(Decimal.mul(challengeCompletions("Nanoprestige", 12)+challengeCompletions("Nanoprestige", 11)+challengeCompletions("Nanoprestige", 21)+challengeCompletions("Nanoprestige", 22), 1).plus(1))
                if (challengeCompletions("Nanoprestige", 21) >= 3) base = base.times(buyableEffect("Nanoprestige", 22).plus(1))
                if (hasUpgrade("BrokenNano", 22)) base = base.times(upgradeEffect("BrokenNano", 22))
                if (hasUpgrade("Microprestige", 43)) base = base.times(buyableEffect("Microprestige", 12))
                var display;
                display = "Multiply Point gain by " + format(this.effect())+"x<br>"
                display += "Formula: "+ format(base) + "^x<br><br>"
                display += "Cost: "+format(this.cost()) + " Nanoprestiges.<br>"
                display += "Cost formula: 35 + √(x)*" + format(base2) +"^(x^" + format(expo) + ")"
                return display;
            },
            canAfford() { 
                return (player[this.layer].points.gte(this.cost()) && player.Nanoprestige.buyables[11].lt(5000))
            },
            buy() {
                if (!hasUpgrade("Nanoprestige", 34)) player[this.layer].points = player[this.layer].points.sub(this.cost(player.Nanoprestige.buyables[11]))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                if (hasUpgrade("Nanoprestige",13)) {
                    return true
                } else return false

            },
            effect() {
                var base = new Decimal(3)
                if (hasUpgrade("Microprestige", 22)) base = base.plus(0.5)
                if (challengeCompletions("Nanoprestige", 12) >= 1) base = base.plus(1)
                base = base.plus(buyableEffect("Nanoprestige", 22))
                if (hasUpgrade("Nanoprestige", 25)) base = base.times(player.points.plus(10).log10().log10().plus(1))
                if (challengeCompletions("Nanoprestige", 12) >= 3 && !(challengeCompletions("Nanoprestige", 12) >= 5)) base = base.times(Decimal.mul(challengeCompletions("Nanoprestige", 12), 1).plus(1))
                if (challengeCompletions("Nanoprestige", 12) >= 5) base = base.times(Decimal.mul(challengeCompletions("Nanoprestige", 12)+challengeCompletions("Nanoprestige", 11)+challengeCompletions("Nanoprestige", 21)+challengeCompletions("Nanoprestige", 22), 1).plus(1))
                if (challengeCompletions("Nanoprestige", 21) >= 3) base = base.times(buyableEffect("Nanoprestige", 22).plus(1))
                if (hasUpgrade("Microprestige", 43)) base = base.times(buyableEffect("Microprestige", 12))
                if (hasUpgrade("BrokenNano", 22)) base = base.times(upgradeEffect("BrokenNano", 22))
                var eff = new Decimal(base).pow(player[this.layer].buyables[this.id])
                if (inChallenge("Nanoprestige", 12)) eff = new Decimal(1)
                return eff
            },
            
        },
        12: {
            cost(x) {
                var cost;
                cost = new Decimal("70").plus(Decimal.mul(10, Decimal.pow(1.25, x.pow(1.1))))
                if (hasUpgrade("Nanoprestige", 14)) cost = cost.div(2)
                if (hasUpgrade("Nanoprestige", 34) && !inChallenge("Nanoprestige", 11)) cost = cost.div(buyableEffect("Nanoprestige", 13))
                if (challengeCompletions("Nanoprestige", 11) >= 4) cost = cost.div(Decimal.pow(1.25, challengeCompletions("Nanoprestige", 11)))
                if (player.Nanoprestige.buyables[12].gte(5000)) cost = Decimal.dInf
                return Decimal.ceil(cost)
            
            },
            title() { return "Nanogains"},
            display() {
                var display;
                var base = Decimal.mul(player.Nanoprestige.upgrades.length, 1/2.5).plus(1)
                if (challengeCompletions("Nanoprestige", 12) >= 1) base = base.plus(Decimal.mul(player.Nanoprestige.upgrades.length, 1/5))
                if (hasUpgrade("Nanoprestige", 55)) base = base.plus(buyableEffect("Nanoprestige", 22))
                if (challengeCompletions("Nanoprestige", 12) >= 2 && !(challengeCompletions("Nanoprestige", 12) >= 5)) base = base.times(Decimal.mul(challengeCompletions("Nanoprestige", 12), 0.5).plus(1))
                if (challengeCompletions("Nanoprestige", 12) >= 5) base = base.times(Decimal.mul(challengeCompletions("Nanoprestige", 12)+challengeCompletions("Nanoprestige", 11)+challengeCompletions("Nanoprestige", 21)+challengeCompletions("Nanoprestige", 22), 0.5).plus(1))
                if (hasUpgrade("Microprestige", 43)) base = base.times(buyableEffect("Microprestige", 12))
                if (hasUpgrade("BrokenNano", 22)) base = base.times(upgradeEffect("BrokenNano", 22))
                display = "Multiply Point gain by " + format(this.effect())+"x<br>"
                display += "Formula: " + format(base) +"^x<br><br>"
                display += "Cost: "+format(this.cost()) + " Nanoprestiges.<br>"
                display += "Cost formula:"
                display += " 70 + 15*1.25^(x^1.1)"
                return display;
            },
            canAfford() {return (player[this.layer].points.gte(this.cost()) && player.Nanoprestige.buyables[12].lt(5000))},
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
                var base = Decimal.mul(player.Nanoprestige.upgrades.length, 1/2.5).plus(1)
                if (challengeCompletions("Nanoprestige", 12) >= 1) base = base.plus(Decimal.mul(player.Nanoprestige.upgrades.length, 1/5))
                if (hasUpgrade("Nanoprestige", 55)) base = base.plus(buyableEffect("Nanoprestige", 22).times(2))
                if (challengeCompletions("Nanoprestige", 12) >= 2 && !(challengeCompletions("Nanoprestige", 12) >= 5)) base = base.times(Decimal.mul(challengeCompletions("Nanoprestige", 12), 0.5).plus(1))
                if (challengeCompletions("Nanoprestige", 12) >= 5) base = base.times(Decimal.mul(challengeCompletions("Nanoprestige", 12)+challengeCompletions("Nanoprestige", 11)+challengeCompletions("Nanoprestige", 21)+challengeCompletions("Nanoprestige", 22), 0.5).plus(1))
                if (hasUpgrade("Microprestige", 43)) base = base.times(buyableEffect("Microprestige", 12))
                if (hasUpgrade("BrokenNano", 22)) base = base.times(upgradeEffect("BrokenNano", 22))
                var eff = new Decimal(base).pow(player[this.layer].buyables[this.id])
                if (inChallenge("Nanoprestige", 12)) eff = new Decimal(1)
                return eff
            }
        },
        13: {
            title() {
                if (hasUpgrade("Microprestige", 34) && player.Nanoprestige.corruption >= 0.9) return "ampqYXNkb2xhaXdqZHc"
                else return "Nanomuscle"
            
            },
            cost(x) {
                var cost = new Decimal("150").times(Decimal.pow(1.5, x.pow(1.1)))
                if (challengeCompletions("Nanoprestige", 11) >= 4) cost = cost.div(Decimal.pow(1.25, challengeCompletions("Nanoprestige", 11)))
                if (player.Nanoprestige.buyables[13].gte(5000)) cost = Decimal.dInf
                return cost
            
            },
            display() {
            var display;
                display = "Divide buyable and Microprestige requirements by " + format(this.effect()) +"<br>"
                display += "Effect: /"
                base = new Decimal(1.2)
                base = base.plus(buyableEffect("Nanoprestige", 21))
                if (challengeCompletions("Nanoprestige", 12) >= 1) base = base.plus(new Decimal(1))
                if (challengeCompletions("Nanoprestige", 12) >= 4 && !(challengeCompletions("Nanoprestige", 12) >= 5)) base = base.times(Decimal.mul(challengeCompletions("Nanoprestige", 12), 0.25).plus(1))
                if (challengeCompletions("Nanoprestige", 12) >= 5) base = base.times(Decimal.mul(challengeCompletions("Nanoprestige", 12)+challengeCompletions("Nanoprestige", 11)+challengeCompletions("Nanoprestige", 21)+challengeCompletions("Nanoprestige", 22), 1).plus(1))
                if (hasUpgrade("Microprestige", 43)) base = base.times(buyableEffect("Microprestige", 12))
                if (hasUpgrade("BrokenNano", 22)) base = base.times(upgradeEffect("BrokenNano", 22))
                if (hasUpgrade("BrokenNano", 11)) base = base.times(buyableEffect("BrokenNano", 12))
                display += format(base) + "<br><br>"
                display += "Cost: "+format(this.cost()) + " Nanoprestiges.<br>"
                display += "Cost formula: 1.5^(x^1.1)"
                if (hasUpgrade("Microprestige", 34) && player.Nanoprestige.corruption >= 0.7) display = "RGl2aWRlIGJ1eWFibGUgYW5kIE1pY3JvcHJlc3R<br>pZ2UgcmVxdWlyZW1lbnRzIGJ5"
                if (hasUpgrade("Microprestige", 34) && player.Nanoprestige.corruption >= 0.9) display = "ZmZvZWFpc0JTTFdIZmU"
                return display;
            },
            canAfford() {return (player[this.layer].points.gte(this.cost()) && player.Nanoprestige.buyables[13].lt(5000))},
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
                var base = new Decimal(1.2)
                base = base.plus(buyableEffect("Nanoprestige", 21))
                if (challengeCompletions("Nanoprestige", 12) >= 1) base = base.plus(new Decimal(1))
                if (challengeCompletions("Nanoprestige", 12) >= 4 && !(challengeCompletions("Nanoprestige", 12) >= 5)) base = base.times(Decimal.mul(challengeCompletions("Nanoprestige", 12), 0.25).plus(1))
                if (challengeCompletions("Nanoprestige", 12) >= 5) base = base.times(Decimal.mul(challengeCompletions("Nanoprestige", 12)+challengeCompletions("Nanoprestige", 11)+challengeCompletions("Nanoprestige", 21)+challengeCompletions("Nanoprestige", 22), 0.25).plus(1))
                if (hasUpgrade("Microprestige", 43)) base = base.times(buyableEffect("Microprestige", 12))
                if (hasUpgrade("BrokenNano", 22)) base = base.times(upgradeEffect("BrokenNano", 22))
                if (hasUpgrade("BrokenNano", 11)) base = base.times(buyableEffect("BrokenNano", 12))
                var eff = new Decimal(base).pow(player[this.layer].buyables[this.id])
                if (inChallenge("Nanoprestige", 12)) eff = new Decimal(1)
                return eff;
            }
        },
        21: {
            title() {return "Nanopierce"},
            cost(x) {
                var cost;
                cost = new Decimal("650").plus(Decimal.pow("1.5", Decimal.pow(x, 1.3)))
                if (hasUpgrade("Nanoprestige", 34) && !inChallenge("Nanoprestige", 11)) cost = cost.div(buyableEffect("Nanoprestige", 13))
                if (challengeCompletions("Nanoprestige", 11) >= 4) cost = cost.div(Decimal.pow(1.25, challengeCompletions("Nanoprestige", 11)))
                if (player.Nanoprestige.buyables[21].gte(5000)) cost = Decimal.dInf
                return Decimal.ceil(cost)
                
            },
            display() {
                var display;
                var base = new Decimal(0.1)
                if (hasUpgrade("Nanoprestige", 45)) base = base.plus(0.02)
                if (hasChallenge("Nanoprestige", 21)) base = base.plus(0.02)
                if (challengeCompletions("Nanoprestige", 21) >= 2) base = base.times(Decimal.mul(challengeCompletions("Nanoprestige", 21), 0.10).plus(1))
                var costBase = "650 + 1.5^(x^1.3)"
                display = "Increase the effect of Nanomuscle by " + format(this.effect()) +"<br>"
                display += "Effect: +" + format(base) + "<br><br>"
                display += "Cost: "+format(this.cost()) + " Nanoprestiges.<br>"
                display += "Cost formula: " + costBase
                return display;
            },
            canAfford() {return (player[this.layer].points.gte(this.cost()) && player.Nanoprestige.buyables[21].lt(5000))},
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
                var base = new Decimal(0.1)
                if (hasUpgrade("Nanoprestige", 45)) base = base.plus(0.02)
                if (hasChallenge("Nanoprestige", 21)) base = base.plus(0.02)
                if (challengeCompletions("Nanoprestige", 21) >= 2) base = base.times(Decimal.mul(challengeCompletions("Nanoprestige", 21), 0.20).plus(1))
                var eff = base.times((player[this.layer].buyables[this.id]))
                if (inChallenge("Nanoprestige", 12)) eff = new Decimal(0)
                return eff;
            }
        },
        22: {
            title() {return "Nanophase"},
            cost(x) {
                var cost;
                cost = new Decimal("3.5e7").plus(new Decimal("1e6").times(Decimal.pow(1.25, x.pow(1.2))))
                if (hasUpgrade("Nanoprestige", 34) && !inChallenge("Nanoprestige", 11)) cost = cost.div(buyableEffect("Nanoprestige", 13))
                if (challengeCompletions("Nanoprestige", 11) >= 4) cost = cost.div(Decimal.pow(1.25, challengeCompletions("Nanoprestige", 11)))
                if (player.Nanoprestige.buyables[22].gte(5000)) cost = Decimal.dInf
                return cost
            },
            display() {
                var display;
                display = "Increase power of Nanobuff by +" + format(this.effect()) +"<br>"
                display += "Effect: +0.25x <br><br>"
                display += "Cost: "+format(this.cost()) + " Nanoprestiges.<br>"
                display += "Cost scaling: 3.5e7 + 1e6*1.25^(x^1.2)"
                return display;
            },
            canAfford() {return (player[this.layer].points.gte(this.cost()) && player.Nanoprestige.buyables[22].lt(5000))},
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
                var base = new Decimal(0.25)
                if (hasChallenge("Nanoprestige", 21)) base = base.plus(0.05)
                var eff = new Decimal(base).times(player[this.layer].buyables[this.id])
                if (inChallenge("Nanoprestige", 12)) eff = new Decimal(0)
                return eff;
            }
        },
        23: {
            title() {return "Nanofracture"},
            cost(x) {
                var cost;
                cost = new Decimal("1e40").plus(new Decimal("1e40").times(Decimal.pow(3, x.pow(1.5))))
                if (hasUpgrade("Nanoprestige", 34) && !inChallenge("Nanoprestige", 11)) cost = cost.div(buyableEffect("Nanoprestige", 13))
                if (player.Nanoprestige.buyables[23].gte(5000)) cost = Decimal.dInf
                return cost
            },
            display() {
                var display;
                display = "Increase Nanoprestige Fragment gain by " + format(this.effect()) +"x.<br><br>"
                display += "Cost: "+format(this.cost()) + " Nanoprestiges."
                return display;
            },
            canAfford() {return (player[this.layer].points.gte(this.cost()) && player.Nanoprestige.buyables[23].lt(5000))},
            buy() {
                if (!hasUpgrade("Nanoprestige", 34)) player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                if (hasUpgrade("Nanoprestige",61)) {
                    return true
                } else return false
            },
            effect() {
                var base = new Decimal(1.25)
                if (hasUpgrade("Nanoprestige", 63)) base = base.plus(0.25)
                if (hasUpgrade("Nanoprestige", 72)) base = base.plus(0.25)
                if (hasUpgrade("Nanoprestige", 75)) base = base.plus(0.75)
                var eff = new Decimal(base).pow(player[this.layer].buyables[this.id])
                if (inChallenge("Nanoprestige", 12)) eff = new Decimal(1)
                return eff;
            }

        },
    },
    upgrades: {
        11: {
            name: "Nanopoint",
            title: "Nanopoint",
            description: "Point gain is multiplied by 7.",
            cost: new Decimal(13),
            effect() {
                return player[this.layer].points.add(1);

            },
            unlocked() {return hasAchievement("Unlockers", 11)},
        },
        12: {
            name: "Nanopush",
            title: "Nanopush",
            description: "Point gain is multiplied by 7.",
            cost: new Decimal(18),
            unlocked() {return hasAchievement("Unlockers", 11)},
        },
        13: {
            name: "Nanobuy",
            title: "Nanobuy",
            description: "Unlock a Nanoprestige buyable.",
            cost: new Decimal(42),
            unlocked() {return hasAchievement("Unlockers", 12)},

        },
        14: {
            name: "Nanorecharge",
            title: "Nanorecharge",
            description: "Divide buyable requirement by 2, and buyables no longer reset on Microprestige",
            cost: new Decimal(168),
            unlocked() {return hasAchievement("Unlockers", 14)}
        
        },
        15: {
            name: "Nanohelp",
            title: "Nanohelp",
            description: "Divide Microprestige requirement based on Miniprestiges.",
            cost: new Decimal(1728),
            unlocked() {return hasAchievement("Unlockers", 21)},
            effect() {return player.Miniprestige.points.pow(2).plus(1)},
            effectDisplay() {return format(player.Miniprestige.points.pow(2).plus(1))}
        },
        21: {
            name: "Nanoclick",
            title: "Nanoclick",
            description: "Point gain is multiplied by 7.",
            cost: new Decimal(24),
            unlocked() {
                if (hasUpgrade("Microprestige", 34) && player.Nanoprestige.corruption >= 0.9) return false
                else return hasAchievement("Unlockers", 11)
            
            },
        },
        22: {
            name: "Nanoshove",
            title: "Nanoshove",
            description: "Point gain is multiplied by 7.",
            cost: new Decimal(30),
            unlocked() {return hasAchievement("Unlockers", 11)},

        },
        23: {
            name: "Nanosell",
            title: "Nanosell",
            description: "Automatically buy Nanoprestiges, and you can buy max Nanoprestiges.",
            cost: new Decimal(48),
            unlocked() {
                if (hasUpgrade("Microprestige", 34) && player.Nanoprestige.corruption >= 0.6) return false
                else return hasAchievement("Unlockers", 12)
            },

        },
        24: {
            name: "Nanodecharge",
            title: "Nanodecharge",
            description: "Divide Microprestige requirement by 2, and multiply point gain by 7.",
            cost: new Decimal(200),
            unlocked() {return hasAchievement("Unlockers", 14)}
        
        },
        25: {
            name: "Nanoretain",
            title: "Nanoretain",
            description: "Increase power of Nanobuff by log(log(points))/3.",
            cost: new Decimal(1820),
            unlocked() {return hasAchievement("Unlockers", 21)},
        },
        31: {
            name: "Nanolove",
            title: "Nanolove",
            description: "Point gain is multiplied by 7.",
            cost: new Decimal(90),
            unlocked() {
                var corruption = Math.random()
                if (hasUpgrade("Microprestige", 34) && player.Nanoprestige.corruption >= 0.9) return false
                else return hasAchievement("Unlockers", 13)
            }

        },
        32: {
            name: "Nanohate",
            title: "Nanohate",
            description: "Point gain is multiplied by 7.",
            cost: new Decimal(97),
            unlocked() {
                return hasAchievement("Unlockers", 13)
            }

        },
        33: {
            name: "Nanonull",
            title: "Nanonull",
            description: "Unlock another Nanoprestige buyable.",
            cost: new Decimal(103),
            unlocked() {
                return hasAchievement("Unlockers", 13)
            }

        },
        34: {
            name: "Nanocharge",
            title: "Nanocharge",
            description: "Buyables no longer cost anything, and unlock a new one",
            cost: new Decimal(209),
            unlocked() {return hasAchievement("Unlockers", 14)}
        
        },
        35: {
            name: "Nanoupward",
            title: "Nanoupward",
            description: "Change the 1.12 in Nanobuff's cost formula to a 1.1.",
            cost: new Decimal(2121),
            unlocked() {return hasAchievement("Unlockers", 21)},
        },
        41: {
            name: "NanoI",
            title: "NanoI",
            description: "Reduce the ^1.2 in Nanobuff's cost formula to a ^1.1.",
            cost: new Decimal(323),
            unlocked() {return hasAchievement("Unlockers", 16)}
        },
        42: {
            name: "NanoII",
            title: "NanoII",
            description: "Square the Nanoprestige formula again.",
            cost: new Decimal(350),
            unlocked() {return hasAchievement("Unlockers", 16)}
        },
        43: {
            name: "NanoIII",
            title: "NanoIII",
            description: "Unlock another Nanoprestige buyable.",
            cost: new Decimal(432),
            unlocked() {return hasAchievement("Unlockers", 16)}

        },
        44: {
            name: "NanoIV",
            title: "NanoIV",
            description: "Unlock 2 Nanoprestige challenges",
            cost: new Decimal(500),
            unlocked() {return hasAchievement("Unlockers", 16)}
        },
        45: {
            name: "NanoV",
            title: "NanoV",
            description: "Slightly increase power of Nanopierce.",
            cost: new Decimal(2422),
            unlocked() {return hasAchievement("Unlockers", 21)},
        },
        51: {
            name: "Nanoscale",
            title: "Nanoscale",
            description: "Slightly reduce Nanoprestige cost scaling.",
            cost: new Decimal(3878),
            unlocked() {return hasAchievement("Unlockers", 23)}
        },
        52: {
            name: "Nanobalance",
            title: "Nanobalance",
            description: "Unlock a new Nanoprestige buyable.",
            cost: new Decimal(4298),
            unlocked() {return hasAchievement("Unlockers", 23)}

        },
        53: {
            name: "Nanomass",
            title: "Nanomass",
            description: "Slightly reduce Microprestige cost scaling.",
            cost: new Decimal(4540),
            unlocked() {return hasAchievement("Unlockers", 23)}

        },
        54: {
            name: "Nanoweight",
            title: "Nanoweight",
            description: "Unlock 2 new Nanoprestige challenges.",
            cost: new Decimal(5087),
            unlocked() {return hasAchievement("Unlockers", 23)}
        },
        55: {
            name: "Nanofinale",
            title: "Nanofinale",
            description: "Makes Nanophase work on Nanogains, and double its power. Also reduce Nano cost scaling.",
            cost: new Decimal(7050),
            unlocked() {return hasChallenge("Nanoprestige", 22)}
        },
        61: {
            name: "Nanofracture",
            title: "Nanofracture",
            description: "Unlock a new buyable.",
            cost: new Decimal(3e6),
            unlocked() {return hasAchievement("Unlockers", 33)}
        },
        62: {
            name: "Nanostrawman",
            title: "Nanostrawman",
            description: "Cube the Nanoprestige effect.",
            cost: new Decimal(1.5e7),
            unlocked() {return (hasAchievement("Unlockers", 33))}
        },
        63: {
            name: "Nanoagain",
            title: "Nanoagain",
            description: "The buyable Nanofracture has an increased effect.",
            cost: new Decimal(2.5e7),
            unlocked() {return (hasAchievement("Unlockers", 33))}
        },
        64: {
            name: "Nanowrimo",
            title: "Nanowrimo",
            description: "Multiply Nanoprestige Gain by log(log(points)).",
            cost: new Decimal(5e12),
            unlocked() {return (hasAchievement("Unlockers", 33))},
            effect() {
                if (hasUpgrade("Miniprestige", 13)) return player.points.plus(10).log2().log2().plus(1);
                else return player.points.plus(10).log10().log10().plus(1);

            },
            effectDisplay() {return format(upgradeEffect("Nanoprestige", 64))+"x"}
        },
        65: {
            name: "Nanofinale2",
            title: "Nanofinale 2",
            description: "Multiply Microprestige gain by 7.",
            cost: new Decimal(2e14),
            unlocked() {return (hasAchievement("Unlockers", 33))},
        },
        71: {
            name: "NanoVI",
            title: "NanoVI",
            description: "Multiply Nanoprestige gain by Microprestige's effect, and increase said effect to the power of 5.",
            cost: new Decimal("1e429"),
            unlocked() {return hasAchievement("Unlockers", 35)},
            effect() {
                return tmp.Microprestige.effect
            },
            effectDisplay() {return format(tmp.Microprestige.effect) + "x"}
        },
        72: {
            name: "NanoVII",
            title: "NanoVII",
            description: "Increase the power of Microbuff.",
            unlocked() {return hasAchievement("Unlockers", 35)},
            cost: new Decimal("3.5e532"),
        },
        73: {
            name: "NanoVIII",
            title: "NanoVIII",
            description: "Increase the power of Nanoskewer.",
            unlocked() {return hasUpgrade("Microprestige", 45)},
            cost: new Decimal(2.1e18),
        },
        74: {
            name: "NanoIX",
            title: "NanoIX",
            description: "Increase the power of Nanomuscle.",
            unlocked() {return hasUpgrade("Microprestige", 45)},
            cost: new Decimal(3.34e18),
        },
        75: {
            name:"NanoX",
            title: "NanoX",
            description: "Unlock Nanoprestige milestones.",
            unlocked() {return hasUpgrade("Microprestige", 45)},
            cost: new Decimal(5.00e18)
        },
        81: {
            name:"NanoXI",
            title: "NanoXI",
            description: "The power of the 25 million Nanoprestige Point milestone is squared.",
            unlocked() {return hasUpgrade("Miniprestige", 22)},
            cost: new Decimal(8.22e19)
        },
        82: {
            name:"NanoXII",
            title: "NanoXII",
            description: "Nanoprestige point gain increased ^1.25.",
            unlocked() {return hasUpgrade("Miniprestige", 22)},
            cost: new Decimal(8.67e19)
        },
        83: {
            name:"NanoXIII",
            title: "NanoXIII",
            description: "Nanoprestige point effect is increased again.",
            unlocked() {return hasUpgrade("Miniprestige", 22)},
            cost: new Decimal(1.87e20)
        },
        84: {
            name:"NanoXIV",
            title: "NanoXIV",
            description: "Nanoprestige gain is multiplied by log(Nanoprestige points)^3/4.",
            unlocked() {return hasUpgrade("Miniprestige", 22)},
            cost: new Decimal(1.87e21),
            effect() {
                return player.BrokenNano.points.plus(1).log10().pow(3/4).plus(1)
            },
            effectDisplay() {return format(upgradeEffect("Nanoprestige", 84)) + "x"}
        },
        85: {
            name:"NanoXV",
            title: "NanoXV",
            description: "Nanoprestige point gain increased ^1.25 again.",
            unlocked() {return hasUpgrade("Miniprestige", 22)},
            cost: new Decimal(9.35e23)
        },
        91: {
            name:"NanoXVI",
            title: "NanoXVI",
            description: "Microprestige cost is divided by log2(Nanoprestige Points)^2",
            unlocked() {return hasUpgrade("Microprestige", 51)},
            cost: new Decimal(4.3e24),
            effect() {
                return player.BrokenNano.points.plus(2).log2().pow(2)
            },
            effectDisplay() {return format(upgradeEffect("Nanoprestige", 91)) + "x"}
        },
        92: {
            name: "NanoXVII",
            title: "NanoXVII",
            description: "Nanoprestige Point gain increased based on Microprestiges",
            unlocked() {return hasUpgrade("Microprestige", 51)},
            cost: new Decimal(4.75e24),
            effect() {
                return player.Microprestige.points.plus(1).pow(2).plus(1)
            },
            effectDisplay() {return format(upgradeEffect("Nanoprestige", 92)) + "x"}
        },
        93: {
            name: "NanoXVIII",
            title: "NanoXVIII",
            description: "Nanoprestige Points boost their own effect",
            unlocked() {return hasUpgrade("Microprestige", 51)},
            cost: new Decimal(5.97e24),
            effect() {
                return player.BrokenNano.points.plus(1).log2().log10().div(10)
            },
            effectDisplay() {return "+" + format(upgradeEffect("Nanoprestige", 93))}
        },
        94: {
            name: "NanoXIX",
            title: "NanoXIX",
            description: "Nanoprestige Points boost their own gain",
            unlocked() {return hasUpgrade("Microprestige", 51)},
            cost: new Decimal(1.63e26),
            effect() {
                return player.BrokenNano.points.plus(2).log2().pow(5)
            },
            effectDisplay() {return format(upgradeEffect("Nanoprestige", 94))+"x"}
        },
        95: {
            name: "NanoXX",
            title: "NanoXX",
            description: "Nanoprestige Points boost their own gain",
            unlocked() {return hasUpgrade("Microprestige", 51)},
            cost: new Decimal(2.35e26),
            effect() {
                return player.BrokenNano.points.plus(2).log2().log2().div(20).plus(1)
            },
            effectDisplay() {return "^"+format(upgradeEffect("Nanoprestige", 95))}
        },
        101: {
            name: "NanoXXI",
            title: "NanoXXI",
            description: "Multiply Nanoprestige gain by log2(Microprestiges)",
            unlocked() {return hasUpgrade("Microprestige", 52)},
            cost: new Decimal(7.4e27),
            effect() {
                return player.Microprestige.points.plus(2).log2().plus(1)
            },
            effectDisplay() {return format(upgradeEffect("Nanoprestige", 16))+"x"}
        },
        102: {
            name: "NanoXXII",
            title: "NanoXXII",
            description: "Multiply Nanoprestige gain by log10(Points)^1/2",
            unlocked() {return hasUpgrade("Microprestige", 52)},
            cost: new Decimal(5e29),
            effect() {
                return player.points.plus(2).log10().plus(1).pow(1/2)
            },
            effectDisplay() {return format(upgradeEffect("Nanoprestige", 26))+"x"}
        },
        103: {
            name: "NanoXXIII",
            title: "NanoXXIII",
            description: "Nanoprestige points boost their own effect again, but more this time.",
            unlocked() {return hasUpgrade("Microprestige", 52)},
            cost: new Decimal(6.16e33),
            effect() {
                return player.BrokenNano.points.plus(1).log2().log2().div(20)
            },
            effectDisplay() {return "+"+format(upgradeEffect("Nanoprestige", 36))}
        },
        104: {
            name: "NanoXXIV",
            title: "NanoXXIV",
            description: "Nanoprestige points boost their own gain again, but more this time.",
            unlocked() {return hasUpgrade("Microprestige", 52)},
            cost: new Decimal(4.3e36),
            effect() {
                return player.BrokenNano.points.plus(2).log2().log2().div(15).plus(1).pow(1.15)
            },
            effectDisplay() {return "^"+format(upgradeEffect("Nanoprestige", 46))}
        },
        105: {
            name: "NanoXXV",
            title: "NanoXXV",
            description: "Reduce Miniprestige cost scaling.",
            unlocked() {return hasUpgrade("Microprestige", 52)},
            cost: new Decimal(2.39e39),
        },
        111: {
            name: "NanoXXVI",
            title: "NanoXXVI",
            description: "Multiply Nanoprestige Point gain by 1e100",
            unlocked() {return hasUpgrade("Microprestige", 52)},
            cost: new Decimal(8.17e39)
        },
        112: {
            name: "NanoXXVII",
            title: "NanoXXVII",
            description: "Multiply Nanoprestige Point gain based on Microprestiges. Hardcaps at 1e250x",
            unlocked() {return hasUpgrade("Microprestige", 52)},
            cost: new Decimal(4.74e40),
            effect() {
                return Decimal.min("1e250", Decimal.pow(1.005, player.Microprestige.points.plus(1)))
            },
            effectDisplay() {return format(upgradeEffect("Nanoprestige", 76))+"x"}
        },
        113: {
            name: "NanoXXVII",
            title: "NanoXXVII",
            description: "Slightly reduce Microprestige cost scaling",
            unlocked() {return hasUpgrade("Microprestige", 52)},
            cost: new Decimal(7.88e40)
        },
        114: {
            name: "Nanofinale 3",
            title: "Nanofinale 3",
            description: "Multiply Nanoprestige Point gain by 1e50",
            unlocked() {return hasUpgrade("Microprestige", 52)},
            cost: new Decimal(6.96e41)
        },
    },
    challenges: {
        11: {
            name: "Nanoblock",
            challengeDescription: "Point gain is raised to ^0.1.",
            goalDescription() {
                var goal;
                if (challengeCompletions("Nanoprestige", 11) == 0) goal = new Decimal(1e10)
                if (challengeCompletions("Nanoprestige", 11) == 1) goal = new Decimal(1e20)
                if (challengeCompletions("Nanoprestige", 11) == 2) goal = new Decimal(1.8e39)
                if (challengeCompletions("Nanoprestige", 11) == 3) goal = new Decimal(3e83)
                if (challengeCompletions("Nanoprestige", 11) == 4) goal = new Decimal(7e188)
                return format(goal) + " points (" + challengeCompletions("Nanoprestige", 11) + "/5)"
            },
            canComplete() {
                if (challengeCompletions("Nanoprestige", 11) == 0) return player.points.gte(new Decimal(1e10))
                if (challengeCompletions("Nanoprestige", 11) == 1) return player.points.gte(new Decimal(1e20))
                if (challengeCompletions("Nanoprestige", 11) == 2) return player.points.gte(new Decimal(1.8e39))
                if (challengeCompletions("Nanoprestige", 11) == 3) return player.points.gte(new Decimal(3e83))
                if (challengeCompletions("Nanoprestige", 11) == 4) return player.points.gte(new Decimal(7e188))
            },
            rewardDescription() {
                if (challengeCompletions("Nanoprestige", 11) == 0) return "Raises Point gain to ^1.1, and increases the power of Nanoprestiges."
                if (challengeCompletions("Nanoprestige", 11) == 1) return "Increases the power of Nanoprestiges again."
                if (challengeCompletions("Nanoprestige", 11) == 2) return "Reduce Microprestige cost scaling by a small amount."
                if (challengeCompletions("Nanoprestige", 11) == 3) return "Reduce buyable costs based on completions of this challenge."
                if (challengeCompletions("Nanoprestige", 11) == 4) return "Increase the power of Nanoprestige yet again."
            },
            unlocked() {return hasUpgrade("Nanoprestige", 44)},
            completionLimit: 5
        },
        12: {
            name: "Muckraking",
            challengeDescription: "Buyables do not do anything.",
            goalDescription() {
                var goal = new Decimal(1e57).pow(Decimal.pow(2, challengeCompletions("Nanoprestige", 12)))
                if (challengeCompletions("Nanoprestige", 12) == 0) goal = new Decimal(1e57)
                if (challengeCompletions("Nanoprestige", 12) == 1) goal = new Decimal(1.8e127)
                if (challengeCompletions("Nanoprestige", 12) == 2) goal = new Decimal(1.5e232)
                if (challengeCompletions("Nanoprestige", 12) == 3) goal = new Decimal("2.10e479")
                if (challengeCompletions("Nanoprestige", 12) == 4) goal = new Decimal("3e701")
                return format(goal) + " points (" + challengeCompletions("Nanoprestige", 12) + "/5)"
            },
            canComplete() {
                if (challengeCompletions("Nanoprestige", 12) == 0) return player.points.gte(new Decimal(1e57))
                if (challengeCompletions("Nanoprestige", 12) == 1) return player.points.gte(new Decimal(1.8e127))
                if (challengeCompletions("Nanoprestige", 12) == 2) return player.points.gte(new Decimal(1.5e232))
                if (challengeCompletions("Nanoprestige", 12) == 3) return player.points.gte(new Decimal("2.10e479"))
                if (challengeCompletions("Nanoprestige", 12) == 4) return player.points.gte(new Decimal("3e701"))
            },
            rewardDescription() {
                if (challengeCompletions("Nanoprestige", 12) == 0) return "The first row of buyables has increased power. You keep Challenges on Micro resets."
                if (challengeCompletions("Nanoprestige", 12) == 1) return "Multiply the power of Nanogains based on this challenge's completions."
                if (challengeCompletions("Nanoprestige", 12) == 2) return "Multiply the power of Nanobuff based on this challenge's completions."
                if (challengeCompletions("Nanoprestige", 12) == 3) return "Multiply the power of Nanomuscle based on this challenge's completions."
                if (challengeCompletions("Nanoprestige", 12) == 4) return "All previous rewards are based on total challenge completions."
            },
            unlocked() {return hasUpgrade("Nanoprestige", 44)},
            completionLimit: 5
        },
        21: {
            name: "Nanocore",
            challengeDescription: "Nanoblock, but Nanoprestige points have no effect.",
            goalDescription() {
                var goal = new Decimal(1e63).pow(Decimal.pow(2, challengeCompletions("Nanoprestige", 21)))
                if (challengeCompletions("Nanoprestige", 21) == 0) goal = new Decimal(1e63)
                if (challengeCompletions("Nanoprestige", 21) == 1) goal = new Decimal(5.4e165)
                if (challengeCompletions("Nanoprestige", 21) == 2) goal = new Decimal(1.4e264)
                return format(goal) + " points (" + challengeCompletions("Nanoprestige", 21) + "/3)"
            },
            canComplete() {
                if (challengeCompletions("Nanoprestige", 21) == 0) return player.points.gte(new Decimal(1e63))
                if (challengeCompletions("Nanoprestige", 21) == 1) return player.points.gte(new Decimal(5.4e165))
                if (challengeCompletions("Nanoprestige", 21) == 2) return player.points.gte(new Decimal(1.4e264))

            },
            rewardDescription() {
                if (challengeCompletions("Nanoprestige", 21) == 0) return "Increase the power of the second row of Nano buyables."
                if (challengeCompletions("Nanoprestige", 21) == 1) return "Multiply the power of Nanopierce based on this challenge's completions."
                if (challengeCompletions("Nanoprestige", 21) == 2) return "Nanophase multiplies the power of Nanobuff as well as adding to it."
            },
            unlocked() {return hasUpgrade("Nanoprestige", 54)},
            countsAs: [11],
            completionLimit: 3
        },
        22: {
            name: "Nanofuse",
            challengeDescription: "All previous challenges at once.",
            goalDescription: "5e26 points",
            canComplete: function() {return player.points.gte("5e26")},
            rewardDescription: "Unlock the final Nanoprestige upgrade (before Small Prestige resets).",
            unlocked() {return hasUpgrade("Nanoprestige", 54)},
            countsAs: [11, 12, 21],
            completionLimit: 1
        },

    },
/*
    clickables: {
        11: {
            title: "Hide the top row",
            unlocked() {return hasAchievement("Smallprestige", 11)},
            canClick() {return true},
            onclick() {
                player.Nanoprestige.hiddenRows ++;
            }
        },
        12: {
            title: "Show one row above",
            unlocked() {return hasAchievement("Smallprestige", 11)},
            canClick() {return true},
            onclick() {
                player.Nanoprestige.hiddenRows --;
            }
        }

    },
    */
    autoPrestige() {
        return hasUpgrade("Nanoprestige", 23)
    },
    automate() {
        if (hasUpgrade("Miniprestige",11)) buyBuyable("Nanoprestige", 11)
        if (hasUpgrade("Miniprestige",11)) buyBuyable("Nanoprestige", 12)
        if (hasUpgrade("Miniprestige",11)) buyBuyable("Nanoprestige", 13)
        if (hasUpgrade("Miniprestige",11)) buyBuyable("Nanoprestige", 21)
        if (hasUpgrade("Miniprestige",11)) buyBuyable("Nanoprestige", 22)
        if (hasUpgrade("Miniprestige",11) && hasUpgrade("Nanoprestige", 61)) buyBuyable("Nanoprestige", 23)
        if (hasChallenge("Microprestige",11)) buyMaxBuyable("Nanoprestige", 11)
        if (hasChallenge("Microprestige",11)) buyMaxBuyable("Nanoprestige", 12)
        if (hasChallenge("Microprestige",11)) buyMaxBuyable("Nanoprestige", 13)
        if (hasChallenge("Microprestige",11)) buyMaxBuyable("Nanoprestige", 21)
        if (hasChallenge("Microprestige",11)) buyMaxBuyable("Nanoprestige", 22)
        if (hasChallenge("Microprestige",11) && hasUpgrade("Nanoprestige", 61)) buyMaxBuyable("Nanoprestige", 23)
    },
    doReset(layer) {
        let keep = [];
        if (layer.row == this.row) return
        else if (layer == "Microprestige" || layer == "BrokenNano" || layer == "BNCapital") {
            if (hasAchievement("Miniprestige", 12)) keep.push("upgrades")
            if (hasAchievement("Miniprestige", 12)) keep.push("hiddenRows")
            if (hasUpgrade("Nanoprestige", 14) || hasUpgrade("Nanoprestige", 41)) keep.push("buyables")
            if (hasChallenge("Nanoprestige", 12)) keep.push ("challenges")
            if (hasMilestone("BrokenNano", 1)) keep.push("points")
            layerDataReset(this.layer, keep)
        } else if (layer == "Miniprestige") {
            if (hasUpgrade("Nanoprestige", 41) || (hasUpgrade("Miniprestige", 11))) {
                keep.push("upgrades")
                keep.push("buyables")
                keep.push("hiddenRows")
            }
                if (hasMilestone("BrokenNano", 0)) keep.push("challenges")

            if (hasAchievement("Smallprestige", 21)) keep.push("upgrades")
            layerDataReset(this.layer, keep)

        } else if (layer == "Smallprestige") {
            if (hasUpgrade("Miniprestige", 11)) keep.push("upgrades")
            if (hasAchievement("Smallprestige", 21)) keep.push("upgrades")
            layerDataReset(this.layer, keep)


        }
    },
    canBuyMax() {
        return hasUpgrade("Nanoprestige", 23) || player.Smallprestige.best.gte(1)
    },
    bars: {
        break: {
            direction: RIGHT,
            width:200,
            height:10,
            progress() {
                var prog = 0
                if (hasUpgrade("Microprestige",34)) prog += 0.33
                if (hasUpgrade("Microprestige",41)) prog += 0.33
                if (hasUpgrade("Miniprestige", 12)) prog += 0.33
                if (hasUpgrade("Microprestige",42)) prog += 0.01
                return prog;
            },
            unlocked() {return hasUpgrade("Microprestige", 34)}
        }
    },
    resetsNothing() {return hasUpgrade("Microprestige", 34)},
    tabFormat: {
        "Upgrades": {
            content: ["main-display", "resource-display", "prestige-button", ["bar", "break"], "clickables", "upgrades"],
            unlocked() {return hasAchievement("Unlockers", 11)}
        },
        "Buyables": {
            content: ["main-display", "resource-display", "prestige-button", "buyables"],
            unlocked() {return hasUpgrade("Nanoprestige",13)}          
        },
        "Challenges": {
            content: ["main-display", "resource-display", "prestige-button", "challenges"],
            unlocked() {
                if (hasUpgrade("Microprestige", 41) && player.Nanoprestige.corruption >= 0.3 && player.Nanoprestige.corruption <= 0.4) return false
                else return hasUpgrade("Nanoprestige", 44)
            }

        }




    },
    layerShown(){return true}
})
addLayer("BrokenNano", {
    name: "BrokenNano", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BN", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        points: new Decimal(0),
    }},
    color: "#D62900",
    requires: new Decimal(700000), // Can be a function that takes requirement increases into account
    resource: "Nanoprestige Fragments", // Name of prestige currency
    baseResource: "Nanoprestiges", // Name of resource prestige is based on
    baseAmount() {return player.Nanoprestige.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    passiveGeneration() {
        return 1  
    },
    effect() {
        var pow = new Decimal(3)
        if (hasUpgrade("Microprestige", 44)) pow = pow.plus(buyableEffect("Microprestige", 13))
        pow = pow.plus(tmp.BNCapital.effect)
        var constant = new Decimal(1).plus(Decimal.mul(0.02, player.BrokenNano.points.plus(1).ln().pow(pow)))
        return constant
    },
    effectDescription() {
        var desc;
        desc = "which is giving a Boost Constant of "
        desc += format(tmp.BrokenNano.effect)
        desc += ". <br>This serves as the basis for all of this layer's buyables.<br>"
        desc += "You generate Fragments when you have over 700,000 Nanoprestiges."
        return desc
    },
    branches: ["Nanoprestige"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (!hasUpgrade("Microprestige", 42)) mult = new Decimal(0)
        if (hasUpgrade("Nanoprestige", 61)) mult = mult.times(buyableEffect("Nanoprestige", 23))
        if (hasUpgrade("BrokenNano", 11)) mult = mult.times(buyableEffect("BrokenNano", 13))
        if (hasUpgrade("BrokenNano", 23)) mult = mult.times(upgradeEffect("BrokenNano", 23))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        mult = new Decimal(1)
        return new Decimal(mult)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)

    buyables: {
        11: {
            title() {return "Boost I"},
            cost(x) {
                var cost;
                cost = new Decimal("1e10").pow(x.pow(new Decimal(2).pow(1/2)))
                return cost
            },
            display() {
                var display;
                var base = new Decimal(tmp.BrokenNano.effect)
                display = "Increase Nanoprestige gain by " + format(this.effect()) +"x.<br>"
                display += "Levels: " + format(player[this.layer].buyables[this.id]) + "+" + format(tmp.BrokenNano.buyables[11].totalAmount.minus(player[this.layer].buyables[this.id]))
                display += "<br>Effect: " + format(base) +"x<br><br>"
                display += "Cost: "+format(this.cost()) + " Nanoprestige Fragments."
                return display;
            },
            canAfford() {return (player[this.layer].points.gte(this.cost()) && player.Nanoprestige.buyables[23].lte(5000))},
            buy() {
                if (!hasUpgrade("Nanoprestige", 34)) player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                if (hasUpgrade("BrokenNano", 11)) {
                    return true
                } else return false
            },
            totalAmount() {
                var amount = new Decimal(player[this.layer].buyables[this.id])
                if (hasUpgrade("BrokenNano", 12)) amount = amount.plus(tmp.BrokenNano.buyables[12].totalAmount)
                if (hasUpgrade("BrokenNano", 14)) amount = amount.plus(tmp.BrokenNano.buyables[13].totalAmount)
                if (hasUpgrade("BrokenNano", 15)) amount = amount.plus(1)
                return amount
            },
            effect() {
                var base = new Decimal(tmp.BrokenNano.effect)
                var eff = new Decimal(base).pow(tmp.BrokenNano.buyables[11].totalAmount)
                return eff;
            }

        },
        12: {
            title() {return "Boost II"},
            cost(x) {
                var cost;
                cost = Decimal.max(new Decimal("2500"), new Decimal("1e20").pow(x.pow(2)))
                return cost
            },
            display() {
                var display;
                var base = new Decimal(tmp.BrokenNano.effect).log10().plus(1)
                display = "Increase Nanomuscle power by " + format(this.effect()) +"x.<br>"
                display += "Levels: " + format(player[this.layer].buyables[this.id]) + "+" + format(tmp.BrokenNano.buyables[12].totalAmount.minus(player[this.layer].buyables[this.id]))
                display += "<br>Effect: " + format(base) +"x<br><br>"
                display += "Cost: "+format(this.cost()) + " Nanoprestige Fragments."
                return display;
            },
            canAfford() {return (player[this.layer].points.gte(this.cost()) && player.Nanoprestige.buyables[23].lte(5000))},
            buy() {
                if (!hasUpgrade("Nanoprestige", 34)) player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                if (hasUpgrade("BrokenNano", 11)) {
                    return true
                } else return false
            },
            totalAmount() {
                var amount = new Decimal(player[this.layer].buyables[this.id])
                if (hasUpgrade("BrokenNano", 13)) amount = amount.plus(tmp.BrokenNano.buyables[13].totalAmount)
                return amount
            },
            effect() {
                var base = new Decimal(tmp.BrokenNano.effect).log10().plus(1)
                var eff = new Decimal(base).pow(tmp.BrokenNano.buyables[12].totalAmount)
                return eff;
            }

        },
        13: {
            title() {return "Boost III"},
            cost(x) {
                var cost;
                cost = Decimal.max(new Decimal("1e6"), new Decimal("1e30").pow(x.pow(new Decimal(2).pow(1/2))))
                return cost
            },
            display() {
                var display;
                var base = new Decimal(tmp.BrokenNano.effect)
                display = "Increase Nanoprestige Fragment gain by " + format(this.effect()) +"x.<br>"
                display += "Levels: " + format(player[this.layer].buyables[this.id]) + "+" + format(tmp.BrokenNano.buyables[13].totalAmount.minus(player[this.layer].buyables[this.id]))
                display += "<br>Effect: " + format(base) +"x<br><br>"
                display += "Cost: "+format(this.cost()) + " Nanoprestige Fragments."
                return display;
            },
            canAfford() {return (player[this.layer].points.gte(this.cost()) && player.Nanoprestige.buyables[23].lte(5000))},
            buy() {
                if (!hasUpgrade("Nanoprestige", 34)) player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                if (hasUpgrade("BrokenNano", 11)) {
                    return true
                } else return false
            },
            totalAmount() {
                var amount = new Decimal(player[this.layer].buyables[this.id])
                return amount
            },
            effect() {
                var base = new Decimal(tmp.BrokenNano.effect)
                var amount = new Decimal(player[this.layer].buyables[this.id])
                var eff = new Decimal(base).pow(tmp.BrokenNano.buyables[13].totalAmount)
                return eff;
            }

        },


    },
    upgrades: {
        11: {
            name: "broken1",
            title: "Purchase I",
            cost: new Decimal(10),
            description: "Unlock the first set of Broken Nanoprestige buyables.",
            unlocked() {return hasAchievement("Unlockers", 32)}
        },
        12: {
            name: "broken2",
            title: "Stack I",
            cost: new Decimal("1e45"),
            description: "Levels of Boost II provide levels to Boost I",
            unlocked() {return hasAchievement("Unlockers", 34)}
        },
        13: {
            name: "broken3",
            title: "Stack II",
            cost: new Decimal("5e107"),
            description: "Levels of Boost III provide levels to Boost II",
            unlocked() {return hasAchievement("Unlockers", 34)}
        },
        14: {
            name: "broken4",
            title: "Stack III",
            cost: new Decimal("1e252"),
            description: "Levels of Boost III provide levels to Boost I",
            unlocked() {return hasAchievement("Unlockers", 34)}
        },
        15: {
            name: "broken5",
            title: "Power I",
            cost: new Decimal("1e547"),
            description: "Unlock Nano Capital, and add a level to Boost I",
            unlocked() {return hasAchievement("Unlockers", 34)}
        }
    },
    milestones:{
        0: {
            requirementDescription: "100 Nanoprestige Fragments",
            done() {return player.BrokenNano.points.gte(100)},
            effectDescription: "Keep Broken Nanoprestige milestones and Nano challenges on Mini resets."
        },
        1: {
            requirementDescription: "1e10 Nanoprestige Fragments",
            done() {return player.BrokenNano.points.gte(1e10)},
            effectDescription: "Microprestige no longer resets Nanoprestiges."
        },
        2: {
            requirementDescription: "1e100 Nanoprestige Fragments",
            done() {return player.BrokenNano.points.gte(1e100)},
            effectDescription: "Microprestige no longer resets anything."
        },
    },
    achievements: {

    },
    tabFormat: {
        "Upgrades": {
            content: ["main-display", "resource-display", "milestones", "upgrades"],
            unlocked() {return true}
        },
        "Buyables": {
            content: ["main-display", "resource-display", "buyables"],
            unlocked() {return true}
        },
        "Capitals": {
            embedLayer:"BNCapital",
            unlocked() {return hasUpgrade("BrokenNano", 15)}

        }
    },
    doReset(layer) {
        let keep = [];
        if (layer.row == this.row) return
        else if (layer == "Microprestige") {
            keep.push("milestones")
            keep.push("points")
            keep.push("upgrades")
            keep.push("buyables")
            layerDataReset(this.layer, keep)
        } else if (layer == "Miniprestige") {
            if (hasMilestone("BrokenNano", 0)) keep.push("milestones")
            if (hasMilestone("BrokenNano", 0)) keep.push("upgrades")
            layerDataReset(this.layer, keep)

        } else if (layer == "Smallprestige") {
            layerDataReset(this.layer, keep)


        } 
    },
    layerShown(){
        return hasUpgrade("Microprestige", 42)}
})
addLayer("BNCapital", {
    name: "BrokenNanoCapitals", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BNc", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        points: new Decimal(0),
    }},
    color: "#D62900",
    requires: new Decimal("32"), // Can be a function that takes requirement increases into account
    resource: "Capital", // Name of prestige currency
    baseResource: "Broken Nano Buyables", // Name of resource prestige is based on
    baseAmount() {
        var base = new Decimal(0);
        base = base.plus(player.BrokenNano.buyables[11])
        base = base.plus(player.BrokenNano.buyables[12])
        base = base.plus(player.BrokenNano.buyables[13])
        return base
    
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: new Decimal(2), // Prestige currency exponent
    base: new Decimal(2),
    effect() {
        return new Decimal(0.11).times(player.BNCapital.points)
    },
    effectDescription() {
        var desc;
        desc = "which is increasing Boost Constant exponent by " + format(tmp.BNCapital.effect)
        return desc
    },
    branches: ["BrokenNano"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        mult = new Decimal(1)
        return new Decimal(mult)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)

    buyables: {

    },
    upgrades: {

    },
    milestones:{
        0: {
            requirementDescription: "1 Capital",
            done() {return player.BNCapital.points.gte(1)},
            effectDescription: "Multiply Miniprestige gain by 1.1x per Capital."
        }
    },
    achievements: {

    },

    doReset(layer) {
        let keep = [];
        if (layer.row == this.row) return
        else if (layer == "Microprestige") {
            keep.push("milestones")
            keep.push("points")
            keep.push("upgrades")
            keep.push("buyables")
            layerDataReset(this.layer, keep)
        } else if (layer == "Miniprestige") {
            if (hasMilestone("BrokenNano", 0)) keep.push("milestones")
            if (hasMilestone("BrokenNano", 0)) keep.push("upgrades")
            layerDataReset(this.layer, keep)

        } else if (layer == "Smallprestige") {
            layerDataReset(this.layer, keep)


        }
    },
    layerShown(){
        return false}
})
