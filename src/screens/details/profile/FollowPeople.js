import React, {Component} from 'react';
import { StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image
} from 'react-native';
import {Icon} from 'react-native-elements'

class FollowPeopleScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }
    static navigationOptions = {
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: '个人资料',
        headerStyle: {backgroundColor: '#44a3ff'},
        title: '关注',
    }
    render(){
        const {navigate} = this.props.navigation;
        return(
            <View>
                <Text>关注</Text>
            </View>
        )
    }
}
export {FollowPeopleScreen}