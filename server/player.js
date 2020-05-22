const Camera = require("./camera");

class Player {
    constructor(id, world) {
        this.id = id;
        this.universe = false;
        this.name = "Unnamed Player";
        this.world = null;
        this.score = 0;
        this.chatRequest = true;
        this.admin = false;
        this.camera = new Camera();
    }
}

module.exports = Player;