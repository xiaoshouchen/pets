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
import APPCONFIG from './src/utils/app.core';
import {UPDATE} from './src/config/api';

export default class App extends Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        fetch(`${UPDATE}`).then((response) => response.json())
            .then((json) => {
                if (json.code === 200) {
                    if (Platform.OS === 'android') {
                        if (json.android.number > APPCONFIG.config.number) {
                            try {
                                NativeModules.upgrade.upgrade(json.android.url);
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    } else if (Platform.OS === 'ios') {
                        if (APPCONFIG.config.number) {
                            NativeModules.upgrade.openAPPStore('123daasd');
                        }
                    }
                    else {
                        //Do Nothing
                    }
                }
            })

    }

    render() {
        return (
            <RootNavigation/>
        );
    }
}
