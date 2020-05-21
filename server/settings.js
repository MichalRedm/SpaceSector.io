class Settings {
    constructor() {
        // server settings
        
        this.stepTime = 8;

        this.chatStepTime = 1500;

        this.nameMaxLength = 15;

        this.worldIdLength = 10;
        this.adminKeyLength = 16;

        // world settings

        this.worldSize = 100;
        this.planetsCount = 87;
        this.planetsMinDistance = 8;

    }
}

module.exports = Settings;