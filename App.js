import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Main from './src/components/Main';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {

  useEffect(() => {
    const users = [
      {
        name: 'demo',
        email: 'demo',
        otp: '1234'
      }
    ]
    const setDemoUser = async () => {
      await AsyncStorage.setItem('users', JSON.stringify(users))
        .then(() => console.log('Demo User Set'))
        .catch((err) => console.log(err));
    }

    setDemoUser();
  }, []);

  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}

export default App;
