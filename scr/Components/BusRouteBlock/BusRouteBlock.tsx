import { useTranslation } from 'react-i18next';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';

import ColorConstant from '../../Constant/ColorConstant';
import FontSizeConstant from '../../Constant/FontSizeConstant';
import BusRoute from '../../Type/Bus/BusRoute';
import IconButton from '../Common/IconButton/IconButton';
import TextComponent from '../Common/TextComponent/TextComponent';

interface BusRouteBlockProps {
    busRoute: BusRoute;
    onPressItem: Function;
    onPressFavorite: Function;
}

const BusRouteBlock = ({
    busRoute,
    onPressItem,
    onPressFavorite,
}: BusRouteBlockProps) => {
    const { t } = useTranslation();

    const { width } = useWindowDimensions();

    const onPress = () => {
        onPressItem(busRoute);
    };

    const onPressStar = () => {
        onPressFavorite(busRoute.routeName);
    };

    return (
        <TouchableOpacity
            style={[BusRouteBlockStyle.mainContainer, { width }]}
            onPress={onPress}
        >
            <TextComponent style={{ width: 55, marginRight: 20 }}>
                {busRoute.routeName}
            </TextComponent>
            <View style={{ flex: 1 }}>
                <View style={BusRouteBlockStyle.terminusRow}>
                    <TextComponent
                        style={{
                            marginRight: 5,
                        }}
                    >
                        {t('BusTo')}
                    </TextComponent>
                    <TextComponent fontSize={FontSizeConstant.large} isBold>
                        {busRoute.terminus}
                    </TextComponent>
                </View>
                <TextComponent fontSize={FontSizeConstant.small}>
                    {`${
                        busRoute.busStop.busStopName
                    } ($${busRoute.busStop.fee.toFixed(1)})`}
                </TextComponent>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                {busRoute.busStop.nextBus
                    .sort((a, b) => {
                        return a - b;
                    })
                    .map((item, index) => (
                        <View
                            key={index}
                            style={BusRouteBlockStyle.terminusRow}
                        >
                            <TextComponent
                                fontColor={ColorConstant.Text.Blue.Normal}
                            >{`${item} `}</TextComponent>
                            <TextComponent fontSize={FontSizeConstant.small}>
                                {t('Minute')}
                            </TextComponent>
                        </View>
                    ))}
            </View>
            <IconButton
                onPressCallBack={onPressStar}
                IconProps={{
                    Icon: ['fas', 'star'],
                    IconSize: 40,
                    IconColor: busRoute.isFavorite
                        ? ColorConstant.BG.Yellow.Normal
                        : ColorConstant.Text.Grey.Normal,
                }}
                buttonStyle={{ paddingRight: 0 }}
            />
        </TouchableOpacity>
    );
};

export default BusRouteBlock;

const BusRouteBlockStyle = StyleSheet.create({
    mainContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: ColorConstant.BG.White.Light,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: ColorConstant.BG.Grey.Normal,
    },

    terminusRow: {
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
});
