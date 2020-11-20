import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ImagePickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImageAvailable: false,
            profilePic: null
        }
    }

    componentDidMount = () => {
        this.getImage();
    }

    getImage = async () => {
        const profilePic = await AsyncStorage.getItem("profilePic");
        if (profilePic) {
            this.setState({
                isImageAvailable: true,
                profilePic: JSON.parse(profilePic)
            });
        }
    }

    selectProfilePic = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                AsyncStorage.setItem("profilePic", JSON.stringify(source));
                this.setState({
                    profilePic: source,
                    isImageAvailable: true
                });
            }
        });
    }

    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {
                    this.state.isImageAvailable && (
                        <Image source={this.state.profilePic} style={{ borderRadius: 30, width: 100, height: 100 }} />

                    )
                }

                {
                    !this.state.isImageAvailable && (
                        <TouchableOpacity>
                            <Icon
                                name='user'
                                type='font-awesome'
                                color='gray'
                                reverse
                                size={40}
                                containerStyle={{ alignSelf: 'center' }}
                            />
                            <Button
                                title='Upload Profile Pic'
                                buttonStyle={{ backgroundColor: '#2dd1eb' }}
                                titleStyle={{ fontFamily: 'monospace' }}
                                onPress={this.selectProfilePic}
                            />
                        </TouchableOpacity>
                    )
                }
            </View>
        )
    }
}