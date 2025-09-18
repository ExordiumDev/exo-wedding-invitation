<template>
    <v-app>
        <Header />
        <v-main class="main-wrapper">
            <router-view></router-view>
        </v-main>
        <Footer />
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
        }
    },
    computed: {

    },
    mounted() {
        this.$nextTick(() => {
            // window.addEventListener("message", this.handleIframeMessage);
        })
    },
}

</script>