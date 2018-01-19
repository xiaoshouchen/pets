import React from 'react';
import {StackNavigator, TabNavigator, TabBarBottom, TabBarTop} from 'react-navigation';
import {HomeScreen} from '../screens/tabs/Home';
import {HotScreen} from '../screens/tabs/Hot';
import {MessageScreen} from '../screens/tabs/Message';
import {ProfileScreen} from '../screens/tabs/Profile';
import {SelectionScreen} from '../screens/tabs/Selection';
import {StoreScreen} from '../screens/tabs/Store';
import {LoginScreen} from '../screens/Login';
import {ArticleDetail} from '../screens/details/forum/ArticleDetail';
import {AddArticle} from '../screens/details/forum/AddArticle';
import {AddPet} from "../screens/details/forum/AddPet";
import {PetList} from "../screens/details/forum/PetList";
import {ScoreScreen} from "../screens/details/profile/Score";
import {PostScreen} from "../screens/tabs/Post";
import {CollectionScreen} from "../screens/details/profile/Collection";
import {BrowsingHistoryScreen} from "../screens/details/profile/BrowsingHistory";
import {ShoppingCartScreen} from "../screens/details/profile/ShoppingCart";
import {CollectionGoodsScreen} from "../screens/details/profile/CollectionGoods";
import {PersonalScreen} from "../screens/details/profile/Personal";
import {PersonalInfoChangeScreen} from "../screens/details/profile/PersonalInfoChange";

const IndexTabs = TabNavigator({
        Home: {screen: HomeScreen},
        Hot: {screen: HotScreen},
    },
    {
        tabBarComponent: TabBarTop,
        tabBarPosition: 'top',
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: '#374341',
            inactiveTintColor: '#859391',
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: 'white',
            },
        }

    });

const CollectionTabs = TabNavigator({
        Collection: {screen: CollectionScreen},
        CollectionGoods: {screen: CollectionGoodsScreen},
    },
    {
        tabBarComponent: TabBarTop,
        tabBarPosition: 'top',
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: '#374341',
            inactiveTintColor: '#859391',
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: 'white',
            },
        }

    })

const Tabs = TabNavigator({
        Index: {screen: IndexTabs},
        Selection: {screen: SelectionScreen},
        Message: {screen: MessageScreen},
        Store: {screen: StoreScreen},
        Profile: {screen: ProfileScreen}
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
    })

const RootNavigator = StackNavigator({
    Main: {screen: Tabs},
    Login: {
        screen: LoginScreen,
        headerTitle: '登陆小宠乐园'
    },
    ArticleDetail: {screen: ArticleDetail},
    AddArticle: {
        screen: AddArticle,
        headerTitle: "文章"
    },
    AddPet:{screen: AddPet},
    PetList:{screen: PetList},
    ScoreScreen:{screen: ScoreScreen},
    PostScreen:{screen: PostScreen},
    CollectionScreen:{screen: CollectionTabs},
    ShoppingCartScreen:{screen: ShoppingCartScreen},
    BrowsingHistoryScreen:{screen: BrowsingHistoryScreen},
    PersonalScreen:{screen: PersonalScreen},
    PersonalInfoChangeScreen:{screen: PersonalInfoChangeScreen}
});

export default RootNavigator;