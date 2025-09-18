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
            <!-- <div class="d-flex justify-space-around" v-if="getAUTH_USER">
                <v-menu v-model="menu" :close-on-content-click="false" location="start">
                    <template v-slot:activator="{ props }">
                        <v-btn
                            color="indigo"
                            v-bind="props"
                        >
                        </v-btn>
                    </template>

                    <v-card min-width="300">
                        <v-list>
                        </v-list>
                        <v-divider />
                        <v-card-actions class="d-flex justify-space-between pa-3">

                        </v-card-actions>
                    </v-card>
                </v-menu>
            </div> -->
            
            <v-navigation-drawer
                v-model="drawer_app"
                location="right"
                color="#2E2E2E"
                class="control-sidebar"
            >
                <div class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button"></div>
            </v-navigation-drawer>
            <div id="dapi_signin2" :data-login_uri="dataLoginUri" data-text-login="login with app" data-scope="" data-locale="">
            </div>
            <v-btn v-if="authFailed" class="bg-primary" @click="btnLogin">Login</v-btn>
            <!-- <div v-else>{{ getAUTH_USER.name }}</div> -->
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
import { AUTH_TOKEN, AUTH_USER, AUTH_GET_USER } from '../stores/actions/reqApi'

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
        }
    },
    computed: { 
        ...mapGetters({
            getAUTH_USER: 'auth/'+AUTH_USER
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
            actAUTH_TOKEN: `auth/${AUTH_TOKEN}`,
            actAUTH_GET_USER: `auth/${AUTH_GET_USER}`,
            actAUTH_USER: `auth/${AUTH_USER}`
        }),
        btnLogin() {
            if(this.iframeAuthUrl) {
                window.location.href = this.iframeAuthUrl;
            }
        },
        initDapiOld() {
            const el = document.getElementById("dapi_signin2");
            if (!el) {
                console.error("#dapi_signin2 ga ada");
                return;
            }

            const script = document.createElement("script");
            script.src = import.meta.env.VITE_APP_OAUTH_URL;
            script.async = true;
            script.onload = async () => {
                const curdapi2 = new window.dapi2();
                await curdapi2.init({
                    APP_CLIENT_ID: import.meta.env.VITE_APP_CLIENT_ID,
                    APP_REDIRECT_SSO_URL: import.meta.env.VITE_APP_REDIRECT_SSO_URL,
                    APP_REDIRECT_SSO: 0,
                });
                
                try {
                    const authResult = await curdapi2.getAuth();
                    // console.log('auth res' , authResult)
                    await this.actAUTH_TOKEN({ ...authResult, thirdParty: curdapi2 });

                    const userProfile = await this.actAUTH_GET_USER();
                    await this.actAUTH_USER(userProfile);

                } catch (error) {
                    console.error('error ', error)
                    if ( error.status === 422 ) { 
                        this.authFailed = true;
                        let v = false;
                        this.checkerInterval(v);
                        // console.log('if status 422', this.authFailed);
                    } else if ( error.status === 401) { 
                        this.authFailed = true;
                        let v = true;
                        this.checkerInterval(v);
                        // console.log('if status 401', this.authFailed);
                    }
                }
            };
            document.body.appendChild(script);
        },
        toggleDrawer() {
            this.drawer_app = !this.drawer_app
        },
        checkerInterval(v) {
            const checker = setInterval(() => {
                const frameDapi2 = document.querySelector("iframe[src*='dapi/dist']");
                if (frameDapi2) {

                    frameDapi2.style.display = "none";
                    frameDapi2.style.height = '0px';

                    const q = frameDapi2.src.split("?")[1] || "";
                    const newUri = import.meta.env.VITE_APP_IFRAME_OAUTH + q;
                    this.iframeAuthUrl = newUri;
                    clearInterval(checker)

                    setTimeout(() => {
                        if(frameDapi2 && frameDapi2.parentNode) {
                            console.log('frame dapi === >',frameDapi2);
                            if(!v){
                                frameDapi2.remove()
                            }
                        }
                    }, 10000);
                }
            }, 50);
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.initDapiOld();
            // console.log('iframe ', this.iframeAuthUrl)
        })
    }

}
</script>