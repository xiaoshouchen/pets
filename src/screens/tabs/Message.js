import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {StyleSheet, Text, View, ScrollView, Button, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {AddArticle} from "../details/forum/AddArticle";

class MessageScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            html: props.editorHtml
        }
    }

    static navigationOptions = {
        tabBarLabel: "秀一秀",
        showLabel: false,
        header: null,
        tabBarIcon: () => (
            <Icon
                name='camera' size={35} color="#900"
            />
        ),
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.mainView}>
                <View style={{marginTop: 100}}>
                    <Text style={{fontSize: 30}}>小宠乐园</Text>
                    <View>
                        <Text>让养宠物变得简单点</Text>
                    </View>
                </View>
                <View style={{}}>
                    <View style={styles.questionView}>
                        <View>
                            <Text style={styles.smallTitle}><Icon name='help-circle'/> 提问</Text>
                        </View>
                        <View style={styles.question}>
                            <TouchableOpacity onPress={() => navigate('AddArticle')}>
                                <View style={styles.main}>
                                    <Image style={styles.imageView} source={require('../../image/question.png')}/>
                                    <Text style={styles.nameView}>答题</Text>
                                    <Text style={styles.textView}>回答养宠问题</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => alert('讨论')}>
                                <View style={styles.main}>
                                    <Image style={styles.imageView} source={require('../../image/discuss.png')}/>
                                    <Text style={styles.nameView}>讨论</Text>
                                    <Text style={styles.textView}>讨论热门事件</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.shareView}>
                        <View>
                            <Text style={styles.smallTitle}><Icon name='book'/> 分享</Text>
                        </View>
                        <View style={styles.share}>
                            <TouchableOpacity onPress={() => alert('文章')}>
                                <View style={styles.main}>
                                    <Image style={styles.imageView} source={require('../../image/share.png')}/>
                                    <Text style={styles.nameView}>文章</Text>
                                    <Text style={styles.textView} numberOfLines={3}>较多文字的养宠故事或经验</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => alert('秀宠')}>
                                <View style={styles.main}>
                                    <Image style={styles.imageView} source={require('../../image/video.png')}/>
                                    <Text style={styles.nameView}>秀宠</Text>
                                    <Text style={styles.textView}>宠物可爱的照片、视频</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: 'white',
        alignItems: 'center',
        flex: 1
    },
    main: {
        width: 200,
        alignItems: 'center'
    },
    titleView: {
        marginTop: 40
    },
    imageView: {
        marginTop: 15,
        height: 80,
        width: 80,
        borderRadius: 30,
    },
    nameView: {
        fontSize: 14
    },
    textView: {
        marginTop: 10,
        fontSize: 10,
    },
    question: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft:25
    },
    share: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft:25
    },
    questionView: {
        marginTop: 20,
    },
    shareView: {
        marginTop: 20
    },
    smallTitle: {
        paddingTop:3,
        height: 30,
        fontSize: 16,
        backgroundColor: '#eeeeee',
        width: 60,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
    }
});
export {MessageScreen}