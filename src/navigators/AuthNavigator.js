import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screen/Login';
import Signup from '../screen/Signup';

const AuthStack = createStackNavigator();

const loginScreen = ({ navigation }) => {
    return (
        <Login />
    );
}
const signupScreen = ({ navigation }) => {
    return (
        <Signup />
    );
}

const Auth = (props) => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name='login'
                component={loginScreen}
                options={{
                    headerShown: false
                }}
            />
            <AuthStack.Screen
                name='signup'
                component={signupScreen}
                options={{
                    headerShown: false,
                }}
            />
        </AuthStack.Navigator>
    );
}

export default Auth;