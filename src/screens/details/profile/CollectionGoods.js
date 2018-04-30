import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image
} from 'react-native';
import {Icon} from 'react-native-elements'
import App from "../../../utils/app.core";

class CollectionGoodsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = {
        tabBarLabel: "我的",
        ...App.commonHeaderStyle,
        title: '收藏',
    };

    render() {
        return (
            <View>
                <Text>收藏</Text>
            </View>
        )
    }
}

export {CollectionGoodsScreen}