import React, {Component} from 'react';
import {
    Modal,
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';

export class SearchModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.props.modalVisible == true ? this.state.modalVisible : !this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible)
                }}
            >
                <View style={{marginTop: 22}}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginLeft: 10,
                        marginRight: 10,
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            style={styles.input}
                            placeholder={'搜索'}
                            onChangeText={(text) => this.setState({
                                search: text
                            })}
                        />
                        <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                            <Text style={{width: 35, textAlign: 'center'}}>关闭</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{backgroundColor: '#F0F0F0', marginLeft: 10, marginTop: 20}}>
                        <Text>搜索历史</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        textAlign: 'left',
        flex: 1,
        height: 40,
        padding: 10,
        backgroundColor: '#F0F0F0',
        borderRadius: 20
    }
})

