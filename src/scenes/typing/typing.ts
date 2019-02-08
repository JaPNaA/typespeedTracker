import Scene from "../../scene.js";
import TextController from "./textController.js";

class TypingScene extends Scene {
    protected elm: HTMLDivElement;

    private text: TextController;
    private input: HTMLInputElement;

    constructor() {
        super();

        this.elm = this.createElm();
        this.text = this.createText();
        this.input = this.createInput();

        this.setup();
    }

    public setup(): void {
        this.getText();
    }

    public destory(): void {
        if (this.elm.parentElement) {
            this.elm.parentElement.removeChild(this.elm);
        }
    }

    private createElm(): HTMLDivElement {
        const elm = document.createElement("div");
        elm.classList.add("typingScene");
        return elm;
    }

    private createText(): TextController {
        const controller = new TextController();
        controller.appendTo(this.elm);
        return controller;
    }

    private createInput(): HTMLInputElement {
        const input = document.createElement("input");
        input.classList.add("input");
        input.addEventListener("input", this.onInput.bind(this));
        this.elm.appendChild(input);
        return input;
    }

    private onInput(e: Event) {
        this.text.typeChar(this.input.value);
    }

    private async getText() {
        const text = await fetch("text.txt").then(e => e.text());
        this.text.setText(text);
    }
}

export default TypingScene;