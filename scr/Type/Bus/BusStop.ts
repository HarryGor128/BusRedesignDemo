class BusStop {
    busStopName: string;
    fee: number;
    nextBus: number[];

    constructor() {
        this.busStopName = '';
        this.fee = 0;
        this.nextBus = [];
    }
}

export default BusStop;
