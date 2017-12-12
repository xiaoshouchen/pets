import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { Icon} from 'react-native-elements'


class MessageScreen extends Component{
  constructor(props){
    super(props)
    this.state={
      html:props.editorHtml
    }
  }
  static navigationOptions= {
    tabBarLabel: "消息",
    title: '个人消息',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name='bell'
        size={20}
        type='font-awesome'
        color={tintColor}
      />
    ),
  }
  render()
  {
    const { navigate } = this.props.navigation;     
    return <View style={styles.container}>
    <Button title="提交" onPress={
      ()=>{
        alert(this.state.messagesReceivedFromWebView)
      }
    }/>
    </View>
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
export {MessageScreen}