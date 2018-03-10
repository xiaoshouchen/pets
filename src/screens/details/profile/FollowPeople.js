import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image, AsyncStorage
} from 'react-native';
import {Icon} from 'react-native-elements'
import {MY_FOLLOWS} from "../../../config/api";

class FollowPeopleScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = {
        headerTitleStyle: {color: '#fff', fontSize: 18, fontWeight: 'normal'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#4fc3f7'},
        title: '关注',
    }

    componentDidMount() {
        AsyncStorage.getItem('login').then((result) => {
            //alert(result);
            if (result == null) {
                this.setState({login: {token: '', user_id: ''}})
            }
            else {
                this.setState({login: result}, function () {
                    let json = JSON.parse(this.state.login);
                    console.log(json)
                    this.getData(json.user_id, json.token);
                });
            }

        }).catch((e) => {
            alert(e);
        })

    }

    getData(user_id, token) {
        return fetch(MY_FOLLOWS + '?user_id=' + user_id + '&token=' + token)
            .then((response) => response.json())
            .then((responseJson, key) => {
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
        const {navigate} = this.props.navigation;
        if (this.state.isLoading) {
            return (<ActivityIndicator style={{paddingTop: 120}}/>);
        }
        return (
            <View>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    keyExtractor={this.ExtraUniqueKey}
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}
                    renderItem={({item}) => (
                        <TouchableOpacity>
                            <View style={styles.itemView}>
                                <View style={styles.itemView}>
                                    <Image style={styles.avatar} source={{uri: item.avatar_img}}/>
                                    <View style={{justifyContent: 'space-around'}}>
                                        <Text style={{fontSize: 16}}>{item.name}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#05a7dc',
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
    },
    labelContainerStyle: {
        marginTop: 8,
    },
    itemView: {},
    avatar: {}
});
export {FollowPeopleScreen}