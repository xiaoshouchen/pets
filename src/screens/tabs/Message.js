import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Button, Image, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Dimensions from 'Dimensions'

const windowWidth = Dimensions.get('window').width;
const iconWidth = windowWidth / 4;

class MessageScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            html: props.editorHtml,
        }
    }

    static navigationOptions = {
        tabBarLabel: "秀一秀",
        showLabel: false,
        header: null,
        tabBarIcon: ({tintColor, focused}) => (
            <Icon
                name='camera'
                size={30}
                color={tintColor}
            />
        ),
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View>
                    <Text style={{fontSize: 30}}>小宠乐园</Text>
                    <View>
                        <Text>让养宠物变得简单点</Text>
                    </View>
                </View>
                <View style={styles.mainSection}>
                    <View style={styles.icons}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddArticle')}>
                            <View style={styles.main}>
                                <Image style={styles.imageView} source={require('../../image/post/share.png')}/>
                                <Text style={styles.nameView}>分享</Text>
                                <Text style={styles.textView}>经验或故事</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddArticle')}>
                            <View style={styles.main}>
                                <Image style={styles.imageView} source={require('../../image/post/ask.png')}/>
                                <Text style={styles.nameView}>提问</Text>
                                <Text style={styles.textView}>养宠难题</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddArticle')}>
                            <View style={styles.main}>
                                <Image style={styles.imageView} source={require('../../image/post/video.png')}/>
                                <Text style={styles.nameView}>说说</Text>
                                <Text style={styles.textView}>照片视频闲聊</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddArticle')}>
                            <View style={styles.main}>
                                <Image style={styles.imageView} source={require('../../image/post/diary.png')}/>
                                <Text style={styles.nameView}>日记</Text>
                                <Text style={styles.textView}>记录宠物日常</Text>
                            </View>
                        </TouchableOpacity>
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
            flex: 1,
            justifyContent: 'space-around'
        },
        icons: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: 'flex-end'
        },
        main: {
            width: iconWidth,
            alignItems: 'center'
        },
        mainSection: {
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
        },
        imageView: {
            marginTop: 15,
            height: 40,
            width: 40,
            borderRadius: 5,
        }
        ,
        nameView: {
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 10
        }
        ,
        textView: {
            marginTop: 10,
            fontSize: 10,
        }
        ,
    })
;
export {MessageScreen}