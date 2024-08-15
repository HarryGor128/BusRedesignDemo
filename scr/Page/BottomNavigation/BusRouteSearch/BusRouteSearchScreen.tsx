import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import BusRouteList from '../../../Components/BusRouteList/BusRouteList';
import BusRouteSearchKeyboard from '../../../Components/BusRouteSearchKeyboard/BusRouteSearchKeyboard';
import AppIcon from '../../../Components/Common/AppIcon/AppIconRenderer';
import HorizontalScrollPage, {
    PageTitle,
} from '../../../Components/Common/HorizontalScrollPage/HorizontalScrollPage';
import PageContainer from '../../../Components/Common/PageContainer/PageContainer';
import TextComponent from '../../../Components/Common/TextComponent/TextComponent';
import ColorConstant from '../../../Constant/ColorConstant';
import commonService from '../../../Services/Common/commonService';
import fakeDataService from '../../../Services/Common/fakeDataService';
import BusRoute from '../../../Type/Bus/BusRoute';
import BottomNavigationList from '../../../Type/Navigation/BottomNavigationList';
import DrawerNavigationList from '../../../Type/Navigation/DrawerNavigationList';
import MainStackList from '../../../Type/Navigation/MainStackList';
import { closeLoader, openLoader } from '../../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../../store/storeHooks';

type NavigationProps = NativeStackScreenProps<
    MainStackList & BottomNavigationList & DrawerNavigationList,
    'BusRouteSearch'
>;

const BusRouteSearchScreen = ({ navigation }: NavigationProps) => {
    const { t } = useTranslation();

    const [busRouteList, setBusRouteList] = useState<BusRoute[]>(
        (
            fakeDataService.randomLengthObjectList(
                BusRoute,
                500,
                'routeName',
            ) as BusRoute[]
        ).sort((a, b) => a.routeName.localeCompare(b.routeName)),
    );
    const [historyBusRouteList, setHistoryBusRouteList] = useState<BusRoute[]>(
        [],
    );
    const [searchText, setSearchText] = useState<string>('');
    const [showKeyboard, setShowKeyboard] = useState<boolean>(false);

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
        if (showKeyboard) {
            onPressInput();
            return;
        }

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

    const onPressInput = () => {
        setShowKeyboard(!showKeyboard);
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
        <PageContainer
            showHeader
            headerProps={{
                Title: t('Search'),
                DrawerButtonProps: { navigation },
            }}
        >
            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => {
                    onPressInput();
                }}
                accessible={false}
            >
                <>
                    <TouchableOpacity
                        onPress={() => {
                            onPressInput();
                        }}
                        style={BusRouteSearchScreenStyle.inputContainer}
                    >
                        <AppIcon
                            Icon={['fas', 'search']}
                            IconColor={ColorConstant.Text.Grey.Dark}
                            IconSize={20}
                        />
                        <TextComponent
                            style={BusRouteSearchScreenStyle.textInput}
                        >
                            {searchText ? searchText : t('Search')}
                        </TextComponent>
                    </TouchableOpacity>
                    <HorizontalScrollPage page={page} pageTitle={pageTitle} />
                    <BusRouteSearchKeyboard
                        showKeyboard={showKeyboard}
                        onInput={onInput}
                    />
                </>
            </TouchableWithoutFeedback>
        </PageContainer>
    );
};

export default BusRouteSearchScreen;

const BusRouteSearchScreenStyle = StyleSheet.create({
    inputContainer: {
        borderRadius: 10,
        margin: 10,
        height: 70,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ColorConstant.BG.Grey.Normal,
    },

    textInput: {
        flex: 1,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: ColorConstant.BG.Grey.Dark,
    },
});
