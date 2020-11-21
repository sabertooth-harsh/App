import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, PermissionsAndroid, Image, ScrollView } from 'react-native';
import { Header, Icon, Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import { ImportExport } from '@material-ui/icons';
import UserLocationComponent from '../components/UserLocationComponent';

function ContactsScreen(props) {
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(true);
    const [isAnimating, setIsAnimating] = useState(true);
    const [contacts, setContacts] = useState([]);

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [pic, setPic] = useState(null);


    useEffect(() => {
        const loadContacts = async () => {
            Contacts.getAll()
                .then((contacts) => {
                    contacts.sort((a, b) => {
                        if (a.givenName && b.givenName) {
                            if (a.givenName.toLowerCase() > b.givenName.toLowerCase())
                                return 1;
                            else if (a.givenName.toLowerCase() < b.givenName.toLowerCase())
                                return -1;
                            else
                                return 0;
                        }

                    });
                    setContacts(contacts);
                })
                .then(() => {
                    setIsLoading(false);

                });
        };

        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: 'Location',
                message: 'This app would like to access your location'
            }
            );
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: 'Contacts',
                message: 'This app would like to view your contacts.',
            }).then(() => {
                loadContacts();
            });
        } else {
            loadContacts();
        }

    }, []);

    const renderContact = ({ item }) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', height: 75, padding: 5, borderWidth: 1, borderColor: 'gray', margin: 5, backgroundColor: 'white' }}>
                <View style={{ flex: 4, padding: 4 }}>
                    <Text style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: 22 }}>{item.displayName}</Text>
                    {item.emailAddresses.length > 0 ? <View style={{ flex: 1, flexDirection: 'row', padding: 5, paddingLeft: 0 }}>
                        {item.phoneNumbers.length > 0 ? <Text style={{ opacity: 0.5, marginHorizontal: 10, fontSize: 15 }}>{item.phoneNumbers[0].number}</Text> : <></>}
                        <Text style={{ opacity: 0.5, marginHorizontal: 10, fontSize: 15 }}>{item.emailAddresses[0].email}</Text>
                    </View> : <View style={{ flex: 1, flexDirection: 'row', padding: 5, paddingLeft: 0 }}>
                            {item.phoneNumbers.length > 0 ? <Text style={{ opacity: 0.5, marginHorizontal: 10, fontSize: 15 }}>{item.phoneNumbers[0].number}</Text> : <></>}
                        </View>
                    }
                </View>
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                    {item.hasThumbnail ? <Image
                        style={{
                            borderRadius: 10,
                            height: 50,
                            width: 50
                        }}
                        source={{ uri: item.thumbnailPath }}
                    /> : <Icon containerStyle={{ alignSelf: 'center', alignContent: 'center' }} name='user' type='font-awesome' size={50} color='gray' />
                    }
                </View>
            </View >
        );
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#2dd1eb' }}>
            <Header
                leftComponent={<Icon name='menu' color='white' size={35} onPress={() => navigation.toggleDrawer()} />}
                centerComponent={<Text style={{ fontSize: 40, fontFamily: 'monospace', color: 'white' }}>Contacts</Text>}
            />
            <UserLocationComponent />
            {isLoading ? <ActivityIndicator
                animating={true}
                color='#2dd1eb'
                size='large'
            /> : <FlatList
                    data={contacts}
                    renderItem={renderContact}
                    keyExtractor={item => item.rawContactId}
                />
            }
        </View>
    );
}

export default ContactsScreen;