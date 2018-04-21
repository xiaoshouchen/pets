import React, {Component} from 'react'
import {ActivityIndicator, FlatList, TouchableOpacity, View, Text} from "react-native";
import {GET_CAT_TYPES} from "../../../config/api";
import App from '../../../utils/app.core';

class CatTypeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = {
        ...App.commonHeaderStyle,
        title: '宠物品种'
        ,
        tabBarLabel: '猫'
        ,
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
                    backgroundColor: "#d9d7e8",
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
            return (
                <View>
                    <FlatList
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        keyExtractor={(item, index) => index}
                        getItemLayout={(data, index) => (
                            // 120 是被渲染 item 的高度 ITEM_HEIGHT。
                            {length: 26, offset: 26 * index, index}
                        )}
                        initialNumToRender={50}
                        renderItem={({item}) =>
                            <TouchableOpacity onPress={() => {
                                state.params.callBack(item);
                                goBack(null)
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    height: 25,
                                    alignItems: 'center'
                                }}>
                                    <Text style={{fontSize: 14}}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
            )
        }

    }

}

export {CatTypeScreen}