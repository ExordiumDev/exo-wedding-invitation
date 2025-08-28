import { createApp } from 'vue';
import store from './stores/index.js';

import './style.css';
import vuetify from './plugins/vuetify.js';
import App from './views/App.vue';
import router from './router/index.js';
import VueCookies from 'vue-cookies';
import global from './appcore/global.js';
import globalTest from './appcore/globalTest.js';
import AppAlert from './components/BaseAlert.vue';
import '@mdi/font/css/materialdesignicons.css'
import '@fontsource/dm-sans';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/700.css';
import { AUTH_TOKEN, AUTH_USER, AUTH_GET_USER } from './stores/actions/reqApi.js'

const app = createApp(App);
app.use(VueCookies);
app.use(global);
app.mixin(globalTest);
app.component('AppAlert', AppAlert );

// window.addEventListener("DOMContentLoaded", async () => {
//     try {
//         const curdapi2 = new dapi2();
//         await curdapi2.init({
//             APP_REDIRECT_SSO: import.meta.env.VITE_APP_REDIRECT_SSO,
//             APP_CLIENT_ID: import.meta.env.VITE_APP_CLIENT_ID,
//             redirect_sso: import.meta.env.VITE_APP_REDIRECT_SSO_URL
//         });

//         const authResult = await curdapi2.getAuth();
//         await store.dispatch(`auth/${AUTH_TOKEN}`, { ...authResult, thirdParty: curdapi2 });
//         const userProfile = await store.dispatch(`auth/${AUTH_GET_USER}`);
//         await store.dispatch(`auth/${AUTH_USER}`, userProfile);

//         app.config.globalProperties.$curdapi2 = curdapi2;
//         app.use(router);
//         app.use(store);
//         app.use(vuetify);
//         app.mount('#app');
//     } catch (e) {
//         console.log('Auth/init failed:', e);
//         if (e?.status === 401) {
//             try {
//                 await curdapi2.authLogout();
//             } catch (_) {}
//             location.reload();
//         }
//     }
// });

// ------ by pass -----------

app.use(router);
app.use(store);
app.use(vuetify);
app.mount('#app');