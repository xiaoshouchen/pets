import React, {Component} from 'react'
import Text from "react-native-elements/src/text/Text";
import {ActivityIndicator, FlatList, TouchableOpacity, View} from "react-native";
import {GET_OTHER_TYPES} from "../../../config/api";
import App from '../../../utils/app.core';

class OtherTypeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = {
        ...App.commonHeaderStyle,
        title: '宠物品种',
        tabBarLabel: '其它',
    }

    componentDidMount() {
        let userInfo = App.getUserInfo();
        userInfo.then((data) => {
            fetch(`${GET_OTHER_TYPES}?user_id=${data.user_id}&token=${data.token}`)
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
            <View style={{backgroundColor: 'white', flex: 1}}>
                <FlatList
                    data={this.state.dataSource}
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

export {OtherTypeScreen}