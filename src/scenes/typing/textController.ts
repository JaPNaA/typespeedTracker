class TextController {
    private elm: HTMLDivElement;

    private chars: HTMLSpanElement[] = [];
    private text: string = "";
    private currCharIndex: number = 0;

    constructor() {
        this.elm = this.createElm();
    }

    public setText(text: string): void {
        const lines = text.split("\n");
        this.clearElm();
        this.text = text;
        for (let line of lines) {
            this.elm.appendChild(this.createLineElm(line));
        }
    }

    public typeChar(char: string): void {
        console.log(this.getCurrChar());
    }

    public appendTo(elm: HTMLElement): void {
        elm.appendChild(this.elm);
    }

    private clearElm(): void {
        while (this.elm.firstChild) {
            this.elm.removeChild(this.elm.firstChild);
        }
    }

    private createLineElm(line: string): HTMLDivElement {
        const div = document.createElement("div");
        div.classList.add("line");

        for (let letter of line) {
            div.appendChild(this.createLetterElm(letter));
        }

        div.appendChild(this.createLetterElm('\n'));

        return div;
    }

    private createLetterElm(char: string): HTMLSpanElement {
        const letter = document.createElement("span");
        letter.classList.add("letter", "untouched");
        letter.innerText = char;
        this.chars.push(letter);
        return letter;
    }

    private createElm(): HTMLDivElement {
        const elm = document.createElement("div");
        elm.classList.add("textToType");
        elm.innerText = "Loading...";
        return elm;
    }

    private getCurrChar(): string {
        return this.text[this.currCharIndex];
    }

    private getCurrCharElm(): HTMLSpanElement {
        return this.chars[this.currCharIndex];
    }
}

export default TextController;