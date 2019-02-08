class TextCursor {
    private elm: HTMLDivElement;

    constructor() {
        this.elm = this.createElm();
    }

    public appendTo(elm: HTMLDivElement): void {
        elm.appendChild(this.elm);
    }

    public positionTo(elm: HTMLElement): void {
        const domRect = elm.getBoundingClientRect() as DOMRect;
        this.setStyles(domRect.x, domRect.y, domRect.width, domRect.height);
    }

    private setStyles(x: number, y: number, width: number, height: number) {
        this.elm.style.left = x + "px";
        this.elm.style.top = y + "px";
        this.elm.style.width = width + "px";
        this.elm.style.height = height + "px";
    }

    private createElm(): HTMLDivElement {
        const div = document.createElement("div");
        div.classList.add("cursor");
        return div;
    }
}

export default TextCursor;