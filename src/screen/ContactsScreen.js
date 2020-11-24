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

        loadContacts();

    }, []);

    const renderContact = ({ item }) => {
        return (
            <Card containerStyle={{ margin: 0 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 4, padding: 4 }}>
                        <Text style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: 22 }}>{item.displayName}</Text>
                        <Card.Divider />
                        {item.emailAddresses.length > 0 ? <View style={{ flex: 1, padding: 5, paddingLeft: 0 }}>
                            {item.phoneNumbers.length > 0 ? <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='phone' type='font-awesome' color='#2dd1eb' size={15} /><Text style={{ opacity: 0.5, marginHorizontal: 10, fontSize: 15 }}>{item.phoneNumbers[0].number}</Text>
                            </View> : <></>}
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='envelope' type='font-awesome' color='#2dd1eb' size={15} />
                                <Text style={{ opacity: 0.5, marginHorizontal: 10, fontSize: 15 }}>{item.emailAddresses[0].email}</Text>
                            </View>
                        </View> :
                            <View style={{ flex: 1, flexDirection: 'row', padding: 5, paddingLeft: 0 }}>
                                {item.phoneNumbers.length > 0 ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name='phone' type='font-awesome' color='#2dd1eb' size={15} /><Text style={{ opacity: 0.5, marginHorizontal: 10, fontSize: 15 }}>{item.phoneNumbers[0].number}</Text>
                                </View> : <></>}
                            </View>
                        }
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {item.hasThumbnail ? <Image
                            style={{
                                borderRadius: 10,
                                height: 60,
                                width: 60
                            }}
                            source={{ uri: item.thumbnailPath }}
                        /> : <Icon containerStyle={{}} name='user' type='font-awesome' size={50} color='gray' />
                        }
                    </View>
                </View >
            </Card>
        );
    }


    return (
        <View style={{ flex: 1 }}>
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