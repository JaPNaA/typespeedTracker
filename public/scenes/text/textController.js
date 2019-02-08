import TextCursor from "./textCursor.js";
class TextController {
    constructor(infoCollecter) {
        this.done = false;
        this.onDoneCallbacks = [];
        this.chars = [];
        this.text = "";
        this.currCharIndex = 0;
        this.elm = this.createElm();
        this.textElm = this.createTextElm();
        this.cursor = new TextCursor();
        this.infoCollecter = infoCollecter;
        this.cursor.appendTo(this.elm);
        this.elm.appendChild(this.textElm);
    }
    onDone(cb) {
        this.onDoneCallbacks.push(cb);
    }
    setText(text) {
        const lines = text.split("\n");
        this.clearElm();
        this.text = text;
        for (let line of lines) {
            this.textElm.appendChild(this.createLineElm(line));
        }
        this.positionCursor();
    }
    typeChar(char) {
        if (this.done) {
            return;
        }
        const actualChar = this.getCurrChar();
        const isCorrect = actualChar === char;
        const isBackspace = char === "\b";
        if (this.infoCollecter) {
            this.infoCollecter.logKey(char, actualChar, this.currCharIndex, !isCorrect, isBackspace);
        }
        if (isCorrect) {
            this.typeMoveForward();
        }
        else if (isBackspace) {
            this.typeBackspace();
        }
        else {
            this.typedWrong();
        }
        this.checkDone();
    }
    typeMoveForward() {
        this.setCurrElmCorrect();
        this.currCharIndex++;
        this.positionCursor();
    }
    typeBackspace() {
        this.setCurrElmUntouched();
        if (this.currCharIndex <= 0) {
            return;
        }
        this.currCharIndex--;
        this.setCurrElmRemoved();
        this.positionCursor();
    }
    typedWrong() {
        this.setCurrElmWrong();
        this.positionCursor();
    }
    setCurrElmCorrect() {
        this.clearCurrElmClasses();
        this.getCurrCharElm().classList.add("correct");
    }
    setCurrElmRemoved() {
        this.clearCurrElmClasses();
        this.getCurrCharElm().classList.add("removed");
    }
    setCurrElmWrong() {
        this.clearCurrElmClasses();
        this.getCurrCharElm().classList.add("wrong");
    }
    setCurrElmUntouched() {
        this.clearCurrElmClasses();
        this.getCurrCharElm().classList.add("untouched");
    }
    clearCurrElmClasses() {
        const currElm = this.getCurrCharElm();
        currElm.classList.remove("untouched");
        currElm.classList.remove("removed");
        currElm.classList.remove("wrong");
        currElm.classList.remove("correct");
    }
    positionCursor() {
        this.cursor.positionTo(this.getCurrCharElm());
    }
    checkDone() {
        if (this.currCharIndex === this.text.length) {
            if (!this.done) {
                this.dispatchDone();
            }
            this.done = true;
        }
    }
    appendTo(elm) {
        elm.appendChild(this.elm);
    }
    clearElm() {
        while (this.textElm.firstChild) {
            this.textElm.removeChild(this.textElm.firstChild);
        }
    }
    createLineElm(line) {
        const div = document.createElement("div");
        div.classList.add("line");
        for (let letter of line) {
            div.appendChild(this.createLetterElm(letter));
        }
        div.appendChild(this.createLetterElm('\n'));
        return div;
    }
    createLetterElm(char) {
        const letter = document.createElement("span");
        letter.classList.add("letter", "untouched");
        letter.innerText = char;
        this.chars.push(letter);
        return letter;
    }
    createElm() {
        const elm = document.createElement("div");
        elm.classList.add("textToTypeContainer");
        return elm;
    }
    createTextElm() {
        const elm = document.createElement("div");
        elm.classList.add("textToType");
        elm.innerText = "Loading...";
        return elm;
    }
    dispatchDone() {
        for (let cb of this.onDoneCallbacks) {
            cb();
        }
    }
    getCurrChar() {
        return this.text[this.currCharIndex];
    }
    getPrevChar() {
        return this.text[this.currCharIndex - 1];
    }
    getCurrCharElm() {
        return this.chars[this.currCharIndex];
    }
    destory() {
        this.cursor.destory();
    }
}
export default TextController;
