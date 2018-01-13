import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView, Button, Image, TextInput, Picker} from 'react-native'

class AddPet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: ''
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <View style={styles.itemView}>
                    <Text>宠物头像</Text>
                    <Text>请选择</Text>
                </View>
                <View style={styles.itemView}>
                    <Text>宠物名字</Text>
                    <TextInput style={styles.input} placeHolder={'宠物名称'}/>

                </View>
                <View style={styles.itemView}>
                    <Text>宠物性别</Text>
                    <Picker
                        selectedValue={this.state.sex}
                        onValueChange={(sex) => this.setState({sex: sex})}>
                        <Picker.Item label="Java" value="java"/>
                        <Picker.Item label="JavaScript" value="js"/>
                    </Picker>
                </View>
                <View style={styles.itemView}>
                    <Text>宠物生日</Text>
                    <Text>fds</Text>
                </View>
                <View style={styles.itemView}>
                    <Text>宠物品种</Text>
                    <Text>fds</Text>
                </View>
            </View>
        )
            ;
    }
}

export {AddPet}
const styles = StyleSheet.create(
    {
        itemView: {
            flexDirection: 'row'
        },
        input: {
            height: 40,
        }
    }
)