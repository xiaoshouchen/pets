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

class AddArticle extends Component {
    constructor(props) {
        super(props);
        this, state = {
            title: '',
            html: '',
            type: '',//文章的类型
        }
        this.post = this.post.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        tabBarLabel: "分享您的经验或故事",
        headerRight:
            <Button title="Save" onPress={() => navigation.state.params.postArticle()}/>

        ,
        title: '分享您的经验或故事',
        tabBarIcon: ({tintColor, focused}) => (
            <Icon
                name='bell'
                size={20}
                type='font-awesome'
                color={tintColor}
            />
        ),
    });

    post() {
        alert(this.editor.state.editorHtml);
        fetch('http://192.168.123.170/pets/index.php/api/article', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'yourValue',
                token: '123456',
                content: this.editor.state.editorHtml,
            }),
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
                <View style={styles.titleView}>
                    <TextInput style={{placeholder: '输入文章标题'}}/>
                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    titleView: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    }
});
