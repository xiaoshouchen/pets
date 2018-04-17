import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TextInput, TouchableOpacity, Picker
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import App from '../../../utils/app.core';
import {ADD_NOTICE, GET_PETS} from "../../../config/api";

class AddNoticeScreen extends Component {

    static navigationOptions = {
        ...App.commonHeaderStyle,
        tabBarLabel: "萌宠",
        title: '宠物提醒',
    };

    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            date: "",
            place: "",
            thing: '',
            items: null,
            pet_id: null,
        };
        this._AddNotice = this._AddNotice.bind(this);
    }

    _AddNotice() {
        let formData = new FormData();
        formData.append('user_id', this.state.user_id);
        formData.append('pet_id', this.state.pet_id);
        formData.append('place', this.state.place);
        formData.append('date', this.state.date);
        formData.append('thing', this.state.thing);
        fetch(ADD_NOTICE, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((response) => response.json()).then((responseJson) => {
            alert(responseJson.message);
        }).catch((e) => alert('网络出错'));
    }

    componentDidMount() {
        let userInfo = App.getUserInfo();
        userInfo.then((data) => {
            fetch(GET_PETS + '?user_id=' + data.user_id)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        items: responseJson,user_id:data.user_id,
                    }, function () {
                        //do some thing
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        });

    }

    render() {
        let Items = [];
        if (this.state.items === null) {
            return <View>
                <Text>
                    当前没有宠物，请先添加
                </Text>
            </View>
        }
        let pets = this.state.items;
        for (let i = 0; i < pets.length; i++) {
            Items.push(
                <Picker.Item label={pets[i].name} value={pets[i].id} style={styles.pickerItem}/>
            );
        }
        const {state, navigate} = this.props.navigation;
        return (
            <View style={{flex: 1, justifyContent: 'flex-start',}}>
                <View style={styles.mainView}>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>宠物</Text>
                        <Picker style={styles.picker}
                                selectedValue={this.state.pet_id}
                                onValueChange={(id) => this.setState({pet_id: id})}
                                mode="dropdown">
                            {Items}
                        </Picker>

                    </View>
                </View>
                <View style={styles.mainView}>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>日期</Text>
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.date}
                            mode="datetime"
                            placeholder="什么时候"
                            format="YYYY-MM-DD h:mm:ss"
                            confirmBtnText="确认"
                            cancelBtnText="取消"
                            androidMode="spinner"
                            showIcon={true}
                            minimumDate={new Date()}
                            customStyles={{
                                dateText: {},
                                dateInput: {
                                    borderColor: 'white',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                },
                                dateTouchBody: {},
                                placeholderText: {},
                                btnTextConfirm: {
                                    height: 20,
                                    color: "#000"
                                },
                                btnTextCancel: {
                                    height: 20,
                                    color: "#b6b6b6"
                                }
                            }}
                            onDateChange={(date) => {
                                this.setState({date: date})
                            }}
                        />
                    </View>
                </View>
                <View style={styles.mainView}>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>地点</Text>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            style={styles.input}
                            placeholder={'在什么地方'}
                            value={this.state.place}
                            onChangeText={(text) => this.setState({
                                place: text
                            })}
                        />

                    </View>
                </View>
                <View style={styles.mainView}>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>事项</Text>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            style={styles.input}
                            placeholder={'将要做什么事情'}
                            value={this.state.thing}
                            onChangeText={(text) => this.setState({
                                thing: text
                            })}
                        />

                    </View>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => this._AddNotice()}>
                        <Text style={styles.buttonText}>保存</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    photoView: {
        flex: 1
    },
    mainView: {
        marginTop: 10,
        height: 50,
        backgroundColor: 'white'
    },

    imageView: {
        marginTop: 10,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40
    },

    inputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        height: 50
    },
    input: {
        textAlign: 'right',
        width: 150,
        height: 50,
        padding: 0,
    },
    text: {
        fontSize: 16,
        includeFontPadding: false,
        justifyContent: 'center'
    },

    itemView: {
        flexDirection: 'row'
    },

    sex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        height: 50
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ee6a4e',
        width: 120,
        height: 40,
        alignSelf: 'center',
        marginTop: 25,
        borderRadius: 20,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16
    },
    picker: {
        width: 150,
    },
    pickerItem: {
        fontSize: 12
    }
})

export {AddNoticeScreen}