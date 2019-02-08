import Log from "./log";
class KeyLog extends Log {
    constructor(keyCode, keyStr, correctKey, isIncorrect, isBackspace) {
        super();
        this.keyCode = keyCode;
        this.keyStr = keyStr;
        this.correctKey = correctKey;
        this.isIncorrect = isIncorrect;
        this.isBackspace = isBackspace;
    }
}
export default KeyLog;
