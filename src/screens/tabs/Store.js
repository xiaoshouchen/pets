import React, {Component} from 'react'
import {
    StyleSheet, FlatList, Text, View, ScrollView, RefreshControl,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Image, TouchableHighlight
} from 'react-native'
import {TabNavigator, StackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather';
import {GET_PRODUCTS} from "../../config/api";
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions';
import App from '../../utils/app.core';

class StoreScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isRefreshing: false
        }
        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {

        return fetch(GET_PRODUCTS)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    isRefreshing: false,
                    dataSource: responseJson
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
                    height: 1,
                    width: "100%",
                    backgroundColor: "#eeeeee",
                }}
            />
        );
    }

    GetFlatListItem(fruit_name) {

        Alert.alert(fruit_name);

    }


    static navigationOptions = ({navigation}) => ({
        tabBarLabel: "商城",
        ...App.commonHeaderStyle,
        headerRight: <Icon
            onPress={() => navigation.navigate('ShoppingCart')}
            name='shopping-cart'
            size={20}
            color='white'
            style={{marginRight: 15,}}
        />,
        headerTitle: '捏捏商城',
        tabBarIcon: ({tintColor, focused}) => (
            <Icon
                name='shopping-cart'
                size={30}
                color={tintColor}
            />
        ),
    })

    _onRefresh() {
        this.componentDidMount();
    }

    render() {
        const {navigate} = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        return (
            <View style={styles.MainContainer}>
                <ScrollView
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
                    <Swiper style={styles.wrapper} showsButtons={false}
                            width={Dimensions.get('window').width}
                            height={Dimensions.get('window').width / 21 * 9}>
                        <View style={styles.slide1}>
                            <Image source={require('../../image/storeiscoming.png')}
                                   style={{width: Dimensions.get('window').width,height:Dimensions.get('window').width / 21 * 9}}/>
                        </View>
                    </Swiper>
                    <View style={styles.item_list}>
                        <View style={styles.item}>
                            <Image source={require('../../image/lingshi.png')}
                                   style={{width: 30, height: 30, marginBottom: 5}}/>
                            <Text style={styles.itemText}>零食</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/goupen.png')}
                                   style={{width: 30, height: 30, marginBottom: 5}}/>
                            <Text style={styles.itemText}>主粮</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/xizao.png')}
                                   style={{width: 30, height: 30, marginBottom: 5}}/>
                            <Text style={styles.itemText}>卫生</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/yongpin.png')}
                                   style={{width: 30, height: 30, marginBottom: 5}}/>
                            <Text style={styles.itemText}>用品</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/wanju.png')}
                                   style={{width: 30, height: 30, marginBottom: 5}}/>
                            <Text style={styles.itemText}>玩具</Text>
                        </View>
                    </View>
                    <View style={{height: 2}}/>
                    <View style={styles.goods}>
                        <Text style={{marginTop: 10, marginHorizontal: 15, marginBottom: 5}}>为您推荐</Text>
                        <FlatList
                            data={this.state.dataSource}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={({item}) => (
                                <TouchableHighlight
                                    /*onPress={() => this.props.navigation.navigate('ProductDetail', {id: item.id})}*/>
                                    <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
                                        <Image source={{uri: item.img1}} style={styles.product_img}/>
                                        <View>
                                            <Text style={styles.product_title}>{item.title}</Text>
                                            <Text style={styles.product_describe}>{item.describe}</Text>
                                            <Text style={styles.product_price}>￥{item.price / 100}</Text>
                                            <Text>8人购买</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>)
                            }
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    item: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    itemText: {
        textAlign: 'center'
    },
    item_list: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    MainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    goods: {
        flex: 2,
        backgroundColor: 'white'
    },
    product_img: {
        width: 100,
        height: 100,
        margin: 10
    },
    product_price: {
        paddingTop: 6,
        fontSize: 18,
        color: 'red'
    },
    product_title: {
        paddingTop: 10,
        fontSize: 16,
        color: "black"
    },
    product_describe: {
        paddingTop: 6,
        fontSize: 12,
    },
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebaa19',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    text_small: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'normal',
    }

});

export {StoreScreen}