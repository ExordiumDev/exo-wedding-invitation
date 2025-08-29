<template>
    <v-app>
        <!-- splash screen -->
        <v-overlay v-if="loading" :model-value="true" persistent absolute class="d-flex align-center justify-center bg-background">
            <div class="text-center">
                <DotLottieVue style="width: 500px; height: 500px;" autoplay loop :src="overlayImage" />
                <!-- <v-progress-circular
                    indeterminate
                    color="primary"
                    size="48"
                    class="mt-4"
                /> -->
            </div>
        </v-overlay>
        <template v-else>
            <Header />
            <v-main class="main-wrapper">
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

export default {
    name: 'App',
    data() {
        return { 
            loading: true,
            // overlayImage: import.meta.env.VITE_APP_URL_FTP + "/portal/portals/news-1.png"
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

        }),
    },
    mounted() {
        setTimeout(() => {
            this.loading = false
        }, 5000)
    },
    created() {

    },
}

</script>