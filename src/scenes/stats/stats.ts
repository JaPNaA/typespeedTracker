import Scene from "../../scene.js";
import InfoCollector from "../../infoCollector/infoCollector.js";
import App from "../../index.js";

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
        this.elm.innerText = JSON.stringify(this.infoCollector.logs);
    }

    public destory(): void {
        this.removeSelf();
    }
}

export default Stats;