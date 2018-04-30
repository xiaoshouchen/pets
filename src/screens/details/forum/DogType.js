import React, {Component} from 'react'
import {ActivityIndicator, FlatList, TouchableOpacity, View, TextInput, Text} from "react-native";
import {GET_DOG_TYPES} from "../../../config/api";
import App from '../../../utils/app.core'
import Dimensions from 'Dimensions';

class DogTypeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            filterText: '',
            isLoading: true
        }
    }

    static navigationOptions = {
        ...App.commonHeaderStyle,
        title: '宠物品种',
        tabBarLabel: '汪星人',
    }

    componentDidMount() {
        let userInfo = App.getUserInfo();
        userInfo.then((data) => {
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
        const filterRegex = new RegExp(String(this.state.filterText), 'i');
        const filter = (item) => (
            filterRegex.test(item.name) || filterRegex.test(item.title)
        );
        const filteredData = this.state.dataSource.filter(filter);
        return (
            <View style={{backgroundColor: 'white', flex: 1}}>
                <TextInput
                    style={{width: Dimensions.get('window').width, height: 50, borderRadius: 10,marginLeft: 20,}}
                    onChangeText={(text) => {
                        this.setState({filterText: {text}.text})
                    }}
                    placeholder="搜索..."
                    value={this.state.filterText}
                />
                <FlatList
                    data={filteredData}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {
                            state.params.callBack(item);
                            goBack(null);
                            goBack(null);
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    lineHeight: 50,
                                    marginLeft: 20,
                                    fontWeight: 'bold',
                                    alignSelf: 'center'
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