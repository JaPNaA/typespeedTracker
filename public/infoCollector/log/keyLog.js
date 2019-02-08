import Log from "./log.js";
class KeyLog extends Log {
    constructor(keyStr, correctKey, isIncorrect, isBackspace) {
        super();
        this.keyStr = keyStr;
        this.correctKey = correctKey;
        this.isIncorrect = isIncorrect;
        this.isBackspace = isBackspace;
    }
}
export default KeyLog;
