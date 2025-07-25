import {$axios, $axAcrticle} from '../stores/api.js';
import {LIBRARY_DEL_REF_CODE, PREV_ROUTES_NAME, SET_MY_DOCUMENT_PAGE, LIBRARY_DEL_CATEGORY, LIBRARY_CREATE_CATEGORY, LIBRARY_GET_VISIBILITY, LIBRARY_GET_ARTICLES_SINGLE, LIBRARY_UPDATE_MY_DOC, LIBRARY_ARTICLES_ANALYZE, LIBRARY_CREATE_BULK, LIBRARY_CREATE_MY_DOC, LIBRARY_GET_STATUSES, LIBRARY_GET_MY_DOC, LIBRARY_BOOKMARK_ARTICLES_DEL, LIBRARY_BOOKMARK_ARTICLES, LIBRARY_DELETE_ARTICLES, LIBRARY_GET_CATEGORY,LIBRARY_GET_ARTICLES, USER_GET_PROFILE,API_REQUEST, USER_GET_SESSION, USER_CURRENT_SESSION } from './actions/reqApi';

const state = {
    status:'',
    USER_GET_PROFILE:null,
    USER_GET_SESSION:[],
    // USER_CURRENT_SESSION:[],
    LIBRARY_GET_STATUSES:[],
    LIBRARY_GET_CATEGORY:[],
    LIBRARY_GET_VISIBILITY:[],
    LIBRARY_GET_ARTICLES:[],
    LIBRARY_GET_ARTICLES_SINGLE:[],
    LIBRARY_GET_MY_DOC:[],
    LIBRARY_CREATE_BULK:[],
    LIBRARY_CREATE_MY_DOC:[],
    LIBRARY_CREATE_CATEGORY:[],
    LIBRARY_ARTICLES_ANALYZE:[],
    LIBRARY_BOOKMARK_ARTICLES:[],
    LIBRARY_BOOKMARK_ARTICLES_DEL:[],
    LIBRARY_DEL_REF_CODE:[],
    SET_MY_DOCUMENT_PAGE: 1,
    PREV_ROUTES_NAME: null,
};
const getters = {
    [LIBRARY_GET_MY_DOC] : state => state.LIBRARY_GET_MY_DOC,
    [LIBRARY_BOOKMARK_ARTICLES_DEL] : state => state.LIBRARY_BOOKMARK_ARTICLES_DEL,
    [LIBRARY_BOOKMARK_ARTICLES] : state => state.LIBRARY_BOOKMARK_ARTICLES,
    [LIBRARY_GET_ARTICLES] : state => state.LIBRARY_GET_ARTICLES,
    [LIBRARY_GET_ARTICLES_SINGLE] : state => state.LIBRARY_GET_ARTICLES_SINGLE,
    [LIBRARY_CREATE_MY_DOC] : state => state.LIBRARY_CREATE_MY_DOC,
    [LIBRARY_CREATE_BULK] : state => state.LIBRARY_CREATE_BULK,
    [LIBRARY_CREATE_CATEGORY] : state => state.LIBRARY_CREATE_CATEGORY,
    [LIBRARY_ARTICLES_ANALYZE] : state => state.LIBRARY_ARTICLES_ANALYZE,
    [LIBRARY_GET_CATEGORY] : state => state.LIBRARY_GET_CATEGORY,
    [LIBRARY_GET_STATUSES] : state => state.LIBRARY_GET_STATUSES,
    [LIBRARY_GET_VISIBILITY] : state => state.LIBRARY_GET_VISIBILITY,
    [USER_GET_SESSION] : state => state.USER_GET_SESSION,
    // [USER_CURRENT_SESSION] : state => state.USER_CURRENT_SESSION,
    [SET_MY_DOCUMENT_PAGE] : (state) => state.SET_MY_DOCUMENT_PAGE,
    [PREV_ROUTES_NAME] : (state) => state.PREV_ROUTES_NAME,
    [LIBRARY_DEL_REF_CODE] : (state) => state.LIBRARY_DEL_REF_CODE,
    getstatus: state => state.status,
    getUSER_GET_PROFILE: state => state.USER_GET_PROFILE
};
const mutations = {
    [API_REQUEST](state, status) {
        state, "status", status;
    },
    [USER_GET_PROFILE](state, payload) {
      state.USER_GET_PROFILE = payload?.data;
    },
    [USER_GET_SESSION](state, payload) {
        state.USER_GET_SESSION = payload?.data;
    },
    [LIBRARY_GET_CATEGORY](state, resp) {
        state.LIBRARY_GET_CATEGORY = resp;
    },
    [LIBRARY_GET_STATUSES](state, resp) {
        state.LIBRARY_GET_STATUSES = resp;
    },
    [LIBRARY_GET_VISIBILITY](state, resp) {
        state.LIBRARY_GET_VISIBILITY = resp;
    },
    [LIBRARY_GET_ARTICLES](state, resp) {
        state.LIBRARY_GET_ARTICLES = resp;
    },
    [LIBRARY_BOOKMARK_ARTICLES](state, resp) {
        state.LIBRARY_BOOKMARK_ARTICLES = resp;
    },
    [LIBRARY_BOOKMARK_ARTICLES_DEL](state, resp) {
        state.LIBRARY_BOOKMARK_ARTICLES_DEL = resp;
    },
    [LIBRARY_GET_MY_DOC](state, resp) {
        state.LIBRARY_GET_MY_DOC = resp;
    },
    [LIBRARY_GET_ARTICLES_SINGLE](state, resp) {
        state.LIBRARY_GET_ARTICLES_SINGLE = resp;
    },
    [LIBRARY_CREATE_MY_DOC](state, resp) {
        state.LIBRARY_CREATE_MY_DOC = resp;
    },
    [LIBRARY_CREATE_BULK](state, resp) {
        state.LIBRARY_CREATE_BULK = resp;
    },
    [LIBRARY_ARTICLES_ANALYZE](state, resp) {
        state.LIBRARY_ARTICLES_ANALYZE = resp;
    },
    [LIBRARY_CREATE_CATEGORY](state, resp) {
        state.LIBRARY_CREATE_CATEGORY = resp;
    },
    [LIBRARY_DEL_REF_CODE](state, resp) {
        state.LIBRARY_DEL_REF_CODE = resp;
    },
    [SET_MY_DOCUMENT_PAGE](state, page) {
        state.SET_MY_DOCUMENT_PAGE = page;
    },
    [PREV_ROUTES_NAME](state, name) {
        state.PREV_ROUTES_NAME = name;
    }
};
let InvalidRole  = function(message){
    this.message=message;
    this.errCode=403;
}
const actions = {

    [PREV_ROUTES_NAME]: ({commit}, name) => {
        commit('PREV_ROUTES_NAME', name);
    },

    [LIBRARY_GET_STATUSES]:async ({commit, rootGetters, rootState})=>{
        return new Promise((resolve,reject)=>{
            $axios.get('/statuses').then(resp => {
                commit(LIBRARY_GET_STATUSES,resp);
                resolve(resp);
            }).catch(err => {
                commit(LIBRARY_GET_STATUSES,{});
                commit(API_REQUEST,'error');
                reject(err.response);
            });
        });
    },

    [LIBRARY_GET_CATEGORY]:async ({commit, rootGetters, rootState})=>{
        return new Promise((resolve,reject)=>{
            $axios.get('/categories').then(resp => {
                commit(LIBRARY_GET_CATEGORY,resp);
                resolve(resp);
            }).catch(err => {
                commit(LIBRARY_GET_CATEGORY,{});
                commit(API_REQUEST,'error');
                reject(err.response);
            });
        });
    },

    [LIBRARY_GET_VISIBILITY]:async ({commit, rootGetters, rootState})=>{
        return new Promise((resolve,reject)=>{
            $axios.get('/visibilities').then(resp => {
                commit(LIBRARY_GET_VISIBILITY,resp);
                resolve(resp);
            }).catch(err => {
                commit(LIBRARY_GET_VISIBILITY,{});
                commit(API_REQUEST,'error');
                reject(err.response);
            });
        });
    },

    [LIBRARY_GET_MY_DOC]:async ({commit, rootGetters, rootState})=>{
        return new Promise((resolve,reject)=>{
            // const visitor_id = rootState.auth.AUTH_USER?.id;

            $axAcrticle.post('/articles/getlist', null ,{
                params: {
                    visitor_id: rootState.auth.AUTH_USER.id,
                    author_id: rootState.auth.AUTH_USER.id,
                }
            }).then(resp => {
                commit(LIBRARY_GET_MY_DOC,resp);
                resolve(resp);
            }).catch(err => {
                commit(LIBRARY_GET_MY_DOC,null);
                commit(API_REQUEST,'error');
                reject(err.response);
            });
        });
    },

    [LIBRARY_GET_ARTICLES]: async ({ commit, rootState }, payload = {}) => {
        return new Promise((resolve, reject) => {
            const params = {
                visitor_id: rootState.auth.AUTH_USER.id,
                ...(payload.v ? { visibility_id: payload.v } : {}),
                ...(payload.s ? { status_id: payload.s} : {}),
            };

            $axAcrticle.post('/articles/getlist', null, { params })
                .then(resp => {
                    commit(LIBRARY_GET_ARTICLES, resp);
                    resolve(resp);
                })
                .catch(err => {
                    commit(LIBRARY_GET_ARTICLES, null);
                    commit(API_REQUEST, 'error');
                    reject(err.response);
                });
        });
    },

    // [LIBRARY_CREATE_MY_DOC]: async ({ commit }, { payload, formData }) => {
    //     return new Promise((resolve, reject) => {
    //         Object.entries(payload).forEach(([key, value]) => {
    //             if (value !== undefined && value !== null) {
    //                 formData.append(key, value);
    //             }
    //         });

    //         $axAcrticle.post('/articles/', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         })
    //         .then(resp => {
    //             commit(LIBRARY_CREATE_MY_DOC, resp);
    //             resolve(resp);
    //         })
    //         .catch(err => {
    //             commit(LIBRARY_CREATE_MY_DOC, null);
    //             commit(API_REQUEST, 'error');
    //             reject(err.response);
    //         });
    //     });
    // },


    [LIBRARY_CREATE_CATEGORY]: async ({ commit },formData) => {
        return new Promise((resolve, reject) => {
            $axios.post('/categories',formData)
            .then(resp => {
                commit(LIBRARY_CREATE_CATEGORY, resp);
                resolve(resp);
            })
            .catch(err => {
                commit(LIBRARY_CREATE_CATEGORY, null);
                commit(API_REQUEST, 'error');
                reject(err.response);
            });
        });
    },

    [LIBRARY_CREATE_MY_DOC]: async ({ commit }, { payload, formData }) => {
        for (const key in payload) {
            if (payload[key] !== undefined && payload[key] !== null) {
                formData.append(key, payload[key]);
            }
        }
        return new Promise((resolve, reject) => {
            $axAcrticle.post('/articles/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(resp => {
                commit(LIBRARY_CREATE_MY_DOC, resp);
                resolve(resp);
            })
            .catch(err => {
                commit(LIBRARY_CREATE_MY_DOC, null);
                commit(API_REQUEST, 'error');
                reject(err.response);
            });
        });
    },


    // [LIBRARY_CREATE_MY_DOC]: async ({ commit },{payload, formData}) => {
    //     return new Promise((resolve, reject) => {
    //         $axAcrticle.post('/articles/', formData, {
    //             params: payload
    //         })
    //         .then(resp => {
    //             commit(LIBRARY_CREATE_MY_DOC, resp);
    //             resolve(resp);
    //         })
    //         .catch(err => {
    //             commit(LIBRARY_CREATE_MY_DOC, null);
    //             commit(API_REQUEST, 'error');
    //             reject(err.response);
    //         });
    //     });
    // },


    [LIBRARY_UPDATE_MY_DOC]: async ({ commit },{payload, formData}) => {
        for (const key in payload) {
            if (key !== 'id' && payload[key] !== undefined && payload[key] !== null) {
                formData.append(key, payload[key]);
            }
        }
        return new Promise((resolve, reject) => {
            $axAcrticle.put(`/articles/${payload.id}`, formData)
            .then(resp => {
                resolve(resp);
            })
            .catch(err => {
                // commit(LIBRARY_UPDATE_MY_DOC, null);
                commit(API_REQUEST, 'error');
                reject(err.response);
            });
        });
    },
    // [LIBRARY_UPDATE_MY_DOC]: async ({ commit },{payload, formData}) => {
    //     return new Promise((resolve, reject) => {
    //         $axAcrticle.put(`/articles/${payload.id}`, formData, {
    //             params: {
    //                 title: payload.title,
    //                 content: payload.content,
    //                 effective_date: payload.effective_date,
    //                 author_id: payload.author_id,
    //                 category_id: payload.category_id,
    //                 visibility_id: payload.visibility_id,
    //                 thumbnail_file: payload.thumbnail_file,
    //                 status_id: payload.status_id,
    //             }
    //         })
    //         .then(resp => {
    //             // commit(LIBRARY_UPDATE_MY_DOC, resp);
    //             resolve(resp);
    //         })
    //         .catch(err => {
    //             commit(LIBRARY_UPDATE_MY_DOC, null);
    //             commit(API_REQUEST, 'error');
    //             reject(err.response);
    //         });
    //     });
    // },

    [LIBRARY_DEL_REF_CODE]: async ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            $axAcrticle.delete(`/articles/reference/${payload.id}/${payload.ref_code}`)
            .then(resp => {
                commit(LIBRARY_DEL_REF_CODE, resp);
                resolve(resp);
            })
            .catch(err => {
                commit(LIBRARY_DEL_REF_CODE, null);
                // commit(API_REQUEST, 'error');
                reject(err.response);
            });
        });
    },

    [LIBRARY_CREATE_BULK]: async ({ commit },{payload, formData}) => {
        for (const key in payload) {
            if (payload[key] !== undefined && payload[key] !== null) {
                formData.append(key, payload[key]);
            }
        }
        return new Promise((resolve, reject) => {
            $axAcrticle.post('/articles/createbulk', formData)
            .then(resp => {
                commit(LIBRARY_CREATE_BULK, resp);
                resolve(resp);
            })
            .catch(err => {
                commit(LIBRARY_CREATE_BULK, null);
                commit(API_REQUEST, 'error');
                reject(err.response);
            });
        });
    },

    [LIBRARY_BOOKMARK_ARTICLES]:async ({commit}, formData)=>{
        return new Promise((resolve,reject)=>{
            $axAcrticle.post(`/articles/bookmark`, formData).then(resp => {
                commit(LIBRARY_BOOKMARK_ARTICLES,resp);
                resolve(resp);
            }).catch(err => {
                commit(LIBRARY_BOOKMARK_ARTICLES,null);
                commit(API_REQUEST,'error');
                reject(err);
            });
        });
    },

    [LIBRARY_BOOKMARK_ARTICLES_DEL]:async ({commit, rootState}, article_id)=>{
        return new Promise((resolve,reject)=>{
            $axAcrticle.delete(`/articles/bookmark/${article_id}`,{
                params: {
                    user_id: rootState.auth.AUTH_USER.id,
                }
            }).then(resp => {
                commit(LIBRARY_BOOKMARK_ARTICLES_DEL,resp);
                resolve(resp);
            }).catch(err => {
                commit(LIBRARY_BOOKMARK_ARTICLES_DEL,null);
                commit(API_REQUEST,'error');
                reject(err);
            });
        });
    },

    [LIBRARY_ARTICLES_ANALYZE]:async ({commit}, formData)=>{
        return new Promise((resolve,reject)=>{
            $axAcrticle.post(`/articles/analyze`, formData).then(resp => {
                commit(LIBRARY_ARTICLES_ANALYZE,resp);
                resolve(resp);
            }).catch(err => {
                commit(LIBRARY_ARTICLES_ANALYZE,null);
                commit(API_REQUEST,'error');
                reject(err);
            });
        });
    },

    // get single articles

    [LIBRARY_GET_ARTICLES_SINGLE]:async ({commit}, article_id)=>{
        return new Promise((resolve,reject)=>{
            $axAcrticle.get(`/articles/${article_id}`,{
            }).then(resp => {
                commit(LIBRARY_GET_ARTICLES_SINGLE,resp);
                resolve(resp);
            }).catch(err => {
                commit(LIBRARY_GET_ARTICLES_SINGLE,null);
                commit(API_REQUEST,'error');
                reject(err);
            });
        });
    },

    [LIBRARY_DELETE_ARTICLES]: ({ commit },id) => {
        return $axAcrticle({
            method:'delete',
            url:`articles/${id}`,
        });
    },
    [LIBRARY_DEL_CATEGORY]: ({ commit },id) => {
        return $axios({
            method:'delete',
            url:`categories/${id}`,
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