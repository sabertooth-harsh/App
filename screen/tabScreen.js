import React from 'react';
import { View, Text } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import HomeTabNavigator from './homeTabNavigator';

function TabScreen(props) {
    const navigation = useNavigation();

    return (
        <HomeTabNavigator />
    );
}

export default TabScreen;