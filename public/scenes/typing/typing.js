import Stats from "../stats/stats.js";
import TextScene from "../text/text.js";
class TypingScene extends TextScene {
    constructor(app) {
        super(app);
        this.endButton = this.createEndButton();
        this.registerKeydownHandler();
    }
    destory() {
        super.destory();
        if (this.boundKeydownHandler) {
            removeEventListener("keydown", this.boundKeydownHandler);
        }
    }
    registerKeydownHandler() {
        const boundFocusingHandler = this.focusingHandler.bind(this);
        addEventListener("keydown", boundFocusingHandler);
        addEventListener("touchstart", boundFocusingHandler);
        this.boundKeydownHandler = boundFocusingHandler;
    }
    createEndButton() {
        const button = document.createElement("button");
        button.innerText = "End prematurely";
        button.addEventListener("click", this.onDone.bind(this));
        button.classList.add("end");
        this.elm.insertBefore(button, this.elm.firstChild);
        return button;
    }
    focusingHandler() {
        this.input.focus();
    }
    onDone() {
        this.app.switchScene(new Stats(this.app, this.infoCollecter));
    }
}
export default TypingScene;
