import TextScene from "../text/text.js";
import KeyLog from "../../infoCollector/log/keyLog.js";
class ReplayScene extends TextScene {
    constructor(app, logs) {
        super(app);
        this.replayStartTime = 0;
        this.replayLogIndex = 0;
        this.logs = logs;
        this.logStartTime = logs[0].timeStamp;
        this.totalOffset = this.logStartTime - ReplayScene.padStart;
    }
    setup() {
        super.setup();
        if (!this.getTextPromise) {
            throw new Error("Unknown");
        }
        this.getTextPromise.then(this.startReplay.bind(this));
    }
    startReplay() {
        this.replayStartTime = performance.now();
        this.totalOffset -= this.replayStartTime;
        this.startReqanf();
    }
    startReqanf() {
        this.reqanfHandle = requestAnimationFrame(this.reqanf.bind(this));
    }
    reqanf(now) {
        const replayPos = now + this.totalOffset;
        while (this.typeNext(replayPos))
            ;
        this.startReqanf();
    }
    typeNext(now) {
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
    destory() {
        super.destory();
        if (this.reqanfHandle) {
            cancelAnimationFrame(this.reqanfHandle);
        }
    }
}
ReplayScene.padStart = 1000;
export default ReplayScene;
