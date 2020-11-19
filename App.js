import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Main from './src/components/Main';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { store } from './src/redux/configureStore';

function App() {

  useEffect(() => {
    const users = [
      {
        id: 0,
        name: 'demo',
        email: 'demo@demo.com',
        otp: '1234',
        phno: '1234567890',
        address: 'Delhi',
        image: null
      }
    ]
    const setDemoUser = async () => {
      await AsyncStorage.setItem('users', JSON.stringify(users))
        .catch((err) => console.log(err));
    }

    setDemoUser();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
