import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {StyleSheet, Text, View, ScrollView, Image, SectionList, TouchableNativeFeedback} from 'react-native';
import itemList from '../../config/ItemList'
import Icon from 'react-native-vector-icons/Feather';

const sectonDatas = {
    section1:[
        {title:'购物车',icon:require('../../image/home_contribute.png'),screen: 'ShoppingCart'}
    ],
    section2:[
        {title:'我的收藏',icon:require('../../image/home_video_icon.png'),screen: 'Collection'},
        {title:'浏览记录',icon:require('../../image/home_watch_record_icon.png'),screen: 'BrowsingHistory'},
    ],
    section3:[
        {title:'收益',icon:require('../../image/home_harvest_icon.png')},
        {title:'账户',icon:require('../../image/home_account_icon.png')},
        {title:'等级',icon:require('../../image/home_level_icon.png')},
        {title:'实名认证',icon:require('../../image/home_certify_icon.png')},
        {title:'邀请好友',icon:require('../../image/home_invite_friend_icon.png')}
    ],
    section4:[
        {title:'设置',icon:require('../../image/home_setting_icon.png')}
    ],
}
class ProfileScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "我的",
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#ff8302'},
        title: '个人资料',
        tabBarIcon: ({tintColor, focused}) => (
            <Icon
                name='user'
                size={30}
                color={tintColor}
            />
        ),
    }
    _keyExtractor = (item, index) => `${index}${item.id}`;

    _renderItemComponent = ({item}) => {

        return (
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate(item.screen, {name: '1'})}>
                <View style={{backgroundColor:'white',flexDirection:'row',alignItems:'center',height:44}}>
                    <Image style={{height:20,width:20,marginLeft:15}} source={item.icon}/>
                    <Text style={{marginLeft:5,color:'#333',fontSize:14}}>{item.title}</Text>
                    <Image style={{position:'absolute',top:15,right:15,height:15,width:15}} source={require('../../image/gift_wall_lettle_white_arrow_msg.png')}/>
                </View>
            </TouchableNativeFeedback>
        );
    };

    render() {
        return (
            <View style={{backgroundColor: 'white'}}>
                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Personal', {name: '1'})}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.avatar} source={{uri:'http://123.207.217.225/img/tx.jpg'}}/>
                        <Text style={styles.userName}>管理员</Text>
                        <Image style={styles.male} />
                    </View>
                </TouchableNativeFeedback>
                <View style={{height: 1, backgroundColor: '#f5f5f9'}}/>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {itemList.proFile.map((list) => {
                        return(
                            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate(list.screen, {name: '1'})}>
                                <View style={{alignItems: 'center', flex: 1}}>
                                    <Text style={{color: '#333', fontSize: 16, marginTop: 10}}>{list.val}</Text>
                                    <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>{list.name}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        )
                    })}
                </View>

                <View style={{height: 10, backgroundColor: '#f5f5f9'}}/>
                <SectionList
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={()=><View style={{height:1,backgroundColor:'#f5f5f9'}}/>}
                    SectionSeparatorComponent={()=><View style={{height:10,backgroundColor:'#f5f5f9'}}/>}
                    ListHeaderComponent={this._renderHeaderComponent}
                    renderItem={this._renderItemComponent}
                    contentContainerStyle={{paddingBottom:20}}
                    sections={[
                        {data: sectonDatas.section1, key:'s1'},
                        {data: sectonDatas.section2, key:'s2'},
                        {data: sectonDatas.section3, key:'s3'},
                        {data: sectonDatas.section4, key:'s4'},
                    ]}
                />
            </View>

        )

    }
}

export {ProfileScreen}
const styles = StyleSheet.create({

    avatar:{
        marginLeft:15,
        marginTop:15,
        height:60,
        width:60,
        borderRadius:30,
        marginBottom:15
    },
    userName:{
        marginLeft:15,
        fontSize:20,
        color:'#333'
    },
    male:{
        marginLeft:5,
        height:15,
        width:15
    },
})