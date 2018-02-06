import React, {Component} from 'react';
import { StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image
} from 'react-native';
import {Icon} from 'react-native-elements'

class CollectionArticlesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = {
        tabBarLabel: "我的",
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#44a3ff'},
        title: '收藏',
    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View>
                <Text>收藏</Text>
            </View>
        )
    }
}
export {CollectionArticlesScreen}