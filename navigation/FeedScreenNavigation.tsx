import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import FeedScreenTabs from './FeedScreenTabs'
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../constants/colors';
import PostAddScreen from "../screens/PostAddScreen";
import AttendanceScreen from '../screens/AttendanceScreen';
import userPrivacyScreen from "../screens/userPrivacyScreen";
import NewStartupScreen from '../screens/Startup/NewStartupScreen';
import StartupList from '../screens/Startup/StartupList';
import AboutScreen from '../screens/AboutScreen';

const FeedScreenNavigation = createStackNavigator(
    {
        Feed: {
            screen: FeedScreenTabs
        },
        Profile: {
            screen: ProfileScreen
        },
        PostAddScreen:{
            screen: PostAddScreen
        },
        userPrivacyScreen: {
            screen: userPrivacyScreen,
            navigationOptions: {
                headerTitle: 'Instellingen',
            }
        },
        Attendance: {
            screen: AttendanceScreen
        },
        NewStartupScreen: {
            screen: NewStartupScreen
        },        
        StartupList: {
            screen: StartupList
        },
        About: {
            screen: AboutScreen
        }        

    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.primary
            },
            headerTintColor: colors.textLight
        }
    });

export default createAppContainer(FeedScreenNavigation);
