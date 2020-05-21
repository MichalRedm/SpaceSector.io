class SettingsServer {
    constructor() {
        this.stepTime = 8;

        this.chatStepTime = 1500;

        this.nameMaxLength = 15;

        this.worldIdLength = 10;
        this.adminKeyLength = 16;
    }
}

module.exports = SettingsServer;