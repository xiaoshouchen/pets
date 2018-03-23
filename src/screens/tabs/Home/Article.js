import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {GET_ARTICLES, LIKE} from "../../../config/api";
import Dimensions from 'Dimensions'

let pageNo = 1;//当前第几页
let totalPage = 5;//总的页数
let itemNo = 0;//item的个数
class ArticleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            showFoot: 0,
            like_url: '../../../image/forum/like.png',
            liked_url: '../../../image/forum/liked.png',
            restore_url: '../../../image/forum/restore.png',
            restored_url: '../../../image/forum/restored.png'
        }
        this._getData = this._getData.bind(this);
        this._like = this._like.bind(this);
        this._restore = this._restore.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        title: '文章',
    })

    componentDidMount() {

        return this._getData(1);
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#d9d7e8",
                }}
            />
        );
    }

    _like(user_id, article_id, index) {
        let data = this.state.dataSource;
        data[index].like = data[index].like == 1 ? 0 : 1;
        this.setState({
            dataSource: data
        });
        fetch(LIKE, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: {'user_id': user_id, 'aritlce_id': article_id},
        }).then((respone) => respone.json()).then((responeJson) => {

        })

    }

    _restore(user_id, article_id, index) {
        let data = this.state.dataSource;
        data[index].restore = data[index].restore == 1 ? 0 : 1;
        this.setState({
            dataSource: data
        })

    }

    _getData(_pageNo) {
        fetch(GET_ARTICLES + _pageNo)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: _pageNo == 1 ? responseJson : this.state.dataSource.concat(responseJson)
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _onEndReached() {
        //如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot != 0) {
            return;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if ((pageNo != 1) && (pageNo >= totalPage)) {
            return;
        } else {
            pageNo++;
        }
        //底部显示正在加载更多数据
        //this.setState({showFoot: 2});
        //获取数据
        this._getData(pageNo);
    }

    _onRefresh() {
        this.articles.refreshing = true;
        fetch(GET_ARTICLES + 1)
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(responseJson[0].id+"    "+this.state.dataSource[0].id);
                //alert();
                if (responseJson[0].id == this.state.dataSource[0].id) {
                    this.articles.refreshing = false;
                    return;
                } else {
                    this.articles.refreshing = false;
                    //alert(1111);
                    return this._getData(1);

                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _getImage(images) {
        if (images.size() > 0) {

        }
    }

    render() {
        const {navigate} = this.props.navigation;
        let title = (type, title) => {
            let type_name;
            switch (type) {
                case 4:
                    type_name = "【说说】";
                    return null;
                case 1:
                    type_name = "【分享】";
                    break;
                case 2:
                    type_name = "【提问】";
                    break;
                case 5:
                    type_name = "【精选】";
                    break;
                default:
                    type_name = "【分享】";
            }
            return <Text style={styles.title}>
                {type == undefined ? '【分享】' : type_name}{title}
            </Text>
        }
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                    <Text>文章加载中</Text>
                </View>
            );
        }

        return (

            <View style={styles.MainContainer}>

                <FlatList

                    data={this.state.dataSource}

                    ItemSeparatorComponent={this.FlatListItemSeparator}

                    renderItem={({item, index}) => {
                        let images = [];
                        let windowWidth = Dimensions.get('window').width;
                        let [ImgWidth, ImgHeight, MarginRight] = [windowWidth / 3, windowWidth / 3, 15];
                        if (item.img.length > 2) {
                            [ImgWidth, ImgHeight, MarginRight] = [windowWidth / 10 * 3, windowWidth / 10 * 3, windowWidth / 35];
                        }
                        for (let i = 0; i < 3 && i < item.img.length; i++) {
                            images.push(
                                <Image source={{uri: item.img[i]}}
                                       style={{width: ImgWidth, height: ImgHeight, marginRight: MarginRight}}/>
                            );
                        }
                        let img_like = this.state.dataSource[index].like ? require('../../../image/forum/liked.png') : require('../../../image/forum/like.png');
                        let img_restore = this.state.dataSource[index].restore ? require('../../../image/forum/restored.png') : require('../../../image/forum/restore.png');
                        return (
                            <View style={styles.item}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('PrivateInformation', {item: item})}>
                                        <Image source={{uri: item.avatar_img}} style={styles.avatar}/>
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.date}>{item.created_at}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={
                                    () => navigate('ArticleDetail', {id: item.id})
                                }>
                                    {title(item.type_id, item.title)}
                                    <Text style={styles.content}>{item.content}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        {images}
                                    </View>
                                </TouchableOpacity>
                                <View style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    height: 40
                                }}>
                                    <TouchableOpacity onPress={() => this._like(27, item.id, index)}>
                                        <Image source={img_like}
                                               style={styles.smallIcon}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this._restore(27, item.id, index)}>
                                        <Image source={img_restore}
                                               style={styles.smallIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>)
                    }

                    }
                    onEndReached={this._onEndReached.bind(this)}
                    onRefresh={this._onRefresh.bind(this)}
                    keyExtractor={(item, index) => index}
                    refreshing={false}
                    ref={(ref) => this.articles = ref}

                />


            </View>

        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: 'white',
    },
    item: {
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
    },
    avatar: {
        marginLeft: 5,
        marginTop: 5,
        marginRight: 15,
        height: 40,
        width: 40,
        borderRadius: 20,
        marginBottom: 5
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5
    },
    name: {
        marginTop: 8,
    },
    date: {
        marginTop: 4,
        fontSize: 10,
        color: '#a19fa9'
    },
    content: {
        marginLeft: 5,
        fontSize: 12,
        color: '#495863',
        marginBottom: 10
    },
    smallIcon: {
        width: 25,
        height: 25,
        marginRight: 20
    },


});

export {ArticleScreen}