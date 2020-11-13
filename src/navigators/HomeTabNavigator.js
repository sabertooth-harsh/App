import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeTabDrawer = createDrawerNavigator();

const CustomDrawerContentComponent = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView {...props}>
                <View style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <View style={styles.drawerHeader}>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={styles.drawerHeaderText}>Home</Text>
                        </View>
                    </View>
                    <DrawerItemList {...props} />
                </View>
            </ScrollView>
            <View style={{
                flex: 1,
                marginTop: 420,
                borderTopWidth: 1,
                borderRadius: 20
            }}>
                <Button
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
        </View>
    );
}

const walletScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1 }}>
            <Header
                leftComponent={<Icon name='menu' color='white' size={35} onPress={() => navigation.toggleDrawer()} />}
                centerComponent={<Text style={{ fontSize: 40, fontFamily: 'monospace', color: 'white' }}>Wallet</Text>}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>This is your wallet</Text>
            </View>
        </View>
    );
}
const passbookScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1 }}>
            <Header
                leftComponent={<Icon name='menu' color='white' size={35} onPress={() => navigation.toggleDrawer()} />}
                centerComponent={<Text style={{ fontSize: 40, fontFamily: 'monospace', color: 'white' }}>Passbook</Text>}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>This is your Passbook</Text>
            </View>
        </View>
    );
}

function HomeTabNavigator(props) {
    const navigation = useNavigation();

    /*const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            await AsyncStorage.getItem('users')
                .then((response) => {
                    const userArray = JSON.parse(response);
                    if (userArray !== null) {
                        const currentUser = userArray.find((user) => user.email === props);
                        currentUser === null ? console.log("User not present") : (currentUser) => {
                            setEmail(currentUser.email);
                            setName(currentUser.name);
                        };
                    }
                    else
                        console.log('No users present');
                })
                .catch((err) => console.log(err));
        }
    }, []);

    const navigation = useNavigation();

    console.log(props); */

    return (

        <HomeTabDrawer.Navigator
            style={{ marginTop: 40 }}
            drawerContent={(props) => <CustomDrawerContentComponent {...props} navigation={navigation} />}
            screenOptions={{
                headerShown: false
            }}
        >
            <HomeTabDrawer.Screen
                name='Wallet'
                component={walletScreen}
            />
            <HomeTabDrawer.Screen
                name='Passbook'
                component={passbookScreen}
            />
        </HomeTabDrawer.Navigator>

    );
}

export default HomeTabNavigator;

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