import React, {Component} from 'react'
import Text from "react-native-elements/src/text/Text";
import {ActivityIndicator, FlatList, TouchableOpacity, View} from "react-native";
import {GET_DOG_TYPES} from "../../../config/api";
class DogTypeScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = {
        headerTitleStyle: {color: '#fff'},
        headerStyle: {backgroundColor: '#44a3ff'},
        title: '宠物品种',
        tabBarLabel: '狗',
    }

    componentDidMount() {

        return fetch(GET_DOG_TYPES)
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

    render(){
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        const { state, goBack } = this.props.navigation;
        return(
            <View>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {state.params.callBack(item);goBack(null);goBack(null)}}>
                            <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
                                <Text style={{flexDirection: 'row', backgroundColor: 'white', height: 25, alignItems: 'center'}}>{item.name}</Text>
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