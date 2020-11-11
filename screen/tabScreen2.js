import React from 'react';
import { View, Text } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ContactsTabNavigator from './contactsTabNavigator';

function TabScreen2(props) {
    const navigation = useNavigation();

    return (
        <ContactsTabNavigator />
    );
}

export default TabScreen2;