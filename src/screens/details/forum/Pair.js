import React, {Component} from 'react';
import {
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';

class PairScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const {state, navigate} = this.props.navigation;
        return (
            <View>
                <Text>发布</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export {PairScreen}