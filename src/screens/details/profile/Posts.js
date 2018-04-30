import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, Image, TouchableOpacity, RefreshControl
} from 'react-native';
import {GET_PROFILE, MY_RECENT, GET_MY_DIARY} from "../../../config/api";
import App from "../../../utils/app.core";

class PostScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            profile: {},
            currentIndex: 'recent',
        }
    }

    static navigationOptions = {
        ...App.commonHeaderStyle,
        title: '我的动态',
    }

    //三个状态
    //获取我的动态，state为1，且type_id为1的文章
    //获取我的日记
    //获取我回复过的文章
    componentDidMount() {
        let userInfo = App.getUserInfo();
        userInfo.then((data) => {
            if (data !== false) {
                fetch(`${GET_PROFILE}?items=avatar_img,name&user_id=${data.user_id}&token=${data.token}`)
                    .then((response) => response.json()).then((responseJson) => {
                    this.setState({profile: responseJson})
                }).catch((e) => alert(e));
                let url;
                switch (this.state.currentIndex) {
                    case 'recent':
                        url = `${MY_RECENT}?user_id=${data.user_id}&token=${data.token}&type_id=1`;
                        break;
                    case 'diary':
                        url = `${MY_RECENT}?user_id=${data.user_id}&token=${data.token}&type_id=3`;
                        break;
                    default:
                        url = `${MY_RECENT}?user_id=${data.user_id}&token=${data.token}&type_id=2`;
                }
                fetch(url)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson.code === 200) {
                            this.setState({
                                isLoading: false,
                                dataSource: responseJson.data
                            }, function () {
                                // In this block you can do something with new state.
                            });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }

        })

    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: '#eee'
                }}
            />
        );
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
            <View style={{backgroundColor: 'white', flex: 1}}>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Image style={styles.avatar} source={{uri: this.state.profile.avatar_img}}/>
                    <Text style={styles.userName}>{this.state.profile.name}</Text>
                    <Image style={styles.male}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', height: 70, justifyContent: 'space-around'}}>
                    <TouchableOpacity tyle={{flex: 1}} onPress={() => this.setState({currentIndex: 'recent'}, () => {
                        this.componentDidMount();
                    })}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <Text style={{color: '#333', fontSize: 16, marginTop: 10}}>分享</Text>
                            <Text style={{
                                color: '#999',
                                fontSize: 14,
                                marginTop: 10,
                                marginBottom: 15
                            }}>{this.state.profile.articleCount}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity tyle={{flex: 1}} onPress={() => this.setState({currentIndex: 'diary'}, () => {
                        this.componentDidMount()
                    })}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <Text style={{color: '#333', fontSize: 16, marginTop: 10}}>日记</Text>
                            <Text style={{
                                color: '#999',
                                fontSize: 14,
                                marginTop: 10,
                                marginBottom: 15
                            }}>{this.state.profile.diaryCount}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity tyle={{flex: 1}} onPress={() => this.setState({currentIndex: 'question'}, () => {
                        this.componentDidMount()
                    })}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <Text style={{color: '#333', fontSize: 16, marginTop: 10}}>提问</Text>
                            <Text style={{
                                color: '#999',
                                fontSize: 14,
                                marginTop: 10,
                                marginBottom: 15
                            }}>{this.state.profile.questionCount}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{height: 8, backgroundColor: '#EEE'}}/>
                <FlatList
                    data={this.state.dataSource}
                    ListEmptyComponent={() => {
                        return <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 50
                        }}>
                            <Text>您没有任何动态</Text>
                        </View>
                    }}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({item}) => {
                        if (item.img === '' || item.img === undefined) {
                            return (
                                <View style={styles.onlyText}>
                                    <TouchableOpacity style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        marginLeft: 10,
                                    }} onPress={() => navigate('ArticleDetail', {id: item.id})}>
                                        <Text
                                            numberOfLines={3}
                                            style={{
                                                fontWeight: 'bold',
                                            }}>{item.title}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        return (<View>
                            <TouchableOpacity style={styles.item}
                                              onPress={() => {
                                                  navigate('ArticleDetail', {id: item.id})
                                              }}>
                                <Image style={styles.image}
                                       source={{uri: item.img}}/>
                                <View style={{
                                    paddingLeft: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text
                                        numberOfLines={2}
                                        style={{
                                            marginTop: -10,
                                            width: 200,
                                            lineHeight: 26
                                        }}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>)

                    }}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

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
        fontSize: 14,
        fontWeight: 'normal',
        marginBottom: 5,
        width: 200,
        lineHeight: 24,
        marginLeft: 20
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
    image: {
        height: 90,
        width: 120,
        borderRadius: 8,
        marginVertical: 10
    },
    horizontalList: {
        flexDirection: 'row',
        minHeight: 80,
        justifyContent: 'space-between'
    },
    listItem: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    top: {
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    avatarBack: {
        flex: 1,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12
    },
    smallButton: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1
    },
    desc: {
        fontSize: 14
    },
    profile: {
        flex: 2,
        marginLeft: 10,
        justifyContent: 'space-around'
    },
    function: {
        marginRight: 10,
        marginTop: 20,
        borderRadius: 10,
        width: 60,
        height: 20,
    },
    littleTitle: {
        height: 30,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'flex-start',
        paddingLeft: 20
    },
    item: {
        borderRadius: 5,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row'
    },
    onlyText: {
        marginVertical: 20
    }
})

export {PostScreen}