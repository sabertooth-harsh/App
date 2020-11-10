import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import TabScreen21 from './tabScreen21';
import TabScreen22 from './tabScreen22';

const Tabs = createBottomTabNavigator();

const tabScreen21 = ({ navigation }) => {
    return (
        <TabScreen21 />
    );
}
const tabScreen22 = ({ navigation }) => {
    return (
        <TabScreen22 />
    );
}

function TabNavigator(props) {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarLabel: ({ focused, color, size }) => {
                    let label;
                    switch (route.name) {
                        case 'settings':
                            label = 'Settings';
                            break;
                        case 'about':
                            label = 'About';
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
                name='settings'
                component={tabScreen22}
            />
            <Tabs.Screen
                name='about'
                component={tabScreen21}
            />
        </Tabs.Navigator>
    );
}

export default TabNavigator;