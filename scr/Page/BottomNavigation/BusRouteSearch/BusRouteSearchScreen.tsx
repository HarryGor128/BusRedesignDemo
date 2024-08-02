import { useState } from 'react';
import { StyleSheet } from 'react-native';

import BusRouteList from '../../../Components/BusRouteList/BusRouteList';
import PageContainer from '../../../Components/Common/PageContainer/PageContainer';
import SearchBar from '../../../Components/Common/SearchBar/SearchBar';
import fakeDataService from '../../../Services/Common/fakeDataService';
import BusRoute from '../../../Type/Bus/BusRoute';

const BusRouteSearchScreen = () => {
    const [busRouteList, setBusRouteList] = useState<BusRoute[]>(
        fakeDataService.randomLengthList(BusRoute, 'routeName'),
    );
    const [searchText, setSearchText] = useState<string>('');

    const onPressFavorite = (routeName: string) => {
        setBusRouteList((prev) => {
            const newList = JSON.parse(JSON.stringify(prev));

            const findIndex = prev.findIndex(
                (item) => item.routeName === routeName,
            );

            newList[findIndex].isFavorite = !newList[findIndex].isFavorite;

            return newList;
        });
    };

    const onInput = (text: string) => {
        setSearchText(text);
    };

    return (
        <PageContainer>
            <SearchBar
                value={searchText}
                onInput={onInput}
                keyboardType={'number-pad'}
                containerStyle={BusRouteSearchScreenStyle.searchBar}
            />
            <BusRouteList
                busRouteList={busRouteList
                    .sort((a, b) => Number(a.routeName) - Number(b.routeName))
                    .filter((item) => item.routeName.includes(searchText))}
                onPressItem={() => {}}
                onPressFavorite={onPressFavorite}
            />
        </PageContainer>
    );
};

export default BusRouteSearchScreen;

const BusRouteSearchScreenStyle = StyleSheet.create({
    searchBar: {
        borderRadius: 10,
        margin: 10,
    },
});
