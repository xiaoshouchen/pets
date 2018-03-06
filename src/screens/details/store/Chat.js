import React, {Component} from 'react';
import {
    View, Text, Button, WebView, StyleSheet, ScrollView, Image, TouchableOpacity
} from 'react-native';
import {ADD_CART, GET_PRODUCT_DETAIL} from "../../../config/api";

class ChatScreen extends Component {
    static navigationOptions= {
        tabBarLabel: "商品详情",
        title: '商品详情',
    }
    onMessage(e) {
        let message = e.nativeEvent.data;
        let FUNC=JSON.parse(message);
        if(FUNC.function=='addCart'){
            //  alert(FUNC.id);
            let formData = new FormData();
            formData.append('user_id', 1);
            formData.append('product_id', FUNC.id);
            fetch(ADD_CART, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            }).then(
                (response) => response.json())
                .then((responseJson) => {
                    alert(responseJson.message);
                });
        }else if (FUNC.function=='restore'){
            let formData = new FormData();
            formData.append('user_id', 1);
            formData.append('product_id', FUNC.id);
            fetch(ADD_CART, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            }).then(
                (response) => response.json())
                .then((responseJson) => {
                    alert(responseJson.message);
                });
        }else if(FUNC.function=='cart'){
            this.props.navigation.navigate('ShoppingCart');
        }
    }
    render() {
        const {params}=this.props.navigation.state;
        const {navigate}=this.props.navigation;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <WebView style={{flex: 1}}
                         source={{uri: GET_PRODUCT_DETAIL + params.id}}
                         onMessage={this.onMessage.bind(this)}/>
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
})

export {ChatScreen}
