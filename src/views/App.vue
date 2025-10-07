<template>
    <v-app>
        <Header />
        <v-main class="main-wrapper">
            <router-view></router-view>
        </v-main>
        <!-- <Footer /> -->
    </v-app>
</template>

<style scoped>

</style>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import BaseIndex from './BaseIndex.vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { AUTH_TOKEN, AUTH_USER, AUTH_GET_USER, EX_CODE, CHECK_AUTH, SET_USER_IF_UNAUTHENTICATED } from '../stores/actions/reqApi.js'

export default {
    name: 'App',
    data() {
        return { 
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
            actEX_CODE: `auth/${EX_CODE}`,
            actAUTH_TOKEN: `auth/${AUTH_TOKEN}`,
            actAUTH_GET_USER: `auth/${AUTH_GET_USER}`,
            actAUTH_USER: `auth/${AUTH_USER}`,
            actCHECK_AUTH: `auth/${CHECK_AUTH}`,
        }),
        handleIframeMessage(event) {
            try {
                const data = event.data;
                console.log("Message from iframe:", data);
                if (data.action === "triggerPageTriggerParentResponse") {
                    console.log("Token response:", data.param);
                }
            } catch (err) {
                console.error("Invalid message", err);
            }
        },
        ...mapMutations({
            mutSET_USER_IF_UNAUTHENTICATED: `auth/${SET_USER_IF_UNAUTHENTICATED}`
        }),
    },
    mounted() {
        this.$nextTick(async() => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");

            if(code){
                await this.actEX_CODE(code);
                await this.actCHECK_AUTH();
                await this.$router.push("/")
            } else {
                console.log('no code found');
                this.mutSET_USER_IF_UNAUTHENTICATED()
                return;
            }
        })
    },
}

</script>