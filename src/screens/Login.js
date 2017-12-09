import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput} from 'react-native';
import { Card, PricingCard, ListItem, Button, Tile, FormLabel, FormInput } from 'react-native-elements';
import App from '../utils/app.core'
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      disableButton: true
    }
  }
  render() {
    const { navigate } = this.props.navigation;            
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <FormLabel
          textInputRef="textInputRef"
          containerStyle={styles.labelContainerStyle}
        >
          手机号
      </FormLabel>
        <TextInput
          ref="form1"
          textInputRef="textInputRef"
          placeholder="请输入您的手机号"
          keyboardType ='numeric'
          maxLength={11}
          onChangeText ={(text) => {
           this.setState({phone:{text}.text});
           if(this.state.phone.length==11&&this.state.password.length>6){
              this.setState({disableButton:false});
           }
           else{
             this.setState({disableButton:true});
           }
          }}
        />
        <FormLabel containerStyle={styles.labelContainerStyle}>
          密码
      </FormLabel>
        <TextInput
          ref="form2"
          containerRef="containerRefYOYO"
          textInputRef="textInputRef"
          placeholder="请输入您的密码"
          secureTextEntry={true}
          maxLength={16}
          onChangeText ={(text) => {
            this.setState({password:{text}.text});
            if(this.state.phone.length==11&&this.state.password.length>=6){
               this.setState({disableButton:false});
            }
            else{
              this.setState({disableButton:true});
            }

          }}
        />

        <Button
          disabled={this.state.disableButton}
          onPress={() => {
            App.setASCache('gloabl_login_token','123');
            navigate('Home'); 
          }}
          buttonStyle={{ marginTop: 15 }}
          title="登陆"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#00B233',
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
  labelContainerStyle: {
    marginTop: 8,
  },
});

export { LoginScreen };