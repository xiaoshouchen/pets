import React, {Component} from 'react'
import Text from "react-native-elements/src/text/Text";
import {FlatList, View} from "react-native";
class DogTypeScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = {
        headerTitleStyle: {color: '#fff'},
        headerStyle: {backgroundColor: '#ff8302'},
        title: '宠物品种',
        tabBarLabel: '狗',
    }

    componentDidMount() {

        return fetch('http://123.207.217.225/api/pets/type/dog')
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
        return(
            <View>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({item}) => (
                        <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
                            <Text>{item.name}</Text>
                        </View>)
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }

}

export {DogTypeScreen}