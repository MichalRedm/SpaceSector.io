"use strict";

import { Game } from "./game.js";
import { Canvas } from "./canvas.js";
import { Chat } from "./chat.js";
import { Modal } from "./modal.js";
import { GameConsole } from "./console.js";
import { Changelog } from "./changelog.js";
import { Controls } from "./controls.js";

const socket = io();

const game = new Game(socket);
const controls = new Controls(socket);
let canvas = new Canvas();
let chat = new Chat(socket);
let modal = new Modal();
let gameConsole = new GameConsole(socket);
let changelog = new Changelog();

if (isAdBlockActive) {
    console.log("AdBlock detected");
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        var selection = document.querySelectorAll("body > *");
        for (var i = 0; i < selection.length; i++) {
            selection[i].style.opacity = 1;
        }
    }
};
  

var disconnected = false;

socket.on("connectResponse", function(data) {
    console.log("%cSuccesfully connected to the server. Your socket ID is %c" + data.id, "color:lime", "background-color:yellow;color:black");
    if (disconnected) {
        modal.open("Connection is back!", "idk what's going on, but it seems like you can play again");
    }
});

socket.on("stream", function(data) {
    //console.log(data);
});

socket.on('disconnect', function() {
    modal.open("Connection lost", "lol you've been disconnected from the server");
    disconnected = true;
});

//new SimpleBar(document.getElementById("chatMessages"));

const colors = ["#00faff", "#ff0000", "#ffe000", "#00ff00", "#ff05d0", "#073cff", "#ff6020"];
document.documentElement.style.setProperty("--main-color", colors[Math.floor(Math.random() * colors.length)]);

window.admin = function(txt) {
    return null;
}

window.adminRequest = function(adminKey) {
    socket.emit("adminRequest", adminKey);
    return null;
}