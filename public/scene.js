class Scene {
    constructor(app) {
        this.app = app;
    }
    appendTo(elm) {
        elm.appendChild(this.elm);
    }
    removeSelf() {
        if (this.elm.parentElement) {
            this.elm.parentElement.removeChild(this.elm);
        }
    }
}
export default Scene;
