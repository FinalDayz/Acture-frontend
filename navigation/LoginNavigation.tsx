import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisteringScreen'
import colors from '../constants/colors';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const LoginNavigation = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
        },
        Register: {
            screen: RegisterScreen
        },
        ChangePassword: {
            screen: ChangePasswordScreen
        }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.primary,
                shadowOpacity: 0,
                elevation: 0,
            },
            headerTintColor: colors.textLight
        },
        navigationOptions: {
            title: 'help'
        }
    }
);

export default createAppContainer(LoginNavigation);
