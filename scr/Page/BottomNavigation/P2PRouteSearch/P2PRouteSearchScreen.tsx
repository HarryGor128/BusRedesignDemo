import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Alert,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import BusRouteList from '../../../Components/BusRouteList/BusRouteList';
import IconButton from '../../../Components/Common/IconButton/IconButton';
import PageContainer from '../../../Components/Common/PageContainer/PageContainer';
import SearchBar from '../../../Components/Common/SearchBar/SearchBar';
import TextComponent from '../../../Components/Common/TextComponent/TextComponent';
import BusStopName from '../../../Constant/BusStopName';
import ColorConstant from '../../../Constant/ColorConstant';
import commonService from '../../../Services/Common/commonService';
import fakeDataService from '../../../Services/Common/fakeDataService';
import BusRoute from '../../../Type/Bus/BusRoute';
import BottomNavigationList from '../../../Type/Navigation/BottomNavigationList';
import DrawerNavigationList from '../../../Type/Navigation/DrawerNavigationList';
import MainStackList from '../../../Type/Navigation/MainStackList';
import { closeLoader, openLoader } from '../../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../../store/storeHooks';

type SearchBarType = 'from' | 'to';

type NavigationProps = NativeStackScreenProps<
    MainStackList & BottomNavigationList & DrawerNavigationList,
    'P2PRouteSearch'
>;

const P2PRouteSearchScreen = ({ navigation }: NavigationProps) => {
    const { t } = useTranslation();

    const [busRouteList, setBusRouteList] = useState<BusRoute[]>(
        fakeDataService.randomLengthObjectList(BusRoute, 500, 'routeName'),
    );
    const [fromLocation, setFromLocation] = useState<string>('');
    const [toLocation, setToLocation] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [showLocationList, setShowLocationList] = useState<boolean>(false);
    const [focusSearchBar, setFocusSearchBar] = useState<SearchBarType>('from');

    const dispatch = useAppDispatch();

    const fakeLoading = async () => {
        dispatch(openLoader());
        await commonService.sleep(3000);
        setBusRouteList(
            fakeDataService.randomLengthObjectList(BusRoute, 500, 'routeName'),
        );
        dispatch(closeLoader());
    };

    const onInput = (text: string, location: 'from' | 'to') => {
        setIsSearching(false);
        switch (location) {
            case 'from':
                setFromLocation(text);
                break;
            case 'to':
                setToLocation(text);
                break;
            default:
                break;
        }
    };

    const onPressBusRoute = (busRoute: BusRoute) => {
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

    const onPressSwitchLocation = async () => {
        setFromLocation(toLocation);
        setToLocation(fromLocation);

        if (toLocation && fromLocation) {
            await fakeLoading();
        }
    };

    const onPressSearch = async () => {
        if (toLocation && fromLocation) {
            await fakeLoading();
            setIsSearching(true);
            setShowLocationList(false);
        } else {
            Alert.alert(t('Error'), t('P2PError'));
        }
    };

    const onPressCancel = () => {
        setFromLocation('');
        setToLocation('');
        setShowLocationList(false);
    };

    const onPressTextInput = (searchBarType: SearchBarType) => {
        setShowLocationList(true);
        setFocusSearchBar(searchBarType);
    };

    const LocationList = () => {
        const renderItem = ({ item }: { item: string }) => {
            const onPress = () => {
                switch (focusSearchBar) {
                    case 'from':
                        setFromLocation(item);
                        break;
                    case 'to':
                        setToLocation(item);
                        break;
                    default:
                        break;
                }
            };

            return (
                <TouchableOpacity
                    onPress={onPress}
                    style={P2PRouteSearchScreenStyle.locationContainer}
                >
                    <TextComponent>{item}</TextComponent>
                </TouchableOpacity>
            );
        };

        return (
            <FlatList
                data={BusStopName}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
            />
        );
    };

    return (
        <PageContainer
            showHeader
            headerProps={{ Title: t('P2P'), DrawerButtonProps: { navigation } }}
        >
            <View style={P2PRouteSearchScreenStyle.searchContainer}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <SearchBar
                        value={fromLocation}
                        onInput={(text: string) => {
                            onInput(text, 'from');
                        }}
                        placeHolderText={t('From')}
                        onFocus={() => {
                            onPressTextInput('from');
                        }}
                        containerStyle={P2PRouteSearchScreenStyle.searchBar}
                    />
                    <SearchBar
                        value={toLocation}
                        onInput={(text: string) => {
                            onInput(text, 'to');
                        }}
                        placeHolderText={t('BusTo')}
                        onFocus={() => {
                            onPressTextInput('to');
                        }}
                        containerStyle={P2PRouteSearchScreenStyle.searchBar}
                    />
                </View>
                <View>
                    <IconButton
                        onPressCallBack={onPressCancel}
                        IconProps={{
                            Icon: ['fas', 'xmark'],
                            IconSize: 30,
                            IconColor: ColorConstant.Text.Grey.Dark,
                        }}
                    />
                    <IconButton
                        onPressCallBack={onPressSwitchLocation}
                        IconProps={{
                            Icon: ['fas', 'repeat'],
                            IconSize: 30,
                            IconColor: ColorConstant.Text.Grey.Dark,
                        }}
                    />
                    <IconButton
                        onPressCallBack={onPressSearch}
                        IconProps={{
                            Icon: ['fas', 'paper-plane'],
                            IconSize: 30,
                            IconColor: ColorConstant.Text.Grey.Dark,
                        }}
                    />
                </View>
            </View>
            {isSearching && !showLocationList && fromLocation && toLocation && (
                <BusRouteList
                    busRouteList={busRouteList}
                    onPressItem={onPressBusRoute}
                    onPressFavorite={onPressFavorite}
                />
            )}
            {!isSearching && showLocationList && <LocationList />}
        </PageContainer>
    );
};

export default P2PRouteSearchScreen;

const P2PRouteSearchScreenStyle = StyleSheet.create({
    searchBar: {
        marginVertical: 10,
        borderRadius: 10,
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    locationContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: ColorConstant.BG.White.Light,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: ColorConstant.BG.Grey.Normal,
    },
});
