import KeyLog from "./log/keyLog.js";
class InfoCollector {
    constructor() {
        this.logs = [];
    }
    logKey(keyCode, keyStr, correctKey, isIncorrect, isBackspace) {
        this.logs.push(new KeyLog(keyCode, keyStr, correctKey, isIncorrect, isBackspace));
    }
}
export default InfoCollector;
