import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import ContactsTabNavigator from './ContactsTabNavigator';
import HomeTabNavigator from './HomeTabNavigator';

const Tabs = createBottomTabNavigator();

const homeTabScreen = ({ navigation }) => {
    return (
        <HomeTabNavigator />
    );
}
const contactsTabScreen = ({ navigation }) => {
    return (
        <ContactsTabNavigator />
    );
}

function RootNavigator(props) {
    return (
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
    );
}

export default RootNavigator;