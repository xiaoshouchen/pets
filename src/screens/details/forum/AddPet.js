import React, {Component} from 'react'
import {
    StyleSheet, Text, View, ScrollView, Image, TextInput, Picker,
    TouchableOpacity, Modal, AsyncStorage
} from 'react-native'
import ImagePicker from "react-native-image-picker";
import DatePicker from 'react-native-datepicker'
import {Button, CheckBox} from "react-native-elements";
import {ADD_PETS, DELETE_PETS, UPDATE_PETS} from "../../../config/api";
class AddPet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: require('../../../image/default_pet_avatar.png'),
            time: new Date(),
            checked: false,
            typeName: '选择宠物种类',
            sex: 1,
            isLoading: true,
            isClickAble: true,
            visibility: false,
            showDelete: ''
        }
        this.confirm=this.confirm.bind(this);
    }

    static navigationOptions=({navigation}) => ({
        tabBarLabel: "萌宠",
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#44a3ff'},
        title: '宠物资料',
        headerRight:
            <TouchableOpacity onPress={() => navigation.state.params.confirm()}>
                <Text style={{marginRight: 15}}>{navigation.state.params.showDelete}</Text>
            </TouchableOpacity>

    })

    callBack(item){
        this.setState({
            typeName: item.name,
            typeId: item.id
        })
    }

    confirm(){
        this.setState({
            visibility: true
        })
    }
    deletePet(){
        let formData = new FormData();
        const {state, goBack} = this.props.navigation;
        formData.append('user_id',this.state.userId);
        formData.append('pet_id',this.state.petId);
        fetch(DELETE_PETS, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then(
            (response) => response.json())
            .then((responseJson) => {
                state.params.callBack();
                goBack(null)
            });
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            },
            title: '选择一张照片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '手机相册选取',
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

    post(){
        if(this.state.isClickAble){
            if(this.state.name == '' || this.state.typeName == '选择宠物种类' || this.state.date == null || this.state.avatarSource == require('../../../image/default_pet_avatar.png')){
                let a = this.state.name != null ? '' : '宠物姓名\n';
                let b = this.state.typeName != '选择宠物种类' ? '' : '宠物种类\n';
                let c = this.state.date != null ? '' : '宠物生日\n';
                let d = this.state.avatarSource !=  require('../../../image/default_pet_avatar.png') ? '' : '头像\n';
                alert(`请填写\n${a}${b}${c}${d}`)
            }else {
                this.setState({
                    isClickAble: false
                })
                const {state, goBack} = this.props.navigation;
                let formData = new FormData();
                let file = {uri: this.state.avatarSource.uri, type: 'multipart/form-data', name: 'a.jpg'}
                formData.append('birthday', this.state.date);
                formData.append('sex', this.state.sex);
                formData.append('name', this.state.name);
                formData.append('small_type_id', this.state.typeId);
                formData.append('avatar', file);
                formData.append('user_id', this.state.userId);
                const { params }=this.props.navigation.state;
                if(params.item!=undefined){
                    formData.append('pet_id',this.state.petId);
                    fetch(UPDATE_PETS, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                        body: formData,
                    }).then(
                        (response) => response.json())
                        .then((responseJson) => {
                            state.params.callBack();
                            goBack(null)
                        });
                }else {
                    fetch(ADD_PETS, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                        body: formData,
                    }).then(
                        (response) => response.json())
                        .then((responseJson) => {
                            state.params.callBack();
                            goBack(null)
                        });
                }
            }
        }else {

        }
    }

    componentDidMount(){
        const { params }=this.props.navigation.state;
        AsyncStorage.getItem('login').then((result) => {
            //alert(result);
            if (result == null) {
                this.setState({login: {token: '', user_id: ''}})
            }
            else {
                this.setState({login: result}, function () {
                    let json = JSON.parse(this.state.login);
                    this.setState({userId: json.user_id});
                });
            }

        }).catch((e) => {
            alert(e);
        })
        if(this.state.isLoading){
            if(params.item!=undefined){
                this.setState({
                    name: params.item.name,
                    sex: params.item.sex,
                    checked: params.item.sex==0?true:false,
                    date: params.item.birthday,
                    typeId: params.item.small_type_id,
                    avatarSource: {uri: params.item.avatar},
                    typeName: params.item.typename,
                    isLoading: false,
                    petId: params.item.id,
                    showDelete: '删除'
                },
                    () => this.props.navigation.setParams({
                    confirm: this.confirm,
                    showDelete: this.state.showDelete
                })
                )


            }
        }
    }

    render() {
        const { state, navigate } = this.props.navigation;
        return (
            <View style={styles.photoView}>
                <Modal
                    animationType={"slide"}
                    visible={this.state.visibility}
                    transparent={true}
                    onRequestClose={() => this.setState({visibility: false})}
                >
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{backgroundColor: 'black', width: 200, height: 100, marginTop: 300}}>
                            <View style={{justifyContent: 'center', alignItems: 'center', height: 50}}>
                                <Text style={{color: 'white'}}>是否删除该宠物</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <Button title={'是'} buttonStyle={{width: 70}} onPress={() => this.deletePet()}/>
                                <Button title={'否'} buttonStyle={{width: 70}} onPress={() => this.setState({visibility: false})}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.imageView}>
                    <TouchableOpacity onPress = {this.selectPhotoTapped.bind(this)}>
                        <Image style={styles.image} source={this.state.avatarSource}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.mainView}>
                    <View style={styles.inputView}>
                        <Text style={styles.text}>宠物名字</Text>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            style={styles.input}
                            placeholder ={'设置宠物名称'}
                            value={this.state.name}
                            onChangeText={(text) => this.setState({
                                name: text
                            })}
                        />

                    </View>
                    <View style={{height: 1, backgroundColor: '#f5f5f9'}}/>
                    <View style={styles.sex}>
                        <Text style={styles.text}>宠物性别</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <CheckBox
                                right
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                containerStyle={{ marginRight: -30, borderColor: 'rgba(0,0,0,0)', width: 60, backgroundColor: 'rgba(0,0,0,0)' }}
                                checked={!this.state.checked}
                                onPress={() => this.setState({checked: false, sex: 1})}
                            />
                            <Image style={{marginTop:20, marginRight: 20}} source={require('../../../image/male.png')}/>
                            <CheckBox
                                right
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                containerStyle={{ marginRight: -30, marginLeft: 0, borderColor: 'rgba(0,0,0,0)', width: 60, backgroundColor: 'rgba(0,0,0,0)' }}
                                checked={this.state.checked}
                                onPress={() => this.setState({checked: true, sex: 0})}
                            />
                            <Image style={{marginTop: 20}} source={require('../../../image/female.png')}/>
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
                        <TouchableOpacity onPress={() => navigate('PetType',{callBack: (item)=> this.callBack(item)})}>
                            <Text>{this.state.typeName}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                    <Button disabled={!this.state.isClickAble} buttonStyle={{backgroundColor: '#44a3ff', borderRadius: 10, marginTop: 20, width: 350}} onPress={()=> this.post()} title={'保存'}/>
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
        },
    }
)