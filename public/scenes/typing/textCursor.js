class TextCursor {
    constructor() {
        this.elm = this.createElm();
    }
    appendTo(elm) {
        elm.appendChild(this.elm);
    }
    positionTo(elm) {
        const domRect = elm.getBoundingClientRect();
        this.setStyles(domRect.x, domRect.y, domRect.width, domRect.height);
    }
    setStyles(x, y, width, height) {
        this.elm.style.left = x + "px";
        this.elm.style.top = y + "px";
        this.elm.style.width = width + "px";
        this.elm.style.height = height + "px";
    }
    createElm() {
        const div = document.createElement("div");
        div.classList.add("cursor");
        return div;
    }
}
export default TextCursor;
