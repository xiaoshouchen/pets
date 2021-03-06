import React, {Component} from 'react';
import {
    Button, StyleSheet, View, Text, TouchableOpacity, Image, Picker
} from 'react-native'
import ImagePicker from 'react-native-image-picker'

class PersonalInfoChangeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
        }
    }

    static navigationOptions = () => ({
        title: '修改',
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#44a3ff'},
    })

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 240,
            maxHeight: 240,
            storageOptions: {
                skipBackup: true
            },
            title: '选择一张照片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '手机相册选取',
            allowsEditing: true
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }


    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.avatar} source={this.state.avatarSource}/>
                        <Image style={styles.male}/>
                    </View>
                </TouchableOpacity>
                <View style={{height: 1, backgroundColor: '#f5f5f9'}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    avatar: {
        marginLeft: 15,
        marginTop: 15,
        height: 60,
        width: 60,
        borderRadius: 30,
        marginBottom: 15
    },
});

export {PersonalInfoChangeScreen}