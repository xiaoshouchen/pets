import React, {Component} from 'react'
import {
    StyleSheet, FlatList, Text, View, ScrollView, RefreshControl,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Image, TouchableHighlight
} from 'react-native'
import {TabNavigator, StackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather';
import {GET_PRODUCTS} from "../../config/api";
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions'

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
                    width: "80%",
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
        headerTitleStyle: {color: '#fff', fontSize: 18, fontWeight: 'normal'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#4fc3f7'},
        headerRight: <Icon
            onPress={() => navigation.navigate('ShoppingCart')}
            name='shopping-cart'
            size={20}
            color='white'
            style={{marginRight: 15,}}
        />,
        headerTitle: '小宠商城',
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
                    <Swiper style={styles.wrapper} showsButtons={false} height={Dimensions.get('window').width / 3}>
                        <View style={styles.slide1}>
                            <Image
                                source={{uri: "http://pic.90sjimg.com/design/00/60/20/09/07e07c138b19205e561a04611c3708f1.png"}}
                                style={{
                                    width: Dimensions.get('window').width,
                                    height: Dimensions.get('window').width / 3 + 50
                                }}/>
                        </View>
                        <View style={styles.slide2}>
                            <Text style={styles.text}>Beautiful</Text>
                        </View>
                        <View style={styles.slide3}>
                            <Text style={styles.text}>And simple</Text>
                        </View>
                    </Swiper>
                    <View style={styles.item_list}>
                        <View style={styles.itemLeft}>
                            <Image source={require('../../image/f-0.png')}
                                   style={{width: 48, height: 48, marginBottom: 5}}/>
                            <Text style={styles.itemText}>宠物零食</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/f-1.png')}
                                   style={{width: 48, height: 48, marginBottom: 5}}/>
                            <Text style={styles.itemText}>宠物口粮</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/f-2.png')}
                                   style={{width: 48, height: 48, marginBottom: 5}}/>
                            <Text style={styles.itemText}>宠物卫生</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/f-3.png')}
                                   style={{width: 48, height: 48, marginBottom: 5}}/>
                            <Text style={styles.itemText}>宠物用品</Text>
                        </View>
                        <View style={styles.itemRight}>
                            <Image source={require('../../image/f-4.png')}
                                   style={{width: 48, height: 48, marginBottom: 5}}/>
                            <Text style={styles.itemText}>宠物玩具</Text>
                        </View>

                    </View>
                    <View style={styles.goods}>
                        <Text style={{margin: 10}}>为您推荐</Text>
                        <FlatList
                            data={this.state.dataSource}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={({item}) => (
                                <TouchableHighlight
                                    onPress={() => this.props.navigation.navigate('ProductDetail', {id: item.id})}>
                                    <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
                                        <Image source={{uri: item.img1}} style={styles.product_img}/>
                                        <View>
                                            <Text style={styles.product_title}>{item.title}</Text>
                                            <Text style={styles.product_describe}>{item.describe}</Text>
                                            <Text style={styles.product_price}>￥{item.price / 100}</Text>
                                            <Text>{item.created_at}</Text>
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
        paddingLeft: 10
    },
    itemText: {
        textAlign: 'center'
    },
    itemLeft: {
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10
    },
    itemRight: {
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 10
    },
    item_list: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    MainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    goods: {
        flex: 2
    },
    product_img: {
        width: 100,
        height: 100,
        margin: 10
    },
    product_price: {
        paddingTop: 6,
        fontSize: 14,
        color: 'red'
    },
    product_title: {
        paddingTop: 10,
        fontSize: 14,
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
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }

});

export {StoreScreen}