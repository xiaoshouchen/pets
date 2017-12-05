import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const StoreScreen = ({ navigation }) => (
  <Text onPress={
    ()=>{
      navigation.navigate('ArticleDetail',{name:'1'})
    }
  }>消息</Text>
)
export  {StoreScreen}