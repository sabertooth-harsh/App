import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import UserProfileComponent from './UserProfileComponent';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

function UserLocationComponent(props) {

    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState('');

    const api_key = '4bbbadb711f34b7a84d4dc540202384f';

    const baseUrl = 'https://api.opencagedata.com/geocode/v1/json?q=';

    useEffect(() => {

        const getGeoLocation = async () => {

            Geolocation.getCurrentPosition(pos => {
                console.log(pos)

                let url = `${baseUrl}${pos.coords.latitude}+${pos.coords.longitude}&key=${api_key}`;

                axios.get(url)
                    .then((response) => response.data)
                    .then((data) => {
                        console.log('data: ', data.results[0].components);

                        const dataComp = data.results[0].components;

                        const type = dataComp._type;

                        setLocation(`${dataComp.state}, ${dataComp.country}`);
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
                    <Text style={{ fontSize: 30, fontFamily: 'courier' }}>{location}</Text>
                </View>
            }
        </View>
    );
}

export default UserLocationComponent;