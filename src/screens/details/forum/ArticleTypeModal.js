import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    Text,
    View,
    TextInput, Modal
} from 'react-native';

import RichEditor from 'react-native-richeditor';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import TextField from '../../../components/TextField'
import Dimensions from 'Dimensions'

class ArticleTypeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '测试',
            html: '',
            type: '',//文章的类型
            modalVisible: true
        }
        this.post = this.post.bind(this);
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    post() {
        //alert('fsd');
        let formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('user_id', 1);
        formData.append('content', this.state.text);
        formData.append('category', 2);
        formData.append('tags', 'tags');
        formData.append('type', 1);
        formData.append('visit', 0);
        fetch('http://192.168.17.10/api/article/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.navigation.navigate('Home');
            });
    }

    componentDidMount() {
    }

    render() {
        return (
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.props.modalVisible == true ? this.state.modalVisible : !this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible)
                    }}
                    display={'flex'}
                >
                    <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
                        <View style={styles.container}>
                            <Text>输入您要分享的内容</Text>
                            <TextInput multiline={true}
                                       underlineColorAndroid={'transparent'}
                                       style={styles.longInput}
                                       placeholder ={''}
                                       value={this.state.text}
                                       onChangeText={(text) => this.setState({
                                           text: text
                                       })}/>
                            <KeyboardSpacer/>
                        </View>
                    </View>
                </Modal>
        );
    }
}

export {ArticleTypeModal};
let windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        height: 80
    },
});
