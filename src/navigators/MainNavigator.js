import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import ContactsTabNavigator from './ContactsTabNavigator';
import HomeTabNavigator from './HomeTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tabs = createBottomTabNavigator();

const homeTabScreen = ({ route, navigation }) => {
    const email = route.params;
    console.log('email in hometab: ', email);
    return (
        <HomeTabNavigator />
    );
}
const contactsTabScreen = ({ navigation }) => {
    return (
        <ContactsTabNavigator />
    );
}

function MainNavigator(props) {
    const navigation = useNavigation();

    console.log('Main navigator: ', props);

    useEffect(() => {
        const setLoggedUser = async () => {
            await AsyncStorage.setItem('loggedUser', props.email)
                .catch((err) => console.log(err));
        };

        setLoggedUser();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Tabs.Navigator
                screenOptions={({ route }) => ({
                    tabBarLabel: ({ focused, color, size }) => {
                        let icon;
                        switch (route.name) {
                            case 'home':
                                icon = <Icon name='home' type='font-awesome' size={48} color={focused ? 'white' : 'gray'} />
                                break;

                            case 'contacts':
                                icon = <Icon name='address-book' type='font-awesome' size={48} color={focused ? 'white' : 'gray'} />
                                break;
                        }

                        return (
                            <View style={{ backgroundColor: focused ? 'lightblue' : 'white', alignSelf: 'stretch', justifyContent: 'center' }}>
                                {icon}
                            </View>
                        );
                    }
                })}
            >
                <Tabs.Screen
                    name='home'
                    component={homeTabScreen}
                />
                <Tabs.Screen
                    name='contacts'
                    component={contactsTabScreen}
                />
            </Tabs.Navigator>
        </View >
    );
}

export default MainNavigator;