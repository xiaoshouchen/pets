import React, { Component } from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TabNavigator, TabBarTop } from 'react-navigation'
import { ShowScreen } from './Home/Show'
import { ArticleScreen } from './Home/Article'
import App from '../../utils/app.core'


const HomeTabs = TabNavigator({
    Show: { screen: ShowScreen },
    Article: { screen: ArticleScreen },
},
    {
        tabBarOptions: {
            activeTintColor: '#374341',
            inactiveTintColor: '#859391',
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: 'white',
            },
        },
        tabBarComponent: TabBarTop,
        tabBarPosition: 'top',
        swipeEnabled: true,
        lazyLoad: false,
    })
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: '小宠乐园',
        headerTitleStyle: { color: '#fff' },
        headerBackTitle: null,
        headerStyle: { backgroundColor: '#ff8302' },
        headerRight:
            <Icon
                name='search'
                size={30}
                type="MaterialIcons"
                color="white"
                style={{paddingRight:5,}}
            />
        ,
        tabBarLabel: '主页',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
                name='home'
                size={30}
                type="MaterialIcons"
                color={tintColor}
            />
        ),
    })

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <HomeTabs navigation={this.props.navigation} />
            </View>
        );
    }
}
HomeScreen.router = HomeTabs.router;
const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: 'white',
    },
    item: {
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
    },
    avatar: {
        marginLeft: 5,
        marginTop: 5,
        marginRight: 15,
        height: 40,
        width: 40,
        borderRadius: 20,
        marginBottom: 5
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5
    },
    name: {
        marginTop: 8,
    },
    date: {
        marginTop: 4,
        fontSize: 10,
        color: '#a19fa9'
    },
    content: {
        marginLeft: 5,
        fontSize: 12,
        color: '#495863',
        marginBottom: 10
    }

});

export { HomeScreen }