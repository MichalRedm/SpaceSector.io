export class Canvas {
    constructor() {
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

        this.cache = {};
        this.spriteIds = [];
    }
    resize() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }
    update(state) {
        for (var key of Object.keys(state)) {
            if (this.cache[key] === undefined) {
                // add new sprites
            } else {
                // update existing sprites
            }
        }
        for (var key of Object.keys(this.cache)) {
            if (state[key] === undefined) {
                // destroy nonexistant sprites
            }
        }

        this.cache = state;
    }
}