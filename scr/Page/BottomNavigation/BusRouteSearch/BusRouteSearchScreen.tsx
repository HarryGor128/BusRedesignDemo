import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import BusRouteList from '../../../Components/BusRouteList/BusRouteList';
import HorizontalScrollPage, {
    PageTitle,
} from '../../../Components/Common/HorizontalScrollPage/HorizontalScrollPage';
import PageContainer from '../../../Components/Common/PageContainer/PageContainer';
import SearchBar from '../../../Components/Common/SearchBar/SearchBar';
import commonService from '../../../Services/Common/commonService';
import fakeDataService from '../../../Services/Common/fakeDataService';
import BusRoute from '../../../Type/Bus/BusRoute';
import BottomNavigationList from '../../../Type/Navigation/BottomNavigationList';
import MainStackList from '../../../Type/Navigation/MainStackList';
import { closeLoader, openLoader } from '../../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../../store/storeHooks';

type NavigationProps = NativeStackScreenProps<
    MainStackList & BottomNavigationList,
    'BusRouteSearch'
>;

const BusRouteSearchScreen = ({ navigation }: NavigationProps) => {
    const { t } = useTranslation();

    const [busRouteList, setBusRouteList] = useState<BusRoute[]>(
        fakeDataService.randomLengthObjectList(BusRoute, 500, 'routeName'),
    );
    const [historyBusRouteList, setHistoryBusRouteList] = useState<BusRoute[]>(
        [],
    );
    const [searchText, setSearchText] = useState<string>('');

    const dispatch = useAppDispatch();

    const fakeLoading = async () => {
        dispatch(openLoader());
        await commonService.sleep(1000);
        dispatch(closeLoader());
    };

    useEffect(() => {
        fakeLoading();
    }, []);

    const onPressBusRoute = (busRoute: BusRoute) => {
        if (
            historyBusRouteList.find(
                (item) => item.routeName === busRoute.routeName,
            ) === undefined
        ) {
            setHistoryBusRouteList((prev) => {
                const newList: BusRoute[] = JSON.parse(JSON.stringify(prev));

                newList.push(busRoute);

                return newList;
            });
        }

        navigation.navigate('BusRouteDetail', { busRoute });
    };

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

    const pageTitle: PageTitle[] = [
        { title: t('Search'), icon: { Icon: ['fas', 'search'] } },
        { title: t('History'), icon: { Icon: ['fas', 'history'] } },
    ];

    const page: ReactNode[] = [
        <BusRouteList
            busRouteList={busRouteList
                .sort((a, b) => Number(a.routeName) - Number(b.routeName))
                .filter((item) => item.routeName.includes(searchText))}
            onPressItem={onPressBusRoute}
            onPressFavorite={onPressFavorite}
        />,
        <BusRouteList
            busRouteList={historyBusRouteList.filter((item) =>
                item.routeName.includes(searchText),
            )}
            onPressItem={onPressBusRoute}
            onPressFavorite={onPressFavorite}
        />,
    ];

    return (
        <PageContainer>
            <SearchBar
                value={searchText}
                onInput={onInput}
                keyboardType={'number-pad'}
                containerStyle={BusRouteSearchScreenStyle.searchBar}
            />
            <HorizontalScrollPage page={page} pageTitle={pageTitle} />
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
