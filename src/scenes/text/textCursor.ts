class TextCursor {
    private elm: HTMLDivElement;
    private target?: HTMLElement;

    private boundResizeHandler: EventListenerOrEventListenerObject;

    constructor() {
        this.elm = this.createElm();
        this.boundResizeHandler = this.resizeHandler.bind(this);
        addEventListener("resize", this.boundResizeHandler);
    }

    private resizeHandler() {
        if (this.target) {
            this.positionTo(this.target);
        }
    }

    public appendTo(elm: HTMLDivElement): void {
        elm.appendChild(this.elm);
    }

    public append(elm: HTMLElement): void {
        this.elm.appendChild(elm);
    }

    public destory() {
        removeEventListener("resize", this.boundResizeHandler);
    }

    public positionTo(elm: HTMLElement): void {
        const domRect = elm.getBoundingClientRect();
        const { x: xOff, y: yOff } = this.getScrollOffsets(elm);
        this.target = elm;
        this.setStyles(domRect.left + xOff, domRect.top + yOff, domRect.width, domRect.height);
    }

    private getScrollOffsets(elm: HTMLElement): { x: number, y: number } {
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