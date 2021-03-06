import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screen/SplashScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import UserProfile from '../screen/UserProfile';

const Root = createStackNavigator();

const splashScreen = ({ navigation }) => {
    return (
        <SplashScreen />
    );
}
const authScreen = ({ navigation }) => {
    return (
        <AuthNavigator />
    );
}
const mainScreen = ({ route, navigation }) => {
    const email = route.params;
    return (
        <MainNavigator email={email} />
    );
}
const userProfileScreen = ({ navigation }) => {
    return (
        <UserProfile />
    );
}

const RootNavigator = (props) => {

    return (
        <Root.Navigator>
            <Root.Screen
                name='splash'
                component={splashScreen}
                options={{
                    headerShown: false
                }}
            />
            <Root.Screen
                name='auth'
                component={authScreen}
                options={{
                    headerShown: false
                }}
            />
            <Root.Screen
                name='main'
                component={mainScreen}
                options={{
                    headerShown: false
                }}
            />
            <Root.Screen
                name='userProfile'
                component={userProfileScreen}
                options={{
                    headerShown: false
                }}
            />
        </Root.Navigator>
    );
}


export default RootNavigator;