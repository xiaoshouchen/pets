import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView, Button, Image,FlatList} from 'react-native'

class PetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [{key :'fdsfsd'}]
        }
    }


    render() {
        const {navigate}=this.props.navigation;
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.separator}
                    renderItem={({item}) => (
                        <View style={styles.itemView}>
                            <Image style={styles.itemImage} source={{uri:''}} />
                            <View>
                            <Text>{item.key}</Text>
                            </View>
                        </View>
                    )}
                />
                <Button onPress={()=>navigate('AddPet')} title={'添加宠物'}/>
            </View>
        )
            ;
    }
}

const styles=StyleSheet.create(
    {
        container:{
            backgroundColor:'white'
        },
        itemView:{
          flexDirection:'row'
        }
    }
)

export {PetList}
