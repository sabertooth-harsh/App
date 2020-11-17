import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Dimensions, Alert, TextInput, StyleSheet } from 'react-native';
import { Button, Card, Input, Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Login = (props) => {

    const navigation = useNavigation();


    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateForm = () => {
        let noErr = true;

        let patt = new RegExp('@');
        if (!patt.test(email)) {
            setEmailError('Invalid email, must contain @');
            noErr = false;
        }
        if (email.length < 1) {
            setEmailError('No email entered');
            noErr = false;
        }

        let otpPatt = /^[0-9]+$/;
        if (!otpPatt.test(otp)) {
            setOtpError('OTP can only be numeric');
            noErr = false;
        }
        if (otp.length < 4 || otp.length > 4) {
            setOtpError("OTP must be of 4 characters");
            noErr = false;
        }

        const matchOtp = async () => {
            await AsyncStorage.getItem('users')
                .then((res) => {
                    const users = JSON.parse(res);
                    const user = users.find((user) => user.email === email);
                    if (user.otp !== otp) {
                        setOtpError('Invalid Otp');
                        noErr = false;
                    }
                })
                .catch((err) => console.log(err));
        }

        matchOtp();

        return !noErr;
    }

    const handleLogin = async () => {
        if (validateForm())
            return;

        const handleLoggedUserFound = async (currentUser) => {
            await AsyncStorage.setItem('loggedUser', currentUser.email)
                .then((res) => console.log('setLoggedUser', res))
                .catch((err) => console.log(err));

            navigation.replace('splash');
        }

        await AsyncStorage.getItem('users')
            .then((response) => {
                const userArray = JSON.parse(response);
                console.log('response', userArray);
                if (userArray !== null) {
                    const currentUser = Object.values(userArray).find((user) => user.email === email && user.otp === otp);
                    console.log('email', email, 'currentUser', currentUser);
                    currentUser === null || typeof (currentUser) === 'undefined' ? console.log("User not present", userArray) : handleLoggedUserFound(currentUser);
                }
                else
                    console.log('No users present');
            })
            .catch((err) => console.log(err));
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 6, width: SCREEN_WIDTH, backgroundColor: '#2dd1eb', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 40, fontFamily: 'courier' }}>Welcome Again!</Text>
            </View>
            {otpSent ?
                <View style={{ alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, padding: 7, borderRadius: 20, flexDirection: 'row' }}>
                    <Icon
                        name='arrow-left' type='font-awesome'
                        containerStyle={{ marginRight: 'auto', justifyContent: 'center' }}
                        onPress={() => {
                            setOtpError('');
                            setOtpSent(false);
                        }}
                    />
                    <Text style={{ marginRight: 'auto', fontSize: 40, fontFamily: 'courier' }}>Enter the OTP</Text>
                </View> : <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, padding: 7, borderRadius: 20 }}>
                    <Text style={{ fontSize: 40, fontFamily: 'courier' }}>Log In</Text>
                </View>
            }
            <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                {otpSent ?
                    <Input
                        containerStyle={{ width: Dimensions.get('window').width - 100 }}
                        style={{ margin: 5 }}
                        keyboardType='numeric'
                        placeholder='Enter OTP here'
                        value={otp}
                        maxLength={4}
                        inputStyle={{
                            fontFamily: 'monospace'
                        }}
                        onChangeText={(value) => setOtp(value)}
                        onBlur={() => {
                            if (otp.length > 0) {
                                let patt = /^[0-9]+$/;
                                if (!patt.test(otp)) {
                                    setOtpError('OTP can only be numeric');
                                }
                                else if (otp.length < 4 || otp.length > 4) {
                                    setOtpError('OTP must be of 4 numbers');
                                }
                                else
                                    setOtpError('');
                            }
                        }}
                        errorMessage={otpError}
                    /> :
                    <Input
                        containerStyle={{ width: Dimensions.get('window').width - 100 }}
                        style={{ margin: 5 }}
                        placeholder='Email'
                        inputStyle={{
                            fontFamily: 'monospace'
                        }}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        onBlur={() => {
                            if (email.length > 0) {
                                let patt = new RegExp('@');
                                if (!patt.test(email)) {
                                    setEmailError('Invalid email, must contain @');
                                }
                                else
                                    setEmailError('');
                            }
                        }}
                        errorMessage={emailError}
                    />
                }
                <Icon
                    name='angle-right'
                    type='font-awesome'
                    reverse
                    raised
                    color='#2dd1eb'
                    onPress={otpSent ? () => handleLogin() : async () => {
                        await AsyncStorage.getItem('users')
                            .then((res) => {
                                const users = JSON.parse(res);
                                if (users.find((user) => user.email === email))
                                    setOtpSent(true);
                                else {
                                    Alert.alert(
                                        'User Not Found',
                                        'No user found with this email!',
                                        [
                                            {
                                                text: 'OK'
                                            }
                                        ]
                                    );
                                }
                            })
                            .catch((err) => console.log(err));
                    }}
                />
            </View>
            <View style={{ padding: 5, justifyContent: 'center' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Don't have an account?</Text>
                    <Text style={{ fontSize: 20, fontFamily: 'monospace', color: '#2dd1eb', marginLeft: 20 }} onPress={() => navigation.navigate('signup')}>Sign Up</Text>
                </View>
            </View>
        </View>
    );
}

export default Login;