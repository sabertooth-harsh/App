import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function TabScreen(props) {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Tap on the button to go to Drawer Screen 2 from this Tab</Text>
            <Button
                title='Drawer Screen 2'
                onPress={() => navigation.navigate('drawerScreen2')}
            />
        </View>
    );
}

export default TabScreen;