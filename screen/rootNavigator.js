import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import TabNavigator from './tabNavigator';

const MainNavigator = createDrawerNavigator();

const drawerScreen1 = ({ navigation }) => {
    return (
        <TabNavigator />
    );
}
const drawerScreen2 = ({ navigation }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{ fontSize: 20 }}>You are in Drawer Screen 2</Text>
        </View>
    );
}

const CustomDrawerContentComponent = (props) => {
    return (
        <ScrollView {...props}>
            <View style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.drawerHeader}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={styles.drawerHeaderText}>News App</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </View>
        </ScrollView>
    );
}

function RootNavigator() {
    return (
        <MainNavigator.Navigator
            drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
        >
            <MainNavigator.Screen
                name='drawerScreen1'
                key='drawer1'
                component={drawerScreen1}
                options={{
                    title: 'Drawer Screen 1'
                }}
            />
            <MainNavigator.Screen
                name='drawerScreen2'
                key='drawer2'
                component={drawerScreen2}
                options={{
                    title: 'Drawer Screen 2'
                }}
            />
        </MainNavigator.Navigator>
    );
}

export default RootNavigator;

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