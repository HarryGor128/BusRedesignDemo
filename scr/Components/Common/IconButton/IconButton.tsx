import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import AppIcon, { AppIconProps } from '../AppIcon/AppIconRenderer';

interface IconButtonProps {
    onPressCallBack: Function;
    IconProps: AppIconProps;
    buttonStyle?: StyleProp<ViewStyle>;
}

const IconButton = ({
    onPressCallBack,
    IconProps,
    buttonStyle,
}: IconButtonProps) => {
    return (
        <TouchableOpacity
            onPress={() => {
                onPressCallBack();
            }}
            style={[{ padding: 10 }, buttonStyle]}
        >
            <AppIcon {...IconProps} />
        </TouchableOpacity>
    );
};

export default IconButton;
