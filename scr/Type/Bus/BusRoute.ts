import fakeDataService from '../../Services/Common/fakeDataService';
import BusStop from './BusStop';

class BusRoute {
    routeName: string;
    terminus: string;
    busStop: BusStop;
    distance: number;
    isFavorite: boolean;

    constructor() {
        this.routeName = fakeDataService.randomBusRouteName();
        this.terminus = fakeDataService.randomBusStopName();
        this.busStop = new BusStop();
        this.distance = fakeDataService.randomNumber({ min: 0, max: 999 }, 2);
        this.isFavorite = false;
    }
}

export default BusRoute;
