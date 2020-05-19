export class Controls {
    constructor(socket) {
        this.socket = socket;
        this.nameInput = document.getElementById("nameInput");
        //this.nameValidate();
        document.getElementById("spawn").addEventListener("click", this.spawn.bind(this));
        this.nameInput.addEventListener("keypress", function(e){
            e = e || window.event;
            if (e.keyCode === 13) {
                this.spawn();
            }
            //this.nameValidate();
        }.bind(this));
    }
    spawn() {
        this.name = document.getElementById("nameInput");
        this.socket.emit("spawn", this.name);
        console.log("Spawned");
    }
    nameValidate() {
        this.nameInput.value = this.nameInput.value.substring(0, 14);
    }
}