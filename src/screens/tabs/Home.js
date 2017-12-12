import React, { Component } from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity,Button
} from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import{ArticleDetail}from '../details/forum/ArticleDetail';
import  App  from '../../utils/app.core'


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }
    static navigationOptions = ({ navigation }) => ({
        title: '小宠乐园',
        headerRight:
          <Button title={App.checkLogin() ? "+" : "登陆"}
            onPress={
              () => {
                if (App.checkLogin()) {
                  navigation.navigate('Message')
                }
                else { navigation.navigate('Login') }
  
              }
            }
          />,
        tabBarLabel: '主页',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name='home'
            size={30}
            type="MaterialIcons"
            color={tintColor}
          />
        ),
      })
    componentDidMount() {

        return fetch('http://192.168.123.170/pets/index.php/api/article')
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
                    backgroundColor: "#607D8B",
                }}
            />
        );
    }

    GetFlatListItem(fruit_name) {

        Alert.alert(fruit_name);

    }
    render() {
        const { navigate } = this.props.navigation;        
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (

            <View style={styles.MainContainer}>

                <FlatList

                    data={this.state.dataSource}

                    ItemSeparatorComponent={this.FlatListItemSeparator}

                    renderItem={({ item }) => (
                        <View>
                            <Text style={{ fontSize: 15 }} onPress={
                                () => navigate('ArticleDetail',{id:item.id})   
                            }>
                                {item.type==undefined?'【分享】':item.type}{item.title}
                            </Text>
                            <Text>{item.type}</Text>
                            <Text>{item.created_at}</Text>
                        </View>)

                    }

                    keyExtractor={(item, index) => index}

                />


            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    item: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
    },

    FlatListItemStyle: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },

});

export { HomeScreen }