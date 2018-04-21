import React, {Component} from 'react';
import {
    View, Text, Button, WebView, StyleSheet, ScrollView, TextInput, TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {GET_ARTICLES_BY_ID, ADD_REPLY, FOLLOW} from "../../../config/api";
import Icon from 'react-native-vector-icons/EvilIcons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Toast, {DURATION} from 'react-native-easy-toast'
import App from '../../../utils/app.core';

class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            article_id: this.props.navigation.state.params.id,
            login: {user_id: '', token: ''},
            editable: false,
        }
        this.follow = this.follow.bind(this);
        this.postMessage = this.postMessage.bind(this);
    }

    isClick = false;
    static navigationOptions = {
        tabBarLabel: "文章详情",
        ...App.commonHeaderStyle,
        headerRight: (
            <View style={{flexDirection: 'row'}}>
                <Icon
                    name='star'
                    size={25}
                    style={{paddingRight: 25}}/>
                <Icon
                    name='share-apple'
                    size={25}
                    style={{paddingRight: 25}}/>
            </View>),
    }

    onMessage(e) {
        let message = JSON.parse(e.nativeEvent.data);
        if (message.function == 'profile') {
            this.props.navigation.navigate('PrivateInformation', {user_id: message.user_id});
        } else if (message.function == 'follow') {
            //alert(message.followed_user_id);
            this.follow(this.state.login.user_id, message.followed_user_id);
        }

    }

    componentWillMount() {
        AsyncStorage.getItem('login').then((result) => {
            //alert(result);
            if (result == null) {
                this.setState({login: {token: '', user_id: ''}})
            }
            else {
                try {
                    let json = JSON.parse(result);
                    this.setState({login: {user_id: json.user_id, token: json.token}, editable: true})
                } catch (e) {
                    console.log(e);
                }

            }

        }).catch((e) => {
            alert('网络发生错误');
        })
    }

    reply() {
        if (this.isClick === false) {
            return;
        }
        this.setState({content: ""});
        this.isClick = false;
        let formData = new FormData();
        formData.append('user_id', this.state.login.user_id);
        formData.append('article_id', this.state.article_id);
        formData.append('content', this.state.content);
        fetch(ADD_REPLY, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then(
            (response) => response.json())
            .then((responseJson) => {
                //alert(responseJson.code);
                this.refs.toast.show('留言成功');
                this.postMessage('reload');
                this.isClick = true;
            }).catch((e) => alert(e));
    }

    follow(user_id, followed_user_id) {
        //alert(user_id);
        //alert(this.state.login.token);
        let token = this.state.login.token;
        let formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('followed_user_id', followed_user_id);
        fetch(`${FOLLOW}?user_id=${user_id}&token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then(
            (response) => response.json())
            .then((responseJson) => {
                //alert(responseJson.code+"|"+responseJson.message);
            }).catch((e) => alert(e));
    }


    postMessage(str) {
        if (this.webview) {
            this.webview.postMessage(str);
        }
    }

    render() {
        const {params} = this.props.navigation.state;
        const {navigate} = this.props.navigation;

        // alert(params.id);
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <WebView style={{flex: 1}}
                         ref={webview => {
                             this.webview = webview;
                         }}
                         source={{uri: GET_ARTICLES_BY_ID + params.id + "?user_id=" + this.state.login.user_id + "&token=" + this.state.login.token}}
                         onMessage={this.onMessage.bind(this)}/>
                <View style={styles.comment}>
                    <TextInput style={styles.input}
                               underlineColorAndroid='transparent'
                               onChangeText={(text) => {
                                   this.setState({content: {text}.text}, () => {
                                       if (this.state.content.length > 1) {
                                           this.isClick = true;
                                       } else {
                                           this.isClick = false;
                                       }
                                   })
                               }}
                               value={this.state.content}
                               editable={this.state.editable}
                               placeholder={this.state.editable ? '' : '登陆后可回复'}
                    />
                    <TouchableOpacity style={styles.btn} onPress={this.reply.bind(this)}>
                        <Text style={styles.txt}>发送</Text>
                    </TouchableOpacity>
                </View>
                <KeyboardSpacer/>
                <Toast ref="toast"/>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({
        btn: {
            backgroundColor: '#4fc3f7',
            padding: 10,
            borderRadius: 5,
            justifyContent: 'center',
        },
        comment: {
            flexDirection: 'row'
        },
        input: {
            flex: 1,
            backgroundColor: '#ffffff',
            borderWidth: 2,
            borderColor: '#eee',
            padding: 0
            //borderRadius: 10

        },
        txt: {
            color: 'white'
        }
    })
export {ArticleDetail}