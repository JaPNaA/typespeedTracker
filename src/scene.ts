abstract class Scene {
    protected abstract elm: HTMLDivElement;

    public abstract setup(): void;
    public abstract destory(): void;

    public appendTo(elm: HTMLElement): void {
        elm.appendChild(this.elm);
    }
}

export default Scene;