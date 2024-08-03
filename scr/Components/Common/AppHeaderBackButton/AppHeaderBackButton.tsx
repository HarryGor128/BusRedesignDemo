import { NavigationProp } from '@react-navigation/native';

import ColorConstant from '../../../Constant/ColorConstant';
import BottomNavigationList from '../../../Type/Navigation/BottomNavigationList';
import MainStackList from '../../../Type/Navigation/MainStackList';
import IconButton from '../IconButton/IconButton';

export interface AppHeaderBackButtonProps {
    navigation: NavigationProp<MainStackList & BottomNavigationList>; // Navigation Prop
    beforeGoBack?: Function; // Before page going back
    backToOtherPage?: Function; // Back to other page
}

/**
 *
 *  @param navigation: NavigationProp<MainStackList>; // Navigation Prop
 *  @param beforeGoBack?: Function; // Before page going back
 *  @param backToOtherPage?: Function; // Back to other page
 */
const AppHeaderBackButton = ({
    navigation,
    beforeGoBack,
    backToOtherPage,
}: AppHeaderBackButtonProps) => {
    const OnPressBack = () => {
        if (beforeGoBack) {
            beforeGoBack();
        }

        if (backToOtherPage) {
            backToOtherPage();
        } else {
            navigation.goBack();
        }
    };

    return (
        <IconButton
            onPressCallBack={OnPressBack}
            IconProps={{
                Icon: ['fas', 'chevron-left'],
                IconSize: 30,
                IconColor: ColorConstant.Text.White.Normal,
            }}
            buttonStyle={{ padding: 0, paddingRight: 10 }}
        />
    );
};

export default AppHeaderBackButton;
