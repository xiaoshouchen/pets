import React, {Component} from 'react';
import {
    Image,
    SectionList, Text, TouchableOpacity, View,
} from 'react-native';

const sectonDatas = {
    section1:[
        {title:'退出'}
    ],
}

class SettingScreen extends Component {
    _renderItemComponent = ({item}) => {

        return (
            <TouchableOpacity onPress={() => alert('退出')}>
                <View style={{backgroundColor:'white',flexDirection:'row',alignItems:'center',height:44}}>
                    <Text style={{marginLeft:5,color:'#333',fontSize:14}}>{item.title}</Text>
                    <Image style={{position:'absolute',top:15,right:15,height:15,width:15}} source={require('../../../image/gift_wall_lettle_white_arrow_msg.png')}/>
                </View>
            </TouchableOpacity>
        );
    };

    render(){
        return(
            <View>
                <SectionList
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={()=><View style={{height:1,backgroundColor:'#f5f5f9'}}/>}
                    SectionSeparatorComponent={()=><View style={{height:10,backgroundColor:'#f5f5f9'}}/>}
                    renderItem={this._renderItemComponent}
                    contentContainerStyle={{paddingBottom:20}}
                    sections={[
                        {data: sectonDatas.section1, key:'s1'},
                    ]}
                />

            </View>
        )
    }
}
export {SettingScreen}