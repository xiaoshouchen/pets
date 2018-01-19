import React, {Component} from 'react';
import {View, Text
} from 'react-native';

class ProductDetailScreen extends Component {
    static navigationOptions= {
        tabBarLabel: "分享您的经验或故事",
    }
    render(){
        const {currentItem}=this.props.navigation.state;
        const {navigate}=this.props.navigation;
        alert(currentItem)
        return(
            <View>
                <Text>1</Text>
            </View>
        )
    }
}
export {ProductDetailScreen}
