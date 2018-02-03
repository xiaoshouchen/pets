import React, {Component} from 'react';
import {
    Image,
    StyleSheet, TextInput, TouchableOpacity, View
} from 'react-native';
import ImagePicker from "react-native-image-picker";

class PairScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: require('../../../image/add.png'),
            imageArr: [],
            imageNum: 0
        }
    }

    selectPhotoTapped() {
        let count = this.state.imageNum;
        let imageArr = [];
        imageArr = this.state.imageArr;
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            },
            title: '选择一张照片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '手机相册选取',
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
                let source = {key: count,uri: response.uri} ;

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                imageArr.push(source)
                console.log(imageArr)

                this.setState({
                    imageArr: imageArr,
                    imageNum: count+1
                });

            }
        });
    }

    defaultView(){
        return(
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <Image style={styles.image} source={this.state.avatarSource}/>
            </TouchableOpacity>
        )
    }

    render() {
        const {state, navigate} = this.props.navigation;
        return (
            <View>
                <View style={styles.longInputView}>
                    <TextInput
                        multiline={true}
                        underlineColorAndroid={'transparent'}
                        style={styles.longInput}
                        placeholder ={'再来一些描述...'}
                        value={this.state.name}
                        onChangeText={(text) => this.setState({
                            description: text
                        })}
                    />
                </View>

                <View style={styles.imageView}>
                    {this.state.imageArr.map((i) => (
                        <TouchableOpacity>
                            <Image style={styles.image} source={{uri:i.uri}}/>
                        </TouchableOpacity>
                    ))}
                    {this.defaultView()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    longInputView: {
        marginLeft: 15,
        marginRight: 15,
        height: 100
    },
    imageView: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    image: {
        width: 80,
        height: 80,
    }
})

export {PairScreen}