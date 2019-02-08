import App from "../../index.js";
import TextScene from "../text/text.js";
import InfoCollector from "../../infoCollector/infoCollector.js";

class ReplayScene extends TextScene {
    protected elm: HTMLDivElement;

    constructor(app: App, infoCollector: InfoCollector) {
        super(app);

        this.elm = document.createElement("div");
    }

    public setup() {
        super.setup();
    }

    public destory() {
        super.destory();
    }
}

export default ReplayScene;