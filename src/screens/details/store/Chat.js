import React, {Component} from 'react';
import {
    View, Text, Button, WebView, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput
} from 'react-native';
import {ADD_CART, GET_PRODUCT_DETAIL} from "../../../config/api";

class ChatScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "与某某聊天中",
    }

    render() {
        const {params} = this.props.navigation.state;
        const {navigate} = this.props.navigation;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <View style={styles.bottom}>
                    <View><TextInput/></View>
                    <View><Button title={'发送'}/></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    product_img: {
        width: 100,
        height: 100,
        margin: 10
    },
    bottom: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
})

export {ChatScreen}
