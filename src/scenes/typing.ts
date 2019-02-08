import Scene from "../scene.js";

class TypingScene extends Scene {
    protected elm: HTMLDivElement;

    private textToType: HTMLDivElement;
    private input: HTMLInputElement;


    constructor() {
        super();

        this.elm = this.createElm();
        this.textToType = this.createTextToTypeElement();
        this.input = this.createInput();

        this.setup();
    }

    public setup(): void {
        this.textToType.innerText = "Loading...";
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

    private createTextToTypeElement(): HTMLDivElement {
        const textToType = document.createElement("div");
        textToType.classList.add("textToType");
        this.elm.appendChild(textToType);
        return textToType;
    }

    private createInput(): HTMLInputElement {
        const input = document.createElement("input");
        input.classList.add("input");
        this.elm.appendChild(input);
        return input;
    }

    private async getText() {
        const text = await fetch("text.txt").then(e => e.text());
        this.textToType.innerText = text;
    }
}

export default TypingScene;