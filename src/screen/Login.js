import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Card, Input, Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Login = (props) => {

    const navigation = useNavigation();


    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const handleLogin = async () => {
        await AsyncStorage.getItem('users')
            .then((response) => {
                const userArray = JSON.parse(response);
                if (userArray !== null) {
                    const currentUser = userArray.find((user) => user.email === email && user.otp === otp);
                    currentUser === null ? console.log("User not present") : navigation.replace('main', email);
                }
                else
                    console.log('No users present');
            })
            .catch((err) => console.log(err));
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 2, heigth: 500, width: SCREEN_WIDTH, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 40, fontFamily: 'courier' }}>Welcome Again!</Text>
            </View>
            <View>
                <Card containerStyle={{ marginTop: 'auto', width: SCREEN_WIDTH }}>
                    <Card.Title style={{ fontSize: 30 }}>Log In</Card.Title>
                    <Card.Divider />
                    <Input
                        placeholder='Email'
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />
                    {otpSent ? <View>
                        <Input
                            placeholder='Enter OTP here'
                            value={otp}
                            onChangeText={(value) => setOtp(value)}
                        />
                        <Button
                            title='Log In'
                            onPress={() => handleLogin()}
                        />
                    </View> : <Button
                            containerStyle={{
                                marginLeft: 20,
                            }}
                            titleStyle={{ fontSize: 15 }}
                            title='Send OTP'
                            onPress={() => setOtpSent(true)}
                        />}
                    <Card.Divider />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20 }}>Don't have an account?</Text>
                        </View>
                        <Button
                            containerStyle={{
                                marginLeft: 20,
                            }}
                            titleStyle={{ fontSize: 15 }}
                            title='Sign Up'
                            onPress={() => navigation.navigate('signup')}
                        />
                    </View>
                </Card>
            </View>
        </View>
    );
}

export default Login;