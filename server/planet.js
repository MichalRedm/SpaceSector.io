const Body = require("./body");

class Planet extends Body {
    constructor() {
        super();
        this.type = "planet";
        this.mass = Infinity;
    }
}

module.exports = Planet;