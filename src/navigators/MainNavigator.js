import React, { useEffect, useState } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import ContactsTabNavigator from './ContactsTabNavigator';
import HomeTabNavigator from './HomeTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { add_user } from '../redux/actionCreators';
import { connect } from 'react-redux';
import UserTabScreen from '../screen/UserTabScreen';


const mapDispatchToProps = (dispatch) => {
    return {
        add_user: (id, name, email, otp, phno, address, image) => dispatch(add_user(id, name, email, otp, phno, address, image))
    }
}

const mapStateToProps = (state) => {
    return {
        user: state
    }
}

const Tabs = createBottomTabNavigator();

const homeTabScreen = ({ route, navigation }) => {
    return (
        <HomeTabNavigator />
    );
}
const contactsTabScreen = ({ navigation }) => {
    return (
        <ContactsTabNavigator />
    );
}
const userTabScreen = ({ navigation }) => {
    return (
        <UserTabScreen />
    );
}

function MainNavigator(props) {
    const navigation = useNavigation();

    const backAction = () => {
        BackHandler.exitApp();
    };


    useEffect(() => {
        //Get details of already logged user
        const getLoggedUser = async () => {

            //First get email of already logged user
            await AsyncStorage.getItem('loggedUser')
                .then((response) => {
                    const email = JSON.parse(response);
                    console.log('logged user in main: ', email);
                    //Get all details of logged user and add it to redux store
                    const getLoggedUserDetails = async () => {
                        let user = null;
                        await AsyncStorage.getItem('users')
                            .then((response) => {
                                const users = JSON.parse(response);
                                console.log('all users: ', users);
                                user = users.find((us) => us.email === email);
                                console.log('found user: ', user);
                            })
                            .catch((err) => console.log(err));

                        //pass to add_user function
                        await props.add_user(user.id, user.name, user.email, user.otp, user.phno, user.address, user.image);
                    }

                    getLoggedUserDetails();

                })
                .catch((err) => console.log(err));
        }

        getLoggedUser();



        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);


        console.log('Data in store: ', props.user);
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

                            case 'userTab':
                                icon = <Icon name='user' type='font-awesome' size={48} color={focused ? 'white' : 'gray'} />
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
                <Tabs.Screen
                    name='userTab'
                    component={userTabScreen}
                    options={{
                        unmountOnBlur: true
                    }}
                />
            </Tabs.Navigator>
        </View >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);