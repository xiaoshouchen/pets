'use strict';
import React, {Component} from 'react';
import {
    AsyncStorage,
    Button, StyleSheet, View, TouchableOpacity, Image, Text, TextInput, Picker
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import App from '../../../utils/app.core';
import {CHANGE_PROFILE} from "../../../config/api";

class ChangeProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.navigation.state.params.item,
            content: '',
            userInfo: ''
        }
        this._changeInfo = this._changeInfo.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        title: '个人信息',
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#fb8c00'},
        headerRight: <TouchableOpacity onPress={() => {
            navigation.state.params.Change()
        }}>
            <Text style={styles.save}>保存</Text>
        </TouchableOpacity>
    })


    componentDidMount() {
        this.props.navigation.setParams({Change: this._changeInfo});
        let info = App.getUserInfo();
        info.then((data) => {
            this.setState({userInfo: data});
        });
    }

    _changeInfo() {
        let item = this.state.item;
        let info = this.state.userInfo;
        let form = new FormData;
        form.append('user_id', info.user_id);
        form.append('token', info.token);
        form.append('new_info', this.state.content);
        fetch(`${CHANGE_PROFILE}/${item}`, {
            method: 'POST',
            body: form
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson.code === 200) {
                this.props.navigation.state.params.refresh();
                this.props.navigation.goBack();
            }
            else {
                alert('更新信息失败，请重新操作');
            }
        }).catch((e) => alert(e));
    }


    render() {
        const {params} = this.props.navigation.state;
        let title, maxCount, tint = '新的信息', multiline = false;

        switch (this.state.item) {
            case 'name':
                title = '昵称';
                maxCount = 16;
                tint = '新的名字';
                break;
            case 'desc':
                title = '个性签名';
                maxCount = 100;
                tint = '介绍自己';
                multiline = true;
                break;
            case 'sex':
                title = '性别';
                break;
            case 'email':
                title = '邮箱';
                maxCount = 32;
                break;
            case 'relationship_state':
                title = '情感状态';
                break;
            default:
                title = '其他';
        }
        let input;
        switch (this.state.item) {
            case 'relationship_state':
                input = <Picker
                    style={styles.rightText}
                    selectedValue={this.state.content}
                    onValueChange={(lang) => this.setState({content: lang})}>
                    <Picker.Item label="单身" value="单身"/>
                    <Picker.Item label="已婚" value="已婚"/>
                    <Picker.Item label="恋爱中" value="恋爱中"/>
                </Picker>;
                break;
            case 'birthday':
                input = <DatePicker
                    style={{width: 200}}
                    date={this.state.content}
                    mode="date"
                    placeholder="选择您的生日"
                    format="YYYY-MM-DD"
                    confirmBtnText="确认"
                    cancelBtnText="取消"
                    androidMode="spinner"
                    showIcon={false}
                    customStyles={{
                        dateText: {},
                        dateInput: {
                            borderColor: 'white',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        },
                        btnTextConfirm: {
                            height: 20,
                            color: "#000"
                        },
                        btnTextCancel: {
                            height: 20,
                            color: "#b6b6b6"
                        },
                        dateTouchBody: {},
                        placeholderText: {}
                    }}
                    onDateChange={(date) => {
                        this.setState({content: date})
                    }}/>;
                break;
            default:
                input = <TextInput style={styles.rightText}
                                   maxLength={maxCount}
                                   multiline={multiline}
                                   underlineColorAndroid={'transparent'}
                                   placeholder={tint}
                                   onChangeText={(text) => {
                                       this.setState({content: {text}.text})
                                   }}
                                   value={this.state.content}/>;
        }
        return (
            <View>
                <View style={styles.textView}>
                    <Text style={styles.leftText}>{title}</Text>
                    <View style={styles.floatRight}>
                        {input}
                    </View>
                </View>

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
    avatarView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        justifyContent: 'space-between'
    },
    textView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        justifyContent: 'space-between'
    },
    floatRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 5
    },
    leftText: {
        marginLeft: 15,
        fontSize: 14,
    },
    rightText: {
        width: 260,
        textAlign: 'right',
        fontSize: 14
    },
    arrow: {
        height: 16,
        width: 16,
        marginLeft: 10
    },
    crack: {
        height: 1,
        backgroundColor: '#f6f6f6'
    },
    save: {
        color: 'white',
        marginRight: 20
    }
});

export {
    ChangeProfileScreen
}