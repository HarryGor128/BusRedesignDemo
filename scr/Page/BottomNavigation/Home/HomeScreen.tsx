import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ScrollView,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import BusRouteList from '../../../Components/BusRouteList/BusRouteList';
import HorizontalScrollPage, {
    PageTitle,
} from '../../../Components/Common/HorizontalScrollPage/HorizontalScrollPage';
import PageContainer from '../../../Components/Common/PageContainer/PageContainer';
import TextComponent from '../../../Components/Common/TextComponent/TextComponent';
import ColorConstant from '../../../Constant/ColorConstant';
import fakeDataService from '../../../Services/Common/fakeDataService';
import BusRoute from '../../../Type/Bus/BusRoute';
import BottomNavigationList from '../../../Type/Navigation/BottomNavigationList';
import DrawerNavigationList from '../../../Type/Navigation/DrawerNavigationList';
import MainStackList from '../../../Type/Navigation/MainStackList';

type NavigationProps = NativeStackScreenProps<
    MainStackList & BottomNavigationList & DrawerNavigationList,
    'Home'
>;

interface NearbyItem {
    title: string;
    value: number;
}

const HomeScreen = ({ navigation }: NavigationProps) => {
    const { t } = useTranslation();
    const { width } = useWindowDimensions();

    const [busRouteList, setBusRouteList] = useState<BusRoute[]>(
        (
            fakeDataService.randomLengthObjectList(
                BusRoute,
                500,
                'routeName',
            ) as BusRoute[]
        ).sort((a, b) => a.distance - b.distance),
    );
    const [nearbyNum, setNearbyNum] = useState<number>(100);

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

    const NearbyFilter = () => {
        const nearby: NearbyItem[] = [
            { title: '< 100 m', value: 100 },
            { title: '< 300 m', value: 300 },
            { title: '< 500 m', value: 500 },
        ];

        const NearbyItemRenderer = ({ item }: { item: NearbyItem }) => {
            const isSelected = nearbyNum === item.value;

            const onPress = () => {
                setNearbyNum(item.value);
            };

            return (
                <TouchableOpacity
                    style={{
                        borderRadius: 10,
                        padding: 10,
                        margin: 10,
                        backgroundColor: isSelected
                            ? ColorConstant.BG.Red.Normal
                            : ColorConstant.BG.Grey.Normal,
                    }}
                    onPress={() => {
                        onPress();
                    }}
                >
                    <TextComponent
                        fontColor={
                            isSelected
                                ? ColorConstant.Text.White.Normal
                                : undefined
                        }
                    >
                        {item.title}
                    </TextComponent>
                </TouchableOpacity>
            );
        };

        return (
            <View
                style={{
                    paddingLeft: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <TextComponent style={{ marginRight: 5 }}>
                    {t('Nearby')}
                </TextComponent>
                <ScrollView
                    style={{ flex: 1 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {nearby.map((item, index) => (
                        <NearbyItemRenderer key={index} item={item} />
                    ))}
                </ScrollView>
            </View>
        );
    };

    const page: ReactNode[] = [
        <BusRouteList
            busRouteList={busRouteList.filter(
                (item) => item.distance <= nearbyNum,
            )}
            onPressItem={onPressBusRoute}
            onPressFavorite={onPressFavorite}
        />,
        <BusRouteList
            busRouteList={busRouteList.filter((item) => item.isFavorite)}
            onPressItem={onPressBusRoute}
            onPressFavorite={onPressFavorite}
        />,
    ];

    const pageTitle: PageTitle[] = [
        { title: t('Home'), icon: { Icon: ['fas', 'home'] } },
        { title: t('Favorite'), icon: { Icon: ['fas', 'star'] } },
    ];

    return (
        <PageContainer
            showHeader
            headerProps={{
                Title: 'APP 1933',
                DrawerButtonProps: { navigation },
            }}
        >
            <NearbyFilter />
            <HorizontalScrollPage page={page} pageTitle={pageTitle} />
        </PageContainer>
    );
};

export default HomeScreen;
function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
