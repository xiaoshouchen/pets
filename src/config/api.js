//base
// const BASE_URL = 'http://123.207.217.225';
const BASE_URL = 'https://www.xiaochongleyuan.com';
//const BASE_URL = 'http://192.168.16.185/xc/index.php';


//pets
export const GET_PETS = BASE_URL + '/api/pets';
export const GET_PETS_BY_ID = BASE_URL + '/api/pets/';
export const ADD_PETS = BASE_URL + '/api/pet/add';
export const UPDATE_PETS = BASE_URL + '/api/pet/update';
export const DELETE_PETS = BASE_URL + '/api/pet/delete';
export const GET_CAT_TYPES = BASE_URL + '/api/pets/type/cat';
export const GET_DOG_TYPES = BASE_URL + '/api/pets/type/dog';
export const GET_OTHER_TYPES = BASE_URL + '/api/pets/type/other';

//store
export const GET_PRODUCT_DETAIL = BASE_URL + '/api/product/detail/';
export const GET_PRODUCTS = BASE_URL + '/api/products';
export const GET_CARTS = BASE_URL + '/api/carts';
export const ADD_CART = BASE_URL + '/api/cart/add';
export const GET_PRODUCTS_BY_ID = BASE_URL + '/api/products/';
export const ADD_PRODUCTS = BASE_URL + '/api/products/add';
export const UPDATE_PRODUCTS = BASE_URL + '/api/products/update';
export const DELETE_PRODUCTS = BASE_URL + '/api/products/delete';

//article
export const GET_ARTICLES = BASE_URL + '/api/articles?pageNo=';
export const GET_ARTICLES_BY_ID = BASE_URL + '/api/article/';
export const ADD_ARTICLE = BASE_URL + '/api/article/add';
export const ADD_REPLY = BASE_URL + '/api/reply/add';
export const UPDATE_ARTICLE = BASE_URL + '/api/article/update';
export const DELETE_ARTICLE = BASE_URL + '/api/article/delete';
export const LIKE = BASE_URL + '/api/article/like';
export const RESTORE = BASE_URL + '/api/article/restore';
export const GET_MY_DIARY = `${BASE_URL}/api/diaries`;

//social

export const FOLLOW = `${BASE_URL}/api/follow`

//profile
export const GET_PROFILE = `${BASE_URL}/api/profile/items`
export const GET_USER_PROFILE = `${BASE_URL}/api/profile/user`
export const MY_FOLLOWS = `${BASE_URL}/api/follows`;
export const MY_FANS = `${BASE_URL}/api/fans`;
export const MY_RESTORES = `${BASE_URL}/api/restores`;
export const MY_RECENT = `${BASE_URL}/api/recent`;
export const CHANGE_PROFILE = `${BASE_URL}/api/profile/change`;
export const CHANGE_AVATAR = `${BASE_URL}/api/avatar/change`;


//获取推荐信息
export const GET_WAIT_NOTICES = `${BASE_URL}/api/notices`;
export const GET_RECOMMENDS = `${BASE_URL}/api/recommends`

//notice
export const ADD_NOTICE = `${BASE_URL}/api/notice/add`

//login

export const LOGIN = `${BASE_URL}/api/login`;
export const SEND_MESSAGE_CODE = `${BASE_URL}/api/sendmessage/`;
export const REGISTER = `${BASE_URL}/api/register`;
export const UPDATE = `${BASE_URL}/api/update`;//查询更新