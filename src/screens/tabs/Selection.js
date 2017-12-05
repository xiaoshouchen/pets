import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const SelectionScreen = ({ navigation }) => (
  <Text onPress={
    ()=>{
      navigation.navigate('ArticleDetail',{name:'1'})
    }
  }>消息</Text>
)
export {SelectionScreen}