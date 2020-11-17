import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeTabDrawer = createDrawerNavigator();

const CustomDrawerContentComponent = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} {...props}>
                <View style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <View style={styles.drawerHeader}>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={styles.drawerHeaderText}>Home</Text>
                        </View>
                    </View>
                    <DrawerItemList {...props} />
                </View>
                <View style={{ marginTop: Dimensions.get('window').width }}>
                    <Button
                        buttonStyle={{
                            borderTopWidth: 1,
                            borderTopColor: 'black',
                            borderRadius: 20,
                            backgroundColor: 'white',
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
            </ScrollView>
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