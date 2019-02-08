import Scene from "../../scene.js";
import InfoCollector from "../../infoCollector/infoCollector.js";
import App from "../../index.js";
import CSVify from "../../utils/csvify.js";

class Stats extends Scene {
    infoCollector: InfoCollector;
    elm: HTMLDivElement;

    constructor(app: App, infoCollector: InfoCollector) {
        super(app);

        this.infoCollector = infoCollector;
        this.elm = this.createElm();
    }

    private createElm(): HTMLDivElement {
        const div = document.createElement("div");
        div.classList.add("stats");
        return div;
    }

    public setup(): void {
        this.createH1();
        this.createDataTextarea();
    }

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