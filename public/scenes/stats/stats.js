import Scene from "../../scene.js";
class Stats extends Scene {
    constructor(app, infoCollector) {
        super(app);
        this.infoCollector = infoCollector;
        this.elm = this.createElm();
    }
    createElm() {
        const div = document.createElement("div");
        div.classList.add("stats");
        return div;
    }
    setup() {
        this.createH1();
        this.createDataTextarea();
    }
    createDataTextarea() {
        const textarea = document.createElement("textarea");
        textarea.value = JSON.stringify(this.infoCollector.logs, undefined, 4);
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
