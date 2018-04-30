import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, TouchableOpacity, Image, ScrollView, RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dimensions from 'Dimensions'
import App from '../../../utils/app.core'
import {MY_FOLLOW_RECENT} from "../../../config/api";

class FollowScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isLogin: false,
            pageNo: 1,
            totalPage: 1,
            login: {},
            isRefreshing: false
        }
        this._getData = this._getData.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        title: '关注',
    })

    _onRefresh() {
        this.setState({isRefreshing: true});
        this.componentDidMount();
    }

    componentDidMount() {
        let userInfo = App.getUserInfo();
        userInfo.then((data) => {
            this.setState({isRefreshing: false});
            if (data === false) {
                //未登录
                this.setState({isLogin: false});
            } else {
                this.setState({login: data, isLogin: true}, () => {
                    this._getData(this.state.pageNo, this.state.login.user_id, this.state.login.token);
                });
            }
        })
    }

    _getData(pageNo, user_id, token) {
        fetch(`${MY_FOLLOW_RECENT}?user_id=${this.state.login.user_id}&token=${this.state.login.token}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
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

    render() {
        const {navigate} = this.props.navigation;
        if (this.state.isLogin === false) {
            return (<ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="white"
                        />
                    }>
                    <View style={styles.notLogin}>
                        <Text style={styles.notLoginText}>登陆之后即可以查看关注</Text>
                        <Text style={styles.notLoginText}>如已登陆，下拉刷新</Text>
                    </View>
                </ScrollView>
            );
        }
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        return (

            <View style={styles.MainContainer}>

                <FlatList

                    data={this.state.dataSource}

                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    keyExtractor={(item, index) => index}
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

                />


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
    },
    notLogin: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    notLoginText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#4c4c4c'
    }

});

export {FollowScreen}