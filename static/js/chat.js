export class Chat {
    constructor(socket) {
        this.socket = socket;
        this.chat = document.getElementById("chat");
        this.chatInput = document.getElementById("chatInput");
        this.chatMessages = document.getElementById("chatMessages");
        this.chatSimplebar = document.querySelector("#chat .simplebar-content-wrapper");
        this.loading = true;
        
        window.addEventListener("keypress", function (e) {
            e = e || window.event;
            if (e.keyCode === 116 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
                this.toggle();
                this.scrollToBottom();
                return false;
            }
        }.bind(this));
        this.chatInput.addEventListener("keydown", function (e) {
            e = e || window.event;
            if (e.keyCode === 13 && !e.shiftKey) {
                this.sendMessage();
                return false;
            } else if (e.keyCode === 27) {
                this.toggle();
            }
        }.bind(this));
        socket.on("chatStream", function(chat) {
            this.update(chat);
        }.bind(this));

        document.getElementById("chatHeader").addEventListener("click", this.toggle.bind(this));
    }
    toggle() {
        if (this.chat.style.display === "block") {
            this.chat.style.display = "none";
        } else {
            this.chat.style.display = "block";
            this.chatInput.focus();
        }
    }
    sendMessage() {
        var text = this.chatInput.value;
        //text = text.replace("\n", "<br/>");
        this.socket.emit("chatMessage", { text: text });
        console.log("Chat message has been sent.");
        this.chatInput.value = "";
        this.chatMessages.innerHTML += `<p>${text}</p>`;
        this.scrollToBottom();
    }
    update(chat) {
        const scrolledToBottom = (this.chatSimplebar.scrollTop == this.chatSimplebar.scrollHeight - this.chatSimplebar.clientHeight);
        var chatHTML = "";
        chat.forEach(function(message, index) {
            chatHTML += `<p><span style="color: #fff;">[${message.playerName}]</span> ${message.text}</p>`;
        }.bind(this));
        this.chatMessages.innerHTML = chatHTML;
        if (scrolledToBottom) { this.scrollToBottom(); }
    }
    scrollToBottom() {
        this.chatSimplebar.scrollTop = this.chatSimplebar.scrollHeight - this.chatSimplebar.clientHeight;
    }
}