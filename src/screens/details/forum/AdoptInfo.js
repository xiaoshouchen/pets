import React, {Component} from 'react';
import {
    Modal,
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import App from '../../../utils/app.core';

class AdoptInfoScreen extends Component {

    static navigationOptions = {
        tabBarLabel: "萌宠",
        ...App.commonHeaderStyle,
    };
    render() {
        const {state, navigate} = this.props.navigation;
        return (
            <View>
                <Text>领养具体信息</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export {AdoptInfoScreen}