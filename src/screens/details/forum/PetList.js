import React, {Component} from 'react'
import {
    StyleSheet, Text, View, ScrollView, Image, FlatList, ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import {Button} from "react-native-elements";
import {GET_PETS} from "../../../config/api";

class PetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {

        return fetch(GET_PETS + '?user_id=2')
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
                    height: 10,
                    width: "100%",
                    backgroundColor: "#f5f5f9",
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
        const {navigate} = this.props.navigation;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('AddPet', {item: item})}>
                                <View style={styles.itemView}>
                                    <View style={styles.itemView}>
                                        <Image style={styles.avatar} source={{uri: item.avatar}}/>
                                        <View style={{justifyContent: 'space-around'}}>
                                            <Text style={{fontSize: 16, fontColor: '#333'}}>{item.name}</Text>
                                            <Text style={{
                                                fontSize: 14,
                                                marginRight: 20,
                                                fontColor: '#999'
                                            }}>{item.small_type_id} {item.sex == 0 ? '母' : '公'} </Text>
                                        </View>
                                    </View>
                                    <View style={{marginRight: 15}}>
                                        <Image source={require('../../../image/edit.png')}
                                               style={{width: 30, height: 30}}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <Button buttonStyle={{
                    backgroundColor: '#44a3ff',
                    borderRadius: 10,
                    marginTop: 40,
                    marginBottom: 40,
                    width: 350
                }}
                        onPress={() => navigate('AddPet')} title={'添加宠物'}/>
            </ScrollView>
        )
            ;
    }
}

const styles = StyleSheet.create(
    {
        avatar: {
            marginLeft: 20,
            marginTop: 5,
            marginRight: 20,
            height: 40,
            width: 40,
            borderRadius: 20,
            marginBottom: 5
        },
        container: {
            backgroundColor: 'white'
        },
        itemView: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60
        }
    }
)

export {PetList}
