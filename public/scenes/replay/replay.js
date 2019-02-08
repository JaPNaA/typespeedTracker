import TextScene from "../text/text.js";
class ReplayScene extends TextScene {
    constructor(app, infoCollector) {
        super(app);
        this.elm = document.createElement("div");
    }
    setup() {
        super.setup();
    }
    destory() {
        super.destory();
    }
}
export default ReplayScene;
