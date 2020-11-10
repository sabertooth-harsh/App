import React from 'react';
import { View, Text } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function TabScreen21(props) {
    return (
        <View style={{ flex: 1 }}>
            <Header
                centerComponent={<Text style={{ fontSize: 40, color: 'white', fontFamily: 'monospace' }}>About</Text>}
            />
        </View>
    );
}

export default TabScreen21;