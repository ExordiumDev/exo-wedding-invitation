<template>
    <v-card>
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
                    <v-text-field variant="outlined" label="E-mail" required></v-text-field>
                    <v-text-field variant="outlined" label="Password" type="password" required></v-text-field>

                    <div class="d-flex align-center my-4">
                        <v-divider></v-divider>
                        <span class="mx-2 text-grey">OR</span>
                        <v-divider></v-divider>
                    </div>

                    <v-btn
                        block
                        color="exr_accent_orange_600"
                        class="google-btn"
                        prepend-icon="mdi-google"
                        :href="oauthURI+'/auth/google/login'"
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

export default {
    data() {
        return { 
            tab: 'signin'
        }
    },
    computed:{
        oauthURI() {
            return import.meta.env.VITE_APP_API_URL
        }
    }
}

</script>