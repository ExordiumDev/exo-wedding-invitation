<template>
    <v-container class="py-10">
        <v-row>
            <v-col>
                <v-dialog
                    v-model="authDialog"
                    max-width="400"
                    persistent
                >
                    <v-card
                        prepend-icon="mdi-map-marker"
                        text="Please Login first"
                    >
                        <template v-slot:actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="backHome">
                                Back to home
                            </v-btn>
                        </template>
                    </v-card>
                </v-dialog>
                <v-card>
                    <v-card-title v-if="getGET_DATA">
                        {{ getGET_DATA.user }}
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>

import { mapGetters, mapActions } from 'vuex';
import { GET_DATA } from '../stores/actions/reqApi'

export default { 
    name: 'BaseNewsAll',
    components: {
        
    },
    data() { 
        return { 
            authDialog: false,
        }
    },
    computed: {
        ...mapGetters({
            getGET_DATA: `data/${GET_DATA}`
        })  
    },
    methods: {
        ...mapActions({
            actGET_DATA: `data/${GET_DATA}`,
        }),
        backHome() {
            this.pushRoute('/home')
        }
    },
    mounted() {
        this.$nextTick(async() => {
            try {
                const res = await this.actGET_DATA();
                this.authDialog = false;
                console.log('result ', res);
            } catch (error) {
                this.authDialog = true;
                console.error('Error ', error);
            }
        })
    }
}

</script>