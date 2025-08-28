import axios from 'axios';

const isDev = import.meta.env.VITE_APP_NODE_ENV === "LOCAL";
const $axInstance = axios.create({
    headers:{
        'X-Client-Id': import.meta.env.VITE_APP_CLIENT_ID,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

// files-api-v2
const $axPdf = axios.create({
    // baseURL: isDev
    // ? '/files-api-v2'
    // : `${import.meta.env.VITE_APP_API_URL}/articles/files`,
    baseURL : `${import.meta.env.VITE_APP_API_URL}/articles/files`,
    responseType: 'blob',
    headers: {
        'X-Client': import.meta.env.VITE_APP_CLIENT_ID,
        'X-Requested-With': 'XMLHttpRequest',
    },
})

const $axios = axios.create({
    baseURL: isDev
    ? '/getmaster-v2'
    : `${import.meta.env.VITE_APP_API_URL}/master`,
    headers: {
        'X-Client': import.meta.env.VITE_APP_CLIENT_ID,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

const $axAcrticle = axios.create({
    baseURL: isDev ?
    '/article-api-v2'
    : `${import.meta.env.VITE_APP_API_URL}/`,
    headers: {
        'X-Client': import.meta.env.VITE_APP_CLIENT_ID,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

let akses = undefined;
let curdapi2 = undefined;

// ax config
// $axInstance.interceptors.request.use(
//     async function (config) {
//         config.baseURL = import.meta.env.VITE_APP_API_URL;
//         config.headers['Authorization'] = `${akses?.token_type} ${akses?.access_token}`;
//         return config;
//     },
//     function (error) {
//         return Promise.reject (error);
//     }
// );

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

setupInterceptor($axAcrticle);
setupInterceptor($axInstance);
setupInterceptor($axPdf);
setupInterceptor($axios);


$axInstance.interceptors.request.use (
   
    function (config) {
        config.headers['Authorization'] = `${akses?.token_type} ${akses?.access_token}`; 
        return config;
    },
    async function (error) {
        NProgress.done();
        const originalRequest = error.config;
        if(error.code != "ERR_NETWORK" && error.response){
            const errMessage = {status:error.response.status}
            if (error.response.status === 401 && !originalRequest._retry) {
                try {
                    if (!curdapi2) { throw new Error(`curdapi2 : ${curdapi2}`); }
                    const vResult = await curdapi2.getRefreshToken(akses)
                    const {access_token,expires_in,refresh_token,token_type} = vResult;
                    akses = {access_token,expires_in,refresh_token,token_type};
                    $axInstance.defaults.headers['Authorization'] = `${token_type} ${access_token}`;
                    originalRequest._retry = true;
                    return $axInstance(originalRequest);
                } catch (error) {
                    errMessage.message ='unauthentication'
                }
            }else{
                switch (error.response.status) {
                    case 403:
                        errMessage.message ='not found' 
                        break;
                    case 500:
                        errMessage.message ='internal server error';
                        break;
                    default:
                        errMessage.message=error.response?.data;
                        break;
                }
            }
            throw errMessage
        }
        return Promise.reject(error);
    }
);

$axInstance.interceptors.response.use(function (response) {
    return response;
    }, 
    async function (error) {
    if(error?.response?.status==401){
        console.log(error);
        // Redirect to a new URL
        // window.location.href = `${process.env.VUE_APP_OAUTH_URL}/login`;
    }
    return Promise.reject(error);
});

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
        // console.log({setAuthToken:payload});
        const {access_token,refresh_token,expires_in,token_type,thirdParty} = payload;
        akses = {access_token,refresh_token,expires_in,token_type};
        curdapi2 = thirdParty;
        $axInstance.defaults.headers['Authorization'] = `${token_type} ${access_token}`;

    } else {
        delete $axInstance.defaults.headers['Authorization'];
    }
};  

export const axDT = async (url,data,callback,settings,method='post')=>{
    if (akses?.access_token) {
        let resp = await $axInstance({
            method:method,
            url:url,
            data
        });
        callback({draw: data?.draw,recordsTotal: resp?.data?.recordsTotal,recordsFiltered: resp?.data?.recordsFiltered,data: resp?.data?.data});
    }
}

export { $axios, $axInstance, $axAcrticle, $axPdf};