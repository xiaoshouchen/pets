import React, {Component} from 'react';
import {View, Text, Button, WebView, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {GET_ARTICLES_BY_ID} from "../../../config/api";
import Icon from 'react-native-vector-icons/EvilIcons';

class ArticleDetail extends Component {
    static navigationOptions = {
        tabBarLabel: "",
        title: '',
        headerRight: (
            <View style={{flexDirection: 'row'}}>
                <Icon
                    name='star'
                    size={25}
                    style={{paddingRight: 25}}/>
                <Icon
                    name='share-apple'
                    size={25}
                    style={{paddingRight: 25}}/>
            </View>),
    }

    onMessage(e) {
        let message = e.nativeEvent.data;
        this.props.navigation.navigate('PrivateInformation', {item: message});
    }

    render() {
        const {params} = this.props.navigation.state;
        const {navigate} = this.props.navigation;
        // alert(params.id);
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <WebView style={{flex: 1}}
                         source={{uri: GET_ARTICLES_BY_ID + params.id}}
                         onMessage={this.onMessage.bind(this)}/>
                <View style={styles.comment}>
                    <TextInput style={styles.input} underlineColorAndroid='transparent'/>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.txt}>发送</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: 'white',
    },
    comment: {
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        backgroundColor: '#ffffff',

    },
    txt: {
        backgroundColor: '#4fc3f7',
        padding: 10,
        borderRadius: 5,

    }
})
export {ArticleDetail}