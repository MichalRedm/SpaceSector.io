const Vector2 = require("./vector2");

class Body {
    constructor() {
        var date = new Date();
        this.definitionTime = date.getTime();
        this.type = "";
        this.owner = "universe";
        this.position = Vector2.zero();
        this.velocity = Vector2.zero();
        this.mass = 1;
    }
}

module.exports = Body;