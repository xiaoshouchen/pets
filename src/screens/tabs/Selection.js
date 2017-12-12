import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

class SelectionScreen extends Component{
  static navigationOptions={
    tabBarLabel: "精选",
    title: '文章精选',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name='list'
        size={30}
        type="MaterialIcons"
        color={tintColor}
      />
    ),
  };
  render(){
    return <Text onPress={
      ()=>{
        this.props.navigation.navigate('ArticleDetail',{name:'1'})
      }
    }>消息</Text>
  }
} 
export {SelectionScreen}