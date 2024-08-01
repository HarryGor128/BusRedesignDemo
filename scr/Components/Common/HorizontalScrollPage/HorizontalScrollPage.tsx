import { ReactNode, useRef, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewToken,
    useWindowDimensions,
} from 'react-native';

import ColorConstant from '../../../Constant/ColorConstant';
import FontSizeConstant from '../../../Constant/FontSizeConstant';
import AppIcon, { AppIconProps } from '../AppIcon/AppIconRenderer';
import TextComponent from '../TextComponent/TextComponent';

export interface PageTitle {
    title: string;
    icon: AppIconProps;
}

interface HorizontalScrollPageProps {
    page: ReactNode[];
    pageTitle: PageTitle[];
}

const HorizontalScrollPage = ({
    page,
    pageTitle,
}: HorizontalScrollPageProps) => {
    const { width } = useWindowDimensions();

    const flatListRef = useRef<FlatList>(null);

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const PageTitleRenderer = ({
        item,
        index,
    }: {
        item: PageTitle;
        index: number;
    }) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    flatListRef.current?.scrollToIndex({ index: index });
                }}
                style={{ alignItems: 'center' }}
            >
                <AppIcon
                    IconSize={25}
                    IconColor={
                        currentIndex === index
                            ? ColorConstant.Text.Red.Normal
                            : undefined
                    }
                    {...item.icon}
                />
                <TextComponent
                    key={index}
                    fontSize={FontSizeConstant.large}
                    fontColor={
                        currentIndex === index
                            ? ColorConstant.Text.Red.Normal
                            : undefined
                    }
                    isBold
                >
                    {item.title}
                </TextComponent>
            </TouchableOpacity>
        );
    };

    const renderItem = ({ item }: { item: ReactNode }) => {
        return (
            <TouchableOpacity style={{ flex: 1, width }}>
                {item}
            </TouchableOpacity>
        );
    };

    const onScrollView = (info: {
        viewableItems: ViewToken<ReactNode>[];
        changed: ViewToken<ReactNode>[];
    }) => {
        if (info.viewableItems[0].index !== null) {
            setCurrentIndex(info.viewableItems[0].index);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={HorizontalScrollPageStyle.titleRow}>
                {pageTitle.map((item, index) => (
                    <PageTitleRenderer item={item} index={index} />
                ))}
            </View>
            <FlatList
                data={page}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onScrollView}
                ref={flatListRef}
            />
        </View>
    );
};

export default HorizontalScrollPage;

const HorizontalScrollPageStyle = StyleSheet.create({
    titleRow: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
    },
});
