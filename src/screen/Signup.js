import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button, Card, Input, Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Signup = (props) => {
    const navigation = useNavigation();

    const [id, setId] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            await AsyncStorage.getItem('user')
                .then((response) => {
                    const userArray = Object.values(JSON.stringify(response));
                    userArray === null ? setId(0) : setId(userArray.length);
                })
                .catch((err) => console.log(err));
        }

        fetchUsers();
    }, []);

    const [userInfo = {
        id, name, email, pwd
    }, setUser] = useState(id, '', '', '');
    const users = [userInfo];

    const handleSubmit = () => {

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
                        value={userInfo.name}
                        onChangeText={(value) => setUser(userInfo.id, value, userInfo.email, userInfo.pwd)}
                    />
                    <Input
                        placeholder='Email'
                        value={userInfo.email}
                        onChangeText={(value) => setUser(userInfo.id, userInfo.name, value, userInfo.pwd)}
                    />
                    <Input
                        placeholder='Password'
                        value={userInfo.pwd}
                        onChangeText={(value) => setUser(userInfo.id, userInfo.name, userInfo.email, value)}
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