import React, {Component} from 'react';
import { StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image
} from 'react-native';
import {Icon} from 'react-native-elements'

class CollectionGoodsScreen extends Component {

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
        title: '收藏',
        tabBarLabel: '商品',
    }

    render(){
        return(
            <View>
                <Text>收藏</Text>
            </View>
        )
    }
}
export {CollectionGoodsScreen}