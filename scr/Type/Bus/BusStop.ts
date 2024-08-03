import fakeDataService from '../../Services/Common/fakeDataService';

class BusStop {
    busStopName: string;
    fee: number;
    nextBus: number[];
    distance: number;

    constructor() {
        this.busStopName = fakeDataService.randomBusStopName();
        this.fee = fakeDataService.randomNumber({ min: 0, max: 99 }, 1);
        this.nextBus = [
            fakeDataService.randomNumber({ min: 0, max: 99 }),
            fakeDataService.randomNumber({ min: 0, max: 99 }),
            fakeDataService.randomNumber({ min: 0, max: 99 }),
        ];
        this.distance = fakeDataService.randomNumber({ min: 0, max: 999 }, 2);
    }
}

export default BusStop;
