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
import LoadScript  from "vue-plugin-load-script"

async function initApp() {
    try {
        await store.dispatch('auth/AUTH_GET_USER');
    } catch (error) {
        console.error('unauthenticated', error)
    }    
    const app = createApp(App);
    app.use(VueCookies);
    app.use(global);
    app.mixin(globalTest);
    app.component('AppAlert', AppAlert );
    app.use(LoadScript );

    app.use(router).use(store).use(vuetify).mount("#app");
}

initApp()
export async function reloadAuthState() {
    await store.dispatch('auth/AUTH_GET_USER').then(() => {
        router.push('/dashboard')
    });
}
