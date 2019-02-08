import Log from "./log/log.js";
import KeyLog from "./log/keyLog.js";

class InfoCollector {
    public logs: Log[] = [];

    constructor() { }

    public logKey(keyStr: string, correctKey: string, isIncorrect: boolean, isBackspace: boolean): void {
        this.logs.push(new KeyLog(keyStr, correctKey, isIncorrect, isBackspace));
    }
}

export default InfoCollector;