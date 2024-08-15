import { DrawerActions, NavigationProp } from '@react-navigation/native';

import ColorConstant from '../../../Constant/ColorConstant';
import BottomNavigationList from '../../../Type/Navigation/BottomNavigationList';
import DrawerNavigationList from '../../../Type/Navigation/DrawerNavigationList';
import MainStackList from '../../../Type/Navigation/MainStackList';
import IconButton from '../IconButton/IconButton';

export interface AppHeaderDrawerButtonProps {
    navigation: NavigationProp<
        MainStackList & DrawerNavigationList & BottomNavigationList
    >; // Navigation Prop
}

const AppHeaderDrawerButton = ({ navigation }: AppHeaderDrawerButtonProps) => {
    const onPressOpenDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <IconButton
            onPressCallBack={onPressOpenDrawer}
            IconProps={{
                Icon: ['fas', 'bars'],
                IconSize: 30,
                IconColor: ColorConstant.Text.White.Normal,
            }}
            buttonStyle={{ padding: 0, paddingRight: 10 }}
        />
    );
};

export default AppHeaderDrawerButton;
