import sanitizeSpecialChars from "../../utils/sanitizeSpecialChars.js";
class InputController {
    constructor(textController) {
        this.inputHandlers = [];
        this.elm = this.createElm();
        this.input = this.createInput();
        this.textController = textController;
        textController.cursor.append(this.input);
    }
    focus() {
        this.input.focus();
    }
    onInput(cb) {
        this.inputHandlers.push(cb);
    }
    appendTo(elm) {
        elm.appendChild(this.elm);
    }
    createElm() {
        const div = document.createElement("div");
        div.classList.add("inputContainer");
        return div;
    }
    createInput() {
        const input = document.createElement("textarea");
        input.classList.add("input");
        this.elm.appendChild(input);
        input.addEventListener("input", this.onInputHandler.bind(this));
        input.addEventListener("keydown", this.onKeydownHandler.bind(this));
        return input;
    }
    onInputHandler() {
        const value = this.nextValue();
        for (let cb of this.inputHandlers) {
            cb(value);
        }
    }
    onKeydownHandler(e) {
        if (e.keyCode === 8) {
            if (e.ctrlKey) {
                this.backspaceToLastSpace();
            }
            else {
                this.backspace();
            }
        }
    }
    backspaceToLastSpace() {
        let prevChar;
        do {
            this.backspace();
            prevChar = this.textController.getPrevChar();
        } while (prevChar !== ' ' && prevChar !== undefined && !this.textController.done);
    }
    backspace() {
        this.input.value = "\b";
        this.onInputHandler();
    }
    nextValue() {
        const value = sanitizeSpecialChars(this.input.value);
        this.input.value = "";
        return value;
    }
}
export default InputController;
