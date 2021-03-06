"use strict";

import { Canvas } from "./canvas.js";
import { Chat } from "./chat.js";
import { Modal } from "./modal.js";
import { GameConsole } from "./console.js";
import { Changelog } from "./changelog.js";
import { Controls } from "./controls.js";
import { Sound } from "./sound.js";
import { Protector } from "./protector.js";

class Game {
    constructor() {
        this.connect();

        this.controls = new Controls(this.socket);
        this.canvas = new Canvas();
        this.chat = new Chat(this.socket);
        this.modal = new Modal();
        this.console = new GameConsole(this.socket);
        this.changelog = new Changelog();
        this.protector = new Protector();

        this.reloading = false;

        this.disconnectListener();
        this.streamListener();
        this.colorize();
        this.fadeIn();

        this.bgSound = new Audio("/static/audio/music/giorno.mp3");
        document.getElementById("spawn").addEventListener("click", function(){
            this.bgSound.play();
        }.bind(this));
    }
    connect() {
        this.socket = io();
        this.socket.on("connectResponse", function(data) {
            console.log("%cSuccesfully connected to the server. Your socket ID is %c" + data.id, "color:lime", "background-color:yellow;color:black");
            if (this.disconnected) {
               this.modal.open("Connection is back!", "idk what's going on, but it seems like you can play again");
            }
        }.bind(this));
    }
    reloadListener() {
        window.onbeforeunload = function() {
            this.reloading = true;
        }.bind(this);
    }
    disconnectListener() {
        this.disconnected = false;
        this.socket.on('disconnect', function() {
            if (!this.reloading) {
                this.modal.open("Connection lost", "lol you've been disconnected from the server");
                this.disconnected = true;
            }
        }.bind(this));
    }
    streamListener() {
        this.socket.on("state", function(stateJSON) {
            var state = JSON.parse(stateJSON);
            this.canvas.update(state);
        }.bind(this));
    }
    colorize() {
        const colors = ["#00faff", "#fc1800", "#ffe000", "#00ff00", "#ff009b", "#044aff", "#ff6020"];
        document.documentElement.style.setProperty("--main-color", colors[Math.floor(Math.random() * colors.length)]);
    }
    fadeIn() {
        document.onreadystatechange = () => {
            if (document.readyState === 'complete') {
                var selection = document.querySelectorAll("body > *");
                for (var i = 0; i < selection.length; i++) {
                    selection[i].style.opacity = 1;
                }
            }
        };
    }
    adblockDetector() {
        if (isAdBlockActive) {
            console.log("AdBlock detected");
        }
    }
}

const game = new Game();