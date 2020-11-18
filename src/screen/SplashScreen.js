import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = (props) => {
    const [animating, setAnimating] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            const email = await AsyncStorage.getItem('loggedUser');
            console.log('Logged user found in Splash screen: ', email);
            navigation.replace(email === null ? 'auth' : 'main');
        }

        setTimeout(() => {
            setAnimating(false);

            fetchUserData();
        }, 1000);
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