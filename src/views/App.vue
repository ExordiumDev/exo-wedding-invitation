<template>
    <v-app>
        <v-main class="main-wrapper">
            <router-view />
        </v-main>
    </v-app>
</template>

<style scoped>

</style>

<script>
import signDialog from '../components/signDialog.vue'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

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
        Header,
        Footer,
        signDialog,
    },
    computed: {
        ...mapGetters({
            
        }),
    },
    methods: {
        ...mapActions({
            
        }),
        ...mapMutations({
            
        }),
    },
    mounted() {
        
    },
}

</script>