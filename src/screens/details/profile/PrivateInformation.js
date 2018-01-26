import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Image
} from 'react-native';

class InformationScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View>
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
                        <Text style={styles.function}>关注</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.horizontalList}>
                <View style={styles.listItem}>
                    <Text>
                        帖子
                    </Text>
                    <Text>
                        1
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <Text>
                        粉丝
                    </Text>
                    <Text>
                        1
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <Text>
                        收藏
                    </Text>
                    <Text>
                        1
                    </Text>
                </View>
            </View>
            <View>
                <View>
                    <Text>最近动态</Text>
                    <FlatList>
                    </FlatList>
                </View>
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
    top:{
        flexDirection: 'row',
    },
    avatarBack: {
        flex:1,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12
    },
    smallButton: {
        flex:1,
    },
    name: {
        marginTop: 16,
        fontSize: 16,
    },
    desc: {
        marginTop: 10,
        fontSize: 14
    },
    profile: {
        flex:2,
        marginLeft: 10
    },
    function:{
        backgroundColor: "#01ffc9"
    }
})
export {InformationScreen}