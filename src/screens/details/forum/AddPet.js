import React, {Component} from 'react'
import {
    StyleSheet, Text, View, ScrollView, Image, TextInput, Picker,
    TouchableOpacity
} from 'react-native'
import ImagePicker from "react-native-image-picker";
import DatePicker from 'react-native-datepicker'
import {Button, CheckBox} from "react-native-elements";

class AddPet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: {uri:'http://123.207.217.225/img/1/tx.jpg'},
            time: new Date(),
            checked: false
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
        return (
            <View style={styles.photoView}>
                <View style={styles.imageView}>
                    <TouchableOpacity onPress = {this.selectPhotoTapped.bind(this)}>
                        <Image style={styles.image} source={this.state.avatarSource}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.mainView}>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>宠物名字</Text>
                        <TextInput underlineColorAndroid={'transparent'} style={styles.input} placeholder ={'设置宠物名称'}/>

                    </View>
                    <View style={{height: 1, backgroundColor: '#f5f5f9'}}/>
                    <View style={styles.sex}>
                        <Text style={styles.text}>宠物性别</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <CheckBox
                                right
                                title='GG'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={!this.state.checked}
                                onpress={() => this.setState({checked: !this.state.checked})}
                            />
                            <CheckBox
                                right
                                title='MM'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checked}
                                onpress={() => this.setState({checked: !this.state.checked})}
                            />
                        </View>
                    </View>
                    <View style={{height: 1, backgroundColor: '#f5f5f9'}}/>
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
                    <View style={{height: 1, backgroundColor: '#f5f5f9'}}/>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>宠物品种</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PetType',{name: '1'})}>
                            <Text>123</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                    <Button buttonStyle={{backgroundColor: '#44a3ff', borderRadius: 10, marginTop: 20, width: 350}} onPress={()=> alert(this.state.date)} title={'保存'}/>
                </View>
            </View>
        );
    }
}

export {AddPet}
const styles = StyleSheet.create(
    {
        photoView: {
          flex: 1
        },
        mainView: {
            marginTop: 10,
            height: 204,
            backgroundColor: 'white'
        },

        imageView: {
            marginTop: 10,
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
        }
    }
)