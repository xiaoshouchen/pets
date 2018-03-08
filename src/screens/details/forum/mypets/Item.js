import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {GET_ARTICLES} from '../../../../config/api';

class ItemScreen extends Component {

    static navigationOptions = {
        tabBarLabel: "萌宠",
        headerTitleStyle: {color: '#fff',fontSize:18,fontWeight:'normal'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#4fc3f7'},
        title: '用品',
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
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Image source={{uri: item.avatar_img}} style={styles.avatar}/>
                                <View>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.date}>{item.created_at}</Text>
                                </View>
                            </View>
                            <Text style={styles.title} onPress={
                                () => navigate('ArticleDetail', {id: item.id})
                            }>
                                {item.type == undefined ? '【分享】' : item.type}{item.title}
                            </Text>
                            <Text style={styles.content}>{item.content}</Text>
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <TouchableOpacity>
                                    <Icon
                                        name='star'
                                        size={16}
                                        color='yellow'
                                    />
                                </TouchableOpacity>
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
        marginLeft: 5,
        fontSize: 12,
        color: '#495863',
        marginBottom: 10
    }

});

export {ItemScreen}