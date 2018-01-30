import React, {Component} from 'react';
import {
    Modal,
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';

class PairListScreen extends Component {

    render() {
        const {state, navigate} = this.props.navigation;
        return (
            <View>
               <Text>配对列表</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export {PairListScreen}