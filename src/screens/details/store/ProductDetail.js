import React, {Component} from 'react';
import {
    View, Text, Button, WebView, StyleSheet, ScrollView, Image, TouchableOpacity
} from 'react-native';
import {GET_PRODUCT_DETAIL} from "../../../config/api";

class ProductDetailScreen extends Component {
    static navigationOptions= {
        tabBarLabel: "商品详情",
        title: '商品详情',
    }

    addToCar(Item) {
        let totalNum = this.state.totalNum;
        let car = this.state.car;
        let total = this.state.total;

        let exist = false;

        if (!exist) {
            car = car.concat(Object.assign({}, Item, {number:1}));
            totalNum += 1;
            this.setState({
                car,
                totalNum
            });
        }

        total = car.map(book => (book.price * book.number)).reduce((prev, cur) => prev + cur);
        this.setState({
            total
        });
    }
    onMessage(e) {
        let message = e.nativeEvent.data;
        this.props.navigation.navigate('ShoppingCart', {item: message});
    }
    render() {
        const {params}=this.props.navigation.state;
        const {navigate}=this.props.navigation;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <WebView style={{flex: 1}}
                         source={{uri: GET_PRODUCT_DETAIL + params.id}}
                         onMessage={this.onMessage.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    product_img: {
        width: 100,
        height: 100,
        margin: 10
    },
})

export {ProductDetailScreen}
