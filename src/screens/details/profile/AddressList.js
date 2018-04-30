import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image
} from 'react-native';
import {Icon} from 'react-native-elements'
import App from "../../../utils/app.core";

class AddressListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = {
        tabBarLabel: "我的",
        ...App.commonHeaderStyle,
        title: '地址',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>地址</Text>
            </View>
        )
    }
}

export {AddressListScreen}