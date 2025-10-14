<template>
    <v-container class="py-10 h-100 bg-exr_accent_orange_50" fluid>
        <v-row justify="center" class="align-center h-100">
            <v-col cols="12" md="4">
                <v-card variant="elevated">
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
                            <v-card-text class="pa-5">
                                <v-text-field variant="outlined" label="Name" required v-model="uSignupN" />
                                <v-text-field variant="outlined" label="E-mail" required v-model="uSignupE" />
                                <v-text-field variant="outlined" label="Password" type="password" required v-model="uSignupP" ref="uSignupP" @input="checkMatch"/>
                                <v-text-field variant="outlined" label="Confirm Password" type="password" required v-model="uSignupCP" ref="uSignupCP" @input="checkMatch"/>
                                <small class="text-red" v-if="errorField">{{ errorField }}</small>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn variant="flat" block color="exr_accent_orange_600" @click="signup">Register</v-btn>
                            </v-card-actions>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import { mapActions } from 'vuex';
import { AUTH_SIGNIN, AUTH_SIGNUP } from '../stores/actions/reqApi'
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

            uSignupN: '',
            uSignupE: '',
            uSignupP: '',
            errorField: '',
        }
    },
    computed: {
        oauthURI() {
            return import.meta.env.VITE_APP_API_URL
        }
    },
    methods: {
        ...mapActions({
            actAUTH_SIGNIN: `auth/${AUTH_SIGNIN}`,
            actAUTH_SIGNUP: `auth/${AUTH_SIGNUP}`
        }),
        checkMatch() {
            const _p = this.uSignupP
            const _cp = this.uSignupCP

            if(!_p && !_cp) {
                this.errorField = '';
                return
            }

            if (_p.length < 8) {
                this.errorField = 'Password must be at least 8 characters.'
            } else if (_p !== _cp) {
                this.errorField = 'Confirm Password is not correct yet!'
            } else {
                this.errorField = ''
            }
        },
        async signup() {
            console.log('sign up');
            const encPas = encPass(this.uSignupP)
            const payload = {
                name: this.uSignupN,
                email: this.uSignupE,
                password: encPas
            }
            try {
                this.$store.commit('SET_PROGRESS_BAR', true)
                await this.actAUTH_SIGNUP(payload);
                sessionStorage.setItem('v_em', this.uSignupE);
                this.$router.push('/v');
            } catch (error) {
                console.log('error ', error);
            } finally {
                this.$store.commit('SET_PROGRESS_BAR', false)
            }
        },
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
                console.log("res success", res)
            } catch (error) {
                this.showToast('Error login', 'error', { timeout: 2500 })
                this.$store.commit('SET_PROGRESS_BAR', false)
                this.$store.commit('SET_DISBTN', false)
            }
        }
    },
    mounted(){ 

    }
}

</script>
