import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList, Animated, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dimensions from 'Dimensions'

const data = [{key: '如何挑选一只适合自己的猫'}, {key: '狗的常见疾病'}, {key: '家里的猫就是个闹钟，每天弄醒我，不然我睡觉'}, {key: '这是一个测试'}, {key: '这是一个测试'}, {key: '这是一个测试'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}];

class SelectionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickSelected: "",
            show: false,
            scrollY: new Animated.Value(0),
            currentContent: 'recommend',
        }
    }

    static navigationOptions = {
        tabBarLabel: "萌宠",
        title: '我的萌宠',
        headerTitleStyle: {color: '#fff', fontSize: 18, fontWeight: 'normal'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#4fc3f7'},
        tabBarIcon: ({tintColor, focused}) => (
            <Icon
                name='pets'
                size={30}
                color={tintColor}
            />
        ),
    };

    render() {
        const {navigate} = this.props.navigation;
        let absuloteTitle = this.state.scrollY.interpolate({
            inputRange: [0, 410, 1000, 1000],
            outputRange: [0, 0, 590, 590]
        })
        switch (this.state.currentContent) {
            case 'recommend': {
                let {list} = <View/>
            }
        }
        return (

            <ScrollView
                style={{backgroundColor: 'white'}}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                )}
            >
                <StatusBar
                    backgroundColor='#4fc3f7'
                    barStyle="light-content"
                />
                <View style={{height: 180}}>
                    <Image source={require('../../image/back.png')}
                           style={{width: null, height: 180,}}/>
                </View>
                <View style={styles.top}>
                    <TouchableOpacity style={styles.buttonLeft} onPress={() => navigate('PetList')}>
                        <Text style={styles.text}>宠物 <Icon name='add' color={'white'} size={16}
                                                           style={{marginTop: 10}}/>
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.petImageView}>
                        <View>
                            <Image style={styles.petImage}
                                   source={{uri: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3803332007,2672307128&fm=58'}}></Image>
                            <Text style={{textAlign: 'center', backgroundColor: 'rgba(0,0,0,0)'}}>二狗</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonRight} onPress={(navigation) => {
                        navigate('Remind');
                    }}>
                        <Text style={styles.text}><Icon name='add' color={'white'} size={16} style={{marginTop: 4}}/> 提醒</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.functionArea}>
                    <View style={styles.item_list}>
                        <TouchableOpacity style={styles.item} onPress={() => navigate('PrivateRecommends', {
                            pet_id: 1,
                            article_type: 'food',
                            petYear: 1,
                            pet_type_id: 1
                        })}>
                            <Image source={require('../../image/list-1.png')}
                                   style={{width: 35, height: 35, marginBottom: 5}}/>
                            <Text style={styles.itemText}>饮食</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => navigate('MedicalCare')}>
                            <Image source={require('../../image/list-2.png')}
                                   style={{width: 35, height: 35, marginBottom: 5}}/>
                            <Text style={styles.itemText}>医疗</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => navigate('Training', {
                            pet_id: 1,
                            article_type: 'food',
                            petYear: 1,
                            pet_type_id: 1
                        })}>
                            <Image source={require('../../image/list-3.png')}
                                   style={{width: 35, height: 35, marginBottom: 5}}/>
                            <Text style={styles.itemText}>训练</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => navigate('Cosmetology')}>
                            <Image source={require('../../image/list-4.png')}
                                   style={{width: 35, height: 35, marginBottom: 5}}/>
                            <Text style={styles.itemText}>美容</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => navigate('Item')}>
                            <Image source={require('../../image/list-5.png')}
                                   style={{width: 35, height: 35, marginBottom: 5}}/>
                            <Text style={styles.itemText}>用品</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View>
                    <Text style={styles.smallTitle}>常用功能</Text>
                    <View style={styles.item_list}>
                        <View style={styles.item}>
                            <TouchableOpacity onPress={() => navigate('Diary')}>
                                <Image source={require('../../image/list1.png')}
                                       style={{width: 30, height: 30, marginBottom: 5}}/>
                                <Text style={styles.itemText}>日记</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.item}>
                            <TouchableOpacity onPress={() => navigate('AdoptList')}>
                                <Image source={require('../../image/list2.png')}
                                       style={{width: 30, height: 30, marginBottom: 5}}/>
                                <Text style={styles.itemText}>领养</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.item}>
                            <TouchableOpacity onPress={() => navigate('PairList')}>
                                <Image source={require('../../image/list3.png')}
                                       style={{width: 30, height: 30, marginBottom: 5}}/>
                                <Text style={styles.itemText}>配对</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.item}>
                            <TouchableOpacity onPress={() => navigate('Encyclopedias')}>
                                <Image source={require('../../image/list4.png')}
                                       style={{width: 30, height: 30, marginBottom: 5}}/>
                                <Text style={styles.itemText}>百科</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.item}>
                            <TouchableOpacity onPress={() => navigate('QuestionAndAnswer')}>
                                <Image source={require('../../image/list5.png')}
                                       style={{width: 30, height: 30, marginBottom: 5}}/>
                                <Text style={styles.itemText}>问答</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>*/}
                <View style={{backgroundColor: '#eeeeee', height: 10}}></View>
                <Animated.View
                    style={{
                        transform: [{
                            translateY: absuloteTitle
                        }]
                    }}>
                    <View style={styles.scroll}>
                        <TouchableOpacity style={{flex: 1}}>
                            <Text style={{textAlign: 'center', fontSize: 16, borderBottom: 2}}>养宠必读</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}}>
                            <Text style={{textAlign: 'center', fontSize: 16}}>提醒事项</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}}>
                            <Text style={{textAlign: 'center', fontSize: 16}}>商品推荐</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                <View style={{flex: 1}}>
                    <FlatList
                        data={data}
                        renderItem={({item}) => (
                            <View style={{height: 100, flexDirection: 'row'}}>
                                <Image style={{width: 120, height: 90, margin: 5}}
                                       source={{uri: 'http://www.xiaochongleyuan.com/img/1950213411.jpg'}}/>
                                <View>
                                    <Text style={{height: 20, marginTop: 10, fontWeight: 'bold'}}>{item.key}</Text>
                                    <Text style={{height: 20, marginTop: 10}}>适用的宠物</Text>
                                    <Text style={{height: 20, marginTop: 10}}>分类：宠物的饮食</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        )
    }
}

export {SelectionScreen}

const styles = StyleSheet.create(
    {
        item: {
            marginTop: 10,
            marginBottom: 10,
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
            justifyContent: 'space-around'
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
            width: 80,
            height: 80,
            borderRadius: 40,
            marginBottom: 10
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
            backgroundColor: 'rgba(107, 242, 252, 0.5)',
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
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
)