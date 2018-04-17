import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions, Platform
} from 'react-native';
import App from '../../../utils/app.core';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import {WaitScreen} from "./Lists/Wait";
import {MissScreen} from "./Lists/Miss";
import {DoneScreen} from "./Lists/Done";

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

class NoticeListsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                {key: 'wait', title: '待完成'},
                {key: 'done', title: '已完成'},
                {key: 'miss', title: '已过期'},
            ],
            isLoading: true,
            currentPet: null,
        };
        this._getNotices = this._getNotices.bind(this);
    }

    static navigationOptions = ({navigation}) => ({
        tabBarLabel: "萌宠",
        ...App.commonHeaderStyle,
        title: '宠物提醒',
        headerRight: <TouchableOpacity
            onPress={() => navigation.navigate('AddNotice')}
        ><Text style={{color: '#ffffff', fontWeight: 'bold', marginRight: 15}}>提醒 + </Text>
        </TouchableOpacity>,
    });

    _getNotices(pet_id) {
        //get notices of pet
        fetch().then((response) => response.json()).then((responseJson) => {

        }).catch((e) => console.log(e));
    }

    _handleIndexChange = index => this.setState({index});

    _renderHeader = props => <TabBar {...props} style={styles.header} tabStyle={styles.tab} labelStyle={styles.label}
                                     indicatorStyle={styles.indicator}/>;

    _renderScene = SceneMap({
        wait: WaitScreen,
        done: DoneScreen,
        miss: MissScreen
    });

    render() {
        return (
            <TabViewAnimated
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
                initialLayout={initialLayout}
            />
        );
    }


}

const styles = StyleSheet.create({
    main: {},
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: '#fff',
        color: 'blue'
    },
    label: {
        color: '#000'
    },
    tab: {
        color: '#000'
    },
    indicator: {
        color: '#646464'
    }
})

export {NoticeListsScreen}