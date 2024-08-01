import { NavigationProp } from '@react-navigation/native';

import ColorConstant from '../../../Constant/ColorConstant';
import MainStackList from '../../../Type/Navigation/MainStackList';
import CustomButton from '../CustomButton/CustomButton';

interface AppHeaderBackButtonProps {
    navigation: NavigationProp<MainStackList>; // Navigation Prop
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
        <CustomButton
            OnPressCallback={OnPressBack}
            Icon={['fas', 'chevron-left']}
            IconSize={30}
            IconColor={ColorConstant.Text.White.Normal}
            ButtonContainerStyle={{
                padding: 0,
                backgroundColor: ColorConstant.Transparent.Clear,
            }}
        />
    );
};

export default AppHeaderBackButton;
