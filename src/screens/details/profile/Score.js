import React, {Component} from 'react';
import {
    StyleSheet, FlatList, Text, View,
    Alert, ActivityIndicator, Platform, TouchableOpacity, Image
} from 'react-native';
import App from "../../../utils/app.core";

class ScoreScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions = {
        ...App.commonHeaderStyle,
        title: '积分',
    }

    componentDidMount() {

    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "80%",
                    backgroundColor: "#eeeeee",
                }}
            />
        );
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.description}>
                    <Text style={{fontSize: 30}}>100</Text>
                    <Text>分</Text>
                    <Text style={styles.descriptionText}
                          onPress={() => this.props.navigation.navigate('ArticleDetail', {id: 1})}>积分说明</Text>
                </View>
                <View style={styles.goods}>
                    <Text style={{margin: 10}}>积分商城即将上线</Text>
                    <Text style={{margin: 10}}>积分可以在积分商城直接购买商品</Text>
                    <Text style={{margin: 10}}>积分可以在普通商城作为现金抵扣</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    description: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    descriptionText: {
        fontSize: 12,
        color: '#912CEE',
    },
    goods: {
        flex: 1
    },
    product_img: {
        width: 100,
        height: 100,
        margin: 10
    },
    product_price: {
        paddingTop: 6,
        fontSize: 14,
        color: 'red'
    },
    product_title: {
        paddingTop: 10,
        fontSize: 14,
        color: "black"
    },
    product_describe: {
        paddingTop: 6,
        fontSize: 12,
    },
})

export {ScoreScreen}