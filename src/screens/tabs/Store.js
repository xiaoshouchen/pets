import React, {Component} from 'react'
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Image
} from 'react-native'
import {TabNavigator, StackNavigator} from 'react-navigation'
import { Icon } from 'react-native-elements';
import {ArticleDetail} from '../details/forum/ArticleDetail'


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
        headerStyle: {backgroundColor: '#3fd132'},
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
                <View style={{flexDirection:'row',backgroundColor:'white',marginBottom:10}}>
                    <View style={{flex:1,margin:10}}>
                        <Image source={require('../../image/hot1.png')} style={{width:48,height:48,marginBottom:5}}/>
                        <Text>宠物零食</Text>
                    </View>
                    <View style={{flex:1,margin:10}}>
                        <Image source={require('../../image/hot2.png')} style={{width:48,height:48,marginBottom:5}}/>
                        <Text>宠物口粮</Text>
                    </View>
                    <View style={{flex:1,margin:10}}>
                        <Image source={require('../../image/hot3.png')} style={{width:48,height:48,marginBottom:5}}/>
                        <Text>宠物卫生</Text>
                    </View>
                    <View style={{flex:1,margin:10}}>
                        <Image source={require('../../image/hot4.png')} style={{width:48,height:48,marginBottom:5}}/>
                        <Text>宠物用品</Text>
                    </View>
                    <View style={{flex:1,margin:10}}>
                        <Image source={require('../../image/hot3.png')} style={{width:48,height:48,marginBottom:5}}/>
                        <Text>宠物零食</Text>
                    </View>

                </View>
                <Text>为您推荐</Text>
                <FlatList

                    data={this.state.dataSource}

                    ItemSeparatorComponent={this.FlatListItemSeparator}

                    renderItem={({item}) => (
                        <View style={{flexDirection: 'row',backgroundColor:'white'}}>
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

        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: '#f5f5f9',

    },
    item: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
    },

    FlatListItemStyle: {
        padding: 10,
        fontSize: 18,
        height: 44,
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