import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TextInput
} from 'react-native';
import ImagePicker from "react-native-image-picker";
import DatePicker from 'react-native-datepicker'
import {Button, CheckBox} from "react-native-elements";

class RemindScreen extends Component {

    static navigationOptions = {
        tabBarLabel: "萌宠",
        headerTitleStyle: {color: '#fff', fontSize: 18, fontWeight: 'normal'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#4fc3f7'},
        title: '宠物提醒',
    };

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            date: "",
            place: "",
        };
    }


    render() {
        const {state, navigate} = this.props.navigation;
        return (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <View style={styles.mainView}>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>选择宠物</Text>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            style={styles.input}
                            placeholder={'设置宠物名称'}
                            value={this.state.name}
                            onChangeText={(text) => this.setState({
                                name: text
                            })}
                        />

                    </View>
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.text}>宠物生日</Text>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.date}
                        mode="date"
                        placeholder="选择宠物生日"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        androidMode="spinner"
                        showIcon={false}
                        customStyles={{
                            dateText: {},
                            dateInput: {
                                borderColor: 'white',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                            },
                            dateTouchBody: {},
                            placeholderText: {}
                        }}
                        onDateChange={(date) => {
                            this.setState({date: date})
                        }}
                    />
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

export {RemindScreen}