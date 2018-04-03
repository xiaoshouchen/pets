/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    NativeModules, Platform
} from 'react-native';
import RootNavigation from './src/config/routes'


export default class App extends Component {

    componentWillMount() {
        let update=false;
        if (Platform.OS == 'android') {
            if (update){
                NativeModules.upgrade.upgrade("http://oz4snvss0.bkt.clouddn.com/anjuke_11.7.1_321843_b688.apk");
            }
        } else if (Platform.OS === 'ios') {

        }
    }

    render() {
        return (
            <RootNavigation/>
        );
    }
}
