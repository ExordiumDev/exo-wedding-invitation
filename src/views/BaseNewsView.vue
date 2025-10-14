<template>
    <v-container class="py-10">
        <v-row>
            <v-col>
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
    },
    mounted() {
        this.$nextTick(async() => {
            await this.actGET_DATA()
        })
    }
}

</script>