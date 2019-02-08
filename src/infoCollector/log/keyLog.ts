import Log from "./log.js";

class KeyLog extends Log {
    keyStr: string;
    correctKey: string;
    index: number;
    isIncorrect: boolean;
    isBackspace: boolean;

    constructor(keyStr: string, correctKey: string, index: number, isIncorrect: boolean, isBackspace: boolean) {
        super();

        this.keyStr = keyStr;
        this.correctKey = correctKey;
        this.index = index;
        this.isIncorrect = isIncorrect;
        this.isBackspace = isBackspace;
    }
}

export default KeyLog;