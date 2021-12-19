addLayer("Achievements", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AC", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: "side", // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    color: "#7fffd4",
    tooltip: "",
    clickables: {
        11: {
            title() {return "Click!"},
            canClick() {return true}
        }
    },
    achievements: {
        11: {
            name: "To begin",
            done() {return player.Nanoprestige.points.gte(1)},
            tooltip: "Nanoprestige for the first time. Makes Nanoprestiges boost production."
        },
        12: {
            name: "A new layer already?",
            done() {return player.Microprestige.points.gte(1)},
            tooltip: "Microprestige for the first time. Makes Microprestiges boost production."
        },
        13: {
            name: "Slowdown",
            done() {return player.Miniprestige.points.gte(1)},
            tooltip: "Miniprestige for the first time. Makes Miniprestiges boost production."
        },
        21: {
            name: "Impossible?",
            done() {return player.Smallprestige.points.gte(1)},
            tooltip: "Small prestige for the first time. Makes Small Prestiges boost production."
        },
        22: {
            name: "Only grindier from here",
            done() {return player.Partialprestige.points.gte(1)},
            tooltip: "Partial prestige for the first time. Makes Partial Prestiges boost production."
        },

    },
    tabFormat: {
        "Achievements": {content: ["clickables", "achievements"],}


    },
    layerShown(){return true}
})
addLayer("Unlockers", {
    name: "Unlockers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UC", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: "side", // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    color: "#6543B3",
    tooltip: "",
    achievementPopups: false,
    clickables: {
        11: {
            title() {return "Click!"},
            canClick() {return true}
        }
    },
    achievements: {
        11: {
            name: "1",
            done() {return player.Miniprestige.best.gte(1)},
            tooltip: "1 Miniprestige<br>Unlocks:<br> N upgrades 11, 12, 21, 22<br> μ upgrades 11, 12, 13"
        },
        12: {
            name: "2",
            done() {return player.Microprestige.best.gte(5)},
            tooltip: "5 Microprestiges<br>Unlocks:<br> N upgrades 13, 23"
        },
        13: {
            name: "3",
            done() {return player.Nanoprestige.best.gte(55)},
            tooltip: "55 Nanoprestiges<br>Unlocks:<br> N upgrade 31, 32, 33 μ upgrade 21,"
        },
        14: {
            name: "4",
            done() {return player.Microprestige.best.gte(7)},
            tooltip: "7 Microprestiges<br>Unlocks:<br> N upgrade 14,24,34"
        },
        15: {
            name: "5",
            done() {return player.Miniprestige.best.gte(2)},
            tooltip: "2 Miniprestiges<br>Unlocks:<br> μ upgrades 22,23"
        },
        16: {
            name: "6",
            done() {return player.Microprestige.best.gte(10)},
            tooltip: "10 Microprestiges<br>Unlocks:<br> N upgrades 41,42,43,44"
        },
        21: {
            name: "7",
            done() {return player.Microprestige.best.gte(17)},
            tooltip: "17 Microprestiges<br>Unlocks:<br> N upgrades 15,25,35,45"
        },
        22: {
            name: "8",
            done() {return player.Miniprestige.best.gte(3)},
            tooltip: "3 Miniprestiges<br>Unlocks:<br> μ upgrades 31,32,33"
        },
        23: {
            name: "9",
            done() {return player.Microprestige.best.gte(40)},
            tooltip: "40 Microprestiges<br>Unlocks:<br> N upgrades 51,52,53,54,55"
        },
        24:{
            name: "10",
            done() {return player.Smallprestige.best.gte(1)},
            tooltip: "1 Smallprestige<br>Unlocks:<br> M upgrades 11, 12"
        },
        25:{
            name: "11",
            done() {return player.Microprestige.best.gte(210)},
            tooltip: "210 Microprestige<br>Unlocks:<br> u upgrade 24"
        },
        26:{
            name: "12",
            done() {return player.Miniprestige.best.gte(5)},
            tooltip: "5 miniprestige<br>Unlocks:<br> u upgrade 34"
        },
        31:{
            name: "13",
            done() {return player.Microprestige.best.gte(358)},
            tooltip: "358 Microprestige<br>Unlocks:<br> u upgrade 41"
        },
        32:{
            name: "14",
            done() {return player.Microprestige.best.gte(739)},
            tooltip: "739 Microprestiges<br>Unlocks:<br> u upgrade 42, 43"
        },
        33:{
            name: "15",
            done() {return player.BrokenNano.best.gte(100)},
            tooltip: "100 Nanoprestige Fragments<br>Unlocks:<br> N upgrade 61, 62, 63, 64, 65"
        },
        34:{
            name: "16",
            done() {return hasUpgrade("Miniprestige", 13)},
            tooltip: "Mini upgrade 13. Unlocks BN upgrades 12, 13, 14, 15"
        },
        
    },
    tabFormat: {
        "Unlockers": {content: ["resource-display",  "clickables", "achievements",],}


    },

    layerShown(){return hasAchievement("Miniprestige", 11)}
})