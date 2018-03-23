import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    Text,
    View,
    TextInput,
    TouchableOpacity, AsyncStorage
} from 'react-native';

import RichEditor from 'react-native-richeditor';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {ADD_ARTICLE} from "../../../config/api";

class AddArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '测试',
            html: '',
            type: '',//文章的类型
        }
        this.post = this.post.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        let _Title='';
        const {params} = navigation.state;
        switch (params.type_id) {
            case 3:
                _Title = "记录我与宠物的点滴";
                break;
            case 2:
                _Title = "分享我的养宠故事或经验";
                break;
            case 1:
                _Title = "提出您在宠物上遇到的难题";
        }
        return {
            title: _Title,
            tabBarLabel: "",
            headerTitleStyle: {color: '#fff', fontSize: 18, fontWeight: 'normal'},
            headerBackTitle: null,
            headerStyle: {backgroundColor: '#4fc3f7'},
            headerRight:
                <TouchableOpacity onPress={() => navigation.state.params.postArticle()}>
                    <Text style={{
                        backgroundColor: '#4fc3f7',
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginRight: 20
                    }}>发布</Text>
                </TouchableOpacity>,
        };
    };
    componentWillMount() {
        AsyncStorage.getItem('login').then((result) => {
            //alert(result);
            if (result == null) {
                this.setState({login: {token: '', user_id: ''}})
            }
            else {
                let json=JSON.parse(result);
                this.setState({login: {user_id: json.user_id, token: json.token}})
            }

        }).catch((e) => {
            alert('网络发生错误');
        })
    }
    post() {
        //alert('fsd');
        const {params} = this.props.navigation.state;
        let formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('user_id', this.state.login.user_id);
        formData.append('content', this.editor.state.editorHtml);
        formData.append('category', 2);
        formData.append('tags', 'tags');
        formData.append('type', params.type_id);
        formData.append('visit', 0);
        fetch(ADD_ARTICLE, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.navigation.navigate('Home');
            });
    }

    componentDidMount() {
        this.props.navigation.setParams({postArticle: this.post});
    }

    render() {
        const {params} = this.props.navigation.state;
        let _Title='';
        switch (params.type_id) {
            case 3:
                _Title = "日记仅自己可见，记录下我与宠物的小秘密";
                break;
            case 2:
                _Title = "分享经验可以获得商品优惠以及精美礼品哦";
                break;
            case 1:
                _Title = "简要描述您的问题";
        }
        return (
            <View style={styles.container}>
                <Text style={styles.text}>请输入您的标题</Text>
                <TextInput
                    autoFocus={true}
                    underlineColorAndroid='transparent'
                    style={styles.input}
                    placeholder={_Title}
                    onChangeText={(text) => this.setState({title: text})}
                />
                <Text style={styles.text}>输入您的内容</Text>
                <RichEditor ref={(ref) => this.editor = ref}/>
                <KeyboardSpacer/>
            </View>
        );
    }
}

export {AddArticle};
const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        input: {
            marginTop: 10,
            height: 40,
            borderColor: '#eeeeee',
            borderWidth: 1
        },
        text: {
            marginTop: 15,
            fontSize: 16
        }
    })
;
