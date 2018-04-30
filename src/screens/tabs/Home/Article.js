import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image, AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {GET_ARTICLES, LIKE, RESTORE} from "../../../config/api";
import Dimensions from 'Dimensions'
import Toast, {DURATION} from 'react-native-easy-toast'
import App from '../../../utils/app.core';

class ArticleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            showFoot: 0,
            like_url: '../../../image/forum/like.png',
            liked_url: '../../../image/forum/liked.png',
            restore_url: '../../../image/forum/restore.png',
            restored_url: '../../../image/forum/restored.png',
            login: {},
            pageNo: 1,
            totalPage: 1,
            isLogin: false,
        }
        this._getData = this._getData.bind(this);
        this._like = this._like.bind(this);
        this._restore = this._restore.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        title: '精选',
    })

    componentDidMount() {
        let userInfo = App.getUserInfo();
        userInfo.then((data) => {
            if (data === false) {
                //TO DO
                this._getData(1, 0);
            } else {
                this.setState({
                    isLogin: true,
                    login: data
                }, () => {
                    this._getData(1, this.state.login.user_id, this.state.login.token);
                })
            }
        }).catch((e) => {

        })
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 10,
                    width: "100%",
                }}
            />
        );
    }

    _like(user_id, article_id, index) {
        if (this.state.isLogin === false) {
            this.refs.toast.show('请您登陆之后再操作');
            return false;
        }
        let data = this.state.dataSource;
        data[index].islike = !data[index].islike;
        this.setState({
            dataSource: data
        });
        let formData = new FormData();
        formData.append('article_id', article_id);
        formData.append('user_id', this.state.login.user_id);
        formData.append('token', this.state.login.token);
        fetch(LIKE, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((respone) => respone.json()).then((responeJson) => {
            //alert(responeJson.message);
            let message = data[index].islike ? "   点赞成功   " : "   取消点赞   ";
            this.refs.toast.show(message);
        })

    }

    _restore(user_id, article_id, index) {
        if (this.state.isLogin === false) {
            this.refs.toast.show('请您登陆之后再操作');
            return false;
        }
        let data = this.state.dataSource;
        data[index].isrestore = !data[index].isrestore;
        this.setState({
            dataSource: data
        });
        let formData = new FormData();
        formData.append('article_id', article_id);
        formData.append('user_id', this.state.login.user_id);
        formData.append('token', this.state.login.token);
        fetch(RESTORE, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((respone) => respone.json()).then((responeJson) => {
            let message = data[index].isrestore ? "   收藏成功   " : "   取消收藏   ";
            this.refs.toast.show(message);
        }).catch((e) => alert(e));

    }

    _getData(_pageNo, user_id, token = null) {
        fetch(`${GET_ARTICLES}${_pageNo}&user_id${user_id}&token=${token}&type_id=5`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code === 200) {
                    this.setState({
                        totalPage: responseJson.totalPageNo,
                        isLoading: false,
                        dataSource: _pageNo === 1 ? responseJson.data : this.state.dataSource.concat(responseJson.data)
                    }, function () {
                        // In this block you can do something with new state.
                    });
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    _onEndReached() {
        //如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot != 0) {
            return;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if ((this.state.pageNo != 1) && (this.pageNo >= this.state.totalPage)) {
            return;
        } else {
            this.setState({pageNo: this.state.pageNo + 1});
        }
        //底部显示正在加载更多数据
        //this.setState({showFoot: 2});
        //获取数据
        this._getData(this.state.pageNo);
    }

    _onRefresh() {
        this.articles.refreshing = true;
        fetch(`${GET_ARTICLES}1&user_id${this.state.login.user_id}&type_id=5`)
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(responseJson[0].id+"    "+this.state.dataSource[0].id);
                //alert();
                if (responseJson.data[0].id === this.state.dataSource[0].id) {
                    this.articles.refreshing = false;
                    return;
                } else {
                    this.articles.refreshing = false;
                    return this._getData(1, this.state.login.user_id);

                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const {navigate} = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20, alignItems: 'center'}}>
                    <ActivityIndicator/>
                    <Text style={styles.loading}>文章加载中</Text>
                </View>
            );
        }

        return (

            <View style={styles.MainContainer}>

                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({item, index}) => {
                        let images = [];
                        let windowWidth = Dimensions.get('window').width;
                        let [ImgWidth, ImgHeight, MarginRight] = [windowWidth / 3, windowWidth / 3, 35];
                        if (item.img.length > 2) {
                            [ImgWidth, ImgHeight, MarginRight] = [windowWidth / 10 * 3, windowWidth / 10 * 3, windowWidth / 60];
                        }
                        for (let i = 0; i < 3 && i < item.img.length; i++) {
                            images.push(
                                <Image source={{uri: item.img[i]}}
                                       style={{
                                           width: ImgWidth,
                                           height: ImgHeight,
                                           marginRight: MarginRight,
                                           borderRadius: 5
                                       }}/>
                            );
                        }
                        let img_like = this.state.dataSource[index].islike ? require('../../../image/forum/liked.png') : require('../../../image/forum/like.png');
                        let img_restore = this.state.dataSource[index].isrestore ? require('../../../image/forum/restored.png') : require('../../../image/forum/restore.png');
                        return (
                            <View style={styles.item}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('PrivateInformation', {user_id: item.user_id})}>
                                        <Image source={{uri: item.avatar_img}} style={styles.avatar}/>
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.date}>{item.created_at}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={
                                    () => navigate('ArticleDetail', {id: item.id})
                                }>
                                    <Text style={styles.title}>{item.title}</Text>
                                    {/*<Text style={styles.content} numberOfLines={2}>{item.content}</Text>*/}
                                    <View style={{flexDirection: 'row'}}>
                                        {images}
                                    </View>
                                </TouchableOpacity>

                                <View style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    height: 40, marginTop: 8
                                }}>
                                    <View style={styles.iconsView}>
                                        <TouchableOpacity
                                            onPress={() => this._like(this.state.login.user_id, item.id, index)}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                            <Image source={img_like}
                                                   style={styles.smallIcon}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.iconsView}>
                                        <TouchableOpacity
                                            onPress={() => this._restore(this.state.login.user_id, item.id, index)}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                            <Image source={img_restore}
                                                   style={styles.smallIcon}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>)
                    }

                    }
                    onEndReached={this._onEndReached.bind(this)}
                    onRefresh={this._onRefresh.bind(this)}
                    keyExtractor={(item, index) => index}
                    refreshing={false}
                    ref={(ref) => this.articles = ref}

                />

                <Toast ref="toast"
                       position='top'
                       textStyle={{color: 'red'}}
                       style={{backgroundColor: 'white'}}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: 'white',
    },
    item: {
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
    },
    avatar: {
        marginLeft: 5,
        marginTop: 5,
        marginRight: 15,
        height: 40,
        width: 40,
        borderRadius: 20,
        marginBottom: 5
    },
    title: {
        fontSize: 14,
        fontWeight: 'normal',
        marginVertical: 10,
        lineHeight: 20
    },
    name: {
        marginTop: 10,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    date: {
        marginTop: 4,
        fontSize: 10,
        color: '#a19fa9'
    },
    content: {
        marginLeft: 5,
        fontSize: 12,
        color: '#495863',
        marginBottom: 10,
        lineHeight: 18
    },
    smallIcon: {
        width: 25,
        height: 25,
        marginRight: 5
    },
    iconsView: {

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 15,
    }

});

export {ArticleScreen}