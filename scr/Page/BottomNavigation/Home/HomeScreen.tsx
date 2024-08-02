import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BusRouteList from '../../../Components/BusRouteList/BusRouteList';
import HorizontalScrollPage, {
    PageTitle,
} from '../../../Components/Common/HorizontalScrollPage/HorizontalScrollPage';
import PageContainer from '../../../Components/Common/PageContainer/PageContainer';
import fakeDataService from '../../../Services/Common/fakeDataService';
import BusRoute from '../../../Type/Bus/BusRoute';

const HomeScreen = () => {
    const { t } = useTranslation();

    const [busRouteList, setBusRouteList] = useState<BusRoute[]>(
        fakeDataService.randomLengthObjectList(BusRoute, 'routeName'),
    );

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

    const page: ReactNode[] = [
        <BusRouteList
            busRouteList={busRouteList}
            onPressItem={() => {}}
            onPressFavorite={onPressFavorite}
        />,
        <BusRouteList
            busRouteList={busRouteList.filter((item) => item.isFavorite)}
            onPressItem={() => {}}
            onPressFavorite={onPressFavorite}
        />,
    ];

    const pageTitle: PageTitle[] = [
        { title: t('Home'), icon: { Icon: ['fas', 'home'] } },
        { title: t('Favorite'), icon: { Icon: ['fas', 'star'] } },
    ];

    return (
        <PageContainer>
            <HorizontalScrollPage page={page} pageTitle={pageTitle} />
        </PageContainer>
    );
};

export default HomeScreen;
