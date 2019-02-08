import KeyLog from "./log/keyLog.js";
class InfoCollector {
    constructor() {
        this.logs = [];
    }
    logKey(keyStr, correctKey, isIncorrect, isBackspace) {
        this.logs.push(new KeyLog(keyStr, correctKey, isIncorrect, isBackspace));
    }
}
export default InfoCollector;
