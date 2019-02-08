import sanitizeSpecialChars from "../../utils/sanitizeSpecialChars.js";

type InputControllerCallback = (value: string) => void;

class InputController {
    private elm: HTMLDivElement;
    private input: HTMLInputElement;

    private inputHandlers: InputControllerCallback[] = [];

    constructor() {
        this.elm = this.createElm();
        this.input = this.createInput();
    }

    public onInput(cb: InputControllerCallback) {
        this.inputHandlers.push(cb);
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
        const value = this.nextValue();

        for (let cb of this.inputHandlers) {
            cb(value);
        }
    }

    private nextValue(): string {
        const value = sanitizeSpecialChars(this.input.value);
        this.input.value = "";
        return value;
    }
}

export default InputController;