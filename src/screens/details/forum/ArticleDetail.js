import React, {Component} from 'react';
import {View, Text, Button, WebView, StyleSheet, ScrollView} from 'react-native';
import {GET_ARTICLES_BY_ID} from "../../../config/api";

class ArticleDetail extends Component {
    static navigationOptions= {
        tabBarLabel: "",
        title: '',
      }
    render() {
        const {params}=this.props.navigation.state;
        const {navigate}=this.props.navigation;
       // alert(params.id);
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                    <WebView style={{flex:1}}
                             source={{uri: GET_ARTICLES_BY_ID+params.id}}/>
                    <Button title='评论' style={{height:50}} onPress={()=>{navigate('AddArticle')}}/> 
            </View>
        );
    }
}

const styles1 = StyleSheet.create({
   
})
export {ArticleDetail}