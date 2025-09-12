<template>
    <v-app>
        <!-- splash screen -->
        <v-overlay v-if="loading" :model-value="true" persistent absolute class="d-flex align-center justify-center bg-background">
            <div class="text-center">
                <DotLottieVue style="width: 500px; height: 500px;" autoplay loop :src="overlayImage" />
            </div>
        </v-overlay>
        <template v-else>
            <Header />
            <v-main class="main-wrapper">
                <iframe :src="dFrame" frameborder="0" id="dapi-auth" style="display: block; height: 0; border:0;"></iframe>
                <router-view></router-view>
            </v-main>
            <Footer />
        </template>
    </v-app>
</template>

<style scoped>

</style>

<script>
import { mapActions } from 'vuex';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import BaseIndex from './BaseIndex.vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { AUTH_TOKEN, AUTH_USER, AUTH_GET_USER } from '../stores/actions/reqApi.js'

export default {
    name: 'App',
    data() {
        return { 
            loading: true,
            overlayImage: "https://lottie.host/e3b71b26-703e-4343-802e-28b8793b277b/pVIvUkQDkQ.lottie"
        }
    },
    components: {
        BaseIndex,
        Header,
        Footer,
        DotLottieVue,
    },
    methods: {
        ...mapActions({
            actAUTH_TOKEN: `auth/${AUTH_TOKEN}`,
            actAUTH_GET_USER: `auth/${AUTH_GET_USER}`,
            actAUTH_USER: `auth/${AUTH_USER}`
        }),
        async initDapi2() { 
            window.addEventListener("DOMContentLoaded", async () => {
                try {
                    const curdapi2 = new dapi2();
                    await curdapi2.init({
                        APP_REDIRECT_SSO: import.meta.env.VITE_APP_REDIRECT_SSO,
                        APP_CLIENT_ID: import.meta.env.VITE_APP_CLIENT_ID,
                        redirect_sso: 1//import.meta.env.VITE_APP_REDIRECT_SSO_URL
                    });
                
                    const authResult = await curdapi2.getAuth();
                    await store.dispatch(`auth/${AUTH_TOKEN}`, { ...authResult, thirdParty: curdapi2 });
                    const userProfile = await store.dispatch(`auth/${AUTH_GET_USER}`);
                    await store.dispatch(`auth/${AUTH_USER}`, userProfile)

                } catch (e) {
                    console.error(e);
                }
            });
        }
    },
    computed: {
        dFrame() {
            return import.meta.env.VITE_APP_IFRAME_OAUTH;
        }
    },
    mounted() {
        setTimeout(() => {
            this.loading = false
        }, 3000);

        window.addEventListener("message", async (event) => {
            if (event.data?.type === "DAPI_AUTH") {
                const { authResult } = event.data;

                await this.actAUTH_TOKEN({
                    ...authResult,
                    thirdParty: { proxy: true } // placeholder
                });
                const userProfile = await this.actAUTH_GET_USER();
                await this.actAUTH_USER(userProfile)
            }
        });
    },
}

</script>