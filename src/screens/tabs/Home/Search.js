import React, { Component } from 'react';
import {
    Modal,
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';

export class SearchModal extends Component{

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true
        }
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    render(){
        return(
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.props.modalVisible == true? this.state.modalVisible:!this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
            >
                <View style={{marginTop: 22}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between',marginLeft: 15, marginRight: 15, alignItems: 'center'}}>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            style={styles.input}
                            placeholder ={'搜索'}
                            onChangeText={(text) => this.setState({
                                search: text
                            })}
                        />
                        <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                            <Text>关闭</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        textAlign: 'left',
        flex:1,
        height: 40,
        padding: 0,
        backgroundColor: 'grey'
    }
})

