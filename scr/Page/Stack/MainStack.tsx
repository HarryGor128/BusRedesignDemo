import { createStackNavigator } from '@react-navigation/stack';

import ScreenParamList from '../../Type/Navigation/ScreenParamList';
import InitializationScreen from '../Initialization/Initialization';

const Stack = createStackNavigator<ScreenParamList>();

const MainStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={'Initialization'}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name={'Initialization'}
                component={InitializationScreen}
            />
        </Stack.Navigator>
    );
};

export default MainStack;
