import Scene from "./scene.js";
import TypingScene from "./scenes/typing.js";

class App {
    private currScene: Scene;

    constructor() {
        this.currScene = this.createTypingScene();
    }

    private createTypingScene(): TypingScene {
        const scene = new TypingScene();
        this.destoryCurrScene();
        scene.appendTo(document.body);
        return scene;
    }

    private destoryCurrScene() {
        if (this.currScene) {
            this.currScene.destory();
        }
    }
}

console.log(new App());