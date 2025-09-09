import { setAuthToken,setCookie,getCookie,delCookie } from './api';
import {$axInstance} from './api.js';
import CryptoJS from 'crypto-js';
import { AUTH_TOKEN,AUTH_USER,SOCKET_CLIENT,AUTH_GET_USER,AUTH_PROFILE,AUTH_STATUS,AUTH_LOGOUT,AUTH_DESTROY_SESSION,AUTHENTICATOR,LOGOUT,DELETEALL_COOKIES } from './actions/reqApi.js';
const APP_JWT_SECRET = import.meta.env.VITE_APP_JWT_SECRET;
import 'url-search-params-polyfill';

const state = {
    AUTH_TOKEN:{},
    // AUTH_USER:{id:10, name:'ido rahadi', username:'admin'},
    AUTH_USER:{},
    SOCKET_CLIENT:{},
    AUTH_PROFILE:{},
    // AUTH_STATUS: getCookie('dapi2') || false,
    AUTH_STATUS: true,
};

const getters = {
    [AUTH_TOKEN] : state => state.AUTH_TOKEN,
    [AUTH_USER] : state => state.AUTH_USER,
    [SOCKET_CLIENT] : state => state.SOCKET_CLIENT,
    [AUTH_PROFILE] : state => state.AUTH_PROFILE,
    [AUTH_STATUS] : state => state.AUTH_STATUS,
};

const mutations = { 
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
}


const actions = {
    [AUTH_TOKEN]:async ({ commit,dispatch},payload) => {
        try {
            if(!(payload instanceof Object)) throw 'invalid token';
            commit(AUTH_TOKEN,payload);
            setAuthToken(payload);
            commit(AUTH_STATUS,true);
        } catch (error) {
            commit(AUTH_STATUS,false);
            commit(AUTH_TOKEN,{});
            console.log(error);
        }
    },
    
    [AUTH_USER]: async ({ commit},payload) => {
      return new Promise((resolve, reject) => {
        try {
            if(!(payload instanceof Object)) throw new Error('invalid user');
            commit(AUTH_USER,payload?.data);
            commit(AUTH_STATUS,payload?.status);
            resolve()
        } catch (error) {
            commit(AUTH_USER,{});
            reject(error);
        }
      })
    },

    [AUTH_GET_USER]({ commit, dispatch, rootState }, payload) {
        return new Promise((resolve, reject) => {
            $axInstance.get(`${import.meta.env.VITE_APP_OAUTH_URL}/api/user`).then(async(response) => {
                resolve(response?.data)
            }).catch(async (error) => {
                if(error?.response?.status==401){
                    await dispatch('logout');
                }
                reject(error?.response?.data)
            });
        })
    },

    [AUTH_LOGOUT]: ({commit,state,getters,dispatch}) => {
      return new Promise(async (resolve, reject) => {
        try {
            // await $cookies.remove('dapi');
            // commit(AUTH_STATUS,false);
            // commit(AUTH_TOKEN,{});
            // commit(AUTH_USER,{});
            // resolve();
            const curdapi2 = await new dapi2();
            if (!curdapi2) { throw new Error(`curdapi2 : ${curdapi2}`); }
            await curdapi2.authLogout()
            window.location.href = `${import.meta.env.VITE_APP_OAUTH_URL}/login`;
        } catch (error) {
          reject(error);
        }
      })
    },

    // [AUTH_LOGOUT]: ({commit,state,getters,dispatch}) => {
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //       commit(AUTH_STATUS,false);
    //       commit(AUTH_TOKEN,{});
    //       commit(AUTH_USER,{});
    //       resolve();
    //     } catch (error) {
    //       reject(error);
    //     }
    //   })
    // },

    [AUTH_DESTROY_SESSION]:({commit, dispatch},param)=>{
        return new Promise((resolve,reject)=>{
        $axInstance({ url: `${import.meta.VITE_APP_OAUTH_URL}/api/user/sessions/`+param, method: "DELETE"}).then(resp => {
                resolve(resp.data);
            }).catch(err => {
                reject(err.response);
            });
        });
    },
    [AUTHENTICATOR]:({commit, dispatch, rootGetters, rootState}, payload)=>{
        let urlparam = new URLSearchParams({
            response_type: 'code',
            scope: '',
            client_id: import.meta.env.VITE_APP_CLIENT_ID,
            redirect_uri: import.meta.env.VITE_APP_CLIENT_REDIRECT,
            state:sessionStorage.getItem('dapi')
        }).toString();
        return new Promise((resolve, reject) => {
            $axInstance.get(`${import.meta.VITE_APP_OAUTH_URL}/oauth/authorize?${urlparam}`, {
                // withCredentials: true,
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(async(response) => {
                console.log(response)
                resolve(true);
            }).catch(async (error) => {
                // console.log({testauth:error.respo'nse.headers["set-cookie"]})
                // console.log(document.cookie);'
                reject(error?.response?.data)
            });
        })
    },
    [LOGOUT]:({commit, dispatch, rootGetters, rootState}, payload)=>{
        // let urlparam = new URLSearchParams({
        //     client_id: import.meta.MIX_CLIENT_ID,
        //     redirect_uri: import.meta.MIX_CLIENT_REDIRECT,
        //     response_type: 'code',
        //     scope: 'userProfile'
        // }).toString();
        return new Promise((resolve, reject) => {
            $axInstance.post(`${import.meta.VITE_APP_OAUTH_URL}/api/user/sessions/`+rootGetters['auth/'+SOCKET_CLIENT]?.id).then(async(response) => {
                // await dispatch(DELETEALL_COOKIES);
                await $cookies.remove('dapi');
                commit(AUTH_STATUS,false);
                commit(AUTH_TOKEN,{});
                commit(AUTH_USER,{});
                window.location.href = `${import.meta.VITE_APP_OAUTH_URL}/login`;
                await resolve(true);
            }).catch(async (error) => {
                // await dispatch(DELETEALL_COOKIES);
                await $cookies.remove('dapi');
                commit(AUTH_STATUS,false);
                commit(AUTH_TOKEN,{});
                commit(AUTH_USER,{});
                await $('div.jala-signIn2').next('iframe').addClass('py-1').css({'display': 'block','width': '85px','border': '0px','height': '40px','margin': '0px','z-index': '1'}).appendTo('#btn-login');
                window.location.href = `${import.meta.VITE_APP_OAUTH_URL}/login`;
                reject(error?.response?.data)
            });
        })
    },
    [DELETEALL_COOKIES]:({commit, dispatch, getters, rootState}, payload)=>{
        const cookieNames = $cookies.keys();
        // Iterate through all cookie names and delete them
        for (const cookieName of cookieNames) {
            $cookies.remove(cookieName);
        }
    },
    login({ commit }, payload) {
        localStorage.setItem('token', null) //RESET LOCAL STORAGE MENJADI NULL
        commit('SET_TOKEN', null, { root: true }) //RESET STATE TOKEN MENJADI NULL
        $cookies.remove('cors_account');
        commit('ASSIGN_USER_AUTH', null, { root: true })
        return new Promise((resolve, reject) => {
            payload.append('API_KEY',import.meta.VITE_APP_API_KEY);
            $axInstance.post(`${import.meta.VITE_APP_OAUTH_URL}/api/auth/login`, payload)
            .then((response) => {
                if (response.data.success) {
                    var data = response.data.data;
                    window.location.href = vm.baseURL();
                    // commit('SET_TOKEN', data.api_token, { root: true })
                    CAD.setData('scope',data);
                    localStorage.setItem('token', data.api_token);
                    $cookies.set('cors_account',CryptoJS.AES.encrypt(JSON.stringify(data), APP_JWT_SECRET).toString());
                    commit('ASSIGN_USER_AUTH', data, { root: true });
                    localStorage.removeItem('DataTables_requestdataTable');
                    localStorage.removeItem('DataTables_pprdataTable');
                    localStorage.removeItem('DataTables_pbsdataTable');
                    // vm.$router.push({ name: 'dashboard' }).catch(()=>{});
                }
                //JANGAN LUPA UNTUK MELAKUKAN RESOLVE AGAR DIANGGAP SELESAI
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data, { root: true })
                }
                reject(error)
            })
        })
    },
    getToken({ commit, dispatch, rootState }, payload) {
        return new Promise((resolve, reject) => {
            // const formData = new FormData();
            // formData.append('grant_type','password');
            // formData.append('client_id',`${import.meta.MIX_CLIENT_ID}`);
            // formData.append('client_secret',`${import.meta.MIX_CLIENT_SECRET}`);
            // formData.append('username',rootState.authenticated?.email);
            // formData.append('password','password');
            $axInstance.get(`${import.meta.env.VITE_APP_OAUTH_URL}/api/oauth2/gettoken`).then(async (response) => {
                if(response?.data?.access_token){
                    await commit('SET_TOKEN', response?.data?.access_token, { root: true })
                    const expiresInSeconds = 604800;
                    await $cookies.set('jala_acctoken',CryptoJS.AES.encrypt(JSON.stringify(response?.data?.access_token), APP_JWT_SECRET).toString(), { expires: expiresInSeconds });
                }
                resolve(response?.data)
            }).catch((error) => {
                reject(error?.response?.data)
            });
        })
    },
    getTokenID({ commit, dispatch, rootState }, payload) {
        return new Promise((resolve, reject) => {
            $axInstance.get(`${import.meta.env.VITE_APP_OAUTH_URL}/api/oauth2/token_id`, {
                withCredentials: true,
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(async(response) => {
                if(response?.data?.token){
                    await commit('SET_TOKEN_ID', response?.data?.token, { root: true })
                    const expiresInSeconds = 604800;
                    await $cookies.set('jala_tokenid',CryptoJS.AES.encrypt(JSON.stringify(response?.data?.token), APP_JWT_SECRET).toString(), { expires: expiresInSeconds });
                }
                resolve(response?.data)
            }).catch((error) => {
                reject(error?.response?.data)
            });
        })
    },
    
    logout({ commit, dispatch, rootState }, payload){
        let urlparam = new URLSearchParams({
            client_id: import.meta.VITE_APP_CLIENT_ID,
            redirect_uri: import.meta.VITE_APP_REDIRECT_SSO_URL,
            response_type: 'code',
            scope: 'userProfile'
        }).toString();
        return new Promise((resolve, reject) => {
            $axInstance.post(`${import.meta.VITE_APP_OAUTH_URL}/api/oauth2/logout`).then(async(response) => {
                await dispatch('deleteAllCookies');
                await commit('ASSIGN_USER_AUTH', null, { root: true });
                await commit('SET_TOKEN', null, { root: true });
                window.location.href = `${import.meta.VITE_APP_OAUTH_URL}/api/oauth/authorize?`+urlparam;
                await resolve(true);
            }).catch(async (error) => {
                if(error?.response?.status==401){
                    await dispatch('deleteAllCookies');
                    await commit('ASSIGN_USER_AUTH', null, { root: true });
                    await commit('SET_TOKEN', null, { root: true });
                    await $('div.jala-signIn2').next('iframe').addClass('py-1').css({'display': 'block','width': '85px','border': '0px','height': '40px','margin': '0px','z-index': '1'}).appendTo('#btn-login');
                    window.location.href = `${import.meta.VITE_APP_OAUTH_URL}/api/oauth/authorize?`+urlparam;
                }
                reject(error?.response?.data)
            });
        })
    },
    deleteAllCookies({ commit, dispatch, rootState }, payload) {
        const cookieNames = $cookies.keys();
        // Iterate through all cookie names and delete them
        for (const cookieName of cookieNames) {
            $cookies.remove(cookieName);
        }
    },
    validation({ commit }, payload){
        var errors = {};
        $.each(payload,function(el, value){
            if(!value){
                errors[el] = el +' is required';
            }
        });
        var result = (Object.values(errors).length>0) ? false:true;
        commit('SET_RESULT', result, { root: true })
        commit('SET_ERRORS', errors, { root: true });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};