import React, {Component} from 'react'
import {ActivityIndicator, FlatList, TouchableOpacity, View, TextInput, Text} from "react-native";
import {GET_DOG_TYPES} from "../../../config/api";
import App from '../../../utils/app.core'

class DogTypeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    static navigationOptions = {
        ...App.commonHeaderStyle,
        title: '宠物品种',
        tabBarLabel: '狗',
    }

    componentDidMount() {
        let userInfo=App.getUserInfo();
        userInfo.then((data)=>{
            fetch(`${GET_DOG_TYPES}?user_id=${data.user_id}&token=${data.token}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson
                    }, function () {
                        // In this block you can do something with new state.
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        })

    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#d9d7e8",
                }}
            />
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        const {state, goBack} = this.props.navigation;
        return (
            <View>
                <TextInput
                    underlineColorAndroid='transparent'
                    onChangeText={({text}) => this.setState({text})}
                    value={this.state.text}/>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {
                            state.params.callBack(item);
                            goBack(null);
                            goBack(null)
                        }}>
                            <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
                                <Text style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    height: 40,
                                    alignItems: 'center'
                                }}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>)
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }

}

export {DogTypeScreen}