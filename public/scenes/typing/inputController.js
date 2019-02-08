import sanitizeSpecialChars from "../../utils/sanitizeSpecialChars";
class InputController {
    constructor() {
        this.inputHandlers = [];
        this.elm = this.createElm();
        this.input = this.createInput();
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
        const input = document.createElement("input");
        input.classList.add("input");
        this.elm.appendChild(input);
        input.addEventListener("input", this.onInputHandler.bind(this));
        return input;
    }
    onInputHandler() {
        const value = this.nextValue();
        for (let cb of this.inputHandlers) {
            cb(value);
        }
    }
    nextValue() {
        const value = sanitizeSpecialChars(this.input.value);
        this.input.value = "";
        return value;
    }
}
export default InputController;
