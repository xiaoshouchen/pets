import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Button,
  Text,
  View
} from 'react-native';

import RichEditor from 'react-native-webview-richeditor';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class AddArticle extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Button title="test" onPress={()=>{
      fetch('https://192.168.123.170/pets/api/article', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstParam: 'yourValue',
          token:'123456',
          content: this.refs.editor.state.editorHtml,
        }).then(alert('提交成功')),
      });
        
        }}/>
        <RichEditor ref="editor"/>
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
    backgroundColor: '#F5FCFF',
  },
});
