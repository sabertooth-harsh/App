import React from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const CustomDrawerContentComponent = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} {...props}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, height: 200, backgroundColor: '#2dd1eb', justifyContent: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                            {props.user.image === null ? <Icon name='user-o' type='font-awesome' style={{}} color='#2dd1eb' reverse raised onPress={() => props.navigation.navigate('userProfile')} /> :
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('userProfile')}>
                                        <Image
                                            style={{ height: 100, width: 100, borderRadius: 20 }}
                                            source={{ uri: props.user.image }}

                                        />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                    <DrawerItemList {...props} />
                </View>
                <View style={{ marginTop: Dimensions.get('window').width }}>
                    <Button
                        buttonStyle={{
                            borderTopWidth: 1,
                            borderTopColor: 'black',
                            borderRadius: 20,
                            backgroundColor: 'white',
                        }}
                        title='Sign Out'
                        titleStyle={{
                            color: 'gray'
                        }}
                        onPress={async () => {
                            await AsyncStorage.removeItem('loggedUser')
                                .then(() => props.navigation.navigate('auth'))
                                .catch((err) => console.log(err));
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}