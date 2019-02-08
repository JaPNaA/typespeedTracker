import App from "../../index.js";
import Stats from "../stats/stats.js";
import TextScene from "../text/text.js";

class TypingScene extends TextScene {
    private endButton: HTMLButtonElement;
    private boundKeydownHandler?: EventListenerOrEventListenerObject;

    constructor(app: App) {
        super(app);

        this.endButton = this.createEndButton();
        this.registerKeydownHandler();
    }

    public destory(): void {
        super.destory();

        if (this.boundKeydownHandler) {
            removeEventListener("keydown", this.boundKeydownHandler);
        }
    }

    private registerKeydownHandler(): void {
        const boundFocusingHandler = this.focusingHandler.bind(this);
        addEventListener("keydown", boundFocusingHandler);
        addEventListener("touchstart", boundFocusingHandler);
        this.boundKeydownHandler = boundFocusingHandler;
    }

    private createEndButton(): HTMLButtonElement {
        const button = document.createElement("button");
        button.innerText = "End prematurely";
        button.addEventListener("click", this.onDone.bind(this));
        button.classList.add("end");
        this.elm.insertBefore(button, this.elm.firstChild);
        return button;
    }

    private focusingHandler(): void {
        this.input.focus();
    }

    protected onDone() {
        this.app.switchScene(new Stats(this.app, this.infoCollecter));
    }
}

export default TypingScene;