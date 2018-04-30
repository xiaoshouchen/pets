import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Button, Image, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Dimensions from 'Dimensions'
import StartRecord from '../../utils/StartRecord'

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
        tabBarLabel: " ",
        showLabel: false,
        header: null,
        tabBarIcon: ({focused}) => {

            if (!focused) {
                return <Image source={require('../../image/plus.png')} style={{width: 48, height: 48}}/>
            }
            else {
                return <Image source={require('../../image/plus-active.png')} style={{width: 48, height: 48}}/>
            }
        }
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.topic}>
                    <View>
                        <Text style={{fontSize: 24, marginVertical: 20}}>捏捏宠</Text>
                    </View>
                    <View>
                        <Text>高质量的宠物社区</Text>
                    </View>
                </View>
                <View style={styles.mainSection}>
                    <View style={styles.icons}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddArticle', {type_id: 1})}>
                            <View style={styles.main}>
                                <Image style={styles.imageView} source={require('../../image/post/share.png')}/>
                                <Text style={styles.nameView}>分享</Text>
                                <Text style={styles.textView}>经验或故事</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddArticle', {type_id: 2})}>
                            <View style={styles.main}>
                                <Image style={styles.imageView} source={require('../../image/post/ask.png')}/>
                                <Text style={styles.nameView}>提问</Text>
                                <Text style={styles.textView}>养宠难题</Text>
                            </View>
                        </TouchableOpacity>

                        {/*<TouchableOpacity onPress={() => StartRecord.start()}>*/}
                        {/*<View style={styles.main}>*/}
                        {/*<Image style={styles.imageView} source={require('../../image/post/video.png')}/>*/}
                        {/*<Text style={styles.nameView}>视频</Text>*/}
                        {/*<Text style={styles.textView}>拍摄生活点滴</Text>*/}
                        {/*</View>*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddArticle', {type_id: 3})}>
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

const
    styles = StyleSheet.create({
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
        },
        nameView: {
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 10
        },
        textView: {
            marginTop: 10,
            fontSize: 10,
        },
        topic: {
            alignItems: 'flex-start',
            marginLeft: -150
        }
    })
;
export {
    MessageScreen
}