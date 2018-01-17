import React, {Component} from 'react';
import {Text, View} from 'react-native';

class BrowsingHistoryScreen extends Component {

    static navigationOptions = {
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: '个人资料',
        headerStyle: {backgroundColor: '#ff8302'},
        title: '浏览记录',
    }

    render(){
        return(
            <View>
                <Text>浏览记录</Text>
            </View>
        )
    }
}
export {BrowsingHistoryScreen}