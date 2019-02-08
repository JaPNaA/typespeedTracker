import Log from "./log/log.js";
import KeyLog from "./log/keyLog.js";

class InfoCollector {
    private logs: Log[] = [];

    constructor() { }

    public logKey(keyCode: number, keyStr: string, correctKey: string, isIncorrect: boolean, isBackspace: boolean): void {
        this.logs.push(new KeyLog(keyCode, keyStr, correctKey, isIncorrect, isBackspace));
    }
}

export default InfoCollector;