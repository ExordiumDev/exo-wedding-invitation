<template>
    <v-app class="d-flex flex-column min-h-screen">
        <Header :authUser="getAUTH_USER" />
        <v-main class="flex-grow-1">
            <router-view />
        </v-main>
        <Footer />
    </v-app>
</template>

<style scoped>

.v-application,
.v-application__wrap {
    min-height: 100vh;
}

</style>

<script >

import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import { mapActions, mapGetters } from 'vuex';
import { AUTH_USER, AUTH_GET_USER } from '../stores/actions/reqApi.js'

export default { 
    components: {
        Header,
        Footer,
    },
    data() {
        return { 

        }
    },
    computed: {
        ...mapGetters({
            getAUTH_USER: `auth/${AUTH_USER}`
        })
    },
    methods: {
        ...mapActions({
            actAUTH_GET_USER: `auth/${AUTH_GET_USER}`,
        }),
    },
    mounted() {
        this.$nextTick(async() => {
            
        })
    }
    
}

</script>