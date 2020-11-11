import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = (props) => {
    const [animating, setAnimating] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            await AsyncStorage.getItem('loggedUser')
                .then((email) => {
                    navigation.replace(email === null ? 'auth' : 'main', email);
                })
                .catch((err) => console.log(err));
        }

        setTimeout(() => {
            setAnimating(false);

            fetchUserData();
        }, 5000);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator
                animating={true}
                size='large'
                color='blue'
            />
        </View>
    );
}

export default SplashScreen;