import { Text, TextProps } from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import FontSizeConstant from '../../../Constant/FontSizeConstant';

interface TextComponentProps extends TextProps {
    fontSize?: number;
    fontColor?: string;
    isBold?: boolean;
}

const TextComponent = ({
    style,
    fontSize,
    fontColor,
    isBold,
    ...props
}: TextComponentProps) => {
    return (
        <Text
            style={[
                {
                    fontSize: fontSize ? fontSize : FontSizeConstant.middle,
                    color: fontColor ? fontColor : ColorConstant.Text.Grey.Dark,
                    fontWeight: isBold ? 'bold' : 'normal',
                },
                style,
            ]}
            allowFontScaling={false}
            {...props}
        >
            {props.children}
        </Text>
    );
};

export default TextComponent;
