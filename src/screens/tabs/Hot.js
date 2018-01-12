import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image
} from 'react-native';
import {Icon} from 'react-native-elements'
import {TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation'
import {ArticleDetail} from '../details/forum/ArticleDetail'
import App from '../../utils/app.core'

class HotScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = ({navigation}) => ({
        title: '小宠乐园',
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#ff8302'},
        headerLeft:
            <Icon
                name='search'
                size={30}
                type="MaterialIcons"
            />
        ,
        headerRight:
            <Button title={App.checkLogin() ? "发布" : "登陆"}
                    onPress={
                        () => {
                            if (App.checkLogin()) {
                                navigation.navigate('Message')
                            }
                            else {
                                navigation.navigate('Login')
                            }

                        }
                    }
            />,
        tabBarLabel: '热门',
        tabBarIcon: ({tintColor, focused}) => (
            <Icon
                name='home'
                size={30}
                type="MaterialIcons"
                color={tintColor}
            />
        ),
    })

    componentDidMount() {

        return fetch('http://123.207.217.225//api/article')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#d9d7e8",
                }}
            />
        );
    }

    GetFlatListItem(fruit_name) {

        Alert.alert(fruit_name);

    }

    render() {
        const {navigate} = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (

            <View style={styles.MainContainer}>

                <FlatList

                    data={this.state.dataSource}

                    ItemSeparatorComponent={this.FlatListItemSeparator}

                    renderItem={({item}) => (
                        <View style={styles.item}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Image source={{url: item.avatar_img}} style={styles.avatar}/>
                                <View>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.date}>{item.created_at}</Text>
                                </View>
                            </View>
                            <Text style={styles.title} onPress={
                                () => navigate('ArticleDetail', {id: item.id})
                            }>
                                {item.type == undefined ? '【分享】' : item.type}{item.title}
                            </Text>
                            <Text style={styles.content}>{item.content}</Text>
                        </View>)

                    }

                    keyExtractor={(item, index) => index}

                />


            </View>

        );
    }
}

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
        fontSize:10,
        color:'#a19fa9'
    },
    content: {
        marginLeft: 5,
        fontSize: 12,
        color: '#495863',
        marginBottom: 10
    }

});

export {HotScreen}