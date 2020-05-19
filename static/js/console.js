export class GameConsole {
    constructor(socket) {
        this.console = document.getElementById("console");
        this.consoleContent = document.getElementById("consoleContent");
        this.consoleInput = document.getElementById("consoleInput");
        window.addEventListener("keydown", function (e) {
            e = e || window.event;
            if (e.keyCode === 67 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
                this.toggle();
            }
        }.bind(this));
        this.consoleContent.addEventListener("click", function(){
            this.consoleInput.focus();
        }.bind(this));
        this.consoleInput.addEventListener("keydown", function (e) {
            e = e || window.event;
            if (e.keyCode === 13) {
                this.sendCommand(socket);
            }
        }.bind(this));
        socket.on("consoleResponse", function(response){
            this.printLine(`> ${response}`, "color: #aaa;");
        }.bind(this));
    }
    toggle() {
        if (this.console.style.display !== "block") {
            this.console.style.display = "block";
            setTimeout(function(){this.consoleInput.focus();}.bind(this), 0);
        } else {
            this.console.style.display = "none";
        }
    }
    sendCommand(socket) {
        var command = this.consoleInput.value;
        socket.emit("consoleCommand", command);
        this.printLine(command);
        setTimeout(function(){this.consoleInput.value = ""}.bind(this), 0);
    }
    printLine(HTML, CSS) {
        var p = document.createElement("p");
        p.innerHTML = HTML;
        if (CSS !== undefined) {
            p.style.cssText = CSS;
        }
        this.consoleInput.parentNode.insertBefore(p, this.consoleInput);
    }
}