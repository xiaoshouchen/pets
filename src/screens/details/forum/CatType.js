import React, {Component} from 'react'
import {ActivityIndicator, FlatList, TouchableOpacity, View, Text, TextInput} from "react-native";
import {GET_CAT_TYPES} from "../../../config/api";
import App from '../../../utils/app.core';
import Dimensions from 'Dimensions';

class CatTypeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            filterText: ''
        }
    }

    static navigationOptions = {
        ...App.commonHeaderStyle,
        title: '宠物品种',
        tabBarLabel: '喵星人',
    }

    componentDidMount() {
        let userInfo = App.getUserInfo();
        userInfo.then((data) => {
            fetch(`${GET_CAT_TYPES}?user_id=${data.user_id}&token=${data.token}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        dataSource: responseJson
                    }, function () {
                        // In this block you can do something with new state.
                        this.setState({
                            isLoading: false,
                        })
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
                    backgroundColor: "#efecff",
                }}
            />
        );
    }

    render() {
        const {state, goBack} = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        else {
            const filterRegex = new RegExp(String(this.state.filterText), 'i');
            const filter = (item) => (
                filterRegex.test(item.name) || filterRegex.test(item.title)
            );
            const filteredData = this.state.dataSource.filter(filter);
            return (
                <View style={{backgroundColor: 'white', flex: 1}}>
                    <TextInput
                        style={{width: Dimensions.get('window').width, height: 50, borderRadius: 10, marginLeft: 20,}}
                        onChangeText={(text) => {
                            this.setState({filterText: {text}.text})
                        }}
                        placeholder="搜索..."
                        value={this.state.filterText}
                    />
                    <FlatList
                        data={filteredData}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        keyExtractor={(item, index) => index}
                        getItemLayout={(data, index) => (
                            // 120 是被渲染 item 的高度 ITEM_HEIGHT。
                            {length: 26, offset: 26 * index, index}
                        )}
                        initialNumToRender={50}
                        renderItem={({item}) =>
                            <View>
                                <TouchableOpacity onPress={() => {
                                    state.params.callBack(item);
                                    goBack(null)
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
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </View>
            )
        }

    }

}

export {CatTypeScreen}