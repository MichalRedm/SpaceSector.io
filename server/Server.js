const Body = require("./body");
const SettingsServer = require("./settingsServer");
const World = require("./world");
const Player = require("./player");
const Strings = require("./strings");

const util = require('util')
const colors = require('colors');

class Server {
    constructor() {
        this.settings = new SettingsServer();

        this.express = require("express");
        this.http = require("http");
        this.path = require("path");
        this.socketIO = require("socket.io");

        const port = 5000;

        this.app = this.express();
        this.httpServer = this.http.Server(this.app);
        this.io = this.socketIO(this.httpServer);

        this.app.set("port", port);
        this.app.use("/static", this.express.static(this.path.join(__dirname, "..", "static")));

        // Routing
        this.app.get("/", (function(request, response) {
            response.sendFile(this.path.join(__dirname, "..", "index.html"));
        }).bind(this));

        // Starts the Server.
        this.httpServer.listen(port, function() {
            let date = new Date();
            this.startTime = date.getTime();
            console.log(("Starting server on port " + port).green);
        });

        this.adminKey = Strings.random(this.settings.adminKeyLength);
        console.log("Server admin key: " + this.adminKey.black.bgRed);

        this.worldsSetup();

        // Add the WebSocket handlers
        this.io.on('connection', function(socket) { this.connection(socket); }.bind(this));
    }
    worldsSetup() {
        this.worlds = {
            "public": {},
            "private": {}
        };

        this.setMainWorld(this.createWorld({
            main: true,
            type: "public",
            name: "FFA",
            mode: "default"
        }));
    }
    connection(socket) {
        let player = new Player(socket.id);
        console.log("A new player with ip ".cyan + socket.handshake.address.yellow + " and socket ID = ".cyan + socket.id.black.bgYellow + " has connected to the server".cyan);

        this.mainWorld.addPlayer(player);

        this.io.sockets.emit("connectResponse", {
            id: socket.id
        });

        setInterval(function() { this.chatStream(player); }.bind(this), this.settings.chatStepTime);
        setInterval(() => {
            if (player !== null) { this.io.sockets.emit("state", player.world.getState(player)); };
        }, this.settings.stepTime);

        socket.on("chatMessage", function(message) {
            player.world.chat.addMessage(message, player.id, player.name);
        }.bind(this));

        socket.on("consoleCommand", function(command) {
            var response = "Unknown command";
            if (command === `admin ${this.adminKey}`) {
                if (!player.admin) {
                    player.admin = true;
                    console.log("Player ".red + player.id.black.bgYellow + " has been given administrator privelges".red);
                    response = "You've been given administrator privelges. Nice!";
                } else {
                    response = "lol you already have admin privelges. Not happy yet?";
                }
            }
            if (command === "world create") {
                response = `New world created with id ${this.createWorld({}, this).id}`;
            }
            socket.emit("consoleResponse", response);
        }.bind(this));

        socket.on('disconnect', function() {
            console.log("Player ".yellow + player.id.black.bgYellow + " has disconnected".yellow);
            player = null;
        });
    }
    chatStream(player) {
        if (player !== null) {
            if (player.world.chat.update || player.chatRequest) {
                this.io.sockets.emit("chatStream", player.world.chat.messages);
                player.world.chat.update = false;
                player.chatRequest = false;
            }
        }
    }
    createWorld(worldData) {
        var world = new World(worldData, this);
        this.worlds[world.type][world.id] = world;
        console.log("World " + world.id.black.bgYellow + " has been added to the " + world.type.gray + " worlds list");
        return world;
    }
    deleteWorld(worldId) {
        delete this.worlds.public[worldId];
        delete this.worlds.private[worldId];
        console.log(`World ${worldId.black.bgYellow} has been deleted`);
    };
    setMainWorld(world) {
        this.mainWorld = world;
        console.log("World " + world.id.black.bgYellow + " is now the main world");
    }
    serverTime() {
        var date = new Date();
        var time = date.getTime();
        var serverTime = time - this.startTime;
        return serverTime;
    }
}

const server = new Server();