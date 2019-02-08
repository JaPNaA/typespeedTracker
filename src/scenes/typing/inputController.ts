class InputController {
    private elm: HTMLDivElement;
    private input: HTMLInputElement;

    private inputHandlers: Function[] = [];

    constructor() {
        this.elm = this.createElm();
        this.input = this.createInput();
    }

    public onInput(cb: Function) {
        this.inputHandlers.push(cb);
    }

    public nextValue(): string {
        const value = this.input.value;
        this.input.value = "";
        return value;
    }

    public appendTo(elm: HTMLElement) {
        elm.appendChild(this.elm);
    }

    private createElm(): HTMLDivElement {
        const div = document.createElement("div");
        div.classList.add("inputContainer");
        return div;
    }

    private createInput(): HTMLInputElement {
        const input = document.createElement("input");
        input.classList.add("input");
        this.elm.appendChild(input);
        input.addEventListener("input", this.onInputHandler.bind(this));
        return input;
    }

    private onInputHandler(): void {
        for (let cb of this.inputHandlers) {
            cb();
        }
    }
}

export default InputController;