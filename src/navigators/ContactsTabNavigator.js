import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactsTabDrawer = createDrawerNavigator();

const CustomDrawerContentComponent = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView {...props}>
                <View style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <View style={styles.drawerHeader}>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={styles.drawerHeaderText}>Contacts</Text>
                        </View>
                    </View>
                    <DrawerItemList {...props} />
                </View>
            </ScrollView>
            <Button
                containerStyle={{
                    flex: 1,
                    marginTop: 420,
                    borderTopWidth: 1,
                    borderRadius: 20
                }}
                buttonStyle={{
                    backgroundColor: 'white'
                }}
                title='Sign Out'
                titleStyle={{
                    color: 'gray'
                }}
                onPress={async () => {
                    await AsyncStorage.removeItem('loggedUser')
                        .then(() => props.navigation.navigate('auth'))
                        .catch((err) => console.log(err));
                }}
            />
        </View>
    );
}

const allContactsScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1 }}>
            <Header
                leftComponent={<Icon name='menu' color='white' size={35} onPress={() => navigation.toggleDrawer()} />}
                centerComponent={<Text style={{ fontSize: 40, fontFamily: 'monospace', color: 'white' }}>Contacts</Text>}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>All Contacts will appear here</Text>
            </View>
        </View>
    );
}
const spamContactsScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1 }}>
            <Header
                leftComponent={<Icon name='menu' color='white' size={35} onPress={() => navigation.toggleDrawer()} />}
                centerComponent={<Text style={{ fontSize: 40, fontFamily: 'monospace', color: 'white' }}>Contacts</Text>}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>Spam Contacts will appear here</Text>
            </View>
        </View>
    );
}

function ContactsTabNavigator(props) {

    const navigation = useNavigation();

    return (

        <ContactsTabDrawer.Navigator
            style={{ marginTop: 40 }}
            drawerContent={(props) => <CustomDrawerContentComponent {...props} navigation={navigation} />}
            screenOptions={{
                headerShown: false
            }}
        >
            <ContactsTabDrawer.Screen
                name='All'
                component={allContactsScreen}
            />
            <ContactsTabDrawer.Screen
                name='Spam'
                component={spamContactsScreen}
            />
        </ContactsTabDrawer.Navigator>

    );
}

export default ContactsTabNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#176bd1',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    },
    drawerScreenTitle: {
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 35,
        padding: 5,
        marginTop: 10,
        marginBottom: 10
    }
});