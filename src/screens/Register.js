import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    AsyncStorage,
    Image,
    Dimensions
} from 'react-native';
import {Button} from 'react-native-elements';
import App from "../utils/app.core";
import {SEND_MESSAGE_CODE, REGISTER} from "../config/api";

class RegisterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            repassword: '',
            code: '',
            disableButton: true,
            count: 60,
            liked: true,
            usePhone: true,
            canSendMessage: false
        }
        this._sendMessageCode = this._sendMessageCode.bind(this);
        this._register = this._register.bind(this);
    }

    static navigationOptions = () => ({
        headerTitle: '注册捏捏宠',
        ...App.commonHeaderStyle
    })

    _sendMessageCode(phone) {
        fetch(SEND_MESSAGE_CODE + phone);
    }

    _register() {
        let formData = new FormData();
        formData.append('phone', this.state.phone);
        formData.append('password', this.state.password);
        formData.append('code', this.state.code);
        fetch(REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code === 200) {
                    let user_id = responseJson.user_id;
                    let token = responseJson.token;
                    let refresh_token = responseJson.refresh_token;
                    let login = `{"token":"${token}","user_id":${user_id},"refresh_token":"${refresh_token}"}`;

                    AsyncStorage.setItem("login", login)
                        .then(() => {
                            this.props.navigation.goBack('Profile');
                        }).catch((error) => alert('error'))
                }
                else {
                    Alert.alert(
                        '注册失败',
                        '请正确填写注册信息');
                }

            }).catch((error) => alert(error));
    }


    clickTimer() {
        if (this.state.liked) {
            this._sendMessageCode(this.state.phone);
            this.timer = setInterval(function () {
                let count = this.state.count;
                this.state.liked = false;
                count -= 1;
                if (count < 1) {
                    this.setState({
                        liked: true,
                    });
                    count = 60;
                    clearInterval(this.timer);
                }
                this.setState({
                    count: count
                });
            }.bind(this), 1000);
        }
    }


    render() {
        let text = this.state.liked ? '获取验证码' : this.state.count + '秒后重发';
        let waitButton = this.state.usePhone ? <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            marginLeft: 15,
            marginRight: 15
        }}>
            <TextInput
                underlineColorAndroid={'transparent'}
                style={styles.input}
                placeholder="手机验证码"
                secureTextEntry={true}
                maxLength={6}
                onChangeText={(text) => {
                    this.setState({code: {text}.text}, () => {
                        if (this.state.phone.length == 11 && this.state.password.length >= 6 && this.state.password == this.state.repassword && this.state.code.length == 6) {
                            this.setState({disableButton: false});
                        }
                        else {
                            this.setState({disableButton: true});
                        }
                    });
                }}
            />
            <Button
                disabled={!this.state.canSendMessage}
                title={text}
                onPress={() => {
                    this.clickTimer()
                }}
                buttonStyle={{backgroundColor: '#ff7816'}}
            />
        </View> : null;
        return (
            <View style={{alignItems: 'center'}}>
                <View style={{alignItems: 'center', marginTop: 80}}>
                    <Image source={require('../image/banner.png')}
                           style={{
                               width: Dimensions.get('window').width / 2,
                               height: Dimensions.get('window').width / 8,
                               justifyContent: 'center',
                               marginTop: -20, marginBottom: 30
                           }}/>
                    <View style={{
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 15,
                        marginRight: 15
                    }}>

                        <TextInput
                            underlineColorAndroid={'transparent'}
                            style={styles.input}
                            ref="form1"
                            textInputRef="textInputRef"
                            placeholder="请输入您的手机号"
                            keyboardType='numeric'
                            maxLength={11}
                            onChangeText={(text) => {
                                this.setState({phone: {text}.text}, () => {
                                    if (this.state.phone.length == 11) {
                                        this.setState({canSendMessage: true});
                                        if (this.state.password.length >= 6 && this.state.password == this.state.repassword && this.state.code.length == 6) {
                                            this.setState({disableButton: false});
                                        }
                                    }
                                    else {
                                        this.setState({disableButton: true, canSendMessage: false});
                                    }
                                })

                            }}
                        />
                    </View>
                    <View style={{
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 15,
                        marginRight: 15
                    }}>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            style={styles.input}
                            placeholder="请输入您的密码"
                            secureTextEntry={true}
                            maxLength={16}
                            onChangeText={(text) => {
                                this.setState({password: {text}.text}, () => {
                                    if (this.state.phone.length == 11 && this.state.password.length >= 6 && this.state.password == this.state.repassword && this.state.code.length == 6) {
                                        this.setState({disableButton: false});
                                    }
                                    else {
                                        this.setState({disableButton: true});
                                    }
                                });


                            }}
                        />
                    </View>
                    <View style={{
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 15,
                        marginRight: 15
                    }}>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            style={styles.input}
                            placeholder="请再次输入您的密码"
                            secureTextEntry={true}
                            maxLength={16}
                            onChangeText={(text) => {
                                this.setState({repassword: {text}.text}, () => {
                                    if (this.state.phone.length == 11 && this.state.password.length >= 6 && this.state.password == this.state.repassword && this.state.code.length == 6) {
                                        this.setState({disableButton: false});
                                    }
                                    else {
                                        this.setState({disableButton: true});
                                    }
                                });
                            }}
                        />
                    </View>
                    {waitButton}
                </View>
                <Button
                    disabled={this.state.disableButton}
                    onPress={() => {
                        this._register()
                    }}
                    title="注册"
                    buttonStyle={{
                        backgroundColor: '#ff7a17',
                        borderRadius: 10,
                        marginTop: 20,
                        width: 300,
                        marginBottom: 30
                    }}
                />
            </View>)
    }

}

const styles = StyleSheet.create({
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
    },
    labelContainerStyle: {
        marginTop: 8,
    },
    title: {
        width: 80
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: "white",
        borderRadius: 5
    }
});

export {RegisterScreen}