var express = require("express");
var http = require("http");
var path = require("path");
var socketIO = require("socket.io");

const port = 5000;

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set("port", port);
app.use("/static", express.static(path.join(__dirname, "..", "static")));

// Routing
app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname, "..", "index.html"));
});

// Starts the server.
server.listen(port, function() {
    var date = new Date();
    const startTime = date.getTime();
    console.log("Starting server on port " + port);
});

// Add the WebSocket handlers
io.on("connection", function(socket) {
    io.sockets.emit("connectResponse", {
        id: socket.id
    });
});