import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Image
} from 'react-native';
import {Button} from "react-native-elements";

class InformationScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.top}>
                    <View style={styles.avatarBack}>
                        <Image style={styles.avatar} source={{uri: 'http://123.207.217.225/img/1/tx.jpg'}}/>
                    </View>
                    <View style={styles.profile}>
                        <Text style={styles.name}>
                            名字
                        </Text>
                        <Text style={styles.desc}>
                            简介
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
                        <Text style={{color: '#333', fontSize: 16, marginTop: 10,textAlign:'center'}}>1</Text>
                        <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>帖子</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={{color: '#333', fontSize: 16, marginTop: 10,textAlign:'center'}}>1</Text>
                        <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>粉丝</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={{color: '#333', fontSize: 16, marginTop: 10,textAlign:'center'}}>1</Text>
                        <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>收藏</Text>
                    </View>
                </View>
                <View style={{height: 2, backgroundColor: '#f5f5f9'}}/>
                <View style={styles.littleTitle}>
                    <Text>最近动态</Text>
                </View>
                <View style={{height: 2, backgroundColor: '#f5f5f9'}}/>
                <View style={{backgroundColor: 'white', flex: 1,justifyContent: 'center',alignItems:'center',height: 1}}>
                    <View style={{height: 40}}>
                        <Text>最近没有动态</Text>
                    </View>
                    {/*<FlatList>*/}
                    {/*</FlatList>*/}
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
        fontSize: 16,
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