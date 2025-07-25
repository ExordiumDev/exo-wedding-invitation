import {$axios, $axInstance} from './api';
import { LIBRARY_GET_USER, AUTH_USER,AUTH_GET_USER,USER_CHECK_SCOPE,FORGOT_PASSWORD,USER_SAVE_PROFILE,USER_GET_PROFILE,USER_SET_BEFORE_VERIFIED_CODE_EMAIL,USER_SET_VERIFIED_CODE_EMAIL,USER_SET_EMAIL,USER_GET_PHOTO,USER_DELETE_PHOTO,CHANGE_PASSWORD,API_REQUEST, USER_GET_SESSION, USER_CURRENT_SESSION, USER_UPDATE_SESSION } from './actions/reqApi';

const state = {
    status:'',
    USER_GET_PROFILE:null,
    USER_GET_SESSION:[],
    USER_CURRENT_SESSION:[],
    LIBRARY_GET_USER: [],
};
const getters = {
    [LIBRARY_GET_USER] : state => state.LIBRARY_GET_USER,
    [USER_GET_SESSION] : state => state.USER_GET_SESSION,
    [USER_CURRENT_SESSION] : state => state.USER_CURRENT_SESSION,
    getstatus: state => state.status,
    getUSER_GET_PROFILE: state => state.USER_GET_PROFILE
};
const mutations = {
    [API_REQUEST](state, status) {
        state.status = status;
    },
    [USER_GET_PROFILE](state, payload) {
      state.USER_GET_PROFILE = payload?.data;
    },
    [USER_GET_SESSION](state, payload) {
        state.USER_GET_SESSION = payload?.data;
    },
    [USER_CURRENT_SESSION](state, payload) {
        state.USER_CURRENT_SESSION = payload?.data;
    },
    [LIBRARY_GET_USER](state, resp) {
        state.LIBRARY_GET_USER = resp;
    },
};
let InvalidRole  = function(message){
    this.message=message;
    this.errCode=403;
}
const actions = {
    [LIBRARY_GET_USER]:async ({commit, rootGetters, rootState})=>{
        return new Promise((resolve,reject)=>{
            $axios.get('/users').then(resp => {
                commit(LIBRARY_GET_USER,resp);
                resolve(resp);
            }).catch(err => {
                commit(LIBRARY_GET_USER,{});
                commit(API_REQUEST,'error');
                reject(err.response);
            });
        });
    },

    [USER_CHECK_SCOPE]:({commit},param)=>{
        return new Promise((resolve,reject)=>{
        try {
            let CAD_data=CAD.getData('scope');
            if(!CAD_data) throw new InvalidRole('Invalid Get CAD_Scope!');
            let scope=CAD_data?.scopes?.split(",");
            let scope_array = scope.map(x => x.replace("_",".").replace("_",".").replace("_",".").replace("_",".").replace("_","."));
            resolve(scope_array);
        } catch (error) {
            reject(error);
        }
        });
    },
    [FORGOT_PASSWORD]:({commit},param)=>{
        return new Promise((resolve,reject)=>{
        commit(API_REQUEST,'request');
        $axios({ 
            url: `${process.env.MIX_APP_URL}/app/forgot_password`, 
            method: "POST", 
            data:param,
            headers:{
            'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        }).then(resp => {
            commit(API_REQUEST,'success');
            resolve(resp.data);
            }).catch(err => {
            commit(API_REQUEST,'error');
            reject(err.response);
            });
        });
    },
    [USER_GET_PROFILE]:async ({commit, rootGetters, rootState})=>{
        var user_id = await rootGetters['auth/'+AUTH_USER].id;
        return new Promise((resolve,reject)=>{
        commit(API_REQUEST,'request');
        $axios({ 
            url: `${process.env.MIX_APP_OAUTH_URL}/api/profile/`+user_id, 
            method: "GET",
        }).then(resp => {
            commit(USER_GET_PROFILE,resp.data);
            commit(API_REQUEST,'success');
            resolve(resp.data);
        }).catch(err => {
            commit(USER_GET_PROFILE,{});
            commit(API_REQUEST,'error');
            reject(err.response);
        });
        });
    },
    [USER_SAVE_PROFILE]:async ({commit, dispatch, rootGetters, rootState}, payload)=>{
        await payload?.append('user_id', rootGetters['auth/'+AUTH_USER]?.id);
        return new Promise((resolve,reject)=>{
        commit(API_REQUEST,'request');
        $axios({ 
            url: `${process.env.MIX_APP_OAUTH_URL}/api/profile/`+rootGetters['auth/'+AUTH_USER]?.id+'?_method=PUT',
            method: "POST", 
            headers: {
            'Content-Type': 'multipart/form-data',
            },
            data:payload
        }).then(resp => {
            commit(API_REQUEST,'success');
            dispatch('auth/'+AUTH_GET_USER, 'refresh', {root:true});
            resolve(resp.data);
        }).catch(err => {
            commit(API_REQUEST,'error');
            reject(err.response);
        });
        });
    },
    [USER_SET_BEFORE_VERIFIED_CODE_EMAIL]:({commit})=>{
        return new Promise((resolve,reject)=>{
        commit(API_REQUEST,'request');
        $axios({ url: `${process.env.MIX_APP_OAUTH_URL}/api/user/before_sendcode`, method: "POST"}).then(resp => {
            commit(API_REQUEST,'success');
            resolve(resp.data);
            }).catch(err => {
            commit(API_REQUEST,'error');
            reject(err.response);
            });
        });
    },
    [USER_SET_VERIFIED_CODE_EMAIL]:({commit},param)=>{
        return new Promise((resolve,reject)=>{
        commit(API_REQUEST,'request');
        $axios({ url: `${process.env.MIX_APP_OAUTH_URL}/api/user/send_code`, method: "POST", data:param}).then(resp => {
            commit(API_REQUEST,'success');
            resolve(resp.data);
            }).catch(err => {
            commit(API_REQUEST,'error');
            reject(err.response);
            });
        });
    },
    [CHANGE_PASSWORD]:({commit},param)=>{
        return new Promise((resolve,reject)=>{
            commit(API_REQUEST,'request');
            $axios({ url: `${process.env.MIX_APP_OAUTH_URL}/api/user/change_password`, method: "POST", data:param}).then(resp => {
                commit(API_REQUEST,'success');
                resolve(resp.data);
            }).catch(err => {
                commit(API_REQUEST,'error');
                reject(err.response);
            });
        });
    },
    [USER_SET_EMAIL]:({commit},param)=>{
        return new Promise((resolve,reject)=>{
            commit(API_REQUEST,'request');
            $axios({ url: `${process.env.MIX_APP_OAUTH_URL}/api/user/setemail`, method: "POST", data:param}).then(resp => {
                commit(API_REQUEST,'success');
                resolve(resp.data);
            }).catch(err => {
                commit(API_REQUEST,'error');
                reject(err.response);
            });
        });
    },
    [USER_GET_PHOTO]:({commit},param)=>{
        return new Promise((resolve,reject)=>{
        commit(API_REQUEST,'request');
        $axios({ url: `${process.env.MIX_APP_OAUTH_URL}/api/user/photos/getlist_hist`, method: "POST", data:param}).then(resp => {
            commit(API_REQUEST,'success');
            resolve(resp.data);
            }).catch(err => {
            commit(API_REQUEST,'error');
            reject(err.response);
            });
        });
    },
    [USER_DELETE_PHOTO]:({commit, dispatch},param)=>{
        return new Promise((resolve,reject)=>{
        commit(API_REQUEST,'request');
        $axios({ url: `${process.env.MIX_APP_OAUTH_URL}/api/user/photos/`+param, method: "DELETE"}).then(resp => {
            commit(API_REQUEST,'success');
            dispatch('auth/'+AUTH_GET_USER, 'refresh', {root:true});
            resolve(resp.data);
            }).catch(err => {
            commit(API_REQUEST,'error');
            reject(err.response);
            });
        });
    },
    [USER_GET_SESSION]:({commit},param)=>{
        return new Promise((resolve,reject)=>{
        commit(API_REQUEST,'request');
        $axios({ url: `${process.env.MIX_APP_OAUTH_URL}/api/user/sessions/getlist`, method: "POST", data:param}).then(resp => {
            commit(API_REQUEST,'success');
            commit(USER_GET_SESSION,resp.data);
            resolve(resp.data);
            }).catch(err => {
            commit(API_REQUEST,'error');
            commit(USER_GET_SESSION,[]);
            reject(err.response);
            });
        });
    },
    [USER_CURRENT_SESSION]:({commit},param)=>{
        return new Promise((resolve,reject)=>{
        commit(API_REQUEST,'request');
        $axios({ url: `${process.env.MIX_APP_OAUTH_URL}/api/user/sessions/current/`+param, method: "GET"}).then(resp => {
            commit(API_REQUEST,'success');
            resolve(resp.data);
            }).catch(err => {
            commit(API_REQUEST,'error');
            reject(err.response);
            });
        });
    },
    [USER_UPDATE_SESSION]:({commit},param)=>{
        return new Promise((resolve,reject)=>{
        commit(API_REQUEST,'request');
        $axios({ 
            url: `${process.env.MIX_APP_OAUTH_URL}/api/user/sessions/`+param.get('id')+`?_method=PUT`, 
            method: "POST",
            data:param
        })
        .then(resp => {
            commit(API_REQUEST,'success');
            resolve(resp.data);
            }).catch(err => {
            commit(API_REQUEST,'error');
            reject(err.response);
            });
        });
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};