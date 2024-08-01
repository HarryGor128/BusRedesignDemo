import { ReactNode } from 'react';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';

import StylesConstant from '../../../Constant/StylesConstant';
import AppHeader, { AppHeaderProps } from '../AppHeader/AppHeaderRenderer';

interface PageContainerProps {
    children?: ReactNode;
    showHeader?: boolean; // Show header if true
    isScrollable?: boolean; // Switch to scroll view
    headerProps?: AppHeaderProps; // App header props
    containerStyle?: StyleProp<ViewStyle>; // Container style
    viewStyle?: StyleProp<ViewStyle>; // View style
}

const PageContainer = ({
    children,
    showHeader,
    isScrollable,
    headerProps,
    containerStyle,
    viewStyle,
}: PageContainerProps) => {
    const ViewContainer = isScrollable ? ScrollView : View;

    return (
        <View style={[StylesConstant.BGFlexContainer, containerStyle]}>
            {showHeader && <AppHeader {...headerProps} />}
            <ViewContainer
                style={[
                    isScrollable
                        ? StylesConstant.ScrollViewContent
                        : StylesConstant.FlexContainer,
                    viewStyle,
                ]}
            >
                {children}
            </ViewContainer>
        </View>
    );
};

export default PageContainer;
