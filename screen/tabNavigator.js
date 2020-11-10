import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import TabScreen from './tabScreen';

const Tabs = createBottomTabNavigator();

const tabScreen1 = ({ navigation }) => {
    return (
        <TabScreen />
    );
}
const tabScreen2 = ({ navigation }) => {
    return (
        <TabScreen />
    );
}

function TabNavigator(props) {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarLabel: ({ focused, color, size }) => {
                    let label;
                    switch (route.name) {
                        case 'tab1':
                            label = 'Tab 1';
                            break;
                        case 'tab2':
                            label = 'Tab 2';
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
                name='tab1'
                component={tabScreen1}
            />
            <Tabs.Screen
                name='tab2'
                component={tabScreen2}
            />
        </Tabs.Navigator>
    );
}

export default TabNavigator;