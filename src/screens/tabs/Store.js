import React, {Component} from 'react'
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Image
} from 'react-native'
import {TabNavigator, StackNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements';

class StoreScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {

        return fetch('http://123.207.217.225/api/products')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
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

    static navigationOptions = {
        tabBarLabel: "商城",
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#ff8302'},
        headerLeft: <Icon
            name='shopping-cart'
            size={30}
            type="MaterialIcons"
        />,
        title: '小宠商城',
        tabBarIcon: ({tintColor, focused}) => (
            <Icon
                name='shopping-cart'
                size={30}
                type="MaterialIcons"
                color={tintColor}
            />
        ),
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
                        <Text style={styles.itemText}>宠物零食</Text>
                    </View>
                </View>
                <View style={styles.goods}>
                    <Text style={{margin:10}}>为您推荐</Text>
                    <FlatList
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({item}) => (
                            <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
                                <Image source={{uri: item.img1}} style={styles.product_img}/>
                                <View>
                                    <Text style={styles.product_title}>{item.title}</Text>
                                    <Text style={styles.product_describe}>{item.describe}</Text>
                                    <Text style={styles.product_price}>￥{item.price}</Text>
                                    <Text>{item.created_at}</Text>
                                </View>
                            </View>)
                        }
                        keyExtractor={(item, index) => index}
                    />
                </View>


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
        flex: 1
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

});

export {StoreScreen}