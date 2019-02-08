var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Scene from "../../scene.js";
import TextController from "./textController.js";
import InputController from "./inputController.js";
import InfoCollector from "../../infoCollector/infoCollector.js";
class TypingScene extends Scene {
    constructor() {
        super();
        this.elm = this.createElm();
        this.infoCollecter = new InfoCollector();
        this.text = this.createText();
        this.input = this.createInput();
        this.setup();
    }
    setup() {
        this.getText();
    }
    destory() {
        if (this.elm.parentElement) {
            this.elm.parentElement.removeChild(this.elm);
        }
        this.text.destory();
    }
    createElm() {
        const elm = document.createElement("div");
        elm.classList.add("typingScene");
        return elm;
    }
    createText() {
        const controller = new TextController(this.infoCollecter);
        controller.appendTo(this.elm);
        controller.onDone(function () { console.log("Done!!"); });
        return controller;
    }
    createInput() {
        const input = new InputController(this.text);
        input.onInput(this.onInput.bind(this));
        input.appendTo(this.elm);
        return input;
    }
    onInput(value) {
        this.text.typeChar(value);
    }
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            const text = (yield fetch("text.txt").then(e => e.text())).slice(0, 10); // TEMP TODO
            this.text.setText(text);
        });
    }
}
export default TypingScene;
