import { $axios } from './api.js';
import { GET_DATA } from './actions/reqApi.js';

const state = {
    GET_DATA: null,
}

const getters = {
    [GET_DATA] : state => state.GET_DATA,
}

const mutations = { 
    [GET_DATA](state, resp){
        state.GET_DATA = resp;
    },
}

const actions = { 
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
