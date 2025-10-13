<template>
    <div class="main-header">
        <v-app-bar color="" density="comfortable" elevante-on-scroll class="_floating-header px-5" height="80">
            <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none">
                <v-icon>mdi-menu</v-icon>
            </v-app-bar-nav-icon>
            <v-app-bar-title>
                <router-link :to="{name : 'Home.view'}" style="color: #223">
                    <v-avatar size="40">
                        <v-img src="../../public/exr-logo.png" max-height="40" max-width="40"></v-img>
                    </v-avatar>
                </router-link>
            </v-app-bar-title>
            
            <div class="d-none d-md-flex my-0 router-wrapper">
                <router-link :to="{ name: 'Home.view' }" class="nav-link">
                    <v-btn 
                        text
                        class="py-0 text-exr_accent_orange_950"
                        :class="$route.name === 'Home.view' ? 'bg-exr_accent_orange_200' : ''"
                        color="secondary"
                    >
                        Home
                    </v-btn>
                </router-link>

                <router-link :to="{ name: 'News.view' }" class="nav-link">
                    <v-btn 
                        text 
                        class="py-0 text-exr_accent_orange_950"
                        :class="$route.name === 'News.view' ? 'bg-exr_accent_orange_200' : ''"
                        color="secondary"
                    >
                        News 
                    </v-btn>
                </router-link>
            </div>
            
            <div v-if="!authUser || !authUser.name">
                <v-btn variant="flat" @click="signInDialog = true">Sign in</v-btn>
                <v-dialog max-width="550" persistent v-model="signInDialog">
                    <signDialog @close="signInDialog = false" />
                </v-dialog>
            </div>
            <div v-else class="d-flex justify-space-around">
                <v-menu transition="scale-transition">
                    <template v-slot:activator="{ props }">
                        <div class="d-flex justify-center align-center">
                            <v-btn
                                color="dark"
                                v-bind="props"
                            >   
                                
                                <div class="text-exr_accent_orange_600">
                                    {{ authUser.name }}
                                </div>
                            </v-btn>
                        </div>
                    </template>

                    <v-list>
                        <v-list-item>
                            <v-card hover>
                                <v-card-item>
                                    <v-card-title>
                                        <div class="d-flex ga-3 align-center">
                                            <v-img :src="authUser.pict_uri" height="40" width="40" cover class="rounded-circle"></v-img>
                                            <label class="text-h6">{{ authUser.email }}</label>
                                        </div>
                                        <v-divider class="my-5"></v-divider>
                                        <router-link :to="{ name: 'User.set' }">
                                            <v-btn 
                                                variant="tonal"
                                                block
                                                color="exr_accent_orange_600"
                                            >
                                                Settings
                                            </v-btn>
                                        </router-link>
                                        <div class="d-flex my-3 align-center">
                                            
                                        </div>
                                    </v-card-title>
                                </v-card-item>
                                <v-card-text>
                                    <v-btn @click="logoutMethod" variant="tonal" color="exr_accent_orange_600" block>Logout</v-btn>
                                </v-card-text>
                            </v-card>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            temporary
            class="d-md-none"
            location="left"
        >
            <v-list nav>
                <v-list-item
                    :to="{name: 'Home.view'}"
                    :class="{ 'active-navbar-item': $route.name === 'Home.view' }"
                    @click="drawer = false"
                >
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>

                <v-list-item
                    :to="{name : 'News.view'}"
                    :class="{ 'active-navbar-item': $route.name === 'News.view' }"
                    @click="drawer = false"
                >
                    <v-list-item-title>News</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!-- <router-view /> -->
    </div>

</template>

<style scoped>

._floating-header {
    position: fixed !important;
    top: 16px !important;
    left: 50% !important;
    right: auto !important;
    width: auto !important;
    transform: translateX(-50%) !important;
    min-width: 90%;
    max-width: 1400px;
    border-radius: 22px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;
    z-index: 1000 !important;
}

.v-app-bar-title {
    flex: 0 0 auto;
}

.nav-link {
    display: flex;
    align-items: stretch;
    height: 100%;
    padding: 0;
    margin: 0;
}

.nav-btn {
    height: 100%;
    border-radius: 0;
    min-height: 0;
    padding: 0 16px;
    display: flex;
    align-items: center;
}

.active-navbar-item {
    background-color: rgba(25, 118, 210, 0.2);
    border-bottom: 5px solid #1976d2;
    color: #1976d2 !important;
}

/* .v-app-bar {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
} */

.v-toolbar__content {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}

.router-wrapper { 
    flex: 1;
    height: 100% !important;
    align-items: center;
    justify-content: center;
    display: flex;
}

.nav-link .v-btn {
    height: 100%;
    border-radius: 0;
}

</style>

<script>


import signDialog from './signDialog.vue'
import { mapGetters, mapActions, mapState } from 'vuex';
import { GOOGLE_LOGOUT, AUTH_USER, AUTH_GET_USER, AUTH_GET_GOOGLE_TOKEN } from '../stores/actions/reqApi'

export default {
    name: 'Header',
    props: {
        authUser: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        signDialog
    },
    data() { 
        return { 
            logoByFTP: import.meta.env.VITE_APP_URL_FTP + "/portal/portals/portal-header-logo.png",
            drawer: false,
            drawer_app: false,
            dialog: false,
            dummyItems: [
                'Dashboard',
                'Users',
                'Reports',
                'Settings',
                'Logout',
            ],
            menu: false,
            checkFrame: null,
            timeOutInterval: null,
            iframeAuthUrl: null,
            authFailed: false,
            gfbtn: false,
            signInDialog:false
        }
    },
    computed: { 
        ...mapGetters({
            getAUTH_USER: 'auth/AUTH_USER',
        }),
        usrPhotosProfile() {
            if (!this.getAUTH_USER?.photos?.image_url) return null
            return import.meta.env.VITE_APP_URL_FTP + '/cdn/images/' + this.getAUTH_USER?.photos?.image_url || ''
        },
        dataLoginUri() {
            return import.meta.env.VITE_APP_URL;
        },
        isLoggedIn(){
            return this.getAUTH_USER && Object.keys(this.getAUTH_USER).length > 0
        }
    },
    methods: {
        ...mapActions({
            actAUTH_GET_USER: `auth/${AUTH_GET_USER}`,
            actAUTH_USER: `auth/${AUTH_USER}`,
            actAUTH_GET_GOOGLE_TOKEN: `auth/${AUTH_GET_GOOGLE_TOKEN}`,
            actGOOGLE_LOGOUT: `auth/${GOOGLE_LOGOUT}`
        }),
        async logoutMethod(){
            await this.actGOOGLE_LOGOUT().then(()=>{
                window.location.reload();
            }).catch(error => {
                console.error('error logout',error)
            })
        },
    },
    mounted() {
        this.$nextTick(() => {
        })
    },
}
</script>