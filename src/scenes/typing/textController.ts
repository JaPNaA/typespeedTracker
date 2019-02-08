class TextController {
    private elm: HTMLDivElement;

    constructor() {
        this.elm = this.createElm();
    }

    public setText(text: string) {
        this.elm.innerText = text;
    }

    public appendTo(elm: HTMLElement): void {
        elm.appendChild(this.elm);
    }

    private createElm(): HTMLDivElement {
        const elm = document.createElement("div");
        elm.classList.add("textToType");
        elm.innerText = "Loading...";
        return elm;
    }
}

export default TextController;