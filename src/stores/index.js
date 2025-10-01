import { createStore } from 'vuex'
import CryptoJS from 'crypto-js';
import 'vue-cookies'
import auth from './auth'
import user from './user';
import data from './data';


const store = createStore({
    modules: { 
        auth: auth,
        user: user,
        data: data,
    },
    state: {
        //VARIABLE TOKEN MENGAMBIL VALUE DARI LOCAL STORAGE token
        authenticated: ($cookies.get('jala_account')?JSON.parse(CryptoJS.AES.decrypt($cookies.get('jala_account'), APP_JWT_SECRET).toString(CryptoJS.enc.Utf8)):null),
        token: ($cookies.get('jala_acctoken')?JSON.parse(CryptoJS.AES.decrypt($cookies.get('jala_acctoken'), APP_JWT_SECRET).toString(CryptoJS.enc.Utf8)):null),
        token_id: ($cookies.get('jala_tokenid')?JSON.parse(CryptoJS.AES.decrypt($cookies.get('jala_tokenid'), APP_JWT_SECRET).toString(CryptoJS.enc.Utf8)):null),
        result: null,
        errors: [],
        GALLERY_ITEMS: [],
    },
     mutations: {
        //SEBUAH MUTATIONS YANG BERFUNGSI UNTUK MEMANIPULASI VALUE DARI STATE token
        SET_TOKEN(state, payload) {
            state.token = payload
        },
        SET_TOKEN_ID(state, payload) {
            state.token_id = payload
        },
        ASSIGN_USER_AUTH(state, payload) {
            state.authenticated = payload
        },
        SET_ERRORS(state, payload) {
            state.errors = payload
        },
        CLEAR_ERRORS(state) {
            state.errors = []
        },
        SET_RESULT(state, payload) {
            state.result = payload
        },
    },
});


export default store
