const Filter = require("./filter");
const BWFilter = require("bad-words"),
      bwfilter = new BWFilter();

class Chat {
    constructor(world) {
        this.world = world;
        this.messages = [];
        this.update = true;
    }
    addMessage(message, playerId, playerName) {
        var date = new Date();
        message.text = Filter.escapeHTML(bwfilter.clean(message.text).substr(0,200)).replace(/\n/g, "<br/>");
        message.time = date.getTime();
        message.playerId = playerId;
        message.playerName = playerName;
        var index = this.messages.push(message) - 1;
        console.log(`[CHAT:${this.world.id}:${playerId}:${index}]`.magenta + " " + message.text.gray);
        this.update = true;
    }
}

module.exports = Chat;