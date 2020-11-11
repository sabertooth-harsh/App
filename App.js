import React from 'react';
import { View, Text } from 'react-native';
import Main from './src/components/Main';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}

export default App;
