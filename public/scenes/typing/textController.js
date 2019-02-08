class TextController {
    constructor() {
        this.chars = [];
        this.text = "";
        this.currCharIndex = 0;
        this.elm = this.createElm();
    }
    setText(text) {
        const lines = text.split("\n");
        this.clearElm();
        this.text = text;
        for (let line of lines) {
            this.elm.appendChild(this.createLineElm(line));
        }
    }
    typeChar(char) {
        console.log(this.getCurrChar());
    }
    appendTo(elm) {
        elm.appendChild(this.elm);
    }
    clearElm() {
        while (this.elm.firstChild) {
            this.elm.removeChild(this.elm.firstChild);
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
        elm.classList.add("textToType");
        elm.innerText = "Loading...";
        return elm;
    }
    getCurrChar() {
        return this.text[this.currCharIndex];
    }
    getCurrCharElm() {
        return this.chars[this.currCharIndex];
    }
}
export default TextController;
