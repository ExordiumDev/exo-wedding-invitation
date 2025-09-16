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
                <!-- <div id="dapi_signin2" :data-login_uri="dataLoginUri" data-text-login="login with app" data-scope="" data-locale="">
                </div> -->
                <router-view></router-view>
            </v-main>
            <Footer />
        </template>
    </v-app>
</template>

<style scoped>

</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import BaseIndex from './BaseIndex.vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { AUTH_TOKEN, AUTH_USER, AUTH_GET_USER } from '../stores/actions/reqApi.js'

export default {
    name: 'App',
    data() {
        return { 
            // loading: false,
            dapiSrc: '',
            overlayImage: "https://lottie.host/e3b71b26-703e-4343-802e-28b8793b277b/pVIvUkQDkQ.lottie",
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
        // initDapiOld() {
        //     const el = document.getElementById("dapi_signin2");
        //     if (!el) {
        //         console.error("#dapi_signin2 ga ada");
        //         return;
        //     }

        //     const script = document.createElement("script");
        //     script.src = import.meta.env.VITE_APP_OAUTH_URL;
        //     script.async = true;
        //     script.onload = async () => {
        //         const curdapi2 = new window.dapi2();
        //         await curdapi2.init({
        //             APP_CLIENT_ID: import.meta.env.VITE_APP_CLIENT_ID,
        //             APP_REDIRECT_SSO_URL: import.meta.env.VITE_APP_REDIRECT_SSO_URL,
        //             APP_REDIRECT_SSO: 0,
        //         });
                
        //         try {
        //             const authResult = await curdapi2.getAuth();
        //             console.log('auth res' , authResult)
        //             await this.actAUTH_TOKEN({ ...authResult, thirdParty: curdapi2 });
        //             const userProfile = await this.actAUTH_GET_USER();
        //             await this.actAUTH_USER(userProfile);
        //         } catch (error) {
        //             console.error('error ', error)
        //             if( error.status === 422 || error.status === 401 ) { 
        //                 this.authFailed = true;
        //             }
        //             console.log('auth failed ?' , this.authFailed);
        //         }
        //     };
        //     document.body.appendChild(script);

        //     const checker = setInterval(() => {
        //         const frameDapi2 = document.querySelector("iframe[src*='dapi/dist']");
        //         if (frameDapi2) {

        //             frameDapi2.style.display = "none";
        //             frameDapi2.style.height = '0px';

        //             // 
        //             const q = frameDapi2.src.split("?")[1] || "";
        //             const newUri = import.meta.env.VITE_APP_IFRAME_OAUTH + q;
        //             this.iframeAuthUrl = newUri;
        //             clearInterval(checker)

        //             setTimeout(() => {
        //                 if(frameDapi2 && frameDapi2.parentNode) {
        //                     frameDapi2.remove()
        //                     // console.log('iframe remove mampus gak tuh')
        //                     // remove iframe dapi buat manipulasi lifetime2 biar ilang
        //                 }
        //             }, 10000);
        //         }
        //     }, 500);
        // },
        initDapi2() { 
            window.addEventListener("load", async () => {
                try {
                    const curdapi2 = new dapi2();
                    await curdapi2.init({
                        APP_REDIRECT_SSO_URL: import.meta.env.VITE_APP_REDIRECT_SSO_URL,
                        APP_CLIENT_ID: import.meta.env.VITE_APP_CLIENT_ID,
                        APP_REDIRECT_SSO: 0
                    });
                } catch (e) {
                    console.error(e);
                }
            });
        },
        btnLogin() {
            if(this.iframeAuthUrl) {
                window.location.href = this.iframeAuthUrl;
            }
        }
    },
    computed: {

    },
    mounted() {
        this.$nextTick(() => {
        })
    },
}

</script>