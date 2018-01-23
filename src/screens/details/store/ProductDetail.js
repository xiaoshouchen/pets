import React, {Component} from 'react';
import {
    View, Text, Button, WebView, StyleSheet, ScrollView, Image, TouchableOpacity
} from 'react-native';

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

    render() {
        const {params}=this.props.navigation.state;
        const {navigate}=this.props.navigation;
        return (
            <View>
                <Image source={{uri: params.item.img1}} style={styles.product_img}/>
                <View>
                    <Text >{params.item.title}</Text>
                    <Text >{params.item.describe}</Text>
                    <Text >￥{params.item.price}</Text>
                    <Text>{params.item.created_at}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.addToCar(params.item)}>
                        <Text>加入购物车</Text>
                    </TouchableOpacity>
                </View>
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
