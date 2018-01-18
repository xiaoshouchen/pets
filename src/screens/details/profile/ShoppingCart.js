import React, {Component} from 'react';
import {Text, View} from 'react-native';

class ShoppingCartScreen extends Component {

    static navigationOptions = {
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: '个人资料',
        headerStyle: {backgroundColor: '#ff8302'},
        title: '购物车',
    }

    render(){
        return(
            <View>
                <Text>购物车</Text>
            </View>
        )
    }
}
export {ShoppingCartScreen}