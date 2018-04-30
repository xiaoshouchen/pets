import React, {Component} from 'react'
import {
    StyleSheet, Text, View, Image, FlatList, ActivityIndicator, ScrollView, RefreshControl
} from 'react-native'
import {Button} from "react-native-elements";
import {GET_MY_DIARY} from "../../../config/api";
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions';
import App from '../../../utils/app.core'

class DiaryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: false,
            isLogin: false,
            isRefreshing: false
        };
        this.getData = this.getData.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
    }

    static navigationOptions = {
        tabBarLabel: "日记",
        ...App.commonHeaderStyle
    };

    componentDidMount() {
        let userInfo = App.getUserInfo();
        userInfo.then((data) => {
            this.setState({isRefreshing: false});
            if (data === false) {
                //
            } else {
                this.setState({login: data, isLogin: true}, () => {
                    this.getData(this.state.login.user_id, this.state.login.token);
                })
            }

        })
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        this.componentDidMount();
    }

    getData(user_id, token) {
        return fetch(`${GET_MY_DIARY}?user_id=${user_id}&token=${token}`)
            .then((response) => response.json())
            .then((responseJson, key) => {
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
                    height: 10,
                    width: "100%",
                    backgroundColor: "#f5f5f9",
                }}
            />
        );
    }

    ExtraUniqueKey(item, index) {
        return "index" + index + item;
    }

    onRefresh = () => {
        this.setState({
            refreshing: true,
        });
        const timer = setTimeout(() => {
            clearTimeout(timer);
            this.setState({
                refreshing: false,
            });
        }, 100);
        this.componentDidMount();
    };

    callBack() {
        this.componentDidMount();
    }

    render() {
        if (this.state.isLogin === false) {
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="white"
                        />
                    }>
                    <View style={styles.notLogin}>
                        <Text style={styles.notLoginText}>日记只能登陆之后查看</Text>
                        <Text style={styles.notLoginText}>日记是小秘密，不能与人分享哦！</Text>
                    </View>
                </ScrollView>
            );
        }
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        const {navigate} = this.props.navigation;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        keyExtractor={this.ExtraUniqueKey}
                        onRefresh={this.onRefresh}
                        refreshing={this.state.refreshing}
                        renderItem={({item}) => (
                            <View><Text>{item.title}</Text>
                                <Text>{item.created_at}</Text></View>
                        )}
                    />
                </View>
                <Button buttonStyle={{
                    backgroundColor: '#ff7816',
                    borderRadius: 10,
                    marginTop: 40,
                    marginBottom: 40,
                    flex: 1,
                    marginRight: 10,
                    marginLeft: 10
                }}
                        onPress={() => navigate('addArticle')} title={'写日记'}/>
            </ScrollView>
        )
            ;
    }
}

const styles = StyleSheet.create(
    {
        avatar: {
            marginLeft: 20,
            marginTop: 5,
            marginRight: 20,
            height: 40,
            width: 40,
            borderRadius: 20,
            marginBottom: 5
        },
        container: {
            backgroundColor: 'white'
        },
        itemView: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60
        },
        notLogin: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        notLoginText: {
            fontWeight: 'bold',
            fontSize: 16
        }

    }
)

export {DiaryScreen}
