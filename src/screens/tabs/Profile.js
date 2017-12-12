import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Icon, Avatar } from 'react-native-elements'

const pic = {
  uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
};
class  ProfileScreen extends Component{
  static navigationOptions= {
    tabBarLabel: "我的",
    title: '个人资料',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name='person'
        size={30}
        type="MaterialIcons"
        color={tintColor}
      />
    ),
  }
  render(){
    return <ScrollView>
    <View style={styles.lineContainer}>
      <Avatar
        medium
        rounded
        containerStyle={styles.avatar}
        source={pic}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />
      <View>
        <Text style={styles.name}>小宠乐园用户</Text>
        <Text style={styles.desc}>
          做高质量的宠物社区，写最好的养宠指导。
    </Text>
      </View>
    </View>
    <View style={styles.lineContainer}>
      <View>
        <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
          <Icon name='shopping-cart' color='orange' />
          <Text style={styles.list}>购物车</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
          <Icon name='list' color='green' />
          <Text style={styles.list}>商品浏览记录</Text>
        </View>
      </View>
    </View>
    <View style={styles.lineContainer}>
      <View>
        <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
          <Icon name='folder' color='orange' />
          <Text style={styles.list}>我的帖子</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
          <Icon name='star' color='#EEC900' />
          <Text style={styles.list}>我的收藏</Text>
        </View>
      </View>
    </View>
    <View style={styles.lineContainer}>
      <View>
        <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
          <Icon name='lock' color='#00F5FF' />
          <Text style={styles.list}>个人安全</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
          <Icon name='settings' color='black' />
          <Text style={styles.list}>系统设置</Text>
        </View>
      </View>
    </View>
  </ScrollView>
  }
}
  
export { ProfileScreen }
const styles = StyleSheet.create({
  lineContainer: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "white"
  },
  avatar: {
    marginTop:5,
    marginBottom: 5,
    marginLeft: 10,

  },
  name: {
    paddingTop: 10,
    paddingLeft: 30,
    fontSize: 16
  },
  desc: {
    paddingTop: 10,
    paddingLeft: 30,
  },
  list: {
    paddingTop: 10,
    paddingLeft: 30,
  }
})