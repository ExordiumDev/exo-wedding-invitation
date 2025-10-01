<template>
    <div class="main-header">
        <v-app-bar color="ligthCustom" class="px-10 d-flex justify-space-between">
            <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none">
                <v-icon>mdi-menu</v-icon>
            </v-app-bar-nav-icon>
            <v-app-bar-title>
                <router-link :to="{name : 'Home.view'}" style="color: #223">
                    <v-img :src="logoByFTP" width="40" height="40"></v-img>
                </router-link>
            </v-app-bar-title>
            
            <div class="d-none d-md-flex my-0 router-wrapper">
                <router-link :to="{ name: 'Home.view' }" class="nav-link">
                    <v-btn 
                        text
                        class="py-0"
                        :class="$route.name === 'Home.view' ? 'active-navbar-item' : ''"
                        color="secondary text-none"
                    >
                        Home
                    </v-btn>
                </router-link>

                <router-link :to="{ name: 'News.view' }" class="nav-link">
                    <v-btn 
                        text 
                        class="py-0"
                        :class="$route.name === 'News.view' ? 'active-navbar-item' : ''"
                        color="secondary text-none"
                    >
                        News
                    </v-btn>
                </router-link>
            </div>

            <!-- user detail  -->
            <v-btn @click="toggleDrawer" color="primary">
                <v-icon>
                    mdi-dots-grid
                </v-icon>
            </v-btn>
            
            <v-navigation-drawer
                v-model="drawer_app"
                location="right"
                color="#2E2E2E"
                class="control-sidebar"
            >
                <div class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button"></div>
            </v-navigation-drawer>
            <!-- google sso buat iframe nya dia -->
            <div v-if="!gfbtn" id="googleBtn" ref="googleBtn"></div>
            <v-btn v-else @click="logoutMethod">Logout</v-btn>
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

.v-app-bar-title {
    flex: 0 0 auto;
}

.v-navigation-drawer {
    position: fixed !important;
    height: 100vh;
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

.v-app-bar {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
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

import { mapGetters, mapActions } from 'vuex';
import { GOOGLE_LOGOUT, SET_USER, AUTH_TOKEN, AUTH_USER, AUTH_GET_USER, AUTH_GET_GOOGLE_TOKEN, CHECK_AUTH } from '../stores/actions/reqApi'

export default {
    name: 'Header',
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
        }
    },
    computed: { 
        ...mapGetters({
            getAUTH_USER: 'auth/'+AUTH_USER,
            getSET_USER: 'auth/'+SET_USER
        }),
        usrPhotosProfile() {
            if (!this.getAUTH_USER?.photos?.image_url) return null
            return import.meta.env.VITE_APP_URL_FTP + '/cdn/images/' + this.getAUTH_USER?.photos?.image_url || ''
        },
        dataLoginUri() {
            return import.meta.env.VITE_APP_URL;
        }
    },
    methods: {
        ...mapActions({
            actAUTH_GET_USER: `auth/${AUTH_GET_USER}`,
            actAUTH_USER: `auth/${AUTH_USER}`,
            actAUTH_GET_GOOGLE_TOKEN: `auth/${AUTH_GET_GOOGLE_TOKEN}`,
            actCHECK_AUTH: `auth/${CHECK_AUTH}`,
            actGOOGLE_LOGOUT: `auth/${GOOGLE_LOGOUT}`
        }),
        async logoutMethod(){
            await this.actGOOGLE_LOGOUT().then(()=>{
                window.google.accounts.id.disableAutoSelect();
                this.gfbtn = false
                window.location.reload();
            }).catch(error => {
                console.error('error logout',error)
            })
        },
        handleCredentialResponse(response) {
            const gToken = response.credential;
            this.actAUTH_GET_GOOGLE_TOKEN(gToken).then((v) => {
                // commit user ke store
                this.actAUTH_USER(v).then(() => {
                    this.actCHECK_AUTH();
                    this.gfbtn = true;
                }).catch(error => {
                    console.error('error set user', error);
                });
            });
        },
    },
    mounted() {
        this.$nextTick(async() => {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
                callback: this.handleCredentialResponse,
                auto_select: false
            });
            window.google.accounts.id.renderButton(
                document.getElementById("googleBtn"),
                { theme: "outline", size: "large" }
            );

            await this.actCHECK_AUTH()
            if(this.getSET_USER) {
                this.gfbtn = true;
            } else {
                this.gfbtn = false
            }
        })
    }
}
</script>