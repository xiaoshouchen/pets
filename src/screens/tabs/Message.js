import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {StyleSheet, Text, View, ScrollView, Button, Image} from 'react-native';
import {Icon} from 'react-native-elements'


class MessageScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            html: props.editorHtml
        }
    }

    static navigationOptions = {
        tabBarLabel: " ",
        title: '个人消息',
        tabBarIcon: ({tintColor, focused}) => (
            <Image
                source={require('../../image/launch.png')}
            />
        ),
    }

    render() {
        const {navigate} = this.props.navigation;
        return <View style={styles.container}>
            <Button title="提交" onPress={
                () => {
                    alert(this.state.messagesReceivedFromWebView)
                }
            }/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
export {MessageScreen}