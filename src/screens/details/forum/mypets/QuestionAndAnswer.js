import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

class QuestionAndAnswerScreen extends Component {

    static navigationOptions = {
        tabBarLabel: "萌宠",
        headerTitleStyle: {color: '#fff',fontSize:18,fontWeight:'normal'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#4fc3f7'},
        title: '问答',
    };

    render() {
        const {state, navigate} = this.props.navigation;
        return (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <View>
                    <Text>问答</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#44a3ff',
    }

})

export {QuestionAndAnswerScreen}