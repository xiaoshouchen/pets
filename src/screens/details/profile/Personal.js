import React, {Component} from 'react';
import {
    Button, StyleSheet, View
} from 'react-native'
import Text from "react-native-elements/src/text/Text";
import {PersonalInfoChangeScreen} from "./PersonalInfoChange";

class PersonalScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    static navigationOptions = (navigation) => ({
        title: '个人信息',
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#ff8302'},
        headerRight:
            <Button title={'修改'} onPress={() => this.props.navigation.navigate('PersonalInfoChangeScreen',{name: '1'})}
            />
    })
    render(){
        return(
            <View>
                <Text>1</Text>
            </View>
        )
    }

}

export {PersonalScreen}