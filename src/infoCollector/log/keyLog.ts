import Log from "./log.js";

class KeyLog extends Log {
    keyStr: string;
    correctKey: string;
    isIncorrect: boolean;
    isBackspace: boolean;

    constructor(keyStr: string, correctKey: string, isIncorrect: boolean, isBackspace: boolean) {
        super();

        this.keyStr = keyStr;
        this.correctKey = correctKey;
        this.isIncorrect = isIncorrect;
        this.isBackspace = isBackspace;
    }
}

export default KeyLog;