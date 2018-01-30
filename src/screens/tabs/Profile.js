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
import App from "../../utils/app.core"

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {name: "您的昵称", desc: "您的简单介绍", score: 0, discount: 0, cart: 0}
        }
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

    componentDidMount() {

        return fetch(GET_PETS + '?user_id=1')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentWillMount() {

    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    backgroundColor: "#d9d7e8",
                }}
            />
        );
    }

    render() {
        if (this.state.isLoading) {
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
                            <Image style={styles.image}
                                   source={{uri: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3803332007,2672307128&fm=58'}}></Image>
                        </View>
                        <View style={styles.topRight}>
                            <View style={{justifyContent: 'space-around', marginLeft: 15}}>
                                <Text>{this.state.info.name}</Text>
                                <Text>{this.state.info.desc}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end', justifyContent: 'flex-start'}}>
                                <Button buttonStyle={{
                                    backgroundColor: '#44a3ff',
                                    borderRadius: 10,
                                    width: 60,
                                    height: 20,
                                    fontSize: 10
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
                                data={this.state.dataSource}
                                horizontal={true}
                                ItemSeparatorComponent={this.FlatListItemSeparator}
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
                                                }}>{item.small_type_id} {item.sex == 0 ? '母' : '公'} </Text>
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
                                <Image source={require('../../image/article.png')}
                                       style={{width: 30, height: 30, marginBottom: 5}}/>
                                <Text>文章</Text>
                            </View>
                            <View style={styles.blockItem}>
                                <Image source={require('../../image/restore.png')}
                                       style={{width: 30, height: 30, marginBottom: 5}}/>
                                <Text>收藏</Text>
                            </View>
                            <View style={styles.blockItem}>
                                <Image source={require('../../image/follow.png')}
                                       style={{width: 30, height: 30, marginBottom: 5}}/>
                                <Text>关注</Text>
                            </View>
                            <View style={styles.blockItem}>
                                <Image source={require('../../image/fans.png')}
                                       style={{width: 30, height: 30, marginBottom: 5}}/>
                                <Text>粉丝</Text>
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
                                <Image source={require('../../image/setting.png')}
                                       style={{width: 30, height: 30, marginBottom: 5}}/>
                                <Text>设置</Text>
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