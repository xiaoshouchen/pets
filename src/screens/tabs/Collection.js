import React, {Component} from 'react';
import { StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image
} from 'react-native';
import {Icon} from 'react-native-elements'

class CollectionScreen extends Component {

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
        tabBarLabel: '帖子',
    }

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View>
                <Text>收藏</Text>
            </View>
        )
    }
}
export {CollectionScreen}