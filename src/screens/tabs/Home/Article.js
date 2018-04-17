import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image, AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {GET_ARTICLES, LIKE, RESTORE} from "../../../config/api";
import Dimensions from 'Dimensions'
import Toast, {DURATION} from 'react-native-easy-toast'

let pageNo = 1;//当前第几页
let totalPage = 5;//总的页数
let itemNo = 0;//item的个数
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
            login: "",
        }
        this._getData = this._getData.bind(this);
        this._like = this._like.bind(this);
        this._restore = this._restore.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        title: '文章',
    })

    componentDidMount() {
        AsyncStorage.getItem('login').then((result) => {
            //alert(result);
            if (result == null) {
                this.setState({login: {token: '', user_id: ''}})
                this._getData(1, 0);
            }
            else {
                let that = this;
                this.setState({login: result}, function () {
                    let json = JSON.parse(this.state.login);
                    //console.log(json)
                    that._getData(1, json.user_id);
                });
            }

        }).catch((e) => {
            //alert(e);
        })


    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#d9d7e8",
                }}
            />
        );
    }

    _like(user_id, article_id, index) {
        let data = this.state.dataSource;
        data[index].islike = !data[index].islike;
        this.setState({
            dataSource: data
        });
        let formData = new FormData();
        formData.append('article_id', article_id);
        formData.append('user_id', user_id);
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
        let data = this.state.dataSource;
        data[index].isrestore = !data[index].isrestore;
        this.setState({
            dataSource: data
        });
        let formData = new FormData();
        formData.append('article_id', article_id);
        formData.append('user_id', user_id);
        fetch(RESTORE, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((respone) => respone.json()).then((responeJson) => {
            //alert(responeJson.message);
            let message = data[index].isrestore ? "   收藏成功   " : "   取消收藏   ";
            this.refs.toast.show(message);
        }).catch((e) => alert(e));

    }

    _getData(_pageNo, user_id) {
        fetch(GET_ARTICLES + _pageNo + "&user_id=" + user_id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: _pageNo === 1 ? responseJson : this.state.dataSource.concat(responseJson)
                }, function () {
                    // In this block you can do something with new state.
                });
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
        if ((pageNo != 1) && (pageNo >= totalPage)) {
            return;
        } else {
            pageNo++;
        }
        //底部显示正在加载更多数据
        //this.setState({showFoot: 2});
        //获取数据
        this._getData(pageNo);
    }

    _onRefresh() {
        this.articles.refreshing = true;
        fetch(GET_ARTICLES + 1)
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(responseJson[0].id+"    "+this.state.dataSource[0].id);
                //alert();
                if (responseJson[0].id == this.state.dataSource[0].id) {
                    this.articles.refreshing = false;
                    return;
                } else {
                    this.articles.refreshing = false;
                    //alert(1111);
                    return this._getData(1);

                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const {navigate} = this.props.navigation;
        let title = (type, title) => {
            let type_name;
            switch (type) {
                case 4:
                    type_name = "【说说】";
                    return null;
                case 1:
                    type_name = "【分享】";
                    break;
                case 2:
                    type_name = "【提问】";
                    break;
                case 5:
                    type_name = "【精选】";
                    break;
                default:
                    type_name = "【分享】";
            }
            return <Text style={styles.title}>
                {type === undefined ? '【分享】' : type_name}{title}
            </Text>
        }
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                    <Text>文章加载中</Text>
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
                        let [ImgWidth, ImgHeight, MarginRight] = [windowWidth / 3, windowWidth / 3, 15];
                        if (item.img.length > 2) {
                            [ImgWidth, ImgHeight, MarginRight] = [windowWidth / 10 * 3, windowWidth / 10 * 3, windowWidth / 35];
                        }
                        for (let i = 0; i < 3 && i < item.img.length; i++) {
                            images.push(
                                <Image source={{uri: item.img[i]}}
                                       style={{width: ImgWidth, height: ImgHeight, marginRight: MarginRight}}/>
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
                                    <Text style={styles.content} numberOfLines={2}>{item.content}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        {images}
                                    </View>
                                </TouchableOpacity>

                                <View style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 40, marginTop: 8
                                }}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <TouchableOpacity onPress={() => this._like(27, item.id, index)}
                                                          style={{
                                                              flexDirection: 'row',
                                                              alignItems: 'center',
                                                              justifyContent: 'center',
                                                          }}>
                                            <Image source={img_like}
                                                   style={styles.smallIcon}
                                            />
                                            <Text>点赞</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: 1, backgroundColor: "#d9d7e8", height: 40}}/>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <TouchableOpacity onPress={() => this._restore(27, item.id, index)}
                                                          style={{
                                                              flexDirection: 'row',
                                                              justifyContent: 'center',
                                                              alignItems: 'center'
                                                          }}>
                                            <Image source={img_restore}
                                                   style={styles.smallIcon}
                                            />
                                            <Text>收藏</Text>
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
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 10
    },
    name: {
        marginTop: 8,
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
        marginRight: 20
    },


});

export {ArticleScreen}