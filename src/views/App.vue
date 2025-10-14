<template>
    <v-app>
        <v-snackbar v-model="$store.state.sbShow" :timeout="$store.state.sbTimeout" location="top" :color="$store.state.sbColor">{{ $store.state.sbText }}</v-snackbar>
        <v-progress-linear v-if="$store.state.pageLoad" color="primary" height="5" indeterminate absolute top></v-progress-linear>
        <v-main class="main-wrapper">
            <loadingAuth v-if="$store.state.auth.isAuthenticating" />
            <router-view />
        </v-main>
    </v-app>
</template>

<style scoped>

</style>

<script>
import { reloadAuthState } from '../main.js'
import loadingAuth from '../components/LoadingAuth.vue'
import signDialog from '../components/signDialog.vue'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import BaseIndex from './BaseIndex.vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { AUTH_TOKEN, AUTH_USER, AUTH_GET_USER, EX_CODE, SET_USER_IF_UNAUTHENTICATED } from '../stores/actions/reqApi.js'

export default {
    name: 'App',
    data() {
        return { 
            isRender: false,
            dapiSrc: '',
            overlayImage: "https://lottie.host/e3b71b26-703e-4343-802e-28b8793b277b/pVIvUkQDkQ.lottie",
        }
    },
    components: {
        BaseIndex,
        Header,
        Footer,
        DotLottieVue,
        signDialog,
        loadingAuth,
    },
    computed: {
        ...mapGetters({
            getAUTH_USER: `auth/${AUTH_USER}`
        }),
        ...mapState('auth', {
            stateAUTH_USER: state => state.AUTH_USER
        })
    },
    methods: {
        ...mapActions({
            actEX_CODE: `auth/${EX_CODE}`,
            actAUTH_TOKEN: `auth/${AUTH_TOKEN}`,
            actAUTH_GET_USER: `auth/${AUTH_GET_USER}`,
            actAUTH_USER: `auth/${AUTH_USER}`,
        }),
        ...mapMutations({
            mutSET_USER_IF_UNAUTHENTICATED: `auth/${SET_USER_IF_UNAUTHENTICATED}`,
            mutSET_LOADING_AUTH: 'auth/SET_AUTHENTICATING'
        }),
    },
    mounted() {
        this.$nextTick(async() => {
            // const urlParams = new URLSearchParams(window.location.search);
            // const code = urlParams.get("code");
            const code = new URLSearchParams(window.location.search).get('code')
            if(code){
                this.mutSET_LOADING_AUTH(true);
                try {
                    await this.actEX_CODE(code);
                    window.history.replaceState({}, document.title, window.location.pathname)
                    await reloadAuthState()
                    // window.location.reload();
                    
                } catch (error) {
                    console.error('Google login error ', error);
                } finally {
                    this.mutSET_LOADING_AUTH(false)
                }
            } 
        })
    },
}

</script>