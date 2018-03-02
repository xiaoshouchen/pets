import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    Text,
    View,
    TextInput
} from 'react-native';

import RichEditor from 'react-native-webview-richeditor';
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

    static navigationOptions = ({navigation}) => ({
        tabBarLabel: "",
        headerRight:
            <Button title="发布" onPress={() => navigation.state.params.postArticle()} style={{marginRight: 15}}/>,
        headerTitle: '与他人分享宠物点滴',
    });

    post() {
        //alert('fsd');
        let formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('user_id', 1);
        formData.append('content', this.editor.state.editorHtml);
        formData.append('category', 2);
        formData.append('tags', 'tags');
        formData.append('type', 1);
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
        return (
            <View style={styles.container}>
                <Text style={styles.text}>请输入您的标题</Text>
                <TextInput
                    autoFocus={true}
                    underlineColorAndroid='transparent'
                    style={styles.input}
                    placeholder="标题"
                    onChangeText={(text) => this.setState({title: text})}
                />
                <Text style={styles.text}>输入您要分享的内容</Text>
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
