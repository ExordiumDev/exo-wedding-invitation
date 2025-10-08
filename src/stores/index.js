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
        authDialog: false,
        pageLoad: false,
    },
     mutations: {
        SET_AUTH_DIALOG(state, val) {
            state.authDialog = val
        },
        SET_PROGRESS_BAR(state, val) {
            state.pageLoad = val
        }
    },
});


export default store
