import React, {Component} from 'react';
import {View, Text, Button, WebView, StyleSheet, ScrollView} from 'react-native';
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
                <Button title='评论' style={{height: 50}} onPress={() => {
                    navigate('AddArticle')
                }}/>
            </View>
        );
    }
}

const styles1 = StyleSheet.create({})
export {ArticleDetail}