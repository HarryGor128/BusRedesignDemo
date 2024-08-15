import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import AppIcon, {
    AppIconProps,
} from '../../Components/Common/AppIcon/AppIconRenderer';
import TextComponent from '../../Components/Common/TextComponent/TextComponent';
import ColorConstant from '../../Constant/ColorConstant';
import FontSizeConstant from '../../Constant/FontSizeConstant';
import DrawerNavigationList from '../../Type/Navigation/DrawerNavigationList';
import BottomNavigationStack from './BottomNavigationStack';

const DrawerStack = createDrawerNavigator<DrawerNavigationList>();

interface DrawerButton {
    onPress: Function;
    icon: AppIconProps;
    title: string;
}

const DrawerRenderer = () => {
    const { t } = useTranslation();

    const buttonList: DrawerButton[] = [
        {
            onPress: () => {},
            icon: { Icon: ['fas', 'language'] },
            title: t('Language'),
        },
        {
            onPress: () => {},
            icon: { Icon: ['fas', 'cloud-arrow-down'] },
            title: t('DataUpdate'),
        },
        {
            onPress: () => {},
            icon: { Icon: ['fas', 'bell'] },
            title: t('ReminderSetting'),
        },
        {
            onPress: () => {},
            icon: { Icon: ['fas', 'link'] },
            title: t('UsefulLink'),
        },
        {
            onPress: () => {},
            icon: { Icon: ['fas', 'file-contract'] },
            title: t('TermsOfUse'),
        },
    ];

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    padding: 10,
                    backgroundColor: ColorConstant.BG.Red.Normal,
                }}
            >
                <TextComponent
                    fontSize={FontSizeConstant.xxxlarge}
                    isBold
                    fontColor={ColorConstant.Text.White.Normal}
                >
                    {'APP 1933'}
                </TextComponent>
            </View>
            <ScrollView style={{ flex: 1 }}>
                {buttonList.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => item.onPress}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                        }}
                    >
                        <AppIcon
                            IconSize={30}
                            IconColor={ColorConstant.Text.Grey.Dark}
                            IconStyle={{ marginRight: 10 }}
                            {...item.icon}
                        />
                        <TextComponent>{item.title}</TextComponent>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const DrawerNavigationStack = () => {
    return (
        <DrawerStack.Navigator
            initialRouteName='BottomNavigation'
            screenOptions={{ headerShown: false }}
            drawerContent={() => <DrawerRenderer />}
        >
            <DrawerStack.Screen
                name={'BottomNavigation'}
                component={BottomNavigationStack}
            />
        </DrawerStack.Navigator>
    );
};

export default DrawerNavigationStack;
