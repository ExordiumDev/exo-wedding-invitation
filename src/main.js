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
import LoadScript from 'vue-plugin-load-script'
import '@mdi/font/css/materialdesignicons.css'
import '@fontsource/dm-sans';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/700.css';

const app = createApp(App);
app.use(VueCookies);
app.use(global);
app.use(LoadScript);
app.mixin(globalTest);
app.component('AppAlert', AppAlert );

const APP_CONFIG = {
    APP_CLIENT_ID: import.meta.env.VITE_APP_CLIENT_ID,
    APP_REDIRECT_SSO_URL: import.meta.env.VITE_APP_REDIRECT_SSO_URL,
    redirect_sso: import.meta.env.VITE_APP_REDIRECT_SSO,
}

app.use(router).use(store).use(vuetify).mount("#app");

window.addEventListener("message", (event) => {
    if (event.data?.type === "REQUEST_CONFIG") {
        event.source.postMessage(
            { type: "APP_CONFIG", payload: APP_CONFIG },
            event.origin
        );
    }
});
