import { Body } from "./body.js";

class Planet extends Body {
    constructor() {
        this.type = "planet";
        this.mass = Infinity;
    }
}

module.exports = Planet;