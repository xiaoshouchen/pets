import React, {Component} from 'react';
import {
    Modal,
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';

class AdoptInfoScreen extends Component {

    static navigationOptions = {
        tabBarLabel: "萌宠",
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#44a3ff'},
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