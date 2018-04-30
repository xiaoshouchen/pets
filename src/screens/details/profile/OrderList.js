import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image
} from 'react-native';
import {Icon} from 'react-native-elements'
import App from "../../../utils/app.core";

class OrderListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = {
        tabBarLabel: "我的",
        ...App.commonHeaderStyle,
        title: '订单',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>订单</Text>
            </View>
        )
    }
}

export {OrderListScreen}