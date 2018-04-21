import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image, ScrollView
} from 'react-native';
import {GET_ARTICLES} from '../../../../config/api';
import App from '../../../../utils/app.core';


class ItemScreen extends Component {

    static navigationOptions = {
        tabBarLabel: "萌宠",
        ...App.commonHeaderStyle,
        title: '用品使用',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            petType: '',
            petYear: ''
        }
    }

    componentDidMount() {

        return fetch(`${GET_ARTICLES}1&small_type=5&type_id=5&small_category=0`)
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
    ListHeaderComponent = () => {

    }

    GetFlatListItem(fruit_name) {

        Alert.alert(fruit_name);

    }

    render() {
        const {navigate} = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (

            <ScrollView style={styles.MainContainer}>
                <FlatList

                    data={this.state.dataSource}

                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({item}) => (
                        <View style={styles.item}>
                            <Image style={{width: 120, height: 90, marginVertical: 5, marginLeft: 5}}
                                   source={{uri: item.img[0]}}/>
                            <View style={{paddingLeft: 10}}>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        marginTop: 10,
                                        fontWeight: 'bold',
                                        width: 200
                                    }} onPress={() => {
                                    navigate('ArticleDetail', {id: item.id})
                                }}>{item.title}</Text>
                                <Text style={styles.content} numberOfLines={3}>{item.content}</Text>
                            </View>

                        </View>)
                    }
                    keyExtractor={(item, index) => index}

                />


            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: 'white',
        flex: 1
    },
    item: {
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row'
    },
    avatar: {
        marginLeft: 5,
        marginTop: 5,
        marginRight: 15,
        height: 40,
        width: 40,
        borderRadius: 20,
        marginBottom: 5
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5
    },
    name: {
        marginTop: 8,
    },
    date: {
        marginTop: 4,
        fontSize: 10,
        color: '#a19fa9'
    },
    content: {
        fontSize: 12,
        color: '#545454',
        marginTop: 10,
        width: 200
    },
    smallIcon: {
        width: 25,
        height: 25,
        marginRight: 12
    },

});

export {ItemScreen}