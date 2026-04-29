export class SingletonCounter {
    private static counter  = new SingletonCounter();
    private static _i: number = 0;

    private constructor() {}

    static getInstance() {
        return SingletonCounter.counter;
    }

    inc() {
        SingletonCounter._i++;
        return SingletonCounter._i;
    }
}

