import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {StyleSheet, Text, View, ScrollView, Button, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

class MessageScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            html: props.editorHtml
        }
    }

    static navigationOptions = {
        header:null,
        tabBarLabel:"秀一秀",
        showLabel:false,
        tabBarIcon: () => (
            <Icon
                name='camera' size={35} color="#900"
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