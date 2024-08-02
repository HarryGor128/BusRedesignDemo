import { useTranslation } from 'react-i18next';
import {
    KeyboardTypeOptions,
    NativeSyntheticEvent,
    StyleProp,
    StyleSheet,
    TextInputFocusEventData,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import AppIcon, { AppIconProps } from '../AppIcon/AppIconRenderer';
import IconButton from '../IconButton/IconButton';
import TextInputComponent from '../TextInputComponent/TextInputComponent';

interface SearchBarProps {
    onInput: Function; // When user input on the search bar
    value: string; // The value of text input
    keyboardType?: KeyboardTypeOptions; // Change text input keyboard type
    isSearchButtonShow?: boolean; // Show search button
    onSearchPress?: Function; // When user press search
    placeHolderText?: string; // Display search bar place holder
    placeHolderTextColor?: string; // Place holder text color
    Icon?: AppIconProps; // Set icon props
    containerStyle?: StyleProp<ViewStyle>; // Container style
    inputStyle?: StyleProp<TextStyle>; // Text input style
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void; // On input blur
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void; // On input focus
}

const SearchBar = ({
    onInput,
    value,
    keyboardType,
    isSearchButtonShow,
    onSearchPress,
    placeHolderText,
    placeHolderTextColor,
    Icon,
    containerStyle,
    inputStyle,
    onBlur,
    onFocus,
}: SearchBarProps) => {
    const { t } = useTranslation();

    return (
        <View style={[SearchBarStyles.inputContainer, containerStyle]}>
            <AppIcon
                Icon={['fas', 'search']}
                IconColor={ColorConstant.Text.Grey.Dark}
                IconSize={20}
                {...Icon}
            />
            <TextInputComponent
                style={[SearchBarStyles.textInput, inputStyle]}
                placeholder={placeHolderText ? placeHolderText : t('Search')}
                placeholderTextColor={
                    placeHolderTextColor
                        ? placeHolderTextColor
                        : ColorConstant.Text.Grey.Dark
                }
                onChangeText={(text) => {
                    onInput(text);
                }}
                value={value}
                returnKeyType={'search'}
                onSubmitEditing={
                    onSearchPress ? () => onSearchPress() : () => {}
                }
                onBlur={onBlur}
                onFocus={onFocus}
                keyboardType={keyboardType}
            />
            {isSearchButtonShow && (
                <IconButton
                    onPressCallBack={
                        onSearchPress ? () => onSearchPress() : () => {}
                    }
                    IconProps={{
                        Icon: ['fas', 'chevron-right'],
                        IconSize: 20,
                        IconColor: ColorConstant.Text.Grey.Dark,
                    }}
                />
            )}
        </View>
    );
};

export default SearchBar;

const SearchBarStyles = StyleSheet.create({
    inputContainer: {
        height: 70,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ColorConstant.BG.Grey.Normal,
    },

    textInput: {
        flex: 1,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: ColorConstant.BG.Grey.Dark,
    },
});
