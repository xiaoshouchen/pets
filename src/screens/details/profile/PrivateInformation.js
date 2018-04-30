/*
* 个人信息的界面，显示每个用户的具体信息。
* 用户的头像
* 用户的名称和简介
* 用户的帖子、粉丝、关注、收藏
* */
import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Image
} from 'react-native';
import {Button} from "react-native-elements";
import {FOLLOW, GET_USER_PROFILE, USER_RECENT} from "../../../config/api";
import App from '../../../utils/app.core';
import Toast, {DURATION} from 'react-native-easy-toast'


class InformationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            followed_user_id: this.props.navigation.state.params.user_id,
            isLogin: false,
            login: {},
            recentData: [],
            isfollow: false,
        }
        this._getData = this._getData.bind(this);
        this._follow = this._follow.bind(this);
    }

    static navigationOptions = {
        ...App.commonHeaderStyle,
        headerTitle: '个人信息',
        headerBackTitle: null,
    }

    componentDidMount() {
        let followed_user_id = this.state.followed_user_id;
        let userInfo = App.getUserInfo();
        userInfo.then((data) => {
            if (data === false) {
                this._getData(followed_user_id);
            } else {
                this.setState({login: data, isLogin: true}, () => {
                    this._getData(followed_user_id, this.state.login.user_id, this.state.login.token);
                })
            }
        })
    }

    _getData(followed_user_id, user_id = 0, token = '') {
        fetch(`${GET_USER_PROFILE}?followed_user_id=${followed_user_id}&user_id=${user_id}&token=${token}`)
            .then((response) => response.json()).then((responseJson) => {
            //alert(responseJson.name);
            this.setState({dataSource: responseJson, isfollow: responseJson.isfollow})
        }).catch((e) => alert(e));
        fetch(`${USER_RECENT}?user_id=${followed_user_id}`)
            .then((response) => response.json())
            .then((json) => {
                if (json.code === 200) {
                    this.setState({recentData: json.data});
                }
            })
    }

    _follow() {
        if (this.state.isLogin === false) {
            this.refs.toast.show('暂未登陆，登陆后即可关注该用户');
            return false;
        } else {
            let token = this.state.login.token;
            let formData = new FormData();
            formData.append('user_id', this.state.login.user_id);
            formData.append('followed_user_id', this.state.followed_user_id);
            fetch(`${FOLLOW}?user_id=${this.state.login.user_id}&token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            }).then(
                (response) => response.json())
                .then((responseJson) => {
                    //alert(responseJson.code+"|"+responseJson.message);
                    this.setState({isfollow: !this.state.isfollow}, () => {
                        let msg = this.state.isfollow ? '关注成功' : '取消关注';
                        this.refs.toast.show(msg);
                    });
                }).catch((e) => alert(e));
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1}}>
                <View style={styles.top}>
                    <View style={styles.avatarBack}>
                        <Image style={styles.avatar} source={{uri: this.state.dataSource.avatar_img}}/>
                    </View>
                    <View style={styles.profile}>
                        <Text style={styles.name}>
                            {this.state.dataSource.name}
                        </Text>
                        <Text style={styles.desc}>
                            简介:{this.state.dataSource.desc}
                        </Text>
                    </View>
                    <View style={styles.smallButton}>
                        <Button
                            borderRadius={12}
                            buttonStyle={{marginTop: 20, width: 62, marginRight: 20, height: 30, paddingVertical: 2}}
                            textStyle={{color: 'white', fontSize: 12,}}
                            backgroundColor={"#ff7a17"}
                            title={this.state.isfollow ? '已关注' : '关注'}
                            onPress={() => this._follow()}/>
                    </View>
                </View>
                <View style={{height: 12, backgroundColor: '#f5f5f9'}}/>
                <View style={styles.horizontalList}>
                    <View style={styles.listItem}>
                        <Text style={{
                            color: '#333',
                            fontSize: 16,
                            marginTop: 10,
                            textAlign: 'center'
                        }}>{this.state.dataSource.article_count}</Text>
                        <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>帖子</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={{
                            color: '#333',
                            fontSize: 16,
                            marginTop: 10,
                            textAlign: 'center'
                        }}>{this.state.dataSource.fan_count}</Text>
                        <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>粉丝</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={{
                            color: '#333',
                            fontSize: 16,
                            marginTop: 10,
                            textAlign: 'center'
                        }}>{this.state.dataSource.follow_count}</Text>
                        <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>关注</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={{
                            color: '#333',
                            fontSize: 16,
                            marginTop: 10,
                            textAlign: 'center'
                        }}>{this.state.dataSource.restore_count}</Text>
                        <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>收藏</Text>
                    </View>
                </View>
                <View style={{height: 2, backgroundColor: '#f5f5f9'}}/>
                <View style={styles.littleTitle}>
                    <Text style={{color: 'black'}}>最近动态</Text>
                </View>
                <View style={{height: 2, backgroundColor: '#f5f5f9'}}/>
                <View style={{
                    backgroundColor: 'white',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 1
                }}>
                    <View><FlatList
                        data={this.state.recentData}
                        ItemSeparatorComponent={() => {
                            return <View style={{height: 10}}/>
                        }}
                        renderItem={({item, index}) => {
                            if (item.img === '' || item.img === undefined) {
                                return (
                                    <View>
                                        <TouchableOpacity style={{
                                            marginTop: 20,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            marginLeft: 10,
                                        }} onPress={() => navigate('ArticleDetail', {id: item.id})}>
                                            <Text
                                                numberOfLines={2}
                                                style={{
                                                    fontWeight: 'bold',
                                                }}>{item.title}</Text>
                                            <Text
                                                numberOfLines={1}
                                                style={{
                                                    fontSize: 10,
                                                    color: '#585858'
                                                }}>{item.created_at}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                            return (<View>
                                <TouchableOpacity style={styles.item}
                                                  onPress={() => {
                                                      navigate('ArticleDetail', {id: item.id})
                                                  }}>
                                    <Image style={{width: 120, height: 90, marginVertical: 5, marginLeft: 5}}
                                           source={{uri: item.img}}/>
                                    <View style={{paddingLeft: 10, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                marginTop: -10,
                                                fontWeight: 'bold',
                                                width: 200,
                                            }}>{item.title}</Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                marginTop: 20,
                                                width: 200,
                                                fontSize: 10,
                                                color: '#585858'
                                            }}>{item.created_at}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>)
                        }}
                        ListEmptyComponent={() => {
                            return <View style={{height: 40}}>
                                <Text>最近没有动态</Text>
                            </View>
                        }}/>
                    </View>
                </View>
                <Toast ref="toast"
                       position='bottom'
                       textStyle={{color: 'red'}}
                       style={{backgroundColor: 'white'}}/>

            </View>)
    }
}

const styles = StyleSheet.create({
    horizontalList: {
        flexDirection: 'row',
        minHeight: 80,
        justifyContent: 'space-between'
    },
    listItem: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    top: {
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    avatarBack: {
        flex: 1,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12
    },
    smallButton: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1
    },
    name: {
        fontSize: 16,
        marginTop: 10
    },
    desc: {
        fontSize: 14
    },
    profile: {
        flex: 2,
        marginLeft: 10,
        justifyContent: 'space-around'
    },
    function: {
        marginRight: 10,
        marginTop: 20,
        borderRadius: 10,
        width: 60,
        height: 20,
    },
    littleTitle: {
        height: 30,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'flex-start',
        paddingLeft: 20
    },
    item: {
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row'
    },
})
export {InformationScreen}