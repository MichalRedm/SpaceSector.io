const Settings = require("./settings");
const Chat = require("./chat");
const Strings = require("./strings");

const settings = new Settings();

class World {
    constructor(worldData, server) {
        var date = new Date();
        this.startTime = date.getTime();
        do {
            this.id = Strings.random(settings.worldIdLength);
        } while (server.worlds.public[this.id] !== undefined || server.worlds.private[this.id] !== undefined);
        this.server = server;
        this.type = (worldData.type !== undefined) ? worldData.type : "private";
        this.main = (worldData.main !== undefined) ? worldData.main : false;
        this.name = (worldData.name !== undefined) ? worldData.name : "Unnamed World";
        this.mode = (worldData.mode !== undefined) ? worldData.mode : "default";
        this.size = (worldData.mode !== undefined) ? worldData.size : settings.worldSize;
        this.players = [];
        this.chat = new Chat(this);

        console.log(`New world created with ID = ${this.id.bgYellow.black}\\n\\tName:\\t${this.name.gray}\\n\\tType:\\t${this.type == "public" ? ("public").cyan : this.type.red}\\n\\tMode:\\t${this.mode.gray}`);

        this.createPlanets();
    }
    createPlanets() {

    }
    addPlayer(player) {
        this.players.push(player);
        player.world = this;
        console.log("Player ".cyan + player.id.black.bgYellow + " has been moved to a world ".cyan + this.id.black.bgYellow);
    }
}

module.exports = World;