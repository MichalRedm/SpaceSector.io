const Body = require("./body");

class Planet extends Body {
    constructor() {
        super();
        this.type = "planet";
        this.mass = Infinity;
        this.size = 128;
    }
}

module.exports = Planet;