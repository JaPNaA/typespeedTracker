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
class TextScene extends Scene {
    constructor(app) {
        super(app);
        this.elm = this.createElm();
        this.infoCollecter = new InfoCollector();
        this.text = this.createText();
        this.input = this.createInput();
    }
    setup() {
        this.getText();
    }
    destory() {
        this.removeSelf();
        this.text.destory();
    }
    createElm() {
        const elm = document.createElement("div");
        elm.classList.add("textScene");
        return elm;
    }
    createText() {
        const controller = new TextController(this.infoCollecter);
        controller.appendTo(this.elm);
        controller.onDone(this.onDone.bind(this));
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
    onDone() { }
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            const text = yield fetch("text.txt").then(e => e.text());
            this.text.setText(text);
        });
    }
}
export default TextScene;
