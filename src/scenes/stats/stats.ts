import Scene from "../../scene.js";
import InfoCollector from "../../infoCollector/infoCollector.js";
import App from "../../index.js";
import CSVify from "../../utils/csvify.js";
import ReplayScene from "../replay/replay.js";

class Stats extends Scene {
    protected elm: HTMLDivElement;

    private infoCollector: InfoCollector;
    private replayButton: HTMLButtonElement;

    constructor(app: App, infoCollector: InfoCollector) {
        super(app);

        this.infoCollector = infoCollector;

        this.elm = this.createElm();
        this.createH1();
        this.createDataTextarea();

        this.replayButton = this.createReplayButton();
    }

    private createElm(): HTMLDivElement {
        const div = document.createElement("div");
        div.classList.add("stats");
        return div;
    }

    private createReplayButton(): HTMLButtonElement {
        const button = document.createElement("button");
        button.classList.add("replay");
        button.innerText = "View Replay";
        button.addEventListener("click", () => this.app.switchScene(new ReplayScene(this.app, this.infoCollector)));
        this.elm.appendChild(button)
        return button;
    }

    public setup(): void { }

    private createDataTextarea() {
        const textarea = document.createElement("textarea");
        textarea.value = CSVify(this.infoCollector.logs as any);
        textarea.readOnly = true;
        this.elm.appendChild(textarea);
    }

    private createH1() {
        const h1 = document.createElement("h1");
        h1.innerText = "Stats";
        this.elm.appendChild(h1);
    }

    public destory(): void {
        this.removeSelf();
    }
}

export default Stats;