import App from "../../index.js";
import TextScene from "../text/text.js";
import Log from "../../infoCollector/log/log.js";
import KeyLog from "../../infoCollector/log/keyLog.js";

class ReplayScene extends TextScene {
    private static padStart: number = 1000;

    private logs: Log[];

    private reqanfHandle?: number;

    private replayStartTime: number = 0;
    private logStartTime: number;
    private totalOffset: number;

    private replayLogIndex: number = 0;

    constructor(app: App, logs: Log[]) {
        super(app);

        this.logs = logs;
        this.logStartTime = logs[0].timeStamp;
        this.totalOffset = this.logStartTime - ReplayScene.padStart;
    }

    public setup(): void {
        super.setup();
        if (!this.getTextPromise) { throw new Error("Unknown"); }
        this.getTextPromise.then(this.startReplay.bind(this));
    }

    private startReplay(): void {
        this.replayStartTime = performance.now();
        this.totalOffset -= this.replayStartTime;
        this.startReqanf();
    }

    private startReqanf(): void {
        this.reqanfHandle = requestAnimationFrame(this.reqanf.bind(this));
    }

    private reqanf(now: number): void {
        const replayPos = now + this.totalOffset;
        while (this.typeNext(replayPos));
        this.startReqanf();
    }

    private typeNext(now: number): boolean {
        const lastLog = this.logs[this.replayLogIndex];

        if (lastLog instanceof KeyLog) {
            if (lastLog.timeStamp <= now) {
                this.onInput(lastLog.keyStr);
                this.replayLogIndex++;
                return true;
            }
        }

        return false;
    }

    public destory(): void {
        super.destory();

        if (this.reqanfHandle) {
            cancelAnimationFrame(this.reqanfHandle);
        }
    }
}

export default ReplayScene;