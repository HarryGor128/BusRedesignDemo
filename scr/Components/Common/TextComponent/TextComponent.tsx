import { StyleSheet, Text, TextProps } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import FontSizeConstant from '../../../Constant/FontSizeConstant';

const TextComponent = ({ style, ...props }: TextProps) => {
    return (
        <Text
            style={[TextComponentStyles.defaultStyle, style]}
            allowFontScaling={false}
            {...props}
        >
            {props.children}
        </Text>
    );
};

export default TextComponent;

const TextComponentStyles = StyleSheet.create({
    defaultStyle: {
        fontSize: FontSizeConstant.middle,
        color: ColorConstant.Text.Blue.Deep,
    },
});
