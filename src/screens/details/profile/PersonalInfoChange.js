import React, {Component} from 'react';
import {
    Button, StyleSheet, View, Text, TouchableOpacity, Image, Picker
} from 'react-native'
import ImagePicker from 'react-native-image-picker'

class PersonalInfoChangeScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: {uri:'http://123.207.217.225/img/1/tx.jpg'}
        }
    }
    static navigationOptions = () => ({
        title: '修改',
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#ff8302'},
    })

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
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
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }


    render(){
        return(
            <View>
                <TouchableOpacity onPress = {this.selectPhotoTapped.bind(this)}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.avatar} source={this.state.avatarSource}/>
                        <Image style={styles.male} />
                    </View>
                </TouchableOpacity>
                <View style={{height: 1, backgroundColor: '#f5f5f9'}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    avatar:{
        marginLeft:15,
        marginTop:15,
        height:60,
        width:60,
        borderRadius:30,
        marginBottom:15
    },
});

export {PersonalInfoChangeScreen}