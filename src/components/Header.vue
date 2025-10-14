<template>
    <div class="main-header">
        <v-app-bar color="" density="comfortable" elevante-on-scroll class="px-5" height="80">
            <div class="d-flex justify-space-between w-100">
                <div class="menu-list d-flex align-center">
                    <v-toolbar-title>Exordium </v-toolbar-title>
                    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                </div>
                <div class="user-profile d-flex align-center">
                    <v-menu transition="scale-transition">
                        <template v-slot:activator="{ props }">
                            <div class="d-flex justify-center align-center">
                                <v-btn color="dark" v-bind="props">   
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
                                                <label class="">{{ authUser.email }}</label>
                                            </div>
                                            <v-divider class="my-5"></v-divider>
                                            <router-link :to="{ name: 'user.setpass' }">
                                                <v-btn 
                                                    variant="tonal"
                                                    block
                                                    color="exr_accent_orange_600"
                                                >
                                                    Settings
                                                </v-btn>
                                            </router-link>
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
            </div>
        </v-app-bar>
        <v-navigation-drawer
            app
            v-model="drawer"
            :temporary="$vuetify.display.smAndDown"
            :width="300"
            location="left"
        >
            <v-list>
                <v-list-item exact :to="{ name: 'auth.dashboard' }" active-class="active-navbar-item" title="Dashboard" prepend-icon="mdi-view-dashboard" color="transparent" />
                <v-list-item exact :to="{ name: 'user.setpass' }" active-class="active-navbar-item" title="Settings" prepend-icon="mdi-cog" color="transparent" />
            </v-list>
        </v-navigation-drawer>
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
        
    },
    data() { 
        return { 
            logoByFTP: import.meta.env.VITE_APP_URL_FTP + "/portal/portals/portal-header-logo.png",
            drawer: true,
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