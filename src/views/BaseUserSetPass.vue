<template>
    <v-container class="h-100 justify-center">
        <v-row class="my-10 d-flex justify-center">
            <v-col cols="12" md="6">
                <div class="d-flex flex-column ga-3 pa-5">
                    <p class="text-h4">User Set Password</p>
                    <v-card class="py-5">
                        <v-card-item>
                            <div class="ga-3 pt-5">
                                <v-text-field
                                    type="password"
                                    variant="outlined"
                                    label="Password"
                                    ref="_p"
                                    required
                                    @input="checkMatch"
                                ></v-text-field>
                            </div>
                            <div class="_cp">
                                <v-text-field
                                    type="password"
                                    variant="outlined"
                                    ref="_cp"
                                    label="Confirm Password"
                                    @input="checkMatch"
                                ></v-text-field>
                                <small class="text-red" v-if="errorField">{{ errorField }}</small>
                            </div>
                        </v-card-item>
                        <v-card-actions>
                            <v-btn block variant="tonal" color="exr_accent_orange_600" @click="submitSetPassword" :disabled="!canSubmit">Submit</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import { AUTH_SET_PASSWORD } from '../stores/actions/reqApi'


export default {
    data() {
        return { 
            canSubmit: false,
            errorField: false,
        }
    },
    computed: {

    },
    methods: {
        ...mapActions({
            actAUTH_SET_PASSWORD: `auth/${AUTH_SET_PASSWORD}`
        }),
        checkMatch() {
            const _p = this.$refs._p.$el.querySelector('input').value;
            const _cp = this.$refs._cp.$el.querySelector('input').value;

            if(_p.length === 0 && _cp.length === 0) {
                this.errorField = '';
                this.canSubmit = false;
                return
            }

            if (_p.length < 8) {
                this.errorField = 'Password must be at least 8 characters.'
                this.canSubmit = false
            } else if (_p !== _cp) {
                this.errorField = 'Confirm Password is not correct yet!'
                this.canSubmit = false
            } else {
                this.errorField = ''
                this.canSubmit = true
            }
        },
        async submitSetPassword(){
            const _p = this.$refs._p.$el.querySelector('input').value;
            try {
                await this.actAUTH_SET_PASSWORD({p: _p});
            } catch (error) {
                console.error('Error ', error)
            }
        }
    },
    mounted(){

    }
}

</script>