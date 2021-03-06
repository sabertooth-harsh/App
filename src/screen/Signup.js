import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Dimensions, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Button, Card, Input, Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from '../components/ImagePickerComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Signup = (props) => {
    const navigation = useNavigation();

    const [loadingUserId, setLoadingUserId] = useState(true);  //Load user id in useEffect() to pass it to ImagePicker

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [phno, setPhno] = useState('');
    const [address, setAddress] = useState('');
    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [otpError, setOtpError] = useState(null);
    const [phnoError, setPhnoError] = useState(null);
    const [addressError, setAddressError] = useState(null);

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        //set next id on startup
        const fetchUsers = async () => {
            await AsyncStorage.getItem('users')
                .then((response) => {
                    const users = JSON.parse(response);
                    users === null ? setId(0) : setId(users.length);
                    console.log('users: ', users);
                    setUserList(users);
                    console.log('userList: ', userList);
                })
                .then(() => {
                    setLoadingUserId(false);
                })
                .catch((err) => console.log(err));
        }

        fetchUsers();
    }, []);

    //form validation
    const validateForm = () => {
        let noErr = true;

        setEmail(email.toLowerCase());
        let patt = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!patt.test(email)) {
            setEmailError('Invalid email');
            noErr = false;
        }
        if (email.length < 1) {
            setEmailError('No email entered');
            noErr = false;
        }

        if (name.length < 1) {
            setNameError('No name entered');
            noErr = false;
        }

        let otpPatt = /^[0-9]+$/;
        if (!otpPatt.test(otp)) {
            setOtpError('OTP can only be numeric');
            noErr = false;
        }
        if (otp.length < 4 || otp.length > 4) {
            setOtp('');
            setOtpError("OTP must be of 4 characters");
            noErr = false;
        }

        let phnoPatt = /[789]\d{9}/g
        if (!phnoPatt.test(phno)) {
            setPhnoError('Invalid Phone Number');
            noErr = false;
        }


        if (userList.find((user) => user.email === email)) {
            setEmailError('User Already Present! Please Login.')
            setEmail('');
            noErr = false;
            return;
        }

        return !noErr;
    }

    const handleSubmit = async () => {
        if (validateForm())
            return;

        const profilePic = await AsyncStorage.getItem(`user-${id}-profilePic`);


        const tempUserList = {
            id: id,
            name: name,
            email: email.toLowerCase(),
            otp: otp,
            phno: phno,
            address: address,
            image: (profilePic ? JSON.parse(profilePic).uri : null)
        };

        setUserList(userList.push(tempUserList));
        console.log(userList);

        await AsyncStorage.removeItem('users')
            .then(() => console.log('Old list removed'))
            .catch((err) => console.log(err));


        await AsyncStorage.setItem('users', JSON.stringify(userList))
            .then(() => console.log('New User Successfully Added'))
            .then(() => navigation.goBack())
            .catch((err) => console.log(err));
    }

    return (
        <View style={{ flex: 1 }}>
            <Header
                {...props}
                containerStyle={{ backgroundColor: 'white' }}
                leftComponent={<Icon color='#2dd1eb' name='angle-left' size={30} type='font-awesome' onPress={() => {
                    const picIsPresent = () => {
                        const isPresent = AsyncStorage.getItem(`user-${id}-profilePic`);
                        if (isPresent) {
                            AsyncStorage.removeItem(`user-${id}-profilePic`);
                        }
                    }

                    picIsPresent();
                    navigation.goBack()
                }} />}
            />

            <View style={{ flex: 1 }}>

                <ScrollView style={{ flex: 1 }} indicatorStyle='black'>
                    <View style={{ flex: 1, width: SCREEN_WIDTH, backgroundColor: '#2dd1eb', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 40, fontFamily: 'courier' }}>New User? Sign Up</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, padding: 7, borderRadius: 20 }}>
                            <Text style={{ fontSize: 40, fontFamily: 'courier' }}>Sign Up</Text>
                        </View>
                        <View>
                            {loadingUserId ? <ActivityIndicator size='large' animating={true} color='#2dd1eb' /> : <ImagePicker user_id={id} />}
                            <Input
                                style={{ margin: 5 }}
                                placeholder='Name'
                                value={name}
                                inputStyle={{
                                    fontFamily: 'monospace'
                                }}
                                onChangeText={(value) => setName(value)}
                                errorMessage={nameError}
                            />
                            <Input
                                style={{ margin: 5 }}
                                placeholder='Email'
                                value={email}
                                inputStyle={{
                                    fontFamily: 'monospace'
                                }}
                                onChangeText={(value) => setEmail(value)}
                                errorMessage={emailError}
                                onBlur={() => {
                                    setEmail(email.toLowerCase());
                                    let patt = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                                    if (!patt.test(email)) {
                                        setEmailError('Invalid email');
                                    }
                                    else
                                        setEmailError('');
                                }}
                            />
                            <Input
                                style={{ margin: 5 }}
                                placeholder='Contact No'
                                value={phno}
                                inputStyle={{
                                    fontFamily: 'monospace'
                                }}
                                onChangeText={(value) => setPhno(value)}
                                errorMessage={phnoError}
                                onBlur={() => {
                                    let phnoPatt = /[789]\d{9}/g
                                    if (!phnoPatt.test(phno)) {
                                        setPhnoError('Invalid Phone Number');
                                    }
                                    else
                                        setPhnoError('');
                                }}
                            />
                            <Input
                                style={{ margin: 5 }}
                                placeholder='Address'
                                value={address}
                                inputStyle={{
                                    fontFamily: 'monospace'
                                }}
                                onChangeText={(value) => setAddress(value)}
                                errorMessage={addressError}
                            />
                            <Input
                                style={{ margin: 5 }}
                                keyboardType='number-pad'
                                placeholder='OTP'
                                inputStyle={{
                                    fontFamily: 'monospace'
                                }}
                                value={otp}
                                maxLength={4}
                                onBlur={() => {
                                    let patt = /^[0-9]+$/;
                                    if (!patt.test(otp)) {
                                        setOtpError('OTP can only be numeric');
                                    }
                                    else if (otp.length < 4 || otp.length > 4) {
                                        setOtp('');
                                        setOtpError("OTP must be of 4 characters");
                                    }
                                    else
                                        setOtpError('');
                                }}
                                onChangeText={(value) => setOtp(value)}
                                errorMessage={otpError}
                            />
                            <Button
                                buttonStyle={{
                                    marginTop: 20,
                                    alignSelf: 'center',
                                    width: 300,
                                    borderRadius: 0,
                                    height: 60,
                                    backgroundColor: '#2dd1eb'
                                }}
                                titleStyle={{
                                    fontFamily: 'monospace',
                                    fontSize: 30,
                                }}
                                title='Sign Up'
                                onPress={() => handleSubmit()}
                                error={emailError}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default Signup;