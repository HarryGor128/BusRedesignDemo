import { FlatList, Image, View, useWindowDimensions } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import BusStopBlock from '../../Components/BusStopBlock/BusStopBlock';
import PageContainer from '../../Components/Common/PageContainer/PageContainer';
import fakeDataService from '../../Services/Common/fakeDataService';
import BusStop from '../../Type/Bus/BusStop';
import BottomNavigationList from '../../Type/Navigation/BottomNavigationList';
import MainStackList from '../../Type/Navigation/MainStackList';

type NavigationProps = NativeStackScreenProps<
    MainStackList & BottomNavigationList,
    'BusRouteDetail'
>;

const BusRouteDetailScreen = ({
    navigation,
    route: {
        params: { busRoute },
    },
}: NavigationProps) => {
    const { width, height } = useWindowDimensions();

    const busStopList = (
        fakeDataService.randomLengthObjectList(
            BusStop,
            30,
            'busStopName',
        ) as BusStop[]
    ).sort((a, b) => a.distance - b.distance);

    return (
        <PageContainer
            showHeader
            headerProps={{
                Title: busRoute.routeName,
                BackButtonProps: {
                    navigation,
                },
            }}
        >
            <Image
                source={require('../../Assets/fakeBusMap.png')}
                style={{
                    width: width,
                    height: height * 0.3,
                }}
            />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={busStopList}
                    renderItem={({ item, index }) => (
                        <BusStopBlock busStop={item} index={index} />
                    )}
                    keyExtractor={(_, index) => index.toString()}
                />
            </View>
        </PageContainer>
    );
};

export default BusRouteDetailScreen;
