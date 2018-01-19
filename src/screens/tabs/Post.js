import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Image, TouchableNativeFeedback
} from 'react-native';

class PostScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = {
        headerTitleStyle: {color: '#fff'},
        headerBackTitle: '个人资料',
        headerStyle: {backgroundColor: '#ff8302'},
        title: '帖子',
    }

    componentDidMount() {

        return fetch('http://123.207.217.225/api/article')
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

    render(){
        if (this.state.isLoading) {
            console.log(this.state.dataSource);
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        return(
            <View style={{backgroundColor: 'white'}}>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Image style={styles.avatar} source={{uri:'http://123.207.217.225/img/1/tx.jpg'}}/>
                    <Text style={styles.userName}>管理员</Text>
                    <Image style={styles.male} />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableNativeFeedback  onPress={() => this.componentDidMount()}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <Text style={{color: '#333', fontSize: 16, marginTop: 10}}>发帖</Text>
                            <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>2</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={{width: 1, height: 15, backgroundColor: '#f5f5f9'}}/>
                    <TouchableNativeFeedback  onPress={() => this.setState({dataSource: null})}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <Text style={{color: '#333', fontSize: 16, marginTop: 10}}>回复中</Text>
                            <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>2</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={{width: 1, height: 15, backgroundColor: '#f5f5f9'}}/>
                    <TouchableNativeFeedback  onPress={() => this.setState({dataSource: null})}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <Text style={{color: '#333', fontSize: 16, marginTop: 10}}>收藏</Text>
                            <Text style={{color: '#999', fontSize: 14, marginTop: 10, marginBottom: 15}}>3</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{height: 1, backgroundColor: '#f5f5f9'}}/>
                <FlatList

                    data={this.state.dataSource}

                    ItemSeparatorComponent={this.FlatListItemSeparator}

                    renderItem={({item}) => (
                        <View style={styles.item}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Image source={{url: item.avatar_img}} style={styles.avatar}/>
                                <View>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.date}>{item.created_at}</Text>
                                </View>
                            </View>
                            <Text style={styles.title} onPress={
                                () => this.props.navigation.navigate('ArticleDetail', {id: item.id})
                            }>
                                {item.type == undefined ? '【分享】' : item.type}{item.title}
                            </Text>
                            <Text style={styles.content}>{item.content}</Text>
                        </View>)

                    }

                    keyExtractor={(item, index) => index}

                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        fontSize:10,
        color:'#a19fa9'
    },
    userName:{
        fontSize:15,
        color:'#333'
    },
    male:{
        marginLeft:5,
        height:15,
        width:15
    },
})

export {PostScreen}