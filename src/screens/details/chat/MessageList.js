import React, {Component} from 'react';
import {AsyncStorage, FlatList, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Avatar, Button} from 'react-native-elements';
import App from "../../../utils/app.core";
import {MESSAGES_LIST} from '../../../config/api';

class MessageListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceData: [],
            dataError: false
        }
    }

    componentDidMount() {
        let userInfo = App.getUserInfo();
        userInfo.then((data) => {
            if (data === false) {
                //
                alert('fasdfasdfadsfasdfgasdg');
            } else {
                let user_id = data.user_id;
                //console.log('json的值为');
                        fetch(`${MESSAGES_LIST}?to_user_id=${user_id}`).then((res) => res.json()).then((resJson) => {
                            //console.log(resJson);
                            this.setState({sourceData: resJson.data})
                        })
                    }

        }).catch((e) => {

        })
    }

    static navigationOptions = ({navigation}) => ({
        ...App.commonHeaderStyle,
        headerTitle: '消息中心',
    })

    render() {
        if (this.state.dataError) {
            return <View>
                <Text>数据加载错误</Text>
            </View>
        }
        //console.log(this.state.sourceData);
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
                                        source={{uri: item.avatar_img}}
                                        onPress={() => console.log("Works!")}
                                        activeOpacity={0.7}/>
                                    <TouchableOpacity
                                        onPress={() => navigate('ChatRoom',{ChatName:item.name})}
                                        style={{justifyContent: 'space-between', flexDirection: 'row', flex: 1}}>
                                        <View>
                                            <Text style={styles.userName}>{item.name}</Text>
                                            <Text style={styles.message}>{item.content}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.date}>{item.created_at}</Text>
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