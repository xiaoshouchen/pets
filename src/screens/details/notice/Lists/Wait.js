import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions, FlatList, Image
} from 'react-native';
import App from '../../../../utils/app.core';
import {GET_WAIT_NOTICES} from "../../../../config/api";

class WaitScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            notices: [],
            isLoading: true,
            currentPet: null,
        };
        this._getNotices = this._getNotices.bind(this);
    }

    componentDidMount() {
        let userInfo = App.getUserInfo();
        userInfo.then((data) => {
            this._getNotices(44, data.user_id, data.token);
        })

    }

    _getNotices(pet_id, user_id, token) {

        //get notices of pet
        fetch(`${GET_WAIT_NOTICES}?user_id=${user_id}&state=wait&pet_id=${pet_id}&token=${token}`)
            .then((response) => response.json()).then((responseJson) => {
            this.setState({notices: responseJson.data})

        }).catch((e) => console.log(e));
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "64%",
                    backgroundColor: "#eeeeee",
                    alignSelf: 'flex-end'
                }}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}><FlatList
                data={this.state.notices}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                ListEmptyComponent={() => {
                    return <View style={styles.goodsEmptyView}>
                        <Text>当前暂无提醒，您可以添加新的提醒</Text>
                    </View>
                }
                }
                keyExtractor={(item, index) => index}
                renderItem={({item}) => {
                    return <View style={{height: 100, flexDirection: 'row'}}>
                        <Image style={{width: 90, height: 90, marginVertical: 5, marginLeft: 20}}
                               source={{uri: item.avatar}}/>
                        <View style={{paddingLeft: 20}}>
                            <Text style={{
                                marginTop: 10,
                                fontWeight: 'bold'
                            }}>{item.date}</Text>
                            <Text style={{height: 20, marginTop: 10}}>{item.place}</Text>
                            <Text style={{height: 20, marginTop: 10}}>{item.thing}</Text>
                        </View>
                    </View>
                }}/>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    main: {},
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    header: {
        backgroundColor: '#ebaa19',
    }
})

export {WaitScreen}