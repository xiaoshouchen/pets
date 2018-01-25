import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView, Button, Image, FlatList, ActivityIndicator} from 'react-native'
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
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        const {navigate}=this.props.navigation;
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({item}) => (
                        <View style={styles.itemView}>
                            <Image style={styles.avatar} source={{uri: item.avatar}} />
                            <View>
                                <Text>{item.name}</Text>
                            </View>
                        </View>
                    )}
                />
                <Button onPress={()=>navigate('AddPet')} title={'添加宠物'}/>
            </View>
        )
            ;
    }
}

const styles=StyleSheet.create(
    {
        avatar: {
            marginLeft: 5,
            marginTop: 5,
            marginRight: 15,
            height: 40,
            width: 40,
            borderRadius: 20,
            marginBottom: 5
        },
        container:{
            backgroundColor:'white'
        },
        itemView:{
          flexDirection:'row'
        }
    }
)

export {PetList}
