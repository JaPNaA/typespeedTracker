import TextCursor from "./textCursor.js";
import InfoCollector from "../../infoCollector/infoCollector.js";

class TextController {
    public done: boolean = false;

    private onDoneCallbacks: Function[] = [];

    private elm: HTMLDivElement;
    private textElm: HTMLDivElement;

    private chars: HTMLSpanElement[] = [];
    private text: string = "";
    private currCharIndex: number = 0;

    private cursor: TextCursor;
    private infoCollecter: InfoCollector;

    constructor(infoCollecter: InfoCollector) {
        this.elm = this.createElm();
        this.textElm = this.createTextElm();
        this.cursor = new TextCursor();
        this.infoCollecter = infoCollecter;

        this.cursor.appendTo(this.elm);
        this.elm.appendChild(this.textElm);
    }

    public onDone(cb: Function) {
        this.onDoneCallbacks.push(cb);
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
        if (this.done) { return; }

        const actualChar = this.getCurrChar();
        const isCorrect = actualChar === char;
        const isBackspace = char === "\b";

        this.infoCollecter.logKey(char, actualChar, !isCorrect, isBackspace);

        if (isCorrect) {
            this.typeMoveForward();
        } else if (isBackspace) {
            this.typeBackspace();
        } else {
            this.typedWrong();
        }

        this.checkDone();
    }

    private typeMoveForward(): void {
        this.setCurrElmCorrect();
        this.currCharIndex++;
        this.positionCursor();
    }

    private typeBackspace(): void {
        this.setCurrElmUntouched();

        if (this.currCharIndex <= 0) { return; }
        this.currCharIndex--;
        this.setCurrElmRemoved();
        this.positionCursor();
    }

    private typedWrong(): void {
        this.setCurrElmWrong();
        this.positionCursor();
    }

    private setCurrElmCorrect(): void {
        this.clearCurrElmClasses();
        this.getCurrCharElm().classList.add("correct");
    }

    private setCurrElmRemoved(): void {
        this.clearCurrElmClasses();
        this.getCurrCharElm().classList.add("removed");
    }

    private setCurrElmWrong(): void {
        this.clearCurrElmClasses();
        this.getCurrCharElm().classList.add("wrong");
    }

    private setCurrElmUntouched(): void {
        this.clearCurrElmClasses();
        this.getCurrCharElm().classList.add("untouched");
    }

    private clearCurrElmClasses(): void {
        const currElm = this.getCurrCharElm();
        currElm.classList.remove("untouched");
        currElm.classList.remove("removed");
        currElm.classList.remove("wrong");
        currElm.classList.remove("correct");
    }

    private positionCursor(): void {
        this.cursor.positionTo(this.getCurrCharElm());
    }

    private checkDone(): void {
        if (this.currCharIndex === this.text.length) {
            if (!this.done) {
                this.dispatchDone();
            }

            this.done = true;
        }
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

    private dispatchDone(): void {
        for (let cb of this.onDoneCallbacks) {
            cb();
        }
    }

    public getCurrChar(): string {
        return this.text[this.currCharIndex];
    }

    public getPrevChar(): string {
        return this.text[this.currCharIndex - 1];
    }

    private getCurrCharElm(): HTMLSpanElement {
        return this.chars[this.currCharIndex];
    }

    public destory() {
        this.cursor.destory();
    }
}

export default TextController;