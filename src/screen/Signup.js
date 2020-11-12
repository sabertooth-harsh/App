import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button, Card, Input, Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Signup = (props) => {
    const navigation = useNavigation();

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            await AsyncStorage.getItem('users')
                .then((response) => {
                    const users = JSON.parse(response);
                    users === null ? setId(0) : setId(users.length);
                    console.log('users: ', users);
                    setUserList(users);
                    console.log('userList: ', userList);
                })
                .catch((err) => console.log(err));
        }

        fetchUsers();
    }, []);

    const handleSubmit = async () => {
        const tempUserList = {
            id: id,
            name: name,
            email: email,
            otp: otp
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
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header
                {...props}
                containerStyle={{ backgroundColor: 'white' }}
                leftComponent={<Text {...props} style={{ fontSize: 40 }} onPress={() => navigation.goBack()}>{`<`}</Text>}
            />
            <View style={{ flex: 2, heigth: 500, width: SCREEN_WIDTH, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 40, fontFamily: 'courier' }}>New User? Sign Up</Text>
            </View>
            <View>
                <Card containerStyle={{ marginTop: 'auto', width: SCREEN_WIDTH }}>
                    <Card.Title style={{ fontSize: 30 }}>Sign Up</Card.Title>
                    <Card.Divider />
                    <Input
                        placeholder='Name'
                        value={name}
                        onChangeText={(value) => setName(value)}
                    />
                    <Input
                        placeholder='Email'
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />
                    <Input
                        placeholder='OTP'
                        value={otp}
                        onChangeText={(value) => setOtp(value)}
                    />
                    <Button
                        title='Sign Up'
                        onPress={() => handleSubmit()}
                    />
                    <Card.Divider />
                </Card>
            </View>
        </View>
    );
}

export default Signup;