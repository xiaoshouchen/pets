import React from 'react';
import { Image,Button } from 'react-native';
import { StackNavigator, TabNavigator,TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements';
import {HomeScreen} from '../screens/tabs/Home';
import {MessageScreen} from '../screens/tabs/Message';
import {ProfileScreen} from '../screens/tabs/Profile';
import {SelectionScreen} from '../screens/tabs/Selection';
import {StoreScreen} from '../screens/tabs/Store';
import {LoginScreen} from '../screens/Login';

const Tabs = TabNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: '小宠乐园',
        headerRight: <Button title="登陆"
          onPress={
            () => {
                navigation.navigate('Login')
  
            }
          } />,
        tabBarLabel: '主页',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name='home'
            size={30}
            type="MaterialIcons"
            color={tintColor}
          />
        ),
      }),
    },
    Selection:{
        screen: SelectionScreen,
        navigationOptions: {
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
          }
    },
    Message: {
      screen: MessageScreen,
      navigationOptions: {
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
    },
    Store: {
      screen: StoreScreen,
      navigationOptions: {
        tabBarLabel: "商城",
        title: '小宠商城', 
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name='shopping-cart'
            size={30}
            type="MaterialIcons"
            color={tintColor}
          />
        ),
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
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
    }
  },
    {
      tabBarComponent:TabBarBottom,
      tabBarPosition :'bottom',
    })
  
  const RootNavigator = StackNavigator({
    Main: {
      screen: Tabs
    },
    Login: {
      screen: LoginScreen,
      headerTitle: '登陆小宠乐园'
    },
  });
  
  export default RootNavigator;