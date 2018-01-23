import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {StyleSheet, Text, View, ScrollView, Button, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

class MessageScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            html: props.editorHtml
        }
    }

    static navigationOptions = {
        tabBarLabel:"秀一秀",
        showLabel:false,
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
                <View style={{marginTop: 180}}>
                    <Text style={{fontSize: 30}}>发布</Text>
                </View>
                <View style={{}}>
                    <View style={styles.questionView}>
                        <View>
                            <Text style={styles.smallTitle}>提问？</Text>
                        </View>
                        <View style={styles.question}>
                            <TouchableOpacity onPress={() => alert('问答')}>
                                <View style={styles.main}>
                                    <Image style={styles.imageView} source={require('../../image/Release1.png')}/>
                                    <Text style={styles.nameView}>答题</Text>
                                    <Text style={styles.textView}>回答养宠问题</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => alert('讨论')}>
                                <View style={styles.main}>
                                    <Image style={styles.imageView} source={require('../../image/Release2.png')}/>
                                    <Text style={styles.nameView}>讨论</Text>
                                    <Text style={styles.textView}>讨论热门事件</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.shareView}>
                        <View>
                            <Text style={styles.smallTitle}>分享i</Text>
                        </View>
                        <View style={styles.share}>
                            <TouchableOpacity onPress={() => alert('文章')}>
                                <View style={styles.main}>
                                    <Image style={styles.imageView} source={require('../../image/Release3.png')}/>
                                    <Text style={styles.nameView}>文章</Text>
                                    <Text style={styles.textView} numberOfLines={3}>较多文字的养宠故事或经验</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => alert('秀宠')}>
                                <View style={styles.main}>
                                    <Image style={styles.imageView} source={require('../../image/Release4.png')}/>
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
        marginLeft:15,
        marginTop:15,
        height:80,
        width:100,
        borderRadius:30,
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
        justifyContent: 'space-around'
    },
    share: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    questionView: {
        marginTop: 20
    },
    shareView: {
        marginTop: 20
    },
    smallTitle: {
        height: 16,
        fontSize: 12,
        backgroundColor: '#eeeeee',
        width: 40,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
    }
});
export {MessageScreen}