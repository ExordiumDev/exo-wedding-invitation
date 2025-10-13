<template>
    <v-card>
        <v-snackbar v-model="sloginResp" :timeout="alertTimeout" location="top" color="success" class="elevation-24">{{ loginRespTxt }}</v-snackbar>
        <v-snackbar v-model="eloginResp" :timeout="alertTimeout" location="top" color="danger" class="elevation-24">{{ loginRespTxt }}</v-snackbar>
        <div class="d-flex justify-end pa-3">
            <v-btn variant="flat" @click="$emit('close')">
                <v-icon class="fa-solid fa-xmark"></v-icon>
            </v-btn>
        </div>
        <v-tabs v-model="tab" grow>
            <v-tab value="signin">Sign In</v-tab>
            <v-tab value="signup">Sign Up</v-tab>
        </v-tabs>

        <v-window v-model="tab">
            <!-- sign in -->
            <v-window-item value="signin">
                <v-card-text class="pa-7">
                    <v-text-field variant="outlined" label="E-mail" required type="email" ref="uE" v-model="uE"></v-text-field>
                    <v-text-field variant="outlined" label="Password" type="password" required ref="uP" v-model="uP"></v-text-field>

                    <v-btn variant="flat" block prepend-icon="mdi-login" color="exr_accent_orange_600" @click="SignIn" :disabled="$store.state.pageLoad">Login</v-btn>

                    <div class="d-flex align-center my-4">
                        <v-divider></v-divider>
                        <span class="mx-2 text-grey">OR</span>
                        <v-divider></v-divider>
                    </div>

                    <v-btn
                        variant="tonal"
                        block
                        color="exr_accent_orange_600"
                        class="google-btn"
                        prepend-icon="mdi-google"
                        :href="oauthURI+'/auth/google/login'"
                        :disabled="$store.state.pageLoad"
                    >
                        Sign in with Google
                    </v-btn>
                </v-card-text>

            </v-window-item>

            <v-window-item value="signup">
                <v-card-text class="pa-7">
                    <v-text-field variant="outlined" label="Name" required />
                    <v-text-field variant="outlined" label="E-mail" required />
                    <v-text-field variant="outlined" label="Password" type="password" required />
                    <v-text-field variant="outlined" label="Confirm Password" type="password" required />
                    <v-btn block color="exr_accent_orange_600" class="mt-4">Register</v-btn>
                </v-card-text>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { AUTH_SIGNIN } from '../stores/actions/reqApi'
import { encPass } from '../appcore/crypto'
export default {
    data() {
        return { 
            tab: 'signin',
            uE: '',
            uP: '',
            eloginResp: false,
            sloginResp: false,
            loginRespTxt: '',
        }
    },
    computed:{
        oauthURI() {
            return import.meta.env.VITE_APP_API_URL
        }
    },
    methods: {
        ...mapActions({
            actAUTH_SIGNIN: `auth/${AUTH_SIGNIN}`
        }),
        async SignIn() {
            try {
                const e = encPass(this.uP);
                let payload = {
                    _e: this.uE,
                    _p: e
                }
                this.$store.commit('SET_PROGRESS_BAR', true)
                this.$store.commit('SET_DISBTN', true)
                const res = await this.actAUTH_SIGNIN(payload);
                this.loginRespTxt = res
                console.log("res success", res)
            } catch (error) {
                this.$store.commit('SET_PROGRESS_BAR', false)
                this.$store.commit('SET_DISBTN', false)
                this.eloginResp = true;
                this.loginRespTxt = error?.response?.data?.detail
                console.error('er on component -> ', error)
            }
        }
    }
}

</script>