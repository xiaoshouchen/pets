import React, {Component} from 'react';
import {
    StyleSheet, Text, View, ScrollView, Image, FlatList, ActivityIndicator,
    TouchableOpacity, AsyncStorage, Button, CheckBox
} from 'react-native';
import {GET_CARTS} from "../../../config/api";

class ShoppingCartScreen extends Component {

    static navigationOptions = {
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#44a3ff'},
        title: '购物车',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: false
        }
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
                    this.getData(json.user_id);
                });
            }

        }).catch((e) => {
            alert(e);
        })

    }

    getData(user_id) {
        return fetch(GET_CARTS + '?user_id=' + user_id)
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

    ExtraUniqueKey(item, index) {
        return "index" + index + item;
    }

    onRefresh = () => {
        this.setState({
            refreshing: true,
        });
        const timer = setTimeout(() => {
            clearTimeout(timer);
            this.setState({
                refreshing: false,
            });
        }, 100);
        this.componentDidMount();
    };

    callBack() {
        this.componentDidMount();
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
            <View>
                <ScrollView>
                    <View style={styles.container}>
                        <FlatList
                            data={this.state.dataSource}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            keyExtractor={this.ExtraUniqueKey}
                            onRefresh={this.onRefresh}
                            refreshing={this.state.refreshing}
                            renderItem={({item}) => (
                                <View style={styles.itemView}>
                                    <View>
                                        <CheckBox></CheckBox>
                                    </View>
                                    <View>
                                        <Image source={{uri: item.img1}} style={styles.product_img}/>
                                    </View>
                                    <View style={styles.itemView}>
                                        <View style={{justifyContent: 'flex-start'}}>
                                            <Text style={{fontSize: 16}}>{item.title}</Text>
                                            <Text style={{
                                                fontSize: 16,
                                                color: 'red',
                                                margin: 5
                                            }}>￥ {item.price / 100}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginRight: 15}}>
                                        <Image source={require('../../../image/edit.png')}
                                               style={{width: 30, height: 30}}/>
                                    </View>
                                </View>)}/>
                    </View>
                </ScrollView>
                <View>
                    <Button buttonStyle={{
                        backgroundColor: '#44a3ff',
                        borderRadius: 10,
                        marginTop: 40,
                        marginBottom: 40,
                        flex: 1,
                        marginRight: 10,
                        marginLeft: 10
                    }}
                            onPress={() => navigate('AddPet', {callBack: () => this.callBack()})} title={'结算'}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: 'white'
        },
        itemView: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        product_img: {
            width: 100,
            height: 100,
            margin: 10
        },
    }
)
export {ShoppingCartScreen}