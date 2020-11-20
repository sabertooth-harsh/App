import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import axios from 'axios';
import { add_random_user } from '../redux/actionCreators';
import UserProfileComponent from '../components/UserProfileComponent';

const mapStateToProps = (state) => {
    return {
        user: state.randomUser
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        add_random_user: (id, name, email, otp, phno, address, image) => dispatch(add_random_user(id, name, email, otp, phno, address, image))
    }
}

function UserProfile(props) {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        const apiUrl = 'https://randomuser.me/api/';

        fetchAPI = async () => {
            axios.get(apiUrl)
                .then((response) => response.data)
                .then((data) => {
                    const userData = data.results[0];

                    console.log('userData: ', userData);

                    const name = `${userData.name.title} ${userData.name.first} ${userData.name.last}`;
                    const email = userData.email;
                    const phno = userData.cell;
                    const address = `${userData.location.street.number} ${userData.location.street.name} ${userData.location.city} ${userData.location.state} ${userData.location.country}`
                    const picture = userData.picture.thumbnail;

                    props.add_random_user(props.user.id + 1, name, email, '1234', phno, address, picture);
                })
                .then(() => {
                    setLoading(false);
                    setAnimating(false);
                })
                .catch((err) => console.log(err));
        }

        fetchAPI();

    }, [setLoading, setAnimating]);

    return (
        <View style={{ flex: 1 }}>
            <Header
                backgroundColor='#2dd1eb'
                centerComponent={<Text style={{ fontSize: 30, fontFamily: 'monospace', color: 'white' }}>Profile</Text>}
            />
            {loading ? <View>
                <ActivityIndicator
                    animating={true}
                    color='#2dd1eb'
                    size='large'
                />
            </View> : <UserProfileComponent user={props.user} />}
        </View>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

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