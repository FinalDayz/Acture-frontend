import React from 'react';
import { StyleSheet, View } from 'react-native';

import MainNavigation from './navigation/MainNavigation';
import LoginScreen from './screens/LoginScreen';

export default function App() {
    return (
        // <View style={styles.screen}>
            <LoginScreen/>
        // </View>

        //<MainNavigation style={styles.screen} />

        // <View style={styles.screen}>
        //     <Feed/>
        // </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
