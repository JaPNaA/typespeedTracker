import Log from "./log";

class KeyLog extends Log {
    keyCode: number;
    keyStr: string;
    correctKey: string;
    isIncorrect: boolean;
    isBackspace: boolean;

    constructor(keyCode: number, keyStr: string, correctKey: string, isIncorrect: boolean, isBackspace: boolean) {
        super();

        this.keyCode = keyCode;
        this.keyStr = keyStr;
        this.correctKey = correctKey;
        this.isIncorrect = isIncorrect;
        this.isBackspace = isBackspace;
    }
}

export default KeyLog;