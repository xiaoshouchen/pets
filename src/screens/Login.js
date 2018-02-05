import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, AsyncStorage} from 'react-native';
import {Card, PricingCard, ListItem, Button, Tile, FormLabel, FormInput} from 'react-native-elements';
import App from '../utils/app.core'
import {LOGIN} from '../config/api'

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
                    let token = `{"token":"123123","user_id":${user_id}}`;

                    AsyncStorage.setItem("login", token)
                        .then(() => this.props.navigation.navigate('Profile')).catch((error) => alert('error'))
                }

                this.props.navigation.navigate('Home');
            }).catch((error) => alert("网络加载错误"));
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{backgroundColor: "white", flex: 1}}>
                <FormLabel
                    textInputRef="textInputRef"
                    containerStyle={styles.labelContainerStyle}
                >
                    手机号
                </FormLabel>
                <TextInput
                    ref="form1"
                    textInputRef="textInputRef"
                    placeholder="请输入您的手机号"
                    keyboardType='numeric'
                    maxLength={11}
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
                <FormLabel containerStyle={styles.labelContainerStyle}>
                    密码
                </FormLabel>
                <TextInput
                    ref="form2"
                    containerRef="containerRefYOYO"
                    textInputRef="textInputRef"
                    placeholder="请输入您的密码"
                    secureTextEntry={true}
                    maxLength={16}
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

                <Button
                    disabled={this.state.disableButton}
                    onPress={() =>
                        this._login()
                    }
                    buttonStyle={{marginTop: 15}}
                    title="登陆"
                />

                <View style={{height: 40, backgroundColor: 'white'}}/>
                <Button title='注册' onPress={() => navigate('Register')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#05a7dc',
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
    },
    labelContainerStyle: {
        marginTop: 8,
    },
});

export {LoginScreen};