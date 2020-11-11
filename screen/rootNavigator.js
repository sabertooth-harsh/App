import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import TabNavigator from './tabNavigator';
import TabNavigator2 from './tabNavigator2';

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


function RootNavigator(props) {
    return (
        <TabNavigator />
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