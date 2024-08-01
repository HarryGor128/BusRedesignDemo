import { createStackNavigator } from '@react-navigation/stack';

import MainStackList from '../../Type/Navigation/MainStackList';
import InitializationScreen from '../Initialization/Initialization';
import BottomNavigationStack from './BottomNavigationStack';

const Stack = createStackNavigator<MainStackList>();

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
            <Stack.Screen
                name={'BottomNavigation'}
                component={BottomNavigationStack}
            />
        </Stack.Navigator>
    );
};

export default MainStack;
