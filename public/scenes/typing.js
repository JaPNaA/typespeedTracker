var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Scene from "../scene.js";
class TypingScene extends Scene {
    constructor() {
        super();
        this.textToType = this.createTextToTypeElement();
        this.input = this.createInput();
        this.setup();
    }
    setup() {
        this.getText();
    }
    destory() { }
    createTextToTypeElement() {
        const div = document.createElement("div");
        div.classList.add("textToType");
        return div;
    }
    createInput() {
        const input = document.createElement("input");
        input.classList.add("input");
        return input;
    }
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            const text = yield fetch("text.txt").then(e => e.text());
            this.textToType.innerText = text;
        });
    }
}
export default TypingScene;
