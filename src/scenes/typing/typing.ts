import Scene from "../../scene.js";
import TextController from "./textController.js";
import InputController from "./inputController.js";
import InfoCollector from "../../infoCollector/infoCollector.js";
import App from "../../index.js";
import Stats from "../stats/stats.js";

class TypingScene extends Scene {
    protected elm: HTMLDivElement;

    private text: TextController;
    private input: InputController;
    private infoCollecter: InfoCollector;

    private boundKeydownHandler?: EventListenerOrEventListenerObject;

    constructor(app: App) {
        super(app);

        this.elm = this.createElm();
        this.infoCollecter = new InfoCollector();
        this.text = this.createText();
        this.input = this.createInput();

        this.registerKeydownHandler();
    }

    public setup(): void {
        this.getText();
    }

    public destory(): void {
        this.removeSelf();
        this.text.destory();

        if (this.boundKeydownHandler) {
            removeEventListener("keydown", this.boundKeydownHandler);
        }
    }

    private createElm(): HTMLDivElement {
        const elm = document.createElement("div");
        elm.classList.add("typingScene");
        return elm;
    }

    private createText(): TextController {
        const controller = new TextController(this.infoCollecter);
        controller.appendTo(this.elm);
        controller.onDone(this.onDone.bind(this));
        return controller;
    }

    private createInput(): InputController {
        const input = new InputController(this.text);
        input.onInput(this.onInput.bind(this));
        input.appendTo(this.elm);
        return input;
    }

    private registerKeydownHandler(): void {
        const boundFocusingHandler = this.focusingHandler.bind(this);
        addEventListener("keydown", boundFocusingHandler);
        addEventListener("touchstart", boundFocusingHandler);
        this.boundKeydownHandler = boundFocusingHandler;
    }

    private focusingHandler(): void {
        this.input.focus();
    }

    private onInput(value: string) {
        this.text.typeChar(value);
    }

    private onDone() {
        console.log("Done!!");
        this.app.switchScene(new Stats(this.app, this.infoCollecter));
    }

    private async getText() {
        const text = await fetch("text.txt").then(e => e.text());
        this.text.setText(text);
    }
}

export default TypingScene;