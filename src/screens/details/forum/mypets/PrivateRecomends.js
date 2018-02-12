import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class PrivateRecommendScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            petType: '',
            petYear: ''
        }
    }
    static navigationOptions = ({navigation}) => ({
        tabBarLabel: "萌宠",
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#44a3ff'},
        title: '饮食搭配'
    })

    componentDidMount() {

        return fetch('http://123.207.217.225/api/articles?pageNo=1')
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
                <View style={{overflow: 'hidden'}}>
                    <View>
                        <Text>您的宠物品种为：</Text>
                        <Text>{this.state.petType}</Text>
                    </View>
                    <View>
                        <Text>您的宠物年龄为：</Text>
                        <Text>{this.state.petYear}</Text>
                    </View>
                    <Text>您的宠物可以使用以下食物：</Text>
                </View>
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

export {PrivateRecommendScreen}