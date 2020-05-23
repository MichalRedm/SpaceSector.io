const Body = require("./body");

class Planet extends Body {
    constructor() {
        super();
        this.type = "planet";
        this.mass = Infinity;
        this.size = 64 + Math.floor(Math.random() * 64);
    }
}

module.exports = Planet;