import React, {Component} from 'react';
import {
    Modal,
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import {Button} from "react-native-elements";

class PairListScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "萌宠",
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#44a3ff'},
    };
    render() {
        const {state, navigate} = this.props.navigation;
        return (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <View>
                    <Text>配对列表</Text>
                </View>
                <View>
                    <Button buttonStyle={styles.buttonStyle} title={'发布配对'} onPress={() => navigate('PairItem')}/>
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

export {PairListScreen}