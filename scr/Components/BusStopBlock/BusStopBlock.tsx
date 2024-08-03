import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import ColorConstant from '../../Constant/ColorConstant';
import FontSizeConstant from '../../Constant/FontSizeConstant';
import BusStop from '../../Type/Bus/BusStop';
import TextComponent from '../Common/TextComponent/TextComponent';

interface BusStopBlockProps {
    busStop: BusStop;
    index: number;
}

const BusStopBlock = ({ busStop, index }: BusStopBlockProps) => {
    const { t } = useTranslation();

    return (
        <View style={BusStopBlockStyle.mainContainer}>
            <View style={{ width: 40, alignItems: 'center' }}>
                <View style={BusStopBlockStyle.bar} />
                <View style={BusStopBlockStyle.ball} />
                <View style={BusStopBlockStyle.bar} />
            </View>
            <View style={{ flex: 1, marginVertical: 10 }}>
                <TextComponent>{`${index + 1} ${
                    busStop.busStopName
                }`}</TextComponent>
                <TextComponent fontSize={FontSizeConstant.small}>{`${t(
                    'Fee',
                )}: $${busStop.fee}\n${t('Distance')}: ${
                    busStop.distance
                } m`}</TextComponent>
            </View>
            <View style={{ alignItems: 'flex-end', marginVertical: 10 }}>
                {busStop.nextBus
                    .sort((a, b) => {
                        return a - b;
                    })
                    .map((item, index) => (
                        <View key={index} style={BusStopBlockStyle.terminusRow}>
                            <TextComponent
                                fontColor={ColorConstant.Text.Blue.Normal}
                            >{`${item} `}</TextComponent>
                            <TextComponent fontSize={FontSizeConstant.small}>
                                {t('Minute')}
                            </TextComponent>
                        </View>
                    ))}
            </View>
        </View>
    );
};

export default BusStopBlock;

const BusStopBlockStyle = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: ColorConstant.BG.White.Light,
        borderBottomWidth: 1,
        borderColor: ColorConstant.BG.Grey.Normal,
    },

    terminusRow: {
        alignItems: 'flex-end',
        flexDirection: 'row',
    },

    bar: {
        flex: 1,
        width: 3,
        backgroundColor: ColorConstant.BG.Red.Normal,
    },

    ball: {
        borderRadius: 1000,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: ColorConstant.BG.Black.Normal,
    },
});
