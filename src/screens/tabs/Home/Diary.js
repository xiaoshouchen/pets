import React, {Component} from 'react'
import {
    StyleSheet, Text, View, ScrollView, Image, FlatList, ActivityIndicator,
    TouchableOpacity, AsyncStorage
} from 'react-native'
import {Button} from "react-native-elements";
import {GET_MY_DIARY} from "../../../config/api";
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions'

class DiaryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: false
        }
    }

    static navigationOptions = {
        tabBarLabel: "日记",
        headerTitleStyle: {color: '#fff', fontSize: 18, fontWeight: 'normal'},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#fb8c00'},
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
                    this.getData(json.user_id);
                });
            }

        }).catch((e) => {
            alert(e);
        })

    }

    getData(user_id) {
        return fetch(GET_MY_DIARY + '?user_id=' + user_id)
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
            <ScrollView>
                <Swiper style={styles.wrapper} showsButtons={false}
                        height={Dimensions.get('window').width / 21 * 9}>
                    <View style={styles.slide1}>
                        <Image
                            source={{uri: "http://pic.90sjimg.com/design/00/60/20/09/07e07c138b19205e561a04611c3708f1.png"}}
                            style={{
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').width / 21 * 9
                            }}/>
                    </View>
                    <View style={styles.slide2}>
                        <Image
                            source={{uri: "http://pic.90sjimg.com/design/00/60/20/09/07e07c138b19205e561a04611c3708f1.png"}}
                            style={{
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').width / 21 * 9
                            }}/>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        keyExtractor={this.ExtraUniqueKey}
                        onRefresh={this.onRefresh}
                        refreshing={this.state.refreshing}
                        renderItem={({item}) => (
                            <View><Text>{item.title}</Text>
                                <Text>{item.created_at}</Text></View>
                        )}
                    />
                </View>
                <Button buttonStyle={{
                    backgroundColor: '#44a3ff',
                    borderRadius: 10,
                    marginTop: 40,
                    marginBottom: 40,
                    flex: 1,
                    marginRight: 10,
                    marginLeft: 10
                }}
                        onPress={() => navigate('addArticle')} title={'写日记'}/>
            </ScrollView>
        )
            ;
    }
}

const styles = StyleSheet.create(
    {
        avatar: {
            marginLeft: 20,
            marginTop: 5,
            marginRight: 20,
            height: 40,
            width: 40,
            borderRadius: 20,
            marginBottom: 5
        },
        container: {
            backgroundColor: 'white'
        },
        itemView: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60
        }
    }
)

export {DiaryScreen}
