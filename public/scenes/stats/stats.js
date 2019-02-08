import Scene from "../../scene.js";
import CSVify from "../../utils/csvify.js";
import ReplayScene from "../replay/replay.js";
class Stats extends Scene {
    constructor(app, infoCollector) {
        super(app);
        this.infoCollector = infoCollector;
        this.elm = this.createElm();
        this.replayButton = this.createReplayButton();
    }
    createElm() {
        const div = document.createElement("div");
        div.classList.add("stats");
        return div;
    }
    createReplayButton() {
        const button = document.createElement("button");
        button.classList.add("replay");
        button.addEventListener("click", () => this.app.switchScene(new ReplayScene(this.app, this.infoCollector)));
        this.elm.appendChild(button);
        return button;
    }
    setup() {
        this.createH1();
        this.createDataTextarea();
    }
    createDataTextarea() {
        const textarea = document.createElement("textarea");
        textarea.value = CSVify(this.infoCollector.logs);
        textarea.readOnly = true;
        this.elm.appendChild(textarea);
    }
    createH1() {
        const h1 = document.createElement("h1");
        h1.innerText = "Stats";
        this.elm.appendChild(h1);
    }
    destory() {
        this.removeSelf();
    }
}
export default Stats;
