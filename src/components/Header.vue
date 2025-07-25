<template>
    <div class="main-header">
        <v-app-bar color="ligthCustom" class="px-10">
            <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none">
                <v-icon icon="fa-solid fa-bars" />
            </v-app-bar-nav-icon>
            <v-app-bar-title>
                <router-link :to="{name : 'Home.view'}" style="color: #223">
                    Liberty City
                </router-link>
            </v-app-bar-title>
            <v-spacer />
            <div class="d-none d-md-flex my-0 router-wrapper ">
                <router-link :to="{ name: 'Home.view' }" class="nav-link">
                    <v-btn 
                        text
                        class="py-0"
                        :class="$route.name === 'Home.view' ? 'active-navbar-item' : ''"
                        color="secondary"
                    >
                        Home
                    </v-btn>
                </router-link>

                <router-link :to="{ name: 'Library.view' }" class="nav-link">
                    <v-btn 
                        text 
                        class="py-0"
                        :class="$route.name === 'Library.view' ? 'active-navbar-item' : ''"
                        color="secondary"
                    >
                        Library
                    </v-btn>
                </router-link>

                <router-link :to="{ name: 'MyDocument.list.view' }" class="nav-link">
                    <v-btn 
                        text 
                        class="py-0"
                        :class="['MyDocument.list.view','MyDocument.create.view'].includes($route.name) ? 'active-navbar-item' : ''"
                        color="secondary"
                    >
                        My Document
                    </v-btn>
                </router-link>

                <router-link :to="{ name: 'ManageView.view' }" class="nav-link">
                    <v-btn 
                        text 
                        class="py-0"
                        :class="$route.name === 'ManageView.view' ? 'active-navbar-item' : ''"
                        color="secondary"
                    >
                        Manage
                    </v-btn>
                </router-link>
            </div>

            <v-spacer />
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

            <div class="d-none d-md-flex align-items-center">Hello, <span class="text-red mx-1 no-wrap">{{ AUTH_USER?.name }}</span></div>
            <v-menu offset-y>
                <template #activator="{ props }">
                    <v-btn icon v-bind="props">
                        <v-avatar size="36">
                            <img src="https://i.pravatar.cc/150?img=8" alt="Avatar" />
                        </v-avatar>
                    </v-btn>
                </template>

                <v-card min-width="220" class="pa-2">
                    <v-list>
                        <v-list-item>
                            <v-list-item-title>Profile</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Settings</v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-dialog v-model="dialog" max-width="400" persistent>
                                <template v-slot:activator="{props: activatorProps}">
                                    <v-btn v-bind="activatorProps" color="error" variant="tonal">
                                        Log Out
                                    </v-btn>
                                </template>
                                <v-card
                                    prepend-icon="mdi-map-marker"
                                    text="Are you sure to log out ? this action will logging out all application you've been login !"
                                    title="Log Out"
                                >
                                    <template v-slot:actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="dialog = false">
                                        Disagree
                                    </v-btn>
                                    <v-btn @click="logout_action">
                                        Agree
                                    </v-btn>
                                    </template>
                                </v-card>
                            </v-dialog>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
            
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
                    :to="{name : 'Library.view'}"
                    :class="{ 'active-navbar-item': $route.name === 'Library.view' }"
                    @click="drawer = false"
                >
                    <v-list-item-title>Library</v-list-item-title>
                </v-list-item>

                <v-list-item
                    :to="{name : 'MyDocument.list.view'}"
                    :class="['MyDocument.list.view','MyDocument.create.view'].includes($route.name) ? 'active-navbar-item' : ''"
                    @click="drawer = false"
                >
                    <v-list-item-title>My Document</v-list-item-title>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>
        <!-- <router-view /> -->
    </div>

</template>

<style scoped>

.v-navigation-drawer {
    position: fixed !important;
    /* top: 0;
    left: 0; */
    height: 100vh;
    /* z-index: 300;  */
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

import { AUTH_USER, SOCKET_CLIENT, LOGOUT } from '../stores/actions/reqApi';
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';

export default {
    name: 'Header',
    data() { 
        return { 
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
        }
    },
    computed: { 
        ...mapGetters({
            AUTH_USER:'auth/'+AUTH_USER,
        })
    },
    methods: {
        toggleDrawer() {
            this.drawer_app = !this.drawer_app
        },
        logout_action() { 
            this.$nextTick(async () => {
                await this.$curdapi2.authLogout().then(()=>{
                    location.reload();
                })
            });
        }
    }

}
</script>