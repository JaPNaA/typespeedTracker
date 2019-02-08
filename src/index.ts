import Scene from "./scene.js";
import TypingScene from "./scenes/typing/typing.js";

class App {
    private currScene?: Scene;

    constructor() {
        this.typingScene();
    }

    public switchScene(scene: Scene): void {
        this.destoryCurrScene();
        this.currScene = scene;
        scene.setup();
        scene.appendTo(document.body);
    }

    private typingScene(): void {
        const scene = new TypingScene(this);
        this.switchScene(scene);
    }

    private destoryCurrScene() {
        if (this.currScene) {
            this.currScene.destory();
        }
    }
}

// for debugging on mobile
onerror = function (e) { document.title = e.toString(); };

console.log(new App());

export default App;