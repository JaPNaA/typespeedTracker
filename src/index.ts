import Scene from "./scene.js";
import TypingScene from "./scenes/typing.js";

class App {
    private currSecene: Scene;

    constructor() {
        this.currSecene = new TypingScene();
    }
}

console.log(new App());