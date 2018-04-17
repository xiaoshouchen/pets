import React, {Component} from 'react';
import {
    Image,
    Modal, ScrollView,
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import {Button, CheckBox} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import App from '../../../utils/app.core';

class AdoptScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            typeName: '选择种类',
            location: '选择地区'
        }
    }
    static navigationOptions = {
        tabBarLabel: "萌宠",
        ...App.commonHeaderStyle,
        title: '领养',
    };
    callBack(item) {
        this.setState({
            typeName: item.name,
            typeId: item.id
        })
    }

    render() {
        const {state, navigate} = this.props.navigation;
        return (
            <ScrollView style={styles.photoView}>
                <View style={styles.mainView}>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>品种</Text>
                        <TouchableOpacity
                            onPress={() => navigate('PetType', {callBack: (item) => this.callBack(item)})}>
                            <Text>{this.state.typeName}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 2, backgroundColor: '#f5f5f9'}}/>
                    <View style={styles.sex}>
                        <Text style={styles.text}>性别</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <CheckBox
                                right
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                containerStyle={{
                                    marginRight: -30,
                                    borderColor: 'rgba(0,0,0,0)',
                                    width: 60,
                                    backgroundColor: 'rgba(0,0,0,0)'
                                }}
                                checked={!this.state.checked}
                                onPress={() => this.setState({checked: false, sex: 1})}
                            />
                            <Image style={{marginTop: 20, marginRight: 20}}
                                   source={require('../../../image/male.png')}/>
                            <CheckBox
                                right
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                containerStyle={{
                                    marginRight: -30,
                                    marginLeft: 0,
                                    borderColor: 'rgba(0,0,0,0)',
                                    width: 60,
                                    backgroundColor: 'rgba(0,0,0,0)'
                                }}
                                checked={this.state.checked}
                                onPress={() => this.setState({checked: true, sex: 0})}
                            />
                            <Image style={{marginTop: 20}} source={require('../../../image/female.png')}/>
                        </View>
                    </View>
                    <View style={{height: 2, backgroundColor: '#f5f5f9'}}/>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>年龄</Text>
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
                    <View style={{height: 2, backgroundColor: '#f5f5f9'}}/>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>所在地</Text>
                        <TouchableOpacity
                            onPress={() => navigate('Location', {callBack: (item) => this.callBack(item)})}>
                            <Text>{this.state.location}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 2, backgroundColor: '#f5f5f9'}}/>
                    <View style={styles.title}>
                        <Text >领养要求</Text>
                    </View>
                    <View style={styles.longInputView}>
                        <TextInput
                            multiline={true}
                            underlineColorAndroid={'transparent'}
                            style={styles.longInput}
                            placeholder ={'填写要求'}
                            value={this.state.name}
                            onChangeText={(text) => this.setState({
                                name: text
                            })}
                        />
                    </View>
                    <View style={{height: 2, backgroundColor: '#f5f5f9'}}/>
                    <View style={styles.title}>
                        <Text >其他信息</Text>
                    </View>
                    <View style={styles.longInputView}>
                        <TextInput
                            multiline={true}
                            underlineColorAndroid={'transparent'}
                            style={styles.longInput}
                            placeholder ={'填写其他信息'}
                            value={this.state.name}
                            onChangeText={(text) => this.setState({
                                name: text
                            })}
                        />

                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                    <Button disabled={!this.state.isClickAble}
                            buttonStyle={{backgroundColor: '#44a3ff', borderRadius: 10, marginTop: 20, width: 350}}
                            title={'发布'}/>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    photoView: {
        flex: 1
    },

    mainView: {
        marginTop: 10,
        height: 470,
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
        width: 100,
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
    longInputView: {
        marginLeft: 15,
        marginRight: 15,
        height: 100
    },
    title: {
        paddingLeft: 15,
        backgroundColor: '#f5f5f9',
        height: 30,
        justifyContent: 'center'
    },
    longInput: {
        height: 50,
        padding: 0,
        includeFontPadding: false,
        justifyContent: 'center'
    }
});

export {AdoptScreen}