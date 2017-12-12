import React from 'react';
import { Image, Button } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { HomeScreen } from '../screens/tabs/Home';
import { MessageScreen } from '../screens/tabs/Message';
import { ProfileScreen } from '../screens/tabs/Profile';
import { SelectionScreen } from '../screens/tabs/Selection';
import { StoreScreen } from '../screens/tabs/Store';
import { LoginScreen } from '../screens/Login';
import { ArticleDetail } from '../screens/details/forum/ArticleDetail';
import { AddArticle } from '../screens/details/forum/AddArticle';
import  App  from '../utils/app.core'

const Tabs = TabNavigator({
  Home: {screen: HomeScreen,},
  Selection: {screen: SelectionScreen,},
  Message: {screen: MessageScreen,},
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
    
  }
},
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
  })

const RootNavigator = StackNavigator({
  Main: {
    screen: Tabs
  },
  Login: {
    screen: LoginScreen,
    headerTitle: '登陆小宠乐园'
  },
  ArticleDetail: {
    screen: ArticleDetail,
    headerTitle: "文章"
  },
  AddArticle: {
    screen: AddArticle,
    headerTitle: "文章"
  }
});

export default RootNavigator;