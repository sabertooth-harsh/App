import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import UserProfileComponent from '../components/UserProfileComponent';

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
            <UserProfileComponent user={props.user} />
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