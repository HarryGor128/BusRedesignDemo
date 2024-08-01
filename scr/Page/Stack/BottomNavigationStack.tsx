import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppIcon, {
    AppIconProps,
} from '../../Components/Common/AppIcon/AppIconRenderer';
import ColorConstant from '../../Constant/ColorConstant';
import FontSizeConstant from '../../Constant/FontSizeConstant';
import BottomNavigationList from '../../Type/Navigation/BottomNavigationList';
import BusRouteSearchScreen from '../BottomNavigation/BusRouteSearch/BusRouteSearchScreen';
import HomeScreen from '../BottomNavigation/Home/HomeScreen';
import P2PRouteSearchScreen from '../BottomNavigation/P2PRouteSearch/P2PRouteSearchScreen';

const BottomStack = createBottomTabNavigator<BottomNavigationList>();

interface BottomScreen {
    screenName: keyof BottomNavigationList;
    component: () => ReactNode;
    icon: AppIconProps;
    title: string;
}

const BottomNavigationStack = () => {
    const { t } = useTranslation();

    const bottomScreen: BottomScreen[] = [
        {
            screenName: 'Home',
            component: HomeScreen,
            icon: { Icon: ['fas', 'home'] },
            title: 'Home',
        },
        {
            screenName: 'BusRouteSearch',
            component: BusRouteSearchScreen,
            icon: { Icon: ['fas', 'search'] },
            title: 'Search',
        },
        {
            screenName: 'P2PRouteSearch',
            component: P2PRouteSearchScreen,
            icon: { Icon: ['fas', 'map-pin'] },
            title: 'P2P',
        },
    ];

    return (
        <BottomStack.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: ColorConstant.Text.Grey.Dark,
                tabBarActiveTintColor: ColorConstant.Text.Red.Normal,
                tabBarLabelStyle: {
                    fontSize: FontSizeConstant.xsmall,
                    marginBottom: 5,
                },
                tabBarHideOnKeyboard: true,
                tabBarStyle: { height: 70 },
                tabBarIconStyle: { margin: 5 },
            }}
        >
            {bottomScreen.map((item) => (
                <BottomStack.Screen
                    name={item.screenName}
                    component={item.component}
                    options={{
                        tabBarIcon: (props) => {
                            return (
                                <AppIcon
                                    {...item.icon}
                                    IconColor={props.color}
                                    IconSize={props.size}
                                />
                            );
                        },
                        title: t(item.title),
                    }}
                />
            ))}

            {/* <BottomStack.Screen
                name={'BusRouteSearch'}
                component={BusRouteSearchScreen}
            />
            <BottomStack.Screen
                name={'P2PRouteSearch'}
                component={P2PRouteSearchScreen}
            /> */}
        </BottomStack.Navigator>
    );
};

export default BottomNavigationStack;
