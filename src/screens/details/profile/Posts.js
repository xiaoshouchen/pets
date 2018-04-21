import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, Image, TouchableOpacity, RefreshControl
} from 'react-native';
import {MY_RECENT} from "../../../config/api";
import App from "../../../utils/app.core";

class PostScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
        }
    }

    static navigationOptions = {
        ...App.commonHeaderStyle,
        title: '我的动态',
    }

    componentDidMount() {
        let userInfo = App.getUserInfo();
        userInfo.then((data) => {
            fetch(`${MY_RECENT}?user_id=${data.user_id}&token=${data.token}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code === 200) {
                        this.setState({
                            isLoading: false,
                            dataSource: responseJson.data
                        }, function () {
                            // In this block you can do something with new state.
                            alert(this.state.dataSource);
                        });
                    }

                })
                .catch((error) => {
                    console.error(error);
                });
        })

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

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        return (
            <View style={{backgroundColor: 'white'}}>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Image style={styles.avatar} source={{uri: 'http://123.207.217.225/img/1/tx.jpg'}}/>
                    <Text style={styles.userName}>管理员</Text>
                    <Image style={styles.male}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', height: 80, justifyContent: 'space-around'}}>
                    <TouchableOpacity tyle={{flex: 1}} onPress={() => this.componentDidMount()}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <Text style={{color: '#333', fontSize: 16, marginTop: 10}}>发帖</Text>
                            <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>2</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{width: 1, height: 15, backgroundColor: '#f5f5f9'}}/>
                    <TouchableOpacity tyle={{flex: 1}} onPress={() => this.setState({dataSource: null})}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <Text style={{color: '#333', fontSize: 16, marginTop: 10}}>回复中</Text>
                            <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>2</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{width: 1, height: 15, backgroundColor: '#f5f5f9'}}/>
                    <TouchableOpacity tyle={{flex: 1}} onPress={() => this.setState({dataSource: null})}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <Text style={{color: '#333', fontSize: 16, marginTop: 10}}>收藏</Text>
                            <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>3</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{height: 1, backgroundColor: '#f5f5f9'}}/>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({item}) => (
                        <View style={styles.item}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View>
                                    <Text style={styles.name}>{item.title}</Text>
                                </View>
                            </View>
                            <Text style={styles.title}
                                  onPress={() => this.props.navigation.navigate('ArticleDetail', {id: item.id})}>
                            </Text>
                        </View>)

                    }

                    keyExtractor={(item, index) => index}

                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    userName: {
        fontSize: 15,
        color: '#333'
    },
    male: {
        marginLeft: 5,
        height: 15,
        width: 15
    },
})

export {PostScreen}