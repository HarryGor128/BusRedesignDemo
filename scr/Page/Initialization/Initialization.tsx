import { useEffect } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ColorConstant from '../../Constant/ColorConstant';
import useAndroidBackButton from '../../Hook/Common/useAndroidBackButton';
import commonService from '../../Services/Common/commonService';
import MainStackList from '../../Type/Navigation/MainStackList';
import { closeLoader, openLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

type NavigationProps = NativeStackNavigationProp<
    MainStackList,
    'Initialization'
>;

const InitializationScreen = () => {
    const navigation = useNavigation<NavigationProps>();

    const dispatch = useAppDispatch();

    useAndroidBackButton();

    const fakeLoading = async () => {
        dispatch(openLoader());
        await commonService.sleep(1000);
        dispatch(closeLoader());
    };

    useEffect(() => {
        fakeLoading();
        navigation.navigate('DrawerNavigationStack');
    }, []);

    return <View style={{ backgroundColor: ColorConstant.BG.White.Normal }} />;
};

export default InitializationScreen;
