import React, {Component} from 'react';
import {
    Button, StyleSheet, View
} from 'react-native'
import Text from "react-native-elements/src/text/Text";

class PersonalScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    static navigationOptions = ({navigation}) => ({
        title: '个人信息',
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#44a3ff'},
        headerRight:
            <Button title={'修改'} onPress = {
                () => {
                    navigation.navigate('PersonalInfoChange', {name: '1'})
                }}
            />
    })
    render(){
        const {params} = this.props.navigation.state;

        return(
            <View>
                <Text>姓名</Text>
                <Text>个人简介</Text>
                <Text></Text>
                <Text>姓名</Text>
            </View>
        )
    }

}

export {PersonalScreen}