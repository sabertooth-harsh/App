import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, Dimensions, BackHandler, Alert } from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { CustomDrawerContentComponent } from '../components/CustomDrawerContentComponent';

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const HomeTabDrawer = createDrawerNavigator();


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

    console.log('hometabnavigator props: ', props);

    const user = props.user;



    return (

        <HomeTabDrawer.Navigator
            style={{ marginTop: 40 }}
            drawerContent={(props) => <CustomDrawerContentComponent {...props} navigation={navigation} user={user} />}
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

export default connect(mapStateToProps)(HomeTabNavigator);