addLayer("Smallprestige", {
    name: "Smallprestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
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
    directMult() {
        mult = new Decimal(1)
        
        return mult
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
            },
            image() {
                if (hasAchievement("Smallprestige", 11)) return "js/images/Smallprestige/small11.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        12: {
            name: "Static Multiplier",
            done() {return tmp.Nanoprestige.directMult.gte(1.75)},
            tooltip: "Have over a 1.75x multiplier to Nanoprestige gain.",
            image() {
                if (hasAchievement("Smallprestige", 12)) return "js/images/Smallprestige/small12.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        13: {
            name: "Snap",
            done() {return player.BrokenNano.points.gte(1)},
            tooltip: "Begin generation of Nanoprestige Fragments.",
            image() {
                if (hasAchievement("Smallprestige", 13)) return "js/images/Smallprestige/small13.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        14: {
            name: "Critique of Political Economy",
            done() {return player.BNCapital.points.gte(1)},
            tooltip: "Get a Capital.",
            image() {
                if (hasAchievement("Smallprestige", 14)) return "js/images/Smallprestige/small14.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        21: {
            name: "Slight inflation",
            done() {return player.Smallprestige.points.gte(2)},
            tooltip: "Small Prestige for the second time. Multiplies Nanoprestige Fragment gain based on Microprestige and Miniprestige effects.",
            effect() {
                return tmp.Microprestige.effect.pow(2).times(tmp.Miniprestige.effect.pow(2));
            },
            image() {
                if (hasAchievement("Smallprestige", 21)) return "js/images/Smallprestige/small21.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        22: {
            name: "Not so static",
            done() {return tmp.Nanoprestige.directMult.gte("1e1000")},
            tooltip: "Have over a 1e1000x multiplier to Nanoprestige gain.",
            image() {
                if (hasAchievement("Smallprestige", 22)) return "js/images/Smallprestige/small22.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        23: {
            name: "Microeconomics",
            done() {return hasUpgrade("Miniprestige", 21)},
            tooltip: "Unlock the third Micro buyable.",
            image() {
                if (hasAchievement("Smallprestige", 23)) return "js/images/Smallprestige/small23.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        24: {
            name: "One secondary smile",
            done() {return hasMilestone("Nanoprestige", 0)},
            tooltip: "Get a Nanoprestige milestone.",
            image() {
                if (hasAchievement("Smallprestige", 24)) return "js/images/Smallprestige/small24.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        31: {
            name: "It got even worse",
            done() {return player.Smallprestige.points.gte("3")},
            tooltip: "Small prestige for the third time. Unlocks the second set of Broken Nano upgrades, and divide Capital costs by 1.2",
            image() {
                if (hasAchievement("Smallprestige", 31)) return "js/images/Smallprestige/small31.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        32: {
            name: "Ethical Consumption",
            done() {return player.BrokenNano.buyables[21].gte(1)},
            tooltip: "Get a level of Boost IV.",
            image() {
                if (hasAchievement("Smallprestige", 32)) return "js/images/Smallprestige/small32.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        33: {
            name: "Remorse",
            done() {return player.BrokenNano.points.gte("1e20000")},
            tooltip: "Get 1e20,000 Nanoprestige fragments.",
            image() {
                if (hasAchievement("Smallprestige", 33)) return "js/images/Smallprestige/small33.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        34: {
            name: "Cascade",
            done() {return hasUpgrade("BrokenNano", 23)},
            tooltip: "Buy Stack V.",
            image() {
                if (hasAchievement("Smallprestige", 34)) return "js/images/Smallprestige/small34.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        41: {
            name: "It got worse again",
            done() {return player.Smallprestige.points.gte("4")},
            tooltip: "Small Prestige for the fourth time. Nanoprestige Fragment gain is increased based on Smallprestige resets, ^1.01 per reset. Caps at ^1.2",
            image() {
                if (hasAchievement("Smallprestige", 41)) return "js/images/Smallprestige/small41.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        42: {
            name: "Considerably less static",
            done() {return tmp.Nanoprestige.directMult.gte("1e1000000")},
            tooltip: "Have over a 1e1,000,000x multiplier to Nanoprestige gain.",
            image() {
                if (hasAchievement("Smallprestige", 42)) return "js/images/Smallprestige/small42.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        43: {
            name: "Workers of the world",
            done() {return player.BNCommunal.points.gte(1)},
            tooltip: "Get a Communal.",
            image() {
                if (hasAchievement("Smallprestige", 43)) return "js/images/Smallprestige/small43.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
        },
        44: {
            name: "Pointer",
            done() {return player.points.gte("1ee10")},
            tooltip: "Get 1ee10 points.",
            image() {
                if (hasAchievement("Smallprestige", 44)) return "js/images/Smallprestige/small44.png"
                else return "js/images/unearn.png"
            },
            style: {
                width:"128px",
                height:"128px"
            }
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