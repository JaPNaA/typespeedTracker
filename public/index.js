import TypingScene from "./scenes/typing/typing.js";
class App {
    constructor() {
        this.typingScene();
    }
    switchScene(scene) {
        this.destoryCurrScene();
        this.currScene = scene;
        scene.setup();
        scene.appendTo(document.body);
    }
    typingScene() {
        const scene = new TypingScene(this);
        this.switchScene(scene);
    }
    destoryCurrScene() {
        if (this.currScene) {
            this.currScene.destory();
        }
    }
}
// for debugging on mobile
onerror = function (e) { document.title = e.toString(); };
console.log(new App());
export default App;
