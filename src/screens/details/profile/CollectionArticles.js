import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image, AsyncStorage
} from 'react-native';
import {MY_RESTORES} from '../../../config/api';
import App from '../../../utils/app.core';
import Dimensions from 'Dimensions';

class CollectionArticlesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
        this.getData = this.getData.bind(this);
    }

    static navigationOptions = {
        headerTitle: '文章收藏',
        ...App.commonHeaderStyle,
    };

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
        return fetch(MY_RESTORES + '?user_id=' + user_id + '&token=' + token)
            .then((response) => response.json())
            .then((responseJson, key) => {
                if (responseJson.code === 200) {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.data
                    }, function () {
                        // In this block you can do something with new state.
                    });
                } else {
                    alert("数据加载错误");
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 5,
                    width: "100%",
                    //backgroundColor: "#EEE",
                }}
            />
        );
    }

    ExtraUniqueKey(item, index) {
        return "index" + index + item;
    }

    render() {
        const {navigate} = this.props.navigation;
        if (this.state.isLoading) {
            return (<ActivityIndicator style={{paddingTop: 120}}/>);
        }
        return (
            <View style={styles.main}>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    keyExtractor={this.ExtraUniqueKey}
                    renderItem={({item, index}) => (
                        <View style={styles.item}>
                            <Image style={styles.image} source={{uri: item.img}}/>
                            <TouchableOpacity onPress={() => navigate('ArticleDetail', {id: item.article_id})}>
                                <View style={styles.itemView}>
                                    <View style={styles.itemView}>
                                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                            <Text style={styles.title}>{item.title}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
        main: {
            backgroundColor: '#fff',
            justifyContent: 'flex-start',
            flex: 1
        },
        item: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        heading: {
            color: 'white',
            marginTop: 10,
            fontSize: 22,
        },
        labelContainerStyle: {
            marginTop: 8,
        },
        itemView: {
            flexDirection: 'row'
        },
        title: {
            fontWeight: 'bold',
            width: Dimensions.get('window').width * 0.6,
            lineHeight: 25

        },
        image: {
            height: Dimensions.get('window').width * 0.2,
            width: Dimensions.get('window').width * 0.3,
            marginHorizontal: 10,
            marginVertical: 8,
            borderRadius: 5
        }
    })
;
export {CollectionArticlesScreen}