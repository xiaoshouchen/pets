import React, {Component} from 'react';
import {View, Text, Button, WebView, StyleSheet, ScrollView} from 'react-native';

class ArticleDetail extends Component {
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
                             source={{uri: "http://192.168.123.170/pets/index.php/api/article/"+params.id}}/> 
                    <Button title='评论' style={{height:50}} onPress={()=>{navigate('AddArticle')}}/> 
            </View>
        );
    }
}

const styles1 = StyleSheet.create({
   
})
export {ArticleDetail}