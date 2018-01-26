import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class SelectionScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "萌宠",
        title: '我的萌宠',
        headerTitleStyle: { color: '#fff' },
        headerBackTitle: null,
        headerStyle: { backgroundColor: '#44a3ff' },
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
                name='pets'
                size={30}
                color={tintColor}
            />
        ),
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: 'white' }}>
                <View style={{ height: 180 }}>
                    <Image source={require('../../image/back.jpg')} style={{ width: null, height: 180 }} />
                </View>
                <View style={styles.top}>
                    <TouchableOpacity style={styles.buttonLeft} onPress={() => navigate('PetList')}>
                        <Text style={styles.text}>宠物</Text>
                    </TouchableOpacity>
                    <View style={styles.petImageView}>
                        <View>
                            <Image style={styles.petImage} source={{ uri: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3803332007,2672307128&fm=58' }}></Image>
                            <Text style={{ textAlign: 'center' }}>二狗</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonRight} onPress={(navigation) => {
                        navigate('AddPet');
                    }}>
                        <Text style={styles.text}>提醒</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.functionArea}>
                    <Text style={styles.smallTitle}>专属推荐</Text>
                    <View style={styles.item_list}>
                        <TouchableOpacity style={styles.itemLeft} onPress={()=>navigate('PrivateRecommends')}>
                            <Image source={require('../../image/list-1.png')}
                                style={{ width: 48, height: 48, marginBottom: 5 }} />
                            <Text style={styles.itemText}>饮食搭配</Text>
                        </TouchableOpacity>
                        <View style={styles.item}>
                            <Image source={require('../../image/list-2.png')}
                                style={{ width: 48, height: 48, marginBottom: 5 }} />
                            <Text style={styles.itemText}>医疗卫生</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/list-3.png')}
                                style={{ width: 48, height: 48, marginBottom: 5 }} />
                            <Text style={styles.itemText}>训练交流</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/list-4.png')}
                                style={{ width: 48, height: 48, marginBottom: 5 }} />
                            <Text style={styles.itemText}>美容清洁</Text>
                        </View>
                        <View style={styles.itemRight}>
                            <Image source={require('../../image/list-5.png')}
                                style={{ width: 48, height: 48, marginBottom: 5 }} />
                            <Text style={styles.itemText}>玩具用品</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.smallTitle}>常用功能</Text>
                    <View style={styles.item_list}>
                        <View style={styles.itemLeft}>
                            <Image source={require('../../image/list1.png')}
                                style={{ width: 48, height: 48, marginBottom: 5 }} />
                            <Text style={styles.itemText}>宠物日记</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/list2.png')}
                                style={{ width: 48, height: 48, marginBottom: 5 }} />
                            <Text style={styles.itemText}>领养发布</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/list3.png')}
                                style={{ width: 48, height: 48, marginBottom: 5 }} />
                            <Text style={styles.itemText}>宠物配对</Text>
                        </View>
                        <View style={styles.item}>
                            <Image source={require('../../image/list4.png')}
                                style={{ width: 48, height: 48, marginBottom: 5 }} />
                            <Text style={styles.itemText}>宠物百科</Text>
                        </View>
                        <View style={styles.itemRight}>
                            <Image source={require('../../image/list5.png')}
                                style={{ width: 48, height: 48, marginBottom: 5 }} />
                            <Text style={styles.itemText}>专家问答</Text>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor:'#eeeeee',height:10}}></View>
                <View style={styles.scroll}>
                    <TouchableOpacity style={{flex:1}}>
                        <Text style={{textAlign:'center',fontSize:16}}>养宠必读</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}}>
                        <Text style={{textAlign:'center',fontSize:16}}>提醒事项</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}}>
                        <Text style={{textAlign:'center',fontSize:16}}>商品推荐</Text>
                    </TouchableOpacity>
                </View>

            </View>

        )
    }
}

export { SelectionScreen }

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
            marginBottom: 10,
            marginTop: -180
        },
        petImageView: {
            flex: 3,
            alignItems: 'center',
            paddingTop: 25
        },
        petImage: {
            width: 100,
            height: 100,
            borderRadius: 50,
        },
        buttonLeft: {
            width: 80,
            height: 30,
            justifyContent: 'center',
            backgroundColor: 'rgba(107, 242, 252, 0.5)',
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
            backgroundColor: 'rgba(107, 242, 252, 0.8)',
            borderBottomLeftRadius: 15,
            borderTopLeftRadius: 15,
            overflow: 'hidden',
            flex: 1,
            marginTop: 40
        },
        text: {
            textAlign: 'center'
        },
        smallTitle: {
            height: 16,
            fontSize: 12,
            backgroundColor: '#eeeeee',
            width: 55,
            borderBottomRightRadius: 8,
            borderTopRightRadius: 8,
        },
        functionArea: {
            marginTop: 30,
        },
        scroll: {
            flexDirection: 'row',
            height:40
        }
    }
)