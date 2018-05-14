'use strict';
import React, {Component} from 'react';
import {
    AsyncStorage,
    Button, StyleSheet, View, TouchableOpacity, Image, Text
} from 'react-native';
import App from '../../../utils/app.core';
import {GET_PROFILE, CHANGE_AVATAR} from "../../../config/api";
import ImagePicker from "react-native-image-picker";

class PersonalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: {uri: ''},
            name: '',
            desc: '',
            points: '',
            userInfo: ''
        };
        this._refresh = this._refresh.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        title: '个人信息',
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#fb8c00'},
        headerRight: null
    })

    _refresh() {
        this.componentDidMount();
    }

    componentDidMount() {
        let info = App.getUserInfo();
        info.then((data) => {
            this.setState({userInfo: data}, () => {
                this._getInfo(data.user_id, data.token);
            });
        });
    }

    _getInfo(user_id, token) {
        fetch(`${GET_PROFILE}?items=name,desc,points,sex,avatar_img,relationship_state,birthday&user_id=${user_id}&token=${token}`)
            .then((response) => response.json()).then((data) => {
            this.setState({
                name: data.name,
                desc: data.desc,
                points: data.points,
                avatar: {uri: data.avatar_img},
                relationship_state: data.relationship_state,
                birthday: data.birthday
            });
        })
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 240,
            maxHeight: 240,
            storageOptions: {
                skipBackup: true
            },
            title: '选择一张照片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '手机相册选取',
            allowsEditing: true
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
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatar: source
                }, () => {
                    let formdata = new FormData();
                    let file = {uri: this.state.avatar.uri, type: 'multipart/form-data', name: 'tx.jpg'};
                    formdata.append('avatar', file);
                    fetch(`${CHANGE_AVATAR}?user_id=${this.state.userInfo.user_id}&token=${this.state.userInfo.token}`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                        body: formdata,
                    }).catch((e) => alert(e));
                });

            }
        });
    }

    render() {
        const {params} = this.props.navigation.state;
        const {navigate} = this.props.navigation;
        return (
            <View>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View style={styles.avatarView}>
                        <Text style={styles.leftText}>头像</Text>
                        <View style={styles.floatRight}>
                            <Image style={styles.avatar} source={this.state.avatar}/>
                            <Image style={styles.arrow}
                                   source={require('../../../image/right-arrow.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.crack}/>
                <TouchableOpacity
                    onPress={() => navigate('ChangeProfile', {item: 'name', refresh: () => this._refresh()})}>
                    <View style={styles.textView}>
                        <Text style={styles.leftText}>昵称</Text>
                        <View style={styles.floatRight}>
                            <Text style={styles.rightText} numberOfLines={1}>{this.state.name}</Text>
                            <Image style={styles.arrow}
                                   source={require('../../../image/right-arrow.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.crack}/>
                <TouchableOpacity
                    onPress={() => navigate('ChangeProfile', {item: 'desc', refresh: () => this._refresh()})}>
                    <View style={styles.textView}>
                        <Text style={styles.leftText} numberOfLines={1}>个人简介</Text>
                        <View style={styles.floatRight}>
                            <Text style={styles.rightText} numberOfLines={1}>{this.state.desc}</Text>
                            <Image style={styles.arrow}
                                   source={require('../../../image/right-arrow.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.crack}/>

                <TouchableOpacity
                    onPress={() => navigate('ChangeProfile', {item: 'email', refresh: () => this._refresh()})}>
                    <View style={styles.textView}>
                        <Text style={styles.leftText}>邮箱绑定</Text>
                        <View style={styles.floatRight}>
                            <Text style={styles.rightText} numberOfLines={1}>邮箱绑定</Text>
                            <Image style={styles.arrow}
                                   source={require('../../../image/right-arrow.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.crack}/>

                <TouchableOpacity>
                    <View style={styles.textView}>
                        <Text style={styles.leftText}>等级</Text>
                        <View style={styles.floatRight}>
                            <Text style={styles.rightText}
                                  numberOfLines={1}>LV{parseInt(this.state.points / 100)}</Text>
                            <Image style={styles.arrow}
                                   source={require('../../../image/right-arrow.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.crack}/>

                <TouchableOpacity
                    onPress={() => navigate('ChangeProfile', {item: 'birthday', refresh: () => this._refresh()})}>
                    <View style={styles.textView}>
                        <Text style={styles.leftText}>生日</Text>
                        <View style={styles.floatRight}>
                            <Text style={styles.rightText}>{this.state.birthday}</Text>
                            <Image style={styles.arrow}
                                   source={require('../../../image/right-arrow.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.crack}/>

                <TouchableOpacity>
                    <View style={styles.textView}>
                        <Text style={styles.leftText}>城市</Text>
                        <View style={styles.floatRight}>
                            <Text style={styles.rightText}>城市</Text>
                            <Image style={styles.arrow}
                                   source={require('../../../image/right-arrow.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.crack}/>

                <TouchableOpacity onPress={() => navigate('ChangeProfile', {
                    item: 'relationship_state',
                    refresh: () => this._refresh()
                })}>
                    <View style={styles.textView}>
                        <Text style={styles.leftText}>感情状态</Text>
                        <View style={styles.floatRight}>
                            <Text style={styles.rightText}>{this.state.relationship_state}</Text>
                            <Image style={styles.arrow}
                                   source={require('../../../image/right-arrow.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>
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
        height: 50,
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
        color: "#8a8a8a",
    },
    arrow: {
        height: 16,
        width: 16,
        marginLeft: 10
    },
    crack: {
        height: 1,
        backgroundColor: '#f6f6f6'
    }
});

export {PersonalScreen}