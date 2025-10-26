import { $axios } from './api.js';
import { GET_DATA, GET_GIFT_DATA, GET_SCHEDULE_DATA, GET_COUPLES_DATA, GET_WISHES_DATA, GET_GALLERY_DATA } from './actions/reqApi.js';

const state = {
    GET_DATA: null,
    GET_GIFT_DATA: null,
    GET_SCHEDULE_DATA: null,
    GET_COUPLES_DATA: null,
    GET_WISHES_DATA: null,
    GET_GALLERY_DATA: null,
}

const getters = {
    [GET_DATA] : state => state.GET_DATA,
    [GET_GIFT_DATA] : state => state.GET_GIFT_DATA,
    [GET_SCHEDULE_DATA] : state => state.GET_SCHEDULE_DATA,
    [GET_COUPLES_DATA] : state => state.GET_COUPLES_DATA,
    [GET_WISHES_DATA] : state => state.GET_WISHES_DATA,
    [GET_GALLERY_DATA] : state => state.GET_GALLERY_DATA,
}

const mutations = { 
    [GET_DATA](state, resp){
        state.GET_DATA = resp;
    },
    [GET_GIFT_DATA](state, resp){
        state.GET_GIFT_DATA = resp;
    },
    [GET_SCHEDULE_DATA](state, resp){
        state.GET_SCHEDULE_DATA = resp;
    },
    [GET_COUPLES_DATA](state, resp){
        state.GET_COUPLES_DATA = resp;
    },
    [GET_WISHES_DATA](state, resp){
        state.GET_WISHES_DATA = resp;
    },
    [GET_GALLERY_DATA](state, resp){
        state.GET_GALLERY_DATA = resp;
    },
}

const actions = { 
    [GET_GALLERY_DATA]({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`${import.meta.env.VITE_APP_API_URL}/api/gallery`).then(async(response) => {
                resolve(response?.data)
                commit(GET_GALLERY_DATA, response.data)
            }).catch(async (error) => {
                reject(error)
            });
        })
    },
    [GET_WISHES_DATA]({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`${import.meta.env.VITE_APP_API_URL}/api/wishes`).then(async(response) => {
                resolve(response?.data)
                commit(GET_WISHES_DATA, response.data)
            }).catch(async (error) => {
                reject(error)
            });
        })
    },
    [GET_COUPLES_DATA]({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`${import.meta.env.VITE_APP_API_URL}/api/couple`).then(async(response) => {
                resolve(response?.data)
                commit(GET_COUPLES_DATA, response.data)
            }).catch(async (error) => {
                reject(error)
            });
        })
    },
    [GET_SCHEDULE_DATA]({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`${import.meta.env.VITE_APP_API_URL}/api/schedule`).then(async(response) => {
                resolve(response?.data)
                commit(GET_SCHEDULE_DATA, response.data)
            }).catch(async (error) => {
                reject(error)
            });
        })
    },
    [GET_GIFT_DATA]({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`${import.meta.env.VITE_APP_API_URL}/api/gift`).then(async(response) => {
                resolve(response?.data)
                commit(GET_GIFT_DATA, response.data)
            }).catch(async (error) => {
                reject(error)
            });
        })
    },
    [GET_DATA]({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`${import.meta.env.VITE_APP_API_URL}/data/data`).then(async(response) => {
                resolve(response?.data)
                commit(GET_DATA, response.data)
            }).catch(async (error) => {
                reject(error)
            });
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
