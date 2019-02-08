import TextCursor from "./textCursor.js";

class TextController {
    private elm: HTMLDivElement;
    private textElm: HTMLDivElement;

    private chars: HTMLSpanElement[] = [];
    private text: string = "";
    private currCharIndex: number = 0;

    private cursor: TextCursor;

    constructor() {
        this.elm = this.createElm();
        this.textElm = this.createTextElm();
        this.cursor = new TextCursor();

        this.cursor.appendTo(this.elm);
        this.elm.appendChild(this.textElm);
    }

    public setText(text: string): void {
        const lines = text.split("\n");

        this.clearElm();
        this.text = text;

        for (let line of lines) {
            this.textElm.appendChild(this.createLineElm(line));
        }

        this.positionCursor();
    }

    public typeChar(char: string): void {
        const actualChar = this.getCurrChar();

        if (actualChar === char) {
            this.typeMoveForward();
        } else {
            this.typedWrong();
        }
    }

    private typeMoveForward() {
        this.currCharIndex++;
        this.positionCursor();
    }

    private typedWrong() {
        this.positionCursor();
    }

    private positionCursor() {
        this.cursor.positionTo(this.getCurrCharElm());
    }

    public appendTo(elm: HTMLElement): void {
        elm.appendChild(this.elm);
    }

    private clearElm(): void {
        while (this.textElm.firstChild) {
            this.textElm.removeChild(this.textElm.firstChild);
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
        elm.classList.add("textToTypeContainer");
        return elm;
    }

    private createTextElm(): HTMLDivElement {
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

    public destory() {
        this.cursor.destory();
    }
}

export default TextController;