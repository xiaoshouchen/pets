import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity,Image} from 'react-native';
import {Icon} from 'react-native-elements';

class SelectionScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "萌宠",
        title: '我的萌宠',
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#ff8302'},
        tabBarIcon: ({tintColor, focused}) => (
            <Icon
                name='list'
                size={30}
                type="MaterialIcons"
                color={tintColor}
            />
        ),
    };

    render() {
        const {navigate}=this.props.navigation;
        return (
            <View style={{backgroundColor:'white'}}>
                <View style={styles.top}>
                    <TouchableOpacity style={styles.buttonLeft}>
                        <Text style={styles.text}>宠物</Text>
                    </TouchableOpacity>
                    <View style={styles.petImageView}>
                        <View>
                        <Image style={styles.petImage} source={{uri:'http://123.207.217.225/img/1/tx.jpg'}}></Image>
                            <Text style={{textAlign:'center'}}>二狗</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonRight} onPress={(navigation)=>{
                        navigate('AddPet');
                    }}>
                        <Text style={styles.text}>提醒</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={styles.item_list}>
                        <View style={styles.itemLeft}>
                            <Image source={require('../../image/f-0.png')}
                                   style={{width: 48, height: 48, marginBottom: 5}}/>
                            <Text style={styles.itemText}>宠物零食</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/f-1.png')}
                                   style={{width: 48, height: 48, marginBottom: 5}}/>
                            <Text style={styles.itemText}>宠物口粮</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/f-2.png')}
                                   style={{width: 48, height: 48, marginBottom: 5}}/>
                            <Text style={styles.itemText}>宠物卫生</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/f-3.png')}
                                   style={{width: 48, height: 48, marginBottom: 5}}/>
                            <Text style={styles.itemText}>宠物用品</Text>
                        </View>
                        <View style={styles.itemRight}>
                            <Image source={require('../../image/f-4.png')}
                                   style={{width: 48, height: 48, marginBottom: 5}}/>
                            <Text style={styles.itemText}>宠物零食</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export {SelectionScreen}

const styles = StyleSheet.create(
    {
        item: {
            marginTop: 10,
            marginBottom: 10,
            paddingLeft: 10
        },
        itemText: {
            textAlign: 'center'
        },
        itemLeft: {
            marginTop: 10,
            marginBottom: 10,
            paddingLeft: 10
        },
        itemRight: {
            marginTop: 10,
            marginBottom: 10,
            paddingRight: 10
        },
        item_list: {
            flexDirection: 'row',
            backgroundColor: 'white',
            justifyContent: 'space-between'
        },
        top: {
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor:'#ff8302',
            paddingBottom:20,
            marginBottom:10
        },
        petImageView: {
            flex: 3,
            alignItems:'center',
            paddingTop:25
        },
        petImage: {
            width: 80,
            height: 80,
            borderRadius:40,
        },
        buttonLeft: {
            width: 80,
            height: 30,
            justifyContent: 'center',
            backgroundColor: '#fcc311',
            borderBottomRightRadius: 15,
            borderTopRightRadius: 15,
            overflow: 'hidden',
            flex: 1,
            marginTop: 40
        },
        buttonRight: {
            width: 80,
            height: 30,
            justifyContent: 'center',
            backgroundColor: '#fcc311',
            borderBottomLeftRadius: 15,
            borderTopLeftRadius: 15,
            overflow: 'hidden',
            flex: 1,
            marginTop: 40
        },
        text: {
            textAlign: 'center'
        }
    }
)