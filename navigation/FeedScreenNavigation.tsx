import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import FeedScreen from '../screens/FeedScreen';
import FeedScreenTabs from './FeedScreenTabs'
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../constants/colors';
import PostAddScreen from "../screens/PostAddScreen";
import userPrivacyScreen from "../screens/userPrivacyScreen";



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
            screen: userPrivacyScreen
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
