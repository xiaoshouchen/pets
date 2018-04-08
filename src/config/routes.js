import React from 'react';
import {StackNavigator, TabNavigator, TabBarBottom, TabBarTop} from 'react-navigation';
import {HomeScreen} from '../screens/tabs/Home';
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
import {PostScreen} from "../screens/details/profile/Posts";
import {CollectionArticlesScreen} from "../screens/details/profile/CollectionArticles";
import {BrowsingHistoryScreen} from "../screens/details/profile/BrowsingHistory";
import {ShoppingCartScreen} from "../screens/details/store/ShoppingCart";
import {CollectionGoodsScreen} from "../screens/details/profile/CollectionGoods";
import {PersonalScreen} from "../screens/details/profile/Personal";
import {PersonalInfoChangeScreen} from "../screens/details/profile/ChangeAvatar";
import {RegisterScreen} from '../screens/Register'
import {ProductDetailScreen} from '../screens/details/store/ProductDetail'
import {PrivateRecommendScreen} from '../screens/details/forum/mypets/PrivateRecomends'
import {DogTypeScreen} from "../screens/details/forum/DogType";
import {CatTypeScreen} from "../screens/details/forum/CatType";
import {OtherTypeScreen} from "../screens/details/forum/OtherType";
import {InformationScreen} from "../screens/details/profile/PrivateInformation";
import {AdoptListScreen} from "../screens/details/forum/AdoptList";
import {AdoptScreen} from "../screens/details/forum/Adopt";
import {PairListScreen} from "../screens/details/forum/PairList";
import {PairScreen} from "../screens/details/forum/Pair";
import {PairItemScreen} from "../screens/details/forum/PairItem";
import {AdoptInfoScreen} from "../screens/details/forum/AdoptInfo";
import {PairInfoScreen} from "../screens/details/forum/PairInfo";
import {FollowPeopleScreen} from "../screens/details/profile/FollowPeople";
import {FanScreen} from "../screens/details/profile/Fan";
import {SettingScreen} from "../screens/details/profile/Setting";
import {RemindScreen} from "../screens/details/forum/Remind";
import {MedicalCareScreen} from "../screens/details/forum/mypets/MedicalCare";
import {CosmetologyScreen} from "../screens/details/forum/mypets/Cosmetology";
import {TrainingScreen} from "../screens/details/forum/mypets/Training";
import {ItemScreen} from "../screens/details/forum/mypets/Item";
import {EncyclopediasScreen} from "../screens/details/forum/mypets/Encyclopedias";
import {QuestionAndAnswerScreen} from "../screens/details/forum/mypets/QuestionAndAnswer";
import {NecessaryKnowledgeScreen} from "../screens/details/forum/NecessaryKnowledge";
import {NecessaryRemindScreen} from "../screens/details/forum/NecessaryRemind";
import {CommodityRecommendationScreen} from "../screens/details/forum/CommodityRecommendation";
import {OrderListScreen} from "../screens/details/profile/OrderList";
import {AddressListScreen} from "../screens/details/profile/AddressList";
import {ChatScreen} from '../screens/details/store/Chat';

const PetTypeTabs = TabNavigator({
        CatType: {screen: CatTypeScreen},
        DogType: {screen: DogTypeScreen},
        OtherType: {screen: OtherTypeScreen},
    },
    {
        tabBarComponent: TabBarTop,
        tabBarPosition: 'top',
        swipeEnabled: true,

    })

const Tabs = TabNavigator({
        Home: {screen: HomeScreen},
        Selection: {screen: SelectionScreen},
        Message: {screen: MessageScreen},
        Store: {screen: StoreScreen},
        Profile: {screen: ProfileScreen}
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        lazyLoad: false,
        swipeEnabled: false,
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: '#fb8c00',
            inactiveTintColor: '#a3a3a3',
        },
        //lazy: true,
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
    AddPet: {screen: AddPet},
    PetList: {screen: PetList},
    Score: {screen: ScoreScreen},
    Post: {screen: PostScreen},
    CollectionArticles: {screen: CollectionArticlesScreen},
    CollectionGoods: {screen: CollectionGoodsScreen},
    ShoppingCart: {screen: ShoppingCartScreen},
    BrowsingHistory: {screen: BrowsingHistoryScreen},
    Personal: {screen: PersonalScreen},
    PersonalInfoChange: {screen: PersonalInfoChangeScreen},
    Register: {screen: RegisterScreen},
    ProductDetail: {screen: ProductDetailScreen},
    PrivateRecommends: {screen: PrivateRecommendScreen},
    PetType: {screen: PetTypeTabs},
    PrivateInformation: {screen: InformationScreen},
    AdoptList: {screen: AdoptListScreen},
    Adopt: {screen: AdoptScreen},
    AdoptInfo: {screen: AdoptInfoScreen},
    PairList: {screen: PairListScreen},
    PairItem: {screen: PairItemScreen},
    Pair: {screen: PairScreen},
    PairInfo: {screen: PairInfoScreen},
    FollowPeople: {screen: FollowPeopleScreen},
    Fan: {screen: FanScreen},
    Setting: {screen: SettingScreen},
    Remind: {screen: RemindScreen},
    MedicalCare: {screen: MedicalCareScreen},
    Cosmetology: {screen: CosmetologyScreen},
    Training: {screen: TrainingScreen},
    Item: {screen: ItemScreen},
    Encyclopedias: {screen: EncyclopediasScreen},
    QuestionAndAnswer: {screen: QuestionAndAnswerScreen},
    NecessaryKnowledge: {screen: NecessaryKnowledgeScreen},
    NecessaryRemind: {screen: NecessaryRemindScreen},
    CommodityRecommendation: {screen: CommodityRecommendationScreen},
    OrderList: {screen: OrderListScreen},
    AddressList: {screen: AddressListScreen},
    Chat: {screen: ChatScreen},
});

export default RootNavigator;