export class Canvas {
    constructor() {
        this.loaded = false;

        let type = "WebGL"
        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas"
        }

        PIXI.utils.sayHello(type)

        // Create a Pixi Application
        this.app = new PIXI.Application({width: 512, height: 512});

        // Add the canvas that Pixi automatically created for you to the HTML document
        document.body.appendChild(this.app.view);

        this.app.renderer.backgroundColor = 0x000000;
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.autoDensity = true;

        this.resize();
        window.addEventListener("resize", this.resize.bind(this));

        this.graphics = new PIXI.Graphics();
        this.app.stage.addChild(this.graphics);

        this.loadSprites();

        this.map = {};
        this.cache = {};
        //this.spriteIds = [];
    }
    resize() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }
    loadSprites() {
        PIXI.loader.add([
            "/static/img/png/icon.png",
            "/static/img/sprites/planet.svg"
        ]).load(function(){this.loaded = true;}.bind(this));
    }
    update(state) {
        if (this.loaded) {
            for (var key of Object.keys(state)) {
                if (this.cache[key] === undefined) {
                    // add new sprites
                    this.map[key] = this.drawBody(state[key]);
                } else {
                    // update existing sprites
                }
            }
            for (var key of Object.keys(this.cache)) {
                if (state[key] === undefined) {
                    // destroy nonexistant sprites
                    this.app.stage.removeChild(this.map[key]);
                    delete this.map[key];
                }
            }

            this.cache = state;
        }
    }
    drawBody(body) {
        var bodyDrawing;
        switch (body.type) {
            case "planet":
                bodyDrawing = new PIXI.Sprite(PIXI.loader.resources["/static/img/sprites/planet.svg"].texture);
                bodyDrawing.pivot.set(bodyDrawing.width / 2, bodyDrawing.height / 2);
                bodyDrawing.width = 2 * body.size;
                bodyDrawing.height = 2 * body.size;
                bodyDrawing.tint = 0x00ffff;
                break;
            default:
                bodyDrawing = new PIXI.Sprite(PIXI.loader.resources["/static/img/png/icon.png"].texture);
                bodyDrawing.pivot.set(bodyDrawing.width / 2, bodyDrawing.height / 2);
        }
        bodyDrawing.position.set(body.position.x + window.innerWidth / 2, body.position.y + window.innerHeight / 2);
        this.app.stage.addChild(bodyDrawing);
        return bodyDrawing;
    }
}