import React, {Component} from 'react';
import {
    StyleSheet, Text, View, ScrollView, Image, RefreshControl, SectionList, TouchableOpacity, Slider, FlatList,
    ActivityIndicator, AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Button} from "react-native-elements";
import {GET_PETS, GET_PROFILE} from "../../config/api";
import Dimensions from 'Dimensions'

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {name: "", desc: "", score: 0, discount: 0, cart: 0, avatar_img: ''},
            desc: '',
            login: {token: '', user_id: ''},
            ProfileIsLoading: true,
            isRefreshing: false,
        }
        this._getPetData = this._getPetData.bind(this);
        this._getInfoData = this._getInfoData.bind(this);
        this.checkIsLogin = this.checkIsLogin.bind(this);
    }

    checkIsLogin() {
        this.componentDidMount();
    }

    static navigationOptions = {
        tabBarLabel: "我的",
        headerTitleStyle: {color: '#fff', fontSize: 18, fontWeight: 'normal'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#fb8c00'},
        title: '个人资料',
        tabBarIcon: ({tintColor, focused}) => (
            <Icon
                name='user'
                size={30}
                color={tintColor}
            />
        ),
        headerRight:
            <Icon
                name='bell'
                size={20}
                type="MaterialIcons"
                color="white"
                style={{paddingRight: 5,}}
            />
    };

    componentWillMount() {

    }

    callBack() {
        this.componentDidMount();
    }

    componentDidMount() {
        AsyncStorage.getItem('login').then((result) => {
            //alert(result);
            if (result == null) {
                this.setState({login: {token: '', user_id: '', isRefreshing: false,}})
            }
            else {
                this.setState({login: result, isRefreshing: false,}, function () {
                    let json = JSON.parse(this.state.login);
                    //console.log(json)
                    this._getPetData(json.user_id, json.token);
                });
            }

        }).catch((e) => {
            //alert(e);
        })
    }

    _getInfoData() {

    }

    _getPetData(user_id, token) {
        if (user_id == '' || user_id == null) {
            user_id = this.state.login.user_id;
            //this._getData(user_id);
        }
        fetch(GET_PETS + '?user_id=' + user_id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    PetsDataSource: responseJson,
                }, function () {
                    this.setState({
                        ProfileIsLoading: false
                    })
                });
            })
            .catch((error) => {
                console.error(error);
            });
        fetch(`${GET_PROFILE}?items=name,desc,points,sex,avatar_img&user_id=${user_id}&token=${token}`)
            .then((response) => {
                    return response.json();
                }
            ).then((responseJson) => {
            this.setState({
                info: {
                    name: responseJson.name,
                    desc: responseJson.desc,
                    score: 0,
                    discount: 0,
                    cart: 0,
                    avatar_img: responseJson.avatar_img
                }
            });
            //alert('fasdfasd');
        }).catch((error) => alert(error))

    }


    FlatListItemSeparator = () => {
        return (<View style={{backgroundColor: "#d9d7e8",}}/>);
    }

    ExtraUniqueKey(item, index) {
        return "index" + index + item;
    }

    render() {
        if (this.state.login.token == '') {
            return (
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingTop: Dimensions.get('window').height / 4
                }}>
                    <Image source={require('../../image/banner.png')}
                           style={{
                               width: Dimensions.get('window').width / 2,
                               height: Dimensions.get('window').width / 2,
                               justifyContent: 'center',
                           }}/>
                    <Button title='请登陆'
                            onPress={() => this.props.navigation.navigate('Login', {checkIsLogin: () => this.checkIsLogin()})}
                            buttonStyle={{
                                backgroundColor: '#4fc3f7',
                                borderRadius: 10,
                                width: Dimensions.get('window').width / 3 * 2,
                            }}/>
                </View>
            );
        }
        if (this.state.ProfileIsLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        return (
            <ScrollView style={styles.mainView}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={() => this.componentDidMount()}
                                tintColor="#ff0000"
                                title="加载新的数据中"
                                titleColor="#00ff00"
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#ffff00"
                            />}>
                < View style={styles.body}>
                    <View style={styles.top}>
                        <View style={styles.topLeft}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Personal')}>
                                <Image style={styles.image}
                                       source={{uri: this.state.info.avatar_img}}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topRight}>
                            <View style={{justifyContent: 'space-around', marginLeft: 15}}>
                                <View style={{flexDirection: 'row'}}><Text
                                    style={{fontWeight: 'bold'}}>{this.state.info.name}</Text><Text
                                    style={{
                                        backgroundColor: '#23bfee',
                                        opacity: 50,
                                        borderRadius: 10,
                                        marginLeft: 10,
                                        paddingHorizontal: 10,
                                        color: 'white'
                                    }}>LV
                                    1</Text></View>
                                <Text>简介： {this.state.info.desc}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{height: 12, backgroundColor: '#f5f5f9'}}/>
                    <View style={{
                        height: 60,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginLeft: 15,
                        marginRight: 15
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Score')}>
                            <View>
                                <Text style={{
                                    color: '#333',
                                    fontSize: 16,
                                    marginTop: 10,
                                    textAlign: 'center'
                                }}>{this.state.info.score}</Text>
                                <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>积分</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Score')}>
                            <View>
                                <Text style={{
                                    color: '#333',
                                    fontSize: 16,
                                    marginTop: 10,
                                    textAlign: 'center'
                                }}>{this.state.info.discount}</Text>
                                <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>优惠券</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ShoppingCart')}>
                            <View>
                                <Text style={{
                                    color: '#333',
                                    fontSize: 16,
                                    marginTop: 10,
                                    textAlign: 'center'
                                }}>{this.state.info.cart}</Text>
                                <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>购物车</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 10, backgroundColor: '#f5f5f9'}}/>
                    <View style={styles.petView}>
                        <View style={styles.littleTitle}>
                            <Text>
                                我的宠物
                            </Text>
                        </View>
                        <View style={{marginLeft: -15, marginRight: -15, height: 2, backgroundColor: '#f5f5f9'}}/>
                        <View style={{height: 60, marginLeft: 15}}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={this.state.PetsDataSource}
                                horizontal={true}
                                ItemSeparatorComponent={this.FlatListItemSeparator}
                                keyExtractor={this.ExtraUniqueKey}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('AddPet', {
                                            item: item,
                                            callBack: () => this.callBack()
                                        })}>
                                        <View style={styles.itemView}>
                                            <Image style={styles.avatar} source={{uri: item.avatar}}/>
                                            <View style={{justifyContent: 'space-around'}}>
                                                <Text style={{fontSize: 15}}>{item.name}</Text>
                                                <Text style={{
                                                    fontSize: 10,
                                                    marginRight: 20
                                                }}>{item.typename} {item.sex == 0 ? '母' : '公'} </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                    <View style={{height: 10, backgroundColor: '#f5f5f9'}}/>
                    <View style={styles.menuView}>
                        <View style={styles.littleTitle}>
                            <Text>
                                社区管理
                            </Text>
                        </View>
                        <View style={{height: 2, backgroundColor: '#f5f5f9'}}/>
                        <View style={styles.blockView}>
                            <View style={styles.blockItem}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Post')}>
                                    <Image source={require('../../image/article.png')}
                                           style={{width: 30, height: 30, marginBottom: 5}}/>
                                    <Text>文章</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.blockItem}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('CollectionArticles')}>
                                    <Image source={require('../../image/restore.png')}
                                           style={{width: 30, height: 30, marginBottom: 5}}/>
                                    <Text>收藏</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.blockItem}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('FollowPeople')}>
                                    <Image source={require('../../image/follow.png')}
                                           style={{width: 30, height: 30, marginBottom: 5}}/>
                                    <Text>关注</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.blockItem}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fan')}>
                                    <Image source={require('../../image/fans.png')}
                                           style={{width: 30, height: 30, marginBottom: 5}}/>
                                    <Text>粉丝</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{height: 10, backgroundColor: '#f5f5f9'}}/>
                    <View style={styles.menuView}>
                        <View style={styles.littleTitle}>
                            <Text>
                                商场管理
                            </Text>
                        </View>
                        <View style={{height: 2, backgroundColor: '#f5f5f9'}}/>
                        <View style={styles.blockView}>
                            <View style={styles.blockItem}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ShoppingCart')}>
                                    <Image source={require('../../image/shopingCart.png')}
                                           style={{width: 30, height: 30, marginBottom: 5}}/>
                                    <Text>购物车</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.blockItem}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderList')}>
                                    <Image source={require('../../image/shopingList.png')}
                                           style={{width: 30, height: 30, marginBottom: 5}}/>
                                    <Text>订单</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.blockItem}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('CollectionGoods')}>
                                    <Image source={require('../../image/goodsrestore.png')}
                                           style={{width: 30, height: 30, marginBottom: 5}}/>
                                    <Text>收藏</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.blockItem}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddressList')}>
                                    <Image source={require('../../image/adress.png')}
                                           style={{width: 30, height: 30, marginBottom: 5}}/>
                                    <Text>地址</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{height: 10, backgroundColor: '#f5f5f9'}}/>
                    <View style={styles.menuView}>
                        <View style={styles.littleTitle}>
                            <Text>
                                其他
                            </Text>
                        </View>
                        <View style={{height: 2, backgroundColor: '#f5f5f9'}}/>
                        <View style={styles.blockView}>
                            <View style={styles.blockItem}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Setting', {checkIsLogin: () => this.checkIsLogin()})}>
                                    <Image source={require('../../image/setting.png')}
                                           style={{width: 30, height: 30, marginBottom: 5}}/>
                                    <Text>设置</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

        )

    }
}

export {ProfileScreen}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white'
    },
    body: {},
    top: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    topLeft: {},
    topRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    petView: {},
    menuView: {},

    littleTitle: {
        height: 30,
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    blockView: {
        paddingTop: 5,
        height: 65,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    itemView: {
        flexDirection: 'row',
        marginLeft: 0,
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
    blockItem: {
        width: '25%',
        alignItems: 'center'
    }
});