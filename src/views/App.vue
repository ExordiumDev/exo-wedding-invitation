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
import { mapActions } from 'vuex';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import BaseIndex from './BaseIndex.vue';

export default {
    name: 'App',
    components: {
        BaseIndex,
        Header,
        Footer,
    },
    methods: {
        ...mapActions({

        }),
    },
    created() {

    },
}

</script>