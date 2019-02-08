class Log {
    public timeStamp: number;

    constructor() {
        this.timeStamp = performance.now();
    }
}

export default Log;