import React, {Component} from 'react';
import {Text, View} from 'react-native';

class ShoppingCartScreen extends Component {

    static navigationOptions = {
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#44a3ff'},
        title: '购物车',
    };

    render(){
        return(
            <View>
                <Text>购物车</Text>
            </View>
        )
    }
}
export {ShoppingCartScreen}