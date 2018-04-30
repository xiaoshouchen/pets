import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image, ScrollView
} from 'react-native';
import {GET_PRIVATE} from '../../../../config/api';
import App from '../../../../utils/app.core';

class MedicalCareScreen extends Component {

    static navigationOptions = {
        tabBarLabel: "萌宠",
        ...App.commonHeaderStyle,
        title: '医疗卫生',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            petType: '',
            petYear: '',
            totalPage: 1,
            pageNo: 1,
            showFoot: 0,
            dataSource: [],
            refreshing: false,
            user_id: 0,
            token: 0
        };
        this._getData = this._getData.bind(this);
        this._onEndReached = this._onEndReached.bind(this);
        this._onRefresh = this._onRefresh.bind(this);

    }

    componentDidMount() {
        let userInfo = App.getUserInfo();
        userInfo.then((data) => {
            //alert(data);
            if (data === false) {
                this._getData(this.state.pageNo, 0, 0);
                this.setState({user_id: 0, token: 0})
            } else {
                this._getData(this.state.pageNo, data.user_id, data.token);
                this.setState({user_id: data.user_id, token: data.token});

            }
        });
    }

    _getData(_pageNo, user_id = null, token = null) {
        fetch(`${GET_PRIVATE}${_pageNo}&small_type=2&user_id=${user_id}&token=${token}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code === 200) {
                    this.setState({
                        totalPage: responseJson.totalPageNo,
                        isLoading: false,
                        dataSource: _pageNo === 1 ? responseJson.data : this.state.dataSource.concat(responseJson.data)
                    }, function () {
                        // In this block you can do something with new state.
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    _onEndReached() {
        //如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot != 0) {
            return;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if ((this.state.pageNo != 1) && (this.pageNo >= this.state.totalPage)) {
            return;
        } else {
            this.setState({pageNo: this.state.pageNo + 1});
        }
        //底部显示正在加载更多数据
        //this.setState({showFoot: 2});
        //获取数据
        this._getData(this.state.pageNo, this.state.user_id, this.state.token);
    }

    _onRefresh() {
        this.setState({refreshing: true});
        fetch(`${GET_PRIVATE}1&small_type=2&user_id=${this.state.user_id}&token=${this.state.token}`)
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(responseJson[0].id+"    "+this.state.dataSource[0].id);
                //alert();
                if (responseJson.data[0].id === this.state.dataSource[0].id) {
                    this.setState({refreshing: false});
                    return;
                } else {
                    this.setState({refreshing: false});
                    return this._getData(1, this.state.user_id, this.state.token);

                }
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
                            <Image style={{width: 120, height: 90, marginVertical: 5, marginLeft: 5}}
                                   source={{uri: item.img}}/>
                            <View style={{paddingLeft: 10}}>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        marginTop: 10,
                                        fontWeight: 'bold',
                                        width: 200
                                    }} onPress={() => {
                                    navigate('ArticleDetail', {id: item.id})
                                }}>{item.title}</Text>
                                <Text style={styles.content} numberOfLines={3}>{item.content}</Text>
                            </View>

                        </View>)
                    }
                    keyExtractor={(item, index) => index}
                    onEndReached={this._onEndReached}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.refreshing}
                />


            </View>

        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: 'white',
        flex: 1
    },
    item: {
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row'
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
        fontSize: 12,
        color: '#545454',
        marginTop: 10,
        width: 200
    },
    smallIcon: {
        width: 25,
        height: 25,
        marginRight: 12
    },

});

export {MedicalCareScreen}