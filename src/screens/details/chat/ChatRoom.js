import React, {Component} from 'react';
import {AsyncStorage, FlatList, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, Avatar, Button, FormInput} from 'react-native-elements';
import App from "../../../utils/app.core";

class ChatRoomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceData: [],
            from_user_id: this.props.navigation.state.params.from_user_id,
            to_user_id: this.props.navigation.state.params.to_user_id,
            user_id: null,
            token: '',
            inputMessage: ''
        }
        this._SendMessage = this._SendMessage.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        ...App.commonHeaderStyle,
        headerTitle: navigation.state.params.ChatName,
    })

    componentDidMount() {

    }

    _SendMessage() {
        //发送信息
        let mes = [{'path': 'from', 'content': this.state.inputMessage}];
        this.setState({sourceData: mes.concat(this.state.sourceData),inputMessage:''});
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
                                            <Text style={styles.message}>{item.content}</Text>
                                        </View>
                                    </View>)
                            } else {
                                return (
                                    <View style={styles.to}>
                                        <Text style={styles.message}>{item.content}</Text>
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

                    <View style={styles.input}>
                        <FormInput
                            placeholder='输入要发送的信息'
                            containerStyle={
                                {flex: 1}
                            }
                            value={this.state.inputMessage}
                            onChangeText={(text) => {
                                this.setState({inputMessage: {text}.text})
                            }}
                        />
                        <Button
                            title='发送'
                            onPress={() => this._SendMessage()}
                            buttonStyle={{
                                backgroundColor: "#8babbe",
                                width: 80,
                                height: 40,
                                borderColor: "transparent",
                                borderRadius: 5
                            }}
                            style={{padding:0}}
                        />

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
        justifyContent: 'flex-end',
        alignItems:'center',
    },
    messageBack: {
        backgroundColor: '#fff'
    }
})
export {ChatRoomScreen}