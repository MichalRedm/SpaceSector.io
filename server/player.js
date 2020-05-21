class Player {
    constructor(id, world) {
        this.id = id;
        this.universe = false;
        this.name = "Unnamed Player";
        this.world = null;
        this.score = 0;
        this.chatRequest = true;
        this.admin = false;
    }
}

module.exports = Player;