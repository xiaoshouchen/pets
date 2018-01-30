import React, {Component} from 'react';
import {
    Modal,
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';

class PairInfoScreen extends Component {

    render() {
        const {state, navigate} = this.props.navigation;
        return (
            <View>
                <Text>配对具体信息</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export {PairInfoScreen}