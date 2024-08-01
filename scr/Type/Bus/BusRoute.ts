import BusStop from './BusStop';

class BusRoute {
    routeName: string;
    terminus: string;
    busStop: BusStop;
    isFavorite: boolean;

    constructor() {
        this.routeName = '';
        this.terminus = '';
        this.busStop = new BusStop();
        this.isFavorite = false;
    }
}

export default BusRoute;
