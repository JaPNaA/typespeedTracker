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
        this.elm = this.createElm();
        this.textToType = this.createTextToTypeElement();
        this.input = this.createInput();
        this.setup();
    }
    setup() {
        this.textToType.innerText = "Loading...";
        this.getText();
    }
    destory() {
        if (this.elm.parentElement) {
            this.elm.parentElement.removeChild(this.elm);
        }
    }
    createElm() {
        const elm = document.createElement("div");
        elm.classList.add("typingScene");
        return elm;
    }
    createTextToTypeElement() {
        const textToType = document.createElement("div");
        textToType.classList.add("textToType");
        this.elm.appendChild(textToType);
        return textToType;
    }
    createInput() {
        const input = document.createElement("input");
        input.classList.add("input");
        this.elm.appendChild(input);
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
