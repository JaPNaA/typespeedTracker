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
        this.elm.innerText = JSON.stringify(this.infoCollector.logs);
    }
    destory() {
        this.removeSelf();
    }
}
export default Stats;
