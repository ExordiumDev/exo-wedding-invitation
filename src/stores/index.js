import { createStore } from 'vuex'
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
        cRoutes: false,
        authDialog: false,
        pageLoad: false,
        disBtn: false,
        sbShow: false,
        sbText: '',
        sbColor: '',
        sbTimeout: 2000,
        showBird: false,
    },
     mutations: {
        SET_AUTH_DIALOG(state, val) {
            state.authDialog = val
        },
        SET_PROGRESS_BAR(state, val) {
            state.pageLoad = val
        },
        SET_DISBTN(state, val) {
            state.disBtn = val
        },
        SET_SB_SHOW(state, val) {
            state.sbShow = val
        },
        SET_SB_TEXT(state, val) {
            state.sbText = val
        },
        SET_SB_COLOR(state, val) {
            state.sbColor = val
        },
        SET_SB_TO(state, val) {
            state.sbTimeout = val
        },
        SET_C_ROUTES(state,val) { 
            state.cRoutes = val
        },
        SET_SHOW_BIRD(state, val) {
            state.showBird = val
        }
    },
});


export default store
