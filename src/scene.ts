import App from "./index.js";

abstract class Scene {
    protected abstract elm: HTMLDivElement;

    protected app: App;

    constructor(app: App) {
        this.app = app;
    }

    public abstract setup(): void;
    public abstract destory(): void;

    public appendTo(elm: HTMLElement): void {
        elm.appendChild(this.elm);
    }

    protected removeSelf(): void {
        if (this.elm.parentElement) {
            this.elm.parentElement.removeChild(this.elm);
        }
    }
}

export default Scene;