class TextCursor {
    constructor() {
        this.elm = this.createElm();
        this.boundResizeHandler = this.resizeHandler.bind(this);
        addEventListener("resize", this.boundResizeHandler);
    }
    resizeHandler() {
        if (this.target) {
            this.positionTo(this.target);
        }
    }
    appendTo(elm) {
        elm.appendChild(this.elm);
    }
    append(elm) {
        this.elm.appendChild(elm);
    }
    destory() {
        removeEventListener("resize", this.boundResizeHandler);
    }
    positionTo(elm) {
        const domRect = elm.getBoundingClientRect();
        const { x: xOff, y: yOff } = this.getScrollOffsets(elm);
        this.target = elm;
        this.setStyles(domRect.left + xOff, domRect.top + yOff, domRect.width, domRect.height);
    }
    getScrollOffsets(elm) {
        let x = 0;
        let y = 0;
        let curr = elm;
        while (curr.parentElement) {
            curr = curr.parentElement;
            y += curr.scrollTop;
            x += curr.scrollLeft;
        }
        return { x, y };
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
