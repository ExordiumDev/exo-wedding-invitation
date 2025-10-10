import store from '../stores';
import axios from 'axios';
import router from '../router/index';

const $axios = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

let akses = undefined;
$axios.interceptors.request.use(async (config) => {
    // Authorization Header
    if (akses?.access_token) {
        config.headers['Authorization'] = `${akses.token_type} ${akses.access_token}`;
    }

    // CSRF Header
    const csrfToken = getCookie("XSRF-TOKEN");
    if (csrfToken) {
        config.headers["X-CSRF-TOKEN"] = csrfToken;
    } else {
        console.log("XSRF-TOKEN not found in cookies");
    }

    return config;
}, (error) => Promise.reject(error));

$axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if(originalRequest.url.includes('/auth/refresh')) {
            return Promise.reject(error)
        }

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await $axios.post(import.meta.env.VITE_APP_API_URL+'/auth/refresh', {}, { withCredentials: true });
                // const newData = res.data;
                await store.dispatch('auth/AUTH_GET_USER');
                return $axios(originalRequest);
            } catch (err) {
                console.log('error detail', err?.response?.data?.detail)
                if ( err?.response?.data?.detail === "Refresh token not found" ) {
                    console.error("You have logged in from another device:", err);
                    await store.dispatch('auth/GOOGLE_LOGOUT')
                    router.push('/home')
                }
                console.log('err', err)
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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export { $axios };