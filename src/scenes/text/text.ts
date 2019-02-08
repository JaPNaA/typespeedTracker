import Scene from "../../scene.js";
import TextController from "./textController.js";
import InputController from "./inputController.js";
import InfoCollector from "../../infoCollector/infoCollector.js";
import App from "../../index.js";

class TextScene extends Scene {
    protected elm: HTMLDivElement;

    protected text: TextController;
    protected input: InputController;
    protected infoCollecter: InfoCollector;

    constructor(app: App) {
        super(app);

        this.elm = this.createElm();
        this.infoCollecter = new InfoCollector();
        this.text = this.createText();
        this.input = this.createInput();
    }

    public setup(): void {
        this.getText();
    }

    public destory(): void {
        this.removeSelf();
        this.text.destory();
    }

    private createElm(): HTMLDivElement {
        const elm = document.createElement("div");
        elm.classList.add("textScene");
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

    private onInput(value: string) {
        this.text.typeChar(value);
    }

    protected onDone() { }

    private async getText() {
        const text = await fetch("text.txt").then(e => e.text());
        this.text.setText(text);
    }
}

export default TextScene;