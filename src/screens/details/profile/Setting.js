import React, {Component} from 'react';
import {
    AsyncStorage,
    Image,
    SectionList, Text, TouchableOpacity, View,
} from 'react-native';

const sectonDatas = {
    section1: [
        {title: '退出'}
    ],
}

class SettingScreen extends Component {

    static navigationOptions = {
        tabBarLabel: "我的",
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#44a3ff'},
        title: '设置',
    };

    _renderItemComponent = ({item}) => {

        return (
            <TouchableOpacity onPress={() => AsyncStorage.setItem("login", '')
                .then(() => {
                    this.props.navigation.state.params.checkIsLogin();
                    this.props.navigation.goBack();
                }).catch((error) => alert(error))}>
                <View style={{backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', height: 44}}>
                    <Text style={{marginLeft: 5, color: '#333', fontSize: 14}}>{item.title}</Text>
                    <Image style={{position: 'absolute', top: 15, right: 15, height: 15, width: 15}}
                           source={require('../../../image/gift_wall_lettle_white_arrow_msg.png')}/>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View>
                <SectionList
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#f5f5f9'}}/>}
                    SectionSeparatorComponent={() => <View style={{height: 10, backgroundColor: '#f5f5f9'}}/>}
                    renderItem={this._renderItemComponent}
                    contentContainerStyle={{paddingBottom: 20}}
                    sections={[
                        {data: sectonDatas.section1, key: 's1'},
                    ]}
                />

            </View>
        )
    }
}

export {SettingScreen}