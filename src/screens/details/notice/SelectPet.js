import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

class RemindScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentPet: null,
        }
    }

    static navigationOptions = {
        tabBarLabel: "萌宠",
        headerTitleStyle: {color: '#fff', fontSize: 18, fontWeight: 'normal'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#4fc3f7'},
        title: '宠物提醒',
    };

    _getPets() {
        //get pets' info
        fetch().then().then().catch();
    }

    _getNotices(pet_id) {
        //get notices of pet
        fetch().then((response) => response.json()).then((responseJson) => {

        }).catch((e) => console.log(e));
    }

    render() {
        const {state, navigate} = this.props.navigation;
        return (
            <View/>
        )
    }
}

const styles = StyleSheet.create({})

export {RemindScreen}