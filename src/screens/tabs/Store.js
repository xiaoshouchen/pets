import React, { Component } from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity,Image
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import{ArticleDetail}from '../details/forum/ArticleDetail'


class StoreScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {

        return fetch('http://www.xiaochongleyuan.com/api/products')
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
                    width: "100%",
                    backgroundColor: "white",
                }}
            />
        );
    }

    GetFlatListItem(fruit_name) {

        Alert.alert(fruit_name);

    }

    static navigationOptions = {
        title: 'Welcome',
      };
    render() {
        const { navigate } = this.props.navigation;        
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (

            <View style={styles.MainContainer}>

                <FlatList

                    data={this.state.dataSource}

                    ItemSeparatorComponent={this.FlatListItemSeparator}

                    renderItem={({ item }) => (
                        <View style={{flexDirection:'row'}}>
                            <Image source={{uri:item.img1}} style={styles.product_img}/>
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
        backgroundColor: 'white',
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
    product_img:{
      width:100,
      height:100,
      margin:10
    },
    product_price: {
      paddingTop: 6,
      fontSize: 16,
      color: 'red'
    },
    product_title: {
      paddingTop: 10,
      fontSize: 16,
      color:"black"
    },
    product_describe: {
      paddingTop: 6,
      fontSize: 14,
    },

});

export { StoreScreen }