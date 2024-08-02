import fakeDataService from '../../Services/Common/fakeDataService';

class BusStop {
    busStopName: string;
    fee: number;
    nextBus: number[];

    constructor() {
        this.busStopName = 'Bus Stop';
        this.fee = fakeDataService.randomNumber({ min: 0, max: 99 });
        this.nextBus = [
            fakeDataService.randomNumber({ min: 0, max: 99 }),
            fakeDataService.randomNumber({ min: 0, max: 99 }),
            fakeDataService.randomNumber({ min: 0, max: 99 }),
        ];
    }
}

export default BusStop;
