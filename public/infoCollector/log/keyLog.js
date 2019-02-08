import Log from "./log.js";
class KeyLog extends Log {
    constructor(keyStr, correctKey, index, isIncorrect, isBackspace) {
        super();
        this.keyStr = keyStr;
        this.correctKey = correctKey;
        this.index = index;
        this.isIncorrect = isIncorrect;
        this.isBackspace = isBackspace;
    }
}
export default KeyLog;
