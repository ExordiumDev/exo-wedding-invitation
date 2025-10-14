<template>
    <v-container class="py-10 h-100 bg-exr_accent_orange_50" fluid>
        <v-row justify="center" class="align-center h-100">
            <v-col cols="12" md="4">
                <v-card>
                    <v-card-title class="text-center">Verification code has sent to your email</v-card-title>
                    <v-card-item>
                        <v-text-field variant="flat" label="Email" required ref="_ver_email" disabled v-model="dataFromRoute"></v-text-field>
                        <v-text-field variant="outlined" label="Verification Code" required ref="_ver_code" v-model="verCode"/>
                    </v-card-item>
                    <v-card-actions>
                        <v-btn variant="flat" color="exr_accent_orange_600" class="ma-2" @click="submitCode">
                            Submit
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>

import { mapActions } from 'vuex';
import { AUTH_SIGNUP_VERIFY } from '../stores/actions/reqApi'
import { nextTick } from 'vue';

export default { 
    data() { 
        return { 
            dataFromRoute: null,
            verCode: ''
        }
    },
    methods: {
        ...mapActions({
            actAUTH_SIGNUP_VERIFY: `auth/${AUTH_SIGNUP_VERIFY}`
        }),
        async submitCode() { 
            const verCode = this.verCode
            const payload = {
                email: this.dataFromRoute,
                code: verCode
            }
            
            try {
                this.$store.commit('SET_PROGRESS_BAR', true)
                await this.actAUTH_SIGNUP_VERIFY(payload)
                this.showToast('Account verified!', 'success', { timeout: 2500 })
                await nextTick()
                sessionStorage.removeItem('v_em');
                setTimeout(() => {
                    this.$router.push('/login')
                }, 2500);
            } catch (error) {
                console.error('error', error);
                this.showToast(error?.response?.data?.detail || 'Verification failed', 'error', {timeout: 2500, icon: true, pauseOnHover: false})
            } finally {
                this.$store.commit('SET_PROGRESS_BAR', false)
            }
        }
    },
    mounted() {
        const em = sessionStorage.getItem('v_em');
        console.log('em ', em)
        if ( em ) { 
            this.dataFromRoute = em
        } else {
            console.warn('u are not aligible for this route')
            this.$router.push('/login')
        }
    }
}

</script>