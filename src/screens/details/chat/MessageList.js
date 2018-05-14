import React, {Component} from 'react';
import {AsyncStorage, FlatList, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Avatar, Button} from 'react-native-elements';
import App from "../../../utils/app.core";

class MessageListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceData: [{'key': 1}, {'key': 2}]
        }
        AsyncStorage.setItem(`message_between_27_and_28`, `[{
	"path": "from",
	"content": "你好",
	"time": 123
}, {
	"path": "to",
	"content": "你也好",
	"time": 124
}]`);
    }

    static navigationOptions = ({navigation}) => ({
        ...App.commonHeaderStyle,
        headerTitle: '消息中心',
    })

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.main}>
                <Text style={{marginLeft: 20, marginVertical: 10}}>消息列表</Text>
                <FlatList
                    data={this.state.sourceData}
                    ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#eee'}}/>}
                    renderItem={
                        ({item, index}) => {
                            return (
                                <View style={styles.item}>
                                    <Avatar
                                        containerStyle={styles.avatar}
                                        rounded
                                        medium
                                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
                                        onPress={() => console.log("Works!")}
                                        activeOpacity={0.7}/>
                                    <TouchableOpacity
                                        onPress={() => navigate('ChatRoom')}
                                        style={{justifyContent: 'space-between', flexDirection: 'row', flex: 1}}>
                                        <View>
                                            <Text style={styles.userName}>小宠乐园用户</Text>
                                            <Text style={styles.message}>今天晚上吃啥？</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.date}>4月28号</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>)
                        }
                    }
                />
            </View>)
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF',
    },
    avatar: {
        marginHorizontal: 15,
        marginVertical: 15
    },
    userName: {
        fontSize: 14,
        marginTop: 22
    },
    message: {
        fontSize: 12,
        color: '#4a4a4e',
        marginTop: 12

    },
    date: {
        alignSelf: 'flex-end',
        marginTop: 25,
        fontSize: 11,
        color: '#909090',
        marginRight: 20,
    }
})
export {MessageListScreen}