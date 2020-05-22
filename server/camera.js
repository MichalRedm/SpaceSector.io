const Vector2 = require("./vector2");

class Camera {
    constructor() {
        this.position = Vector2.zero();
        this.size = 1024;
    }
}

module.exports = Camera;