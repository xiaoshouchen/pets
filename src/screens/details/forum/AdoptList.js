import React, {Component} from 'react';
import {
    Modal,
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import {Button} from "react-native-elements";
import App from '../../../utils/app.core';

class AdoptListScreen extends Component {

    static navigationOptions = {
        tabBarLabel: "萌宠",
        ...App.commonHeaderStyle,
    };
    render() {
        const {state, navigate} = this.props.navigation;
        return (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <View>
                    <Text>领养列表</Text>
                </View>
                <View>
                    <Button buttonStyle={styles.buttonStyle} title={'发布领养'} onPress={() => navigate('Adopt')}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#44a3ff',
    }

})

export {AdoptListScreen}