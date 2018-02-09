import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, AsyncStorage, Alert, Image, ImageBackground} from 'react-native';
import {Card, PricingCard, ListItem, Button, Tile, FormLabel, FormInput} from 'react-native-elements';
import App from '../utils/app.core'
import {LOGIN} from '../config/api'
import Dimensions from 'Dimensions'

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            disableButton: true
        }
        this._login = this._login.bind(this);

    }

    _login() {
        let formData = new FormData();
        //alert(LOGIN);
        formData.append('account', this.state.phone);
        formData.append('password', this.state.password);
        fetch(LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == 200) {
                    let user_id = responseJson.user_id;
                    let token = responseJson.token;
                    let refresh_token = responseJson.refresh_token;
                    let login = `{"token":"${token}","user_id":${user_id},"refresh_token":"${refresh_token}"}`;

                    AsyncStorage.setItem("login", login)
                        .then(() => {
                            this.props.navigation.state.params.checkIsLogin();
                            this.props.navigation.goBack(null)
                        }).catch((error) => alert('error'))
                }
                else {
                    Alert.alert(
                        '登陆失败',
                        '账号或密码错误，请重新登陆');
                }

            }).catch((error) => alert("网络加载错误"));
    }

    static navigationOptions = {
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#44a3ff'},
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ImageBackground source={require('../image/login_back.png')} style={styles.backgroundImage}>
                <View style={styles.backView}>

                <View>
                    <Image source={require('../image/banner.png')}
                           style={{
                               width: Dimensions.get('window').width / 3,
                               height: Dimensions.get('window').width / 3,
                               justifyContent: 'center',
                           }}/>
                </View>
                <View>
                    <TextInput
                        ref="form1"
                        textInputRef="textInputRef"
                        placeholder="手机号"
                        keyboardType='numeric'
                        underlineColorAndroid="transparent"
                        maxLength={11}
                        style={styles.loginView}
                        onChangeText={(text) => {
                            this.setState({phone: {text}.text});
                            if (this.state.phone.length == 11 && this.state.password.length > 6) {
                                this.setState({disableButton: false});
                            }
                            else {
                                this.setState({disableButton: true});
                            }
                        }}
                    />
                </View>
                <View>
                    <TextInput
                        ref="form2"
                        containerRef="containerRefYOYO"
                        textInputRef="textInputRef"
                        placeholder="密码"
                        secureTextEntry={true}
                        maxLength={16}
                        style={styles.loginView}
                        onChangeText={(text) => {
                            this.setState({password: {text}.text}, function () {
                                if (this.state.phone.length == 11 && this.state.password.length >= 6) {
                                    this.setState({disableButton: false});
                                }
                                else {
                                    this.setState({disableButton: true});
                                }
                            });


                        }}
                    />
                </View>
                <View>
                    <Button
                        disabled={this.state.disableButton}
                        onPress={() =>
                            this._login()
                        }
                        buttonStyle={{width: 300, borderRadius: 20, marginBottom: 10, backgroundColor: '#43A0F8'}}
                        title="登陆"
                    />

                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text>忘记密码？</Text><Text>|</Text><Text onPress={() => navigate('Register')}>立即注册</Text>
                </View>
            </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    loginView: {
        borderWidth: 1,
        marginLeft: 30,
        marginRight: 30,
        borderColor: 'rgba(0,0,0,0)',
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0)',
        width: 300,
        paddingLeft: 20,
        marginBottom: 20,
        color: 'white'
    },
    backgroundImage:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0)'
    }
});

export {LoginScreen};