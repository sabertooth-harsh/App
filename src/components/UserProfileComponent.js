import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function UserProfileComponent(props) {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 150, flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                {props.user.image === null || props.user.image === NaN ? <Icon name='user' reverse color='gray' type='font-awesome' size={50} /> : <Image
                    style={{ height: 100, width: 100, borderRadius: 20 }}
                    source={{ uri: props.user.image }}
                />}
            </View>
            <ScrollView style={{ padding: 20 }}>
                <View style={styles.dataView}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.data}>{props.user.name}</Text>
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.data}>{props.user.email}</Text>
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.label}>Phone No.</Text>
                    <Text style={styles.data}>{props.user.phno}</Text>
                </View>
                <View style={styles.dataView}>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.data}>{props.user.address}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default UserProfileComponent;
const styles = StyleSheet.create({
    label: {
        fontSize: 15
    },
    data: {
        marginTop: 5,
        fontSize: 25,
        fontFamily: 'courier',
        borderBottomWidth: 1,
    },
    dataView: {
        flex: 1,
        marginBottom: 30,
        padding: 10
    }
});