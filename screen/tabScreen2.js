import React from 'react';
import { View, Text } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function TabScreen2(props) {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <Header
                centerComponent={<Text style={{ fontSize: 40, color: 'white', fontFamily: 'monospace' }}>Contacts</Text>}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, marginBottom: 40 }}>Tap on the button to go to Drawer Screen 2 from this Tab</Text>
                <Button
                    containerStyle={{
                        width: 250
                    }}
                    titleStyle={{ fontSize: 30 }}
                    title='Drawer Screen 2'
                    onPress={() => navigation.navigate('drawerScreen2')}
                />
            </View>
        </View>
    );
}

export default TabScreen2;