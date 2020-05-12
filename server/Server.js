class Server {
    Server() {
        var date = new Date();
        this.startTime = date.getTime();

        var express = require('express');
        var http = require('http');
        var path = require('path');
        var socketIO = require('socket.io');

        var app = express();
        var server = http.Server(app);
        var io = socketIO(server);

        app.set('port', 5000);
        app.use('/static', express.static(path.join(__dirname, '..', 'static')));

        // Routing
        app.get('/', function(request, response) {
            response.sendFile(path.join(__dirname, '..', 'index.html'));
        });

        // Starts the server.
        server.listen(5000, function() {
            console.log('Starting server on port 5000');
        });

        // Add the WebSocket handlers
        io.on('connection', function(socket) {
            io.sockets.emit("connectResponse", {
                id: socket.id
            });
        });
    }
}

module.exports = Server;