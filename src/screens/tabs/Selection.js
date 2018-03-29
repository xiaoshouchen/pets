import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    Animated,
    StatusBar,
    Button,
    ImageBackground, AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions';
import {GET_PETS, GET_PROFILE, GET_RECOMMENDS, GET_WAIT_NOTICES} from "../../config/api";

const data = [{key: '如何挑选一只适合自己的猫'}, {key: '狗的常见疾病'}, {key: '家里有个\"猫闹钟\"'}];
let petList = [<View><Text>暂未登陆</Text></View>];

class SelectionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickSelected: "",
            show: false,
            scrollY: new Animated.Value(0),
            currentContent: 'recommends',//当前的状态
            currentData: [],//显示的数据来源
            PetsData: '',
        }
        this._getPetData = this._getPetData.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
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
        headerRight: <TouchableOpacity
            onPress={() => navigation.navigate('PetList')}
        ><Text style={{color: '#ffffff', fontWeight: 'bold', marginRight: 15}}>宠物 + </Text>
        </TouchableOpacity>,
    });

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "64%",
                    backgroundColor: "#eeeeee",
                    alignSelf: 'flex-end'
                }}
            />
        );
    }

    componentDidMount() {
        AsyncStorage.getItem('login').then((result) => {
            //alert(result);
            if (result == null) {
                this.setState({login: {token: '', user_id: ''}})
            }
            else {
                this.setState({login: result}, function () {
                    let json = JSON.parse(this.state.login);
                    //console.log(json)
                    this._getPetData(json.user_id, json.token);
                });
            }

        }).catch((e) => {
            //alert(e);
        })
    }


    _getPetData(user_id, token) {
        fetch(GET_PETS + '?user_id=' + user_id)
            .then((response) => response.json())
            .then((responseJson) => {
                petList = [];
                let lists = responseJson;
                //alert(lists.length);
                for (let i = 0; i < lists.length; i++) {
                    petList.push(
                        <View style={styles.petImageView}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }}>
                                <Image style={styles.petImage}
                                       source={{uri: lists[i].avatar}}>
                                </Image>
                                <View>
                                    <Text style={{
                                        textAlign: 'left',
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        marginLeft: Dimensions.get('window').width * 0.06
                                    }}>{lists[i].name}</Text>
                                    <Text style={{
                                        paddingTop: Dimensions.get('window').width * 0.032,
                                        textAlign: 'left',
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        marginLeft: Dimensions.get('window').width * 0.06
                                    }}>{lists[i].typename}</Text>
                                </View>
                            </View>
                        </View>);
                }
                this.setState({
                    PetsData: responseJson,
                }, function () {
                    //let lists = this.state.PetsData;
                    //alert(lists[0].avatar);
                    //this.petList = [];

                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _getCurrentShowData() {

    }

    render() {
        const {navigate} = this.props.navigation;
        let absuloteTitle = this.state.scrollY.interpolate({
            inputRange: [0, 410, 1000, 1000],
            outputRange: [0, 0, 590, 590]
        })
        let back_width = Dimensions.get('window').width;
        let back_height = Dimensions.get('window').width * 0.47;

        return (<ScrollView
                style={{backgroundColor: 'white'}}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                )}>
                <StatusBar
                    backgroundColor='#4fc3f7'
                    barStyle="light-content"
                />
                <View style={styles.top}>
                    <ImageBackground style={{height: back_height, width: back_width}}
                                     source={require('../../image/back.png')} resizeMode='cover'>
                        <Swiper style={styles.wrapper} showsButtons={false}
                                height={Dimensions.get('window').width * 0.47}>
                            {petList}
                        </Swiper>
                    </ImageBackground>
                </View>
                <View style={styles.functionArea}>
                    <View style={styles.item_list}>
                        <TouchableOpacity style={styles.item} onPress={() => navigate('PrivateRecommends', {
                            pet_id: 1,
                            article_type: 'food',
                            petYear: 1,
                            pet_type_id: 1
                        })}>
                            <Image source={require('../../image/lingshi.png')}
                                   style={{width: 30, height: 30, marginBottom: 5}}/>
                            <Text style={styles.itemText}>饮食</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => navigate('MedicalCare')}>
                            <Image source={require('../../image/yiliao.png')}
                                   style={{width: 30, height: 30, marginBottom: 5}}/>
                            <Text style={styles.itemText}>医疗</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => navigate('Training', {
                            pet_id: 1,
                            article_type: 'food',
                            petYear: 1,
                            pet_type_id: 1
                        })}>
                            <Image source={require('../../image/xunlian.png')}
                                   style={{width: 30, height: 30, marginBottom: 5}}/>
                            <Text style={styles.itemText}>训练</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => navigate('Cosmetology')}>
                            <Image source={require('../../image/xizao.png')}
                                   style={{width: 30, height: 30, marginBottom: 5}}/>
                            <Text style={styles.itemText}>美容</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => navigate('Item')}>
                            <Image source={require('../../image/yongpin.png')}
                                   style={{width: 30, height: 30, marginBottom: 5}}/>
                            <Text style={styles.itemText}>常识</Text>
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
                        <TouchableOpacity style={{flex: 1}}
                                          onPress={() => this.setState({currentContent: "recommend"})}>
                            <Text style={{textAlign: 'center', fontSize: 16, borderBottom: 2}}>养宠必读</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}}
                                          onPress={() => this.setState({currentContent: "notices"})}>
                            <Text style={{textAlign: 'center', fontSize: 16}}>提醒事项</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}}
                                          onPress={() => this.setState({currentContent: "goods"})}>
                            <Text style={{textAlign: 'center', fontSize: 16}}>商品推荐</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                <View style={{flex: 1}}>
                    <FlatList
                        data={this.state.currentContent}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({item}) => {
                            let Content;
                            switch (this.state.currentContent) {
                                case 'recommends': {
                                    Content = <View style={{height: 100, flexDirection: 'row'}}>
                                        <Image style={{width: 120, height: 90, marginVertical: 5, marginLeft: 20}}
                                               source={{uri: 'https://www.xiaochongleyuan.com/img/1950213411.jpg'}}/>
                                        <View style={{paddingLeft: 20}}>
                                            <Text style={{
                                                height: 20,
                                                marginTop: 10,
                                                fontWeight: 'bold'
                                            }}>{item.key}</Text>
                                            <Text style={{height: 20, marginTop: 10}}>适用的宠物</Text>
                                            <Text style={{height: 20, marginTop: 10}}>分类：宠物的饮食</Text>
                                        </View>
                                    </View>;
                                    break;
                                }
                                case 'notices': {
                                    Content = <View style={{height: 100, flexDirection: 'row'}}>
                                        <Image style={{width: 120, height: 90, marginVertical: 5, marginLeft: 20}}
                                               source={{uri: 'https://www.xiaochongleyuan.com/img/1950213411.jpg'}}/>
                                        <View style={{paddingLeft: 20}}>
                                            <Text style={{
                                                height: 20,
                                                marginTop: 10,
                                                fontWeight: 'bold'
                                            }}>{item.key}</Text>
                                            <Text style={{height: 20, marginTop: 10}}>适用的宠物</Text>
                                            <Text style={{height: 20, marginTop: 10}}>分类：宠物的饮食</Text>
                                        </View>
                                    </View>;
                                    break;
                                }
                            }
                            return Content;
                        }}
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
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        petImageView: {
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingTop: 25
        },
        petImage: {
            width: 90,
            height: 90,
            borderRadius: 45,
            marginLeft: Dimensions.get('window').width * 0.0533,
        },
        // buttonLeft: {
        //     width: 80,
        //     height: 30,
        //     justifyContent: 'center',
        //     backgroundColor: 'rgba(107, 242, 252, 0.5)',
        //     borderBottomRightRadius: 15,
        //     borderTopRightRadius: 15,
        //     overflow: 'hidden',
        //     flex: 1,
        //     marginTop: 40
        // },
        buttonRight: {
            width: 50,
            height: 30,
            justifyContent: 'center',
            backgroundColor: 'rgba(107, 242, 252, 0.5)',
            borderBottomLeftRadius: 15,
            borderTopLeftRadius: 15,
            overflow: 'hidden',
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
            marginTop: 10,
        },
        scroll: {
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
)