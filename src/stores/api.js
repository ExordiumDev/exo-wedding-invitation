import store from '../stores'
import axios from 'axios';

const $axios = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

const $axInstance = axios.create({
    // baseURL: '/api',
    headers:{
        'X-Client-Id': import.meta.env.VITE_APP_CLIENT_ID,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

let akses = undefined;

function setupInterceptor(instance) {
    instance.interceptors.request.use(
        async function (config) {
            config.headers['Authorization'] = `${akses?.token_type} ${akses?.access_token}`;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
}

setupInterceptor($axios);

// $axios.interceptors.request.use (   
//     function (config) {
//         config.headers['Authorization'] = `${akses?.token_type} ${akses?.access_token}`; 
//         return config;
//     },
//     async function (error) {
//         NProgress.done();
//         const originalRequest = error.config;
//         if(error.code != "ERR_NETWORK" && error.response){
//             const errMessage = {status:error.response.status}
//             if (error.response.status === 401 && !originalRequest._retry) {
//                 try {
//                     if (!curdapi2) { throw new Error(`curdapi2 : ${curdapi2}`); }
//                     const vResult = await curdapi2.getRefreshToken(akses)
//                     const {access_token,expires_in,refresh_token,token_type} = vResult;
//                     akses = {access_token,expires_in,refresh_token,token_type};
//                     $axInstance.defaults.headers['Authorization'] = `${token_type} ${access_token}`;
//                     originalRequest._retry = true;
//                     return $axInstance(originalRequest);
//                 } catch (error) {
//                     errMessage.message ='unauthentication'
//                 }
//             }else{
//                 switch (error.response.status) {
//                     case 403:
//                         errMessage.message ='not found' 
//                         break;
//                     case 500:
//                         errMessage.message ='internal server error';
//                         break;
//                     default:
//                         errMessage.message=error.response?.data;
//                         break;
//                 }
//             }
//             throw errMessage
//         }
//         return Promise.reject(error);
//     }
// );

$axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await $axios.post(import.meta.env.VITE_APP_API_URL+'/auth/refresh', {}, { withCredentials: true });
                const newData = res.data;
                setAuthToken(newData);
                await store.dispatch('auth/AUTH_GET_USER');
                return $axios(originalRequest);
            } catch (err) {
                console.error("Invalid token:", err);
                return Promise.reject(err)
            }
        }
        return Promise.reject(error);
    }
);

export const setCookie = (name, value, days)=>{
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    if (window.location.protocol === 'https:'){
        document.cookie = `${name}=${value || ""}${expires}; path=/; Secure; SameSite=Strict`;
    }else{
        document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Strict`;
    }
}

export const getCookie = (name=undefined) =>{
    const curvalue = document.cookie || ''
    const value = `; ${curvalue}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const delCookie = (name=undefined) =>{
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

export const setAuthToken = (payload) => {
    if (payload) {
        const {access_token,refresh_token,expires_in,token_type} = payload;
        akses = {access_token,refresh_token,expires_in,token_type};
        $axios.defaults.headers['Authorization'] = `${token_type} ${access_token}`;
    } else {
        delete $axios.defaults.headers['Authorization'];
    }
};

export { $axInstance, $axios };