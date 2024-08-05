import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import ColorConstant from '../../Constant/ColorConstant';
import { setKeyboardStatus } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';
import AppIcon, { AppIconProps } from '../Common/AppIcon/AppIconRenderer';
import TextComponent from '../Common/TextComponent/TextComponent';

interface BusRouteSearchKeyboard {
    showKeyboard: boolean;
    onInput: Function;
}

type keyMap = ' ' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

const BusRouteSearchKeyboard = ({
    showKeyboard,
    onInput,
}: BusRouteSearchKeyboard) => {
    const [inputString, setInputString] = useState<string>('');

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setKeyboardStatus(showKeyboard));
    }, [showKeyboard]);

    useEffect(() => {
        onInput(inputString);
    }, [inputString]);

    const key: { key: keyMap; icon?: AppIconProps }[][] = [
        [{ key: '7' }, { key: '8' }, { key: '9' }],
        [{ key: '4' }, { key: '5' }, { key: '6' }],
        [{ key: '1' }, { key: '2' }, { key: '3' }],
        [
            { key: '0' },
            {
                key: ' ',
                icon: {
                    Icon: ['fas', 'backspace'],
                    IconSize: 25,
                    IconColor: ColorConstant.Text.Grey.Dark,
                },
            },
        ],
    ];

    const onPressKey = (text: keyMap) => {
        switch (text) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                setInputString((prev) => prev + text);
                break;
            case ' ':
                setInputString((prev) => prev.substring(0, prev.length - 1));
                break;
            default:
                break;
        }
    };

    const numberKeyRenderer = () => {
        return (
            <View style={{ flex: 3, justifyContent: 'center' }}>
                {key.map((key, index) => (
                    <View
                        key={index}
                        style={BusRouteSearchKeyboardStyle.keyRow}
                    >
                        {key.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={BusRouteSearchKeyboardStyle.key}
                                onPress={() => {
                                    onPressKey(item.key);
                                }}
                            >
                                {item.icon ? (
                                    <AppIcon {...item.icon} />
                                ) : (
                                    <TextComponent>{item.key}</TextComponent>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        );
    };

    const engKey: string[] = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ];

    const onPressEngKey = (text: string) => {
        setInputString((prev) => prev + text);
    };

    const engKeyRenderer = () => {
        return (
            <View style={{ flex: 1, padding: 5 }}>
                <FlatList
                    data={engKey}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                onPressEngKey(item);
                            }}
                            style={BusRouteSearchKeyboardStyle.key}
                        >
                            <TextComponent>{item}</TextComponent>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    };

    return (
        <>
            {showKeyboard && (
                <View style={{ flexDirection: 'row', height: 280 }}>
                    {numberKeyRenderer()}
                    {engKeyRenderer()}
                </View>
            )}
        </>
    );
};

export default BusRouteSearchKeyboard;

const BusRouteSearchKeyboardStyle = StyleSheet.create({
    keyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },

    key: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        backgroundColor: ColorConstant.BG.Grey.Normal,
    },
});
