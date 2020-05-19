export class Controls {
    constructor(socket) {
        this.socket = socket;
        document.getElementById("spawn").addEventListener("click", this.spawn.bind(this));
        document.getElementById("nameInput").addEventListener("keypress", function(e){
            e = e || window.event;
            if (e.keyCode === 13) {
                this.spawn();
            }
        }.bind(this));
    }
    spawn() {
        this.name = document.getElementById("nameInput");
        this.socket.emit("spawn", this.name);
        console.log("Spawned");
    }
}