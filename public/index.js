import TypingScene from "./scenes/typing.js";
class App {
    constructor() {
        this.currScene = this.createTypingScene();
    }
    createTypingScene() {
        const scene = new TypingScene();
        this.destoryCurrScene();
        scene.appendTo(document.body);
        return scene;
    }
    destoryCurrScene() {
        if (this.currScene) {
            this.currScene.destory();
        }
    }
}
console.log(new App());
