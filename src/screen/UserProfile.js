import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

function UserProfile(props) {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <Header
                backgroundColor='#2dd1eb'
                leftComponent={<Icon name='arrow-left' type='font-awesome' size={20} color='white' onPress={() => navigation.goBack()} />}
                centerComponent={<Text style={{ fontSize: 30, fontFamily: 'monospace', color: 'white' }}>Profile</Text>}
            />
            <View style={{ height: 150, flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='user-o' type='font-awesome' reverse color='gray' size={50} />
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
                <View style={styles.dataView}>
                    <Text style={styles.label}>OTP</Text>
                    <Text style={styles.data}>{props.user.otp}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default connect(mapStateToProps)(UserProfile);

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