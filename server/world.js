const SettingsWorld = require("./settingsWorld");
const Chat = require("./chat");
const Strings = require("./strings");
const Vector2 = require("./vector2.js");
const Player = require("./player.js");
const Body = require("./body");
const Planet = require("./planet");

class World {
    constructor(worldData, server) {
        var date = new Date();
        this.startTime = date.getTime();
        this.server = server;
        this.settings = new SettingsWorld();
        do {
            this.id = Strings.random(this.server.settings.worldIdLength);
        } while (server.worlds.public[this.id] !== undefined || server.worlds.private[this.id] !== undefined);
        this.type = (worldData.type !== undefined) ? worldData.type : "private";
        this.main = (worldData.main !== undefined) ? worldData.main : false;
        this.name = (worldData.name !== undefined) ? worldData.name : "Unnamed World";
        this.mode = (worldData.mode !== undefined) ? worldData.mode : "default";
        this.size = (worldData.size !== undefined) ? worldData.size : this.settings.worldSize;
        this.players = [];
        this.bodies = [];
        this.chat = new Chat(this);

        console.log(`New world created with ID = ${this.id.bgYellow.black}\\n\\tName:\\t${this.name.gray}\\n\\tType:\\t${this.type == "public" ? ("public").cyan : this.type.red}\\n\\tMode:\\t${this.mode.gray}`);

        this.createUniverse();
        this.createPlanets();
    }
    createUniverse() {
        this.universe = new Player(0, this);
        this.universe.universe = true;
        this.addPlayer(this.universe);
    }
    createPlanets() {
        var i = 0, k = 0, r, theta, x, y, planet, planetsArr = [], position, positionOK;
        while (i < this.settings.planetsCount) {
            r = this.settings.worldSize * Math.sqrt(Math.random());
            theta = Math.random() * 2 * Math.PI;
            x = r * Math.cos(theta);
            y = r * Math.sin(theta);
            position = new Vector2(x, y);
            position.round();
            positionOK = true;
            for (var j = 0; j < i; j++) {
                if (position.distanceFrom(planetsArr[j]) < 2 * this.settings.planetsMinDistance) {
                    positionOK = false;
                    break;
                }
            }
            if (positionOK) {
                planet = new Planet()
                planet.position = position;
                planetsArr.push(position);
                this.bodies.push(planet);
                i++;
            }
            if (k >= this.settings.planetsCreateFailMultipier * this.settings.planetsCount) {
                console.log(`lol creating planets failed. Created ${i} planets out of ${this.settings.planetsCount}`.red);
                break;
            }
            k++;
        }
    }
    addPlayer(player) {
        this.players.push(player);
        player.world = this;
        if (!player.universe) { console.log("Player ".cyan + player.id.black.bgYellow + " has been moved to a world ".cyan + this.id.black.bgYellow) };
    }
    removePlayer(player) {
        var index = this.players.indexOf(player);
        if (index !== -1) {
            this.players.splice(index, 1);
        }
    }
}

module.exports = World;