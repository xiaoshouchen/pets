import React, {Component} from 'react';
import {StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Image
} from 'react-native';

class ScoreScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = {
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: '个人资料',
        headerStyle: {backgroundColor: '#ff8302'},
        title: '积分',
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

    render(){
        return(
            <View style={styles.MainContainer}>
                <View  style={styles.description}>
                    <Text style={{fontSize:30}}>100</Text>
                    <Text>分</Text>
                    <Text style={styles.descriptionText}>积分说明</Text>
                </View>
                <View style={styles.goods}>
                    <Text style={{margin:10}}>兑换物品</Text>
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
        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    description:{
        backgroundColor:'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    descriptionText:{
        fontSize: 10,
        color: '#912CEE',
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
})

export {ScoreScreen}