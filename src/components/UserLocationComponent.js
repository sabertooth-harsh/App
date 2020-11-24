import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Platform, PermissionsAndroid } from 'react-native';
import UserProfileComponent from './UserProfileComponent';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

function UserLocationComponent(props) {

    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState('');

    const api_key = 't1WEtKDuZJnNqbGMbpFdyrUrng3p2MAw';

    const baseUrl = 'http://open.mapquestapi.com/geocoding/v1/reverse?key=';

    useEffect(() => {

        const getGeoLocation = async () => {

            Geolocation.getCurrentPosition(pos => {
                console.log(pos)

                let url = `${baseUrl}${api_key}&location=${pos.coords.latitude},${pos.coords.longitude}`;

                axios.get(url)
                    .then((response) => response.data)
                    .then((data) => {
                        console.log('data: ', data.results[0].locations[0]);

                        const loc = data.results[0].locations[0];

                        setLocation(`${loc.street} ${loc.adminArea6} ${loc.adminArea5} ${loc.adminArea3} ${loc.adminArea1} ${loc.postalCode}`);
                        console.log('location: ', location);
                        setLoading(false);
                    })
                    .catch(err => console.log(err));
            })
                .catch(err => console.log(err));
        }

        getGeoLocation();
    }, []);

    return (
        <View>
            {loading ? <View style={{ backgroundColor: 'white', padding: 10 }}>
                <ActivityIndicator
                    animating={true}
                    size='large'
                    color='blue'
                />
            </View> : <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
                    <Text style={{ textAlign: 'center', fontSize: 30, fontFamily: 'courier' }}>{location}</Text>
                </View>
            }
        </View>
    );
}

export default UserLocationComponent;