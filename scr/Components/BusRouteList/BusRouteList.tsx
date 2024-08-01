import { FlatList } from 'react-native';

import BusRoute from '../../Type/Bus/BusRoute';
import BusRouteBlock from '../BusRouteBlock/BusRouteBlock';

interface BusRouteListProps {
    busRouteList: BusRoute[];
    onPressItem: Function;
    onPressFavorite: Function;
}

const BusRouteList = ({
    busRouteList,
    onPressItem,
    onPressFavorite,
}: BusRouteListProps) => {
    const renderItem = ({ item }: { item: BusRoute }) => {
        return (
            <BusRouteBlock
                busRoute={item}
                onPressItem={onPressItem}
                onPressFavorite={onPressFavorite}
            />
        );
    };

    return (
        <FlatList
            data={busRouteList}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default BusRouteList;
