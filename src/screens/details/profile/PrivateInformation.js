/*
* 个人信息的界面，显示每个用户的具体信息。
* 用户的头像
* 用户的名称和简介
* 用户的帖子、粉丝、关注、收藏
* */
import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Image
} from 'react-native';
import {Button} from "react-native-elements";
import {GET_USER_PROFILE} from "../../../config/api";

class InformationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            other_user_id:this.props.navigation.state.params.user_id
        }
        this._getData = this._getData.bind(this);
    }

    static navigationOptions = {
        headerTitleStyle: {color: '#fff', fontSize: 18, fontWeight: 'normal'},
        headerStyle: {backgroundColor: '#4fc3f7'},
        headerTitle: '个人信息',
    }

    componentDidMount() {
        let user_id = this.state.other_user_id;
        this._getData(user_id);
    }

    _getData(user_id) {

        fetch(`${GET_USER_PROFILE}?user_id=${user_id}`).then((response) => response.json()).then((responseJson) => {
            //alert(responseJson.name);
            this.setState({dataSource: responseJson})
        }).catch((e)=>alert(e))
    }

    noData = () => {
        return (
            <View style={{height: 40}}>
                <Text>最近没有动态</Text>
            </View>
        )
    }
    haveData = () => {
        return (
            <FlatList></FlatList>
        )
    }


    show() {
        let show = (this.state.dataSource.recent == undefined||this.state.dataSource.recent=='' )? this.noData() : this.haveData;
        return show
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.top}>
                    <View style={styles.avatarBack}>
                        <Image style={styles.avatar} source={{uri: this.state.dataSource.avatar_img}}/>
                    </View>
                    <View style={styles.profile}>
                        <Text style={styles.name}>
                            {this.state.dataSource.name}
                        </Text>
                        <Text style={styles.desc}>
                            简介:{this.state.dataSource.desc}
                        </Text>
                    </View>
                    <View style={styles.smallButton}>
                        <TouchableOpacity>
                            <Button buttonStyle={styles.function} title={'关注'}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height: 12, backgroundColor: '#f5f5f9'}}/>
                <View style={styles.horizontalList}>
                    <View style={styles.listItem}>
                        <Text style={{color: '#333', fontSize: 16, marginTop: 10, textAlign: 'center'}}>{this.state.dataSource.article_count}</Text>
                        <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>帖子</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={{color: '#333', fontSize: 16, marginTop: 10, textAlign: 'center'}}>{this.state.dataSource.fan_count}</Text>
                        <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>粉丝</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={{color: '#333', fontSize: 16, marginTop: 10, textAlign: 'center'}}>{this.state.dataSource.follow_count}</Text>
                        <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>关注</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={{color: '#333', fontSize: 16, marginTop: 10, textAlign: 'center'}}>{this.state.dataSource.restore_count}</Text>
                        <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>收藏</Text>
                    </View>
                </View>
                <View style={{height: 2, backgroundColor: '#f5f5f9'}}/>
                <View style={styles.littleTitle}>
                    <Text>最近动态</Text>
                </View>
                <View style={{height: 2, backgroundColor: '#f5f5f9'}}/>
                <View style={{
                    backgroundColor: 'white',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 1
                }}>
                    <View>{this.show()}</View>
                </View>

            </View>)
    }
}

const styles = StyleSheet.create({
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
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
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
    name: {
        fontSize: 20,
        marginTop: 5
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
        backgroundColor: "#ff7c50",
        marginRight: 10,
        marginTop: 20,
        borderRadius: 10,
        width: 60,
        height: 20
    },
    littleTitle: {
        height: 30,
        justifyContent: 'center',
        padding: 15,
        backgroundColor: 'white'
    }
})
export {InformationScreen}