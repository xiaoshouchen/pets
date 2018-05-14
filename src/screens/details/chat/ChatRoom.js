import React, {Component} from 'react';
import {AsyncStorage, FlatList, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, Avatar, Button, FormInput} from 'react-native-elements';
import App from "../../../utils/app.core";

class ChatRoomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceData: []
        }
    }

    static navigationOptions = ({navigation}) => ({
        ...App.commonHeaderStyle,
        headerTitle: '消息中心',
    })

    componentDidMount() {
        /**/
        let msg = AsyncStorage.getItem('message_between_27_and_28');
        msg.then((data) => {
            console.log(data)
            this.setState({sourceData: JSON.parse(data)});
        })
    }

    render() {
        return (
            <View style={styles.main}>
                <FlatList
                    data={this.state.sourceData}
                    ItemSeparatorComponent={() => <View style={{height: 10}}/>}
                    renderItem={
                        ({item, index}) => {
                            if (item.path === 'from') {
                                return (
                                    <View style={styles.from}>
                                        <Avatar
                                            containerStyle={styles.avatar}
                                            rounded
                                            medium
                                            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
                                            onPress={() => console.log("Works!")}
                                            activeOpacity={0.7}/>
                                        <View>
                                            <Text style={styles.message}>小宠乐园用户</Text>
                                        </View>
                                    </View>)
                            } else {
                                return (
                                    <View style={styles.to}>
                                        <Text style={styles.message}>小宠乐园用户</Text>
                                        <Avatar
                                            containerStyle={styles.avatar}
                                            rounded
                                            medium
                                            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
                                            onPress={() => console.log("Works!")}
                                            activeOpacity={0.7}/>
                                    </View>)
                            }
                        }
                    }
                />
                <View>
                    <View style={styles.input}>
                        <FormInput
                            placeholder='输入要发送的信息'
                            containerStyle={
                                {flex: 1}
                            }
                        />
                        <Button
                            title='发送'
                            buttonStyle={{
                                backgroundColor: "#8babbe",
                                width: 80,
                                height: 40,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5
                            }}
                        />
                    </View>
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    from: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    to: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    avatar: {
        marginHorizontal: 15,
        marginVertical: 15
    },
    message: {
        fontSize: 12,
        color: '#4a4a4e',
        marginTop: 12,
        borderRadius: 15,
        width: 200
    },
    date: {
        alignSelf: 'flex-end',
        marginTop: 25,
        fontSize: 11,
        color: '#909090',
        marginRight: 20,
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    messageBack: {
        backgroundColor: '#fff'
    }
})
export {ChatRoomScreen}