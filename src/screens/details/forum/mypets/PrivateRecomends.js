import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Button, Image, ScrollView
} from 'react-native';
import {GET_ARTICLES} from "../../../../config/api";
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions'

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
        headerTitleStyle: {color: '#fff',fontSize:18,fontWeight:'normal'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#4fc3f7'},
        title: '饮食搭配'
    })

    componentDidMount() {

        return fetch(`${GET_ARTICLES}1&small_type=1&type_id=5&small_category=0`)
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
                <Text>热门推荐</Text>
                <Swiper style={styles.wrapper} showsButtons={false} height={150}>
                    <View style={styles.slide1}>
                        <Image
                            source={require('../../../../image/food_back.jpg')}
                            style={{
                                width: Dimensions.get('window').width,
                                height: 150
                            }}/>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>
                <View>
                    <FlatList
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({item}) => (

                            <View style={styles.item}>
                                <Text style={styles.title} onPress={
                                    () => navigate('ArticleDetail', {id: item.id})
                                }>
                                    {item.type == undefined ? '【分享】' : item.type}{item.title}
                                </Text>
                                <Text style={styles.content}>{item.content}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    height: 40
                                }}>
                                    <TouchableOpacity>
                                        <Image source={require('../../../../image/forum/like.png')}
                                               style={styles.smallIcon}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image source={require('../../../../image/forum/restore.png')}
                                               style={styles.smallIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>)
                        }
                        keyExtractor={(item, index) => index}
                    />
                </View>
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
    },
    smallIcon: {
        width: 20,
        height: 20,
        marginRight: 12
    },

});

export {PrivateRecommendScreen}