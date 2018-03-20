import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {TabNavigator, TabBarTop} from 'react-navigation'
import {ShowScreen} from './Home/Show'
import {ArticleScreen} from './Home/Article'
import {FollowScreen} from "./Home/Follow";
import {SearchModal} from "./Home/Search";
import {DiaryScreen} from "./Home/Diary";


const HomeTabs = TabNavigator({
        Show: {screen: ShowScreen},
        Article: {screen: ArticleScreen},
        Follow: {screen: FollowScreen},
        Diary: {screen: DiaryScreen}
    },
    {
        tabBarOptions: {
            activeTintColor: '#ffffff',
            inactiveTintColor: '#d3e4e2',
            labelStyle: {
                fontSize: 16,
                fontWeight: "normal"
            },
            style: {
                backgroundColor: '#4fc3f7',
            },
            indicatorStyle: {
                backgroundColor: '#ffffff',
            }
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
            isLoading: true,
            showSearch: false,
            modalVisible: false,
        }
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        /*title: '小宠乐园',
        headerTitleStyle: {color: '#fff',fontSize:18,fontWeight:'normal'},*/
        header: null,
        //headerBackTitle: null,
        //headerStyle: {backgroundColor: '#4fc3f7',height:46},
        headerRight:
            <Icon
                name='search'
                size={20}
                type="MaterialIcons"
                color="white"
                style={{paddingRight: 5, marginTop: 10}}
                onPress={() => navigation.state.params.setModalVisible(!navigation.state.params.modalVisible)}
            />
        ,
        tabBarLabel: '主页',
        tabBarIcon: ({tintColor, focused}) => (
            <Icon
                name='home'
                size={30}
                type="MaterialIcons"
                color={tintColor}
            />
        ),
    })

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
        this.props.navigation.setParams({
            modalVisible: !this.state.modalVisible
        });
    }

    componentDidMount() {
        this.props.navigation.setParams({
            setModalVisible: this.setModalVisible,
            modalVisible: this.state.modalVisible
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <SearchModal modalVisible={this.state.modalVisible}/>
                <HomeTabs navigation={this.props.navigation}/>
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

export {HomeScreen}