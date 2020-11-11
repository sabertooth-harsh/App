import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

const HomeTabDrawer = createDrawerNavigator();

const CustomDrawerContentComponent = (props) => {
    return (
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
    );
}

const walletScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>This is your wallet</Text>
            <Icon name='trash' />
        </View>
    );
}
const passbookScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>This is your Passbook</Text>
            <Icon name='trash' />
        </View>
    );
}

function HomeTabNavigator(props) {

    const navigation = useNavigation();

    return (

        <HomeTabDrawer.Navigator
            style={{ marginTop: 40 }}
            drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
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