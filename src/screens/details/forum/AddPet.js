import React, {Component} from 'react'
import {
    StyleSheet, Text, View, ScrollView, Button, Image, TextInput, Picker,
    TouchableNativeFeedback
} from 'react-native'
import ImagePicker from "react-native-image-picker";
import DatePicker from 'react-native-datepicker'

class AddPet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: {uri:'http://123.207.217.225/img/1/tx.jpg'},
            time: new Date(),
        }
    }
    static navigationOptions= {
        title: '添加宠物',
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    render() {
        const {} = this.props.navigation;
        return (
            <View style={styles.mainer}>
                <View style={styles.imageView}>
                    <TouchableNativeFeedback onPress = {this.selectPhotoTapped.bind(this)}>
                        <Image style={styles.image} source={this.state.avatarSource}/>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.text}>宠物名字</Text>
                    <TextInput underlineColorAndroid={'transparent'} style={styles.input} placeholder ={'设置宠物名称'}/>

                </View>
                <View style={styles.sex}>
                    <Text style={styles.text}>宠物性别</Text>
                    <Picker
                        itemStyle={{color:'blue', width: 50}}
                        prompt='Picker'
                        mode = 'dropdown'
                        style={{width: 90}}
                        selectedValue={this.state.sex}
                        onValueChange={(lang,position) => this.setState({sex: lang,position:position})}>
                        <Picker.Item label="GG" value="male" />
                        <Picker.Item label="MM" value="female" />
                    </Picker>
                </View>
                <View style= {styles.inputView}>
                    <Text style= {styles.text}>宠物生日</Text>
                    <DatePicker
                        style= {{width: 200}}
                        date= {this.state.date}
                        mode= "date"
                        placeholder= "选择宠物生日"
                        format= "YYYY-MM-DD"
                        confirmBtnText= "Confirm"
                        cancelBtnText= "Cancel"
                        androidMode= "spinner"
                        showIcon= {false}
                        customStyles={{
                            dateText:{

                                marginRight: 15
                            },
                            dateInput: {
                                borderColor: 'white',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                            },
                            dateTouchBody: {

                            },
                            placeholderText: {

                            }
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.text}>宠物品种</Text>
                    <Picker
                        itemStyle={{color:'blue', width: 50}}
                        prompt='Picker'
                        mode = 'dropdown'
                        style={{width: 90}}
                        selectedValue={this.state.type}
                        onValueChange={(lang,position) => this.setState({type: lang,position:position})}>
                        <Picker.Item label="GG" value="male" />
                        <Picker.Item label="MM" value="female" />
                    </Picker>
                </View>
                <Button onPress={()=> alert('添加成功')} title={'添加'}/>
            </View>
        );
    }
}

export {AddPet}
const styles = StyleSheet.create(
    {
        mainer: {
            flex: 1,
            backgroundColor: 'white'
        },

        imageView: {
            alignItems: 'center',
        },
        image: {
            width: 80,
            height: 80,
            borderRadius:40
        },

        inputView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginLeft: 15,
            marginRight: 15,
            height: 50
        },
        input: {
            justifyContent: 'center',
            width: 100,
            height: 50,
            padding: 0,
        },
        text: {
            textAlign: 'auto',
            fontSize: 16
        },

        itemView: {
            flexDirection: 'row'
        },

        sex: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginLeft: 15,
            marginRight: 15,
            height: 50
        }
    }
)