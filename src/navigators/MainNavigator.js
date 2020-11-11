import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Header } from 'react-native-elements';
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
            <Header
                rightComponent={<Button
                    title='Sign Out'
                    onPress={async () => {
                        await AsyncStorage.removeItem('loggedUser')
                            .then(() => navigation.navigate('auth'))
                            .catch((err) => console.log(err));
                    }}
                />}
            />
            <Tabs.Navigator
                screenOptions={({ route }) => ({
                    tabBarLabel: ({ focused, color, size }) => {
                        let label;
                        switch (route.name) {
                            case 'home':
                                label = 'Home';
                                break;
                            case 'contacts':
                                label = 'Contacts';
                                break;
                            default:
                                label = 'Default';
                        }

                        return (
                            <View style={{ backgroundColor: focused ? 'lightblue' : 'white', alignSelf: 'stretch', justifyContent: 'center' }}>
                                <Text style={{ alignSelf: 'center', fontSize: 45, color: focused ? 'gray' : 'black' }}>{label}</Text>
                            </View>
                        );
                    }
                })}

                tabBarOptions={{
                    activeTintColor: 'green',
                    inactiveTintColor: 'gray',
                    style: {
                        borderTopWidth: 1,
                        paddingTop: 5,
                    }
                }}
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
        </View>
    );
}

export default MainNavigator;