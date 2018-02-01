import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import App from "../utils/app.core";
import {FormLabel, Button} from "react-native-elements";
import {NavigationScreenProp as navigate} from "react-navigation";

class RegisterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            disableButton: true,
            count: 10,
            liked: true,
            flag: true
        }
    }

    static navigationOptions = () => ({
        title: '注册小宠乐园',
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#44a3ff'},
    })

    handleClick() {
        return alert(this.state.phone);
        let data = {
            phone: this.state.phone,
            password: this.state.password
        }
        fetch('', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (data) {
                console.log('request succeeded with JSON response', data)
            })
            .catch(function (error) {
                console.log('request failed', error)
            })
    };

    clickTimer() {
        if (this.state.liked) {
            this.timer = setInterval(function () {
                let count = this.state.count;
                this.state.liked = false;
                count -= 1;
                if (count < 1) {
                    this.setState({
                        liked: true
                    });

                    clearInterval(this.timer);
                }
                this.setState({
                    count: count
                });
            }.bind(this), 1000);
        }
    }

    emailRegister = () => {
        let text = this.state.liked ? '获取验证码' : this.state.count + '秒后重发';
        return (
            <View>
                <View style={{marginLeft: 10, alignItems: 'flex-start', marginTop: 80}}>
                    <View style={{height: 50, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.title}>邮箱：</Text>
                        <TextInput
                            ref="form1"
                            textInputRef="textInputRef"
                            placeholder="请输入您的邮箱"
                            keyboardType='numeric'
                            maxLength={11}
                            onChangeText={(text) => {
                                this.setState({phone: {text}.text});

                            }}
                        />
                    </View>
                    <View style={{height: 50, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.title}>密码：</Text>
                        <TextInput
                            ref="form2"
                            containerRef="containerRefYOYO"
                            textInputRef="textInputRef"
                            placeholder="请输入您的密码"
                            secureTextEntry={true}
                            maxLength={16}
                            onChangeText={(text) => {
                                this.setState({password: {text}.text});
                            }}
                        />
                    </View>
                    <View style={{height: 50, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.title}>确认密码：</Text>
                        <TextInput
                            ref="form2"
                            containerRef="containerRefYOYO"
                            textInputRef="textInputRef"
                            placeholder="请再次输入您的密码"
                            secureTextEntry={true}
                            maxLength={16}
                            onChangeText={(text) => {
                                this.setState({password: {text}.text});
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50}}>
                        <Text style={styles.title}>验证码：</Text>
                        <TextInput
                            ref="form2"
                            containerRef="containerRefYOYO"
                            textInputRef="textInputRef"
                            placeholder="请输入邮箱验证码"
                            secureTextEntry={true}
                            maxLength={16}
                            onChangeText={(text) => {
                                this.setState({email: {text}.text})
                            }}
                        />
                        <Button
                            title={text}
                            onPress={() => {
                                this.clickTimer()
                            }}
                        />
                    </View>
                </View>
                <Button

                    onPress={() => {
                        this.handleClick()
                    }}
                    title="注册"
                    buttonStyle={{backgroundColor: '#44a3ff', borderRadius: 10, marginTop: 20, width: 300}}
                />
                <TouchableOpacity onPress={() => {
                    this.setState({flag: !this.state.flag})
                    this.show()
                }
                }>
                    <Text style={{fontColor: 'blue'}}>使用手机注册</Text>
                </TouchableOpacity>
            </View>
        )
    }

    phoneNumberRegister = () => {
        let text = this.state.liked ? '获取验证码' : this.state.count + '秒后重发';
        return (
            <View>
                <View style={{marginLeft: 10, alignItems: 'flex-start', marginTop: 80}}>
                    <View style={{height: 50, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.title}>手机号：</Text>
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
                    </View>
                    <View style={{height: 50, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.title}>密码：</Text>
                        <TextInput
                            ref="form2"
                            containerRef="containerRefYOYO"
                            textInputRef="textInputRef"
                            placeholder="请输入您的密码"
                            secureTextEntry={true}
                            maxLength={16}
                            onChangeText={(text) => {
                                this.setState({password: {text}.text});
                                if (this.state.phone.length == 11 && this.state.password.length >= 6) {
                                    this.setState({disableButton: false});
                                }
                                else {
                                    this.setState({disableButton: true});
                                }

                            }}
                        />
                    </View>
                    <View style={{height: 50, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.title}>确认密码：</Text>
                        <TextInput
                            ref="form2"
                            containerRef="containerRefYOYO"
                            textInputRef="textInputRef"
                            placeholder="请再次输入您的密码"
                            secureTextEntry={true}
                            maxLength={16}
                            onChangeText={(text) => {
                                this.setState({password: {text}.text});
                                if (this.state.phone.length == 11 && this.state.password.length >= 6) {
                                    this.setState({disableButton: false});
                                }
                                else {
                                    this.setState({disableButton: true});
                                }

                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50}}>
                        <Text style={styles.title}>验证码：</Text>
                        <TextInput
                            ref="form2"
                            containerRef="containerRefYOYO"
                            textInputRef="textInputRef"
                            placeholder="请输入手机验证码"
                            secureTextEntry={true}
                            maxLength={16}
                            onChangeText={(text) => {
                                this.setState({password: {text}.text});
                                if (this.state.phone.length == 11 && this.state.password.length >= 6) {
                                    this.setState({disableButton: false});
                                }
                                else {
                                    this.setState({disableButton: true});
                                }

                            }}
                        />
                        <Button
                            title={text}
                            onPress={() => {
                                this.clickTimer()
                            }}
                        />
                    </View>
                </View>
                <Button

                    onPress={() => {
                        this.handleClick()
                    }}
                    title="注册"
                    buttonStyle={{backgroundColor: '#44a3ff', borderRadius: 10, marginTop: 20, width: 300}}
                />
                <TouchableOpacity onPress={() => {
                    this.setState({flag: !this.state.flag})
                    this.show()
                }
                }>
                    <Text style={{fontColor: 'blue'}}>使用邮箱注册</Text>
                </TouchableOpacity>
            </View>
        )
    }

    show() {
        let showFlag = this.state.flag ? this.phoneNumberRegister() : this.emailRegister()
        return showFlag
    }

    render() {
        return (
            <View style={{backgroundColor: "white", flex: 1, alignItems: 'center'}}>
                <View>{this.show()}</View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    headingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#00B233',
    },
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
    }
});

export {RegisterScreen}