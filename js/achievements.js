addLayer("Achievements", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AC", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: "side", // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    color: "#7fffd4",
    tooltip: "",
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

    },
    tabFormat: {
        "Achievements": {content: ["achievements"],}


    },
    layerShown(){return true}
})