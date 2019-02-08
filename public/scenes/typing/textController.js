class TextController {
    constructor() {
        this.elm = this.createElm();
    }
    setText(text) {
        this.elm.innerText = text;
    }
    appendTo(elm) {
        elm.appendChild(this.elm);
    }
    createElm() {
        const elm = document.createElement("div");
        elm.classList.add("textToType");
        elm.innerText = "Loading...";
        return elm;
    }
}
export default TextController;
