import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation'
import App from '../../../utils/app.core'
import {GET_ARTICLES} from "../../../config/api";

let pageNo = 1;//当前第几页
let totalPage = 5;//总的页数
let itemNo = 0;//item的个数
class ArticleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            showFoot: 0
        }
    }

    static navigationOptions = ({navigation}) => ({
        title: '文章分享',
    })

    componentDidMount() {

        return fetch(GET_ARTICLES)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: this.state.dataSource.concat(responseJson)
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

    _onEndReached() {
        //如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot != 0) {
            return;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if ((pageNo != 1) && (pageNo >= totalPage)) {
            return;
        } else {
            pageNo++;
        }
        //底部显示正在加载更多数据
        //this.setState({showFoot: 2});
        //获取数据
        fetch(GET_ARTICLES + pageNo)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: this.state.dataSource.concat(responseJson)
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
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
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('PrivateInformation', {item: item})}>
                                    <Image source={{uri: item.avatar_img}} style={styles.avatar}/>
                                </TouchableOpacity>
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
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <TouchableOpacity>
                                    <Icon
                                        name='star'
                                        size={16}
                                        color='yellow'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>)

                    }
                    onEndReached={this._onEndReached.bind(this)}
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

export {ArticleScreen}