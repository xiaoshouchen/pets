import React, {Component} from 'react';
import {
    View, Text, Button, WebView, StyleSheet, ScrollView, TextInput, TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {GET_ARTICLES_BY_ID, ADD_REPLY, FOLLOW} from "../../../config/api";
import Icon from 'react-native-vector-icons/EvilIcons';

class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            article_id: this.props.navigation.state.params.id,
            login: {user_id: '', token: ''}
        }
        this.follow = this.follow.bind(this);
    }

    isClick = false;
    static navigationOptions = {
        tabBarLabel: "",
        title: '文章详情',
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
            this.follow(this.state.login.user_id,message.followed_user_id);
        }

    }

    componentWillMount() {
        AsyncStorage.getItem('login').then((result) => {
            //alert(result);
            if (result == null) {
                this.setState({login: {token: '', user_id: ''}})
            }
            else {
                let json = JSON.parse(result);
                this.setState({login: {user_id: json.user_id, token: json.token}})
            }

        }).catch((e) => {
            alert('网络发生错误');
        })
    }

    reply() {
        if (this.isClick == false) {
            return;
        }
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
            }).catch((e) => alert(e));
    }

    follow(user_id,followed_user_id) {
        //alert(user_id);
        //alert(this.state.login.token);
        let token=this.state.login.token;
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
                         source={{uri: GET_ARTICLES_BY_ID + params.id}}
                         onMessage={this.onMessage.bind(this)}/>
                <View style={styles.comment}>
                    <TextInput style={styles.input} underlineColorAndroid='transparent'
                               onChangeText={(text) => {
                                   this.setState({content: {text}.text}, () => {
                                       this.isClick = true;
                                   })
                               }
                               }/>
                    <TouchableOpacity style={styles.btn} onPress={this.reply.bind(this)}>
                        <Text style={styles.txt}>发送</Text>
                    </TouchableOpacity>
                </View>
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