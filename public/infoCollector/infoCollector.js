import KeyLog from "./log/keyLog.js";
class InfoCollector {
    constructor() {
        this.logs = [];
    }
    logKey(keyStr, correctKey, index, isIncorrect, isBackspace) {
        this.logs.push(new KeyLog(keyStr, correctKey, index, isIncorrect, isBackspace));
    }
}
export default InfoCollector;
