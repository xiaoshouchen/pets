//base
// const BASE_URL = 'http://123.207.217.225';
const BASE_URL = 'http://192.168.17.71';


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
export const GET_PRODUCTS = BASE_URL + '/api/products';
export const GET_PRODUCTS_BY_ID = BASE_URL + '/api/products/';
export const ADD_PRODUCTS = BASE_URL + '/api/products/add';
export const UPDATE_PRODUCTS = BASE_URL + '/api/products/update';
export const DELETE_PRODUCTS = BASE_URL + '/api/products/delete';

//article
export const GET_ARTICLES = BASE_URL + '/api/articles?pageNo=';
export const GET_ARTICLES_BY_ID = BASE_URL + '/api/article/';
export const ADD_ARTICLE = BASE_URL + '/api/article/add';
export const UPDATE_ARTICLE = BASE_URL + '/api/article/update';
export const DELETE_ARTICLE = BASE_URL + '/api/article/delete';

//profile
export const MY_FOLLOWS = `${BASE_URL}/api/follows`;

//login

export const LOGIN = `${BASE_URL}/api/login`;
export const SEND_MESSAGE_CODE = `${BASE_URL}/api/sendmessage/`;
export const REGISTER = `${BASE_URL}/api/register`;