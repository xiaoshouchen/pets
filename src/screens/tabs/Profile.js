import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {
    StyleSheet, Text, View, ScrollView, Image, SectionList, TouchableOpacity, Slider, FlatList,
    ActivityIndicator, AsyncStorage
} from 'react-native';
import itemList from '../../config/ItemList'
import Icon from 'react-native-vector-icons/Feather';
import {Button} from "react-native-elements";
import {GET_PETS} from "../../config/api";
import Dimensions from 'Dimensions'


class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        AsyncStorage.setItem('xiaozhen', 'shuai');
        this.state = {
            info: {name: "您的昵称", desc: "您的简单介绍", score: 0, discount: 0, cart: 0},
            desc: '',
            login: {token: '', user_id: ''},
            ProfileIsLoading: true,
        }
        this._getData = this._getData.bind(this);
    }

    static navigationOptions = {
        tabBarLabel: "我的",
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#44a3ff'},
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
                size={30}
                type="MaterialIcons"
                color="white"
                style={{paddingRight: 5,}}
            />
    };

    componentWillMount() {
        AsyncStorage.getItem('login').then((result) => {
            //alert(result);
            if (result == null) {
                this.setState({login: {token: '', user_id: ''}})
            }
            else {
                this.setState({login: result}, function () {
                    let json = JSON.parse(this.state.login);
                    console.log(json)
                    this._getData(json.user_id);
                });
            }

        }).catch((e) => {
            alert(e);
        })
    }

    _getData(user_id) {
        if (user_id == '' || user_id == null) {
            user_id = this.state.login.user_id;
            //this._getData(user_id);
        }
        fetch(GET_PETS + '?user_id=' + user_id)
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(this.state.login);
                //alert(user_id + "测试返回来的json数据为" + responseJson);
                this.setState({
                    PetsDataSource: responseJson,
                }, function () {
                    // In this block you can do something with new state.
                    this.setState({
                        ProfileIsLoading: false
                    })
                    /*AsyncStorage.getItem('login').then((result) => {
                        this.setState({login: result})
                    });*/
                });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    componentDidMount() {
        //this._getData(this.state.login.user_id);

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
                    <Button title='请登陆' onPress={() => this.props.navigation.navigate('Login')}
                            buttonStyle={{
                                backgroundColor: '#44a3ff',
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
            <ScrollView style={styles.mainView}>
                <View style={styles.body}>
                    <View style={styles.top}>
                        <View style={styles.topLeft}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Personal')}>
                                <Image style={styles.image}
                                       source={{uri: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3803332007,2672307128&fm=58'}}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topRight}>
                            <View style={{justifyContent: 'space-around', marginLeft: 15}}>
                                <Text>{this.state.info.name}</Text>
                                <Text>{this.state.desc}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end', justifyContent: 'flex-start'}}>
                                <Button buttonStyle={{
                                    backgroundColor: '#44a3ff',
                                    borderRadius: 10,
                                    width: 60,
                                    height: 20
                                }} title={'签到'}/>
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
                                        onPress={() => this.props.navigation.navigate('AddPet', {item: item})}>
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Collection')}>
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
                                <Image source={require('../../image/shopingCart.png')}
                                       style={{width: 30, height: 30, marginBottom: 5}}/>
                                <Text>购物车</Text>
                            </View>
                            <View style={styles.blockItem}>
                                <Image source={require('../../image/shopingList.png')}
                                       style={{width: 30, height: 30, marginBottom: 5}}/>
                                <Text>订单</Text>
                            </View>
                            <View style={styles.blockItem}>
                                <Image source={require('../../image/goodsrestore.png')}
                                       style={{width: 30, height: 30, marginBottom: 5}}/>
                                <Text>收藏</Text>
                            </View>
                            <View style={styles.blockItem}>
                                <Image source={require('../../image/adress.png')}
                                       style={{width: 30, height: 30, marginBottom: 5}}/>
                                <Text>地址</Text>
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Setting')}>
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
        width: 90,
        height: 90,
        borderRadius: 45,
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