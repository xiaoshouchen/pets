import React, {Component} from 'react'
import {StyleSheet, Text, View, Button, Image, ActivityIndicator} from 'react-native'
import {GET_PETS} from "../../../config/api";
import {SwipeListView} from "react-native-swipe-list-view";

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
                <SwipeListView
                    useFlatList = {true}
                    closeOnRowPress = {true}
                    closeOnScroll = {true}
                    closeOnRowBeginSwipe = {true}
                    data={this.state.dataSource}
                    renderItem={ (data, rowMap) => (
                        <View style={styles.rowFront}>
                            <Image style={styles.avatar} source={{uri: data.item.avatar}} />
                            <View>
                                <Text>{data.item.name}</Text>
                            </View>
                        </View>
                    )}
                    renderHiddenItem={ (data, rowMap) => (
                        <View style={styles.rowBack}>
                            <Text style={{backgroundColor: 'green'}}>修改</Text>
                            <Text style={{backgroundColor: 'red',marginLeft: 30}}>删除</Text>
                        </View>
                    )}
                    leftOpenValue={75}
                    rightOpenValue={-75}
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
        },
        rowFront: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white',
            borderBottomColor: '#CCC',
            borderBottomWidth: 1,
            height: 50,
        },
        rowBack: {
            alignItems: 'center',
            backgroundColor: '#DDD',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingLeft: 15,
        },
    }
)

export {PetList}
