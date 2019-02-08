import Scene from "../scene.js";

class TypingScene extends Scene {
    private textToType: HTMLDivElement;
    private input: HTMLInputElement;

    constructor() {
        super();

        this.textToType = this.createTextToTypeElement();
        this.input = this.createInput();

        this.setup();
    }

    public setup(): void {
        this.getText();
    }

    public destory(): void { }

    private createTextToTypeElement(): HTMLDivElement {
        const div = document.createElement("div");
        div.classList.add("textToType");
        return div;
    }

    private createInput(): HTMLInputElement {
        const input = document.createElement("input");
        input.classList.add("input");
        return input;
    }

    private async getText() {
        const text = await fetch("text.txt").then(e => e.text());
        this.textToType.innerText = text;
    }
}

export default TypingScene;