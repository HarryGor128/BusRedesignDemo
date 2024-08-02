import fakeDataService from '../../Services/Common/fakeDataService';
import BusStop from './BusStop';

class BusRoute {
    routeName: string;
    terminus: string;
    busStop: BusStop;
    isFavorite: boolean;

    constructor() {
        this.routeName = fakeDataService
            .randomNumber({ min: 1, max: 999 })
            .toString();
        this.terminus = 'Terminus';
        this.busStop = new BusStop();
        this.isFavorite = false;
    }
}

export default BusRoute;
