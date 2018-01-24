import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom, TabBarTop } from 'react-navigation';
import { HomeScreen } from '../screens/tabs/Home';
import { MessageScreen } from '../screens/tabs/Message';
import { ProfileScreen } from '../screens/tabs/Profile';
import { SelectionScreen } from '../screens/tabs/Selection';
import { StoreScreen } from '../screens/tabs/Store';
import { LoginScreen } from '../screens/Login';
import { ArticleDetail } from '../screens/details/forum/ArticleDetail';
import { AddArticle } from '../screens/details/forum/AddArticle';
import { AddPet } from "../screens/details/forum/AddPet";
import { PetList } from "../screens/details/forum/PetList";
import { ScoreScreen } from "../screens/details/profile/Score";
import { PostScreen } from "../screens/details/profile/Posts";
import { CollectionScreen } from "../screens/details/profile/Collection";
import { BrowsingHistoryScreen } from "../screens/details/profile/BrowsingHistory";
import { ShoppingCartScreen } from "../screens/details/store/ShoppingCart";
import { CollectionGoodsScreen } from "../screens/details/profile/CollectionGoods";
import { PersonalScreen } from "../screens/details/profile/Personal";
import { PersonalInfoChangeScreen } from "../screens/details/profile/PersonalInfoChange";
import { RegisterScreen } from '../screens/Register'
import { ProductDetailScreen } from '../screens/details/store/ProductDetail'
import { PrivateRecommendScreen } from '../screens/details/forum/mypets/PrivateRecomends'
import {DogTypeScreen} from "../screens/details/forum/DogType";
import {CatTypeScreen} from "../screens/details/forum/CatType";
import {OtherTypeScreen} from "../screens/details/forum/OtherType";


const CollectionTabs = TabNavigator({
    Collection: { screen: CollectionScreen },
    CollectionGoods: { screen: CollectionGoodsScreen },
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

const PetTypeTabs = TabNavigator({
        CatType: { screen: CatTypeScreen},
        DogType: { screen: DogTypeScreen},
        OtherType: { screen: OtherTypeScreen},
    },
    {
        tabBarComponent: TabBarTop,
        tabBarPosition: 'top',
        swipeEnabled: true,

    })

const Tabs = TabNavigator({
    Home: { screen: HomeScreen },
    Selection: { screen: SelectionScreen },
    Message: { screen: MessageScreen },
    Store: { screen: StoreScreen },
    Profile: { screen: ProfileScreen }
},
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        lazyLoad: false,
        swipeEnabled: false,
        animationEnabled: false,
    })

const RootNavigator = StackNavigator({
    Main: { screen: Tabs },
    Login: {
        screen: LoginScreen,
        headerTitle: '登陆小宠乐园'
    },
    ArticleDetail: { screen: ArticleDetail },
    AddArticle: {
        screen: AddArticle,
        headerTitle: "文章"
    },
    AddPet: { screen: AddPet },
    PetList: { screen: PetList },
    Score: { screen: ScoreScreen },
    Post: { screen: PostScreen },
    Collection: { screen: CollectionTabs },
    ShoppingCart: { screen: ShoppingCartScreen },
    BrowsingHistory: { screen: BrowsingHistoryScreen },
    Personal: { screen: PersonalScreen },
    PersonalInfoChange: { screen: PersonalInfoChangeScreen },
    Register: { screen: RegisterScreen },
    ProductDetail: { screen: ProductDetailScreen },
    PrivateRecommends: { screen: PrivateRecommendScreen },
    PetType: {screen: PetTypeTabs}
});

export default RootNavigator;