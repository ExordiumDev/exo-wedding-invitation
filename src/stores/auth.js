import {$axios} from './api.js';
import { AUTH_SIGNIN, AUTH_SET_PASSWORD, SET_USER_IF_UNAUTHENTICATED, EX_CODE, GOOGLE_LOGOUT, CHECK_AUTH, SET_USER, AUTH_GET_GOOGLE_TOKEN, AUTH_TOKEN,AUTH_USER,SOCKET_CLIENT,AUTH_GET_USER,AUTH_PROFILE,AUTH_STATUS } from './actions/reqApi.js';

const state = {
    SET_USER: null,
    AUTH_TOKEN:{},
    AUTH_USER:null,
    SOCKET_CLIENT:{},
    AUTH_PROFILE:{},
    AUTH_GET_GOOGLE_TOKEN: null,
    isAuthenticating: false,
};

const getters = {
    [AUTH_TOKEN] : state => state.AUTH_TOKEN,
    [AUTH_USER] : state => state.AUTH_USER,
    [SOCKET_CLIENT] : state => state.SOCKET_CLIENT,
    [AUTH_PROFILE] : state => state.AUTH_PROFILE,
    [AUTH_STATUS] : state => state.AUTH_STATUS,
    [AUTH_GET_GOOGLE_TOKEN] : state => state.AUTH_GET_GOOGLE_TOKEN,
    [SET_USER] : state => state.SET_USER,
};

const mutations = { 
    [SET_USER_IF_UNAUTHENTICATED](state) {
        state.SET_USER = {}
    },
    [AUTH_TOKEN](state, resp) {
        state.AUTH_TOKEN = resp;
    },
    [AUTH_USER](state, resp){
        state.AUTH_USER = resp;
    },
    [SOCKET_CLIENT](state, resp){
        state.SOCKET_CLIENT = resp;
    },
    [AUTH_STATUS](state, resp){
        state.AUTH_STATUS = resp;
    },
    [AUTH_GET_GOOGLE_TOKEN](state, resp){
        state.AUTH_GET_GOOGLE_TOKEN = resp;
    },
    [SET_USER](state,user) {
        state.SET_USER = user
    },
    SET_AUTHENTICATING(state, val) {
        state.isAuthenticating = val
    }
}


const actions = {

    [AUTH_SIGNIN]({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/signin`, payload).then(async(res) => {
                resolve(res);
                dispatch(AUTH_GET_USER)
                window.location.reload()
            }).catch(async (error) => {
                reject(error)
            });
        })
    },

    [AUTH_SET_PASSWORD]({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(
                `${import.meta.env.VITE_APP_API_URL}/auth/set-pass`,
                payload
            )
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
    },

    [EX_CODE]({ dispatch }, code) {
        return new Promise((resolve, reject) => {
            $axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/google/callback`, {code}).then(async(res) => {
                resolve(res)
            }).catch(async (error) => {
                reject(error)
            });
        })
    },

    [GOOGLE_LOGOUT]: async ({ commit }) => {
        try {
            const res = await $axios.post("/auth/logout");
            commit(AUTH_USER, null);
            return res
        } catch (error) {
            console.error("Not authenticated", error);
        }
    },
    
    [CHECK_AUTH]: async ({ commit }) => {
        try {
            const res = await $axios.get("/auth/m");
            commit(SET_USER, res.data);
        } catch (error) {
            commit(SET_USER, null);
            throw error;
        }
    },

    [AUTH_GET_GOOGLE_TOKEN]:async ({ commit },payload) => {
        try {
            const res = await $axios.post("/auth/login?token="+payload);
            commit(AUTH_GET_GOOGLE_TOKEN, res.data)
            return res.data;
        } catch (error) {
            commit(AUTH_GET_GOOGLE_TOKEN,{});
            console.error(error);
            return {}
        }
    },

    [AUTH_USER]: async ({ commit }, payload) => {
        try {
            if (!(payload instanceof Object) || !payload.user) throw new Error('invalid user');
            commit('SET_USER', payload.user);
        } catch (error) {
            commit('SET_USER', null);
            console.error(error);
        }
    },

    [AUTH_TOKEN]:async ({ commit,dispatch},payload) => {
        try {
            if(!(payload instanceof Object)) throw 'invalid token';
            commit(AUTH_TOKEN,payload);
            commit(AUTH_STATUS,true);
        } catch (error) {
            commit(AUTH_STATUS,false);
            commit(AUTH_TOKEN,{});
            console.error(error);
        }
    },

    [AUTH_GET_USER]({ commit, dispatch, rootState }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get("/auth/m").then(async(response) => {
                resolve(response?.data)
                commit(AUTH_USER, response?.data)
                console.log('auth store ', response.data)
            }).catch(async (error) => {
                reject(error)
            });
        })
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};