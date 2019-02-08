import sanitizeSpecialChars from "../../utils/sanitizeSpecialChars.js";
import TextController from "./textController.js";

type InputControllerCallback = (value: string) => void;

class InputController {
    private elm: HTMLDivElement;
    private input: HTMLTextAreaElement;

    private textController: TextController;

    private inputHandlers: InputControllerCallback[] = [];

    constructor(textController: TextController) {
        this.elm = this.createElm();
        this.input = this.createInput();

        this.textController = textController;
        textController.cursor.append(this.input);
    }

    public focus() {
        this.input.focus();
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

    private createInput(): HTMLTextAreaElement {
        const input = document.createElement("textarea");
        input.classList.add("input");
        this.elm.appendChild(input);
        input.addEventListener("input", this.onInputHandler.bind(this));
        input.addEventListener("keydown", this.onKeydownHandler.bind(this));
        return input;
    }

    private onInputHandler(): void {
        const value = this.nextValue();

        for (let cb of this.inputHandlers) {
            cb(value);
        }
    }

    private onKeydownHandler(e: KeyboardEvent): void {
        if (e.keyCode === 8) {
            if (e.ctrlKey) {
                this.backspaceToLastSpace();
            } else {
                this.backspace();
            }
        }
    }

    private backspaceToLastSpace() {
        let prevChar;
        do {
            this.backspace();
            prevChar = this.textController.getPrevChar();
        } while (prevChar !== ' ' && prevChar !== undefined && !this.textController.done);
    }

    private backspace() {
        this.input.value = "\b";
        this.onInputHandler();
    }

    private nextValue(): string {
        const value = sanitizeSpecialChars(this.input.value);
        this.input.value = "";
        return value;
    }
}

export default InputController;