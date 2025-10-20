<template>
    <v-container fluid class="h-100" ref="weddingRsvp">
        <v-row justify="center" class="h-100">
            <v-col cols="12" md="5" class="d-flex justify-center">
                <v-form class="w-100">
                    <v-card variant="tonal" class="pa-5">
                        <v-card-item>
                            <v-card-title class="text-h6 text-md-h4 text-center text-background _salina_text mb-5">RSVP</v-card-title>
                            <v-text-field label="Name" variant="outlined" class="text-h6 text-md-h5 text-center text-background _salina_text mb-2"></v-text-field>
                            <v-text-field label="Phone Number" variant="outlined" class="text-h6 text-md-h5 text-center text-background _salina_text mb-2" :rules="[rules.required, rules.numeric, rules.min1]"></v-text-field>
                            <v-text-field label="Number of guest" variant="outlined" class="text-h6 text-md-h5 text-center text-background _salina_text mb-2" :rules="[rules.required, rules.numeric, rules.min1]"></v-text-field>
                            <v-autocomplete :items="attendance" label="Confirmation of Attendance" class="text-background" variant="outlined"></v-autocomplete>
                        </v-card-item>
                        <v-card-actions>
                            <v-btn variant="flat" block class="text-none">Send</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import { useWheelNavigation } from '../plugins/usewheeleNavigation';
export default {
    name: 'WeddingRSVP',
    data :() => ({
        attendance: ['Present', 'Absent'],
        rules: {
            required: v => !!v || 'This field is required',
            numeric: v => !isNaN(parseFloat(v)) || 'Must be a number',
            min1: v => (v > 0) || 'Must be greater than 0',
        }
    }),
    mounted() { 
        const { attach, detach } = useWheelNavigation({ nextRoute: 'inv.gift', delay: 5000 })
        const el = this.$refs.weddingRsvp.$el
        attach(el)
        this.detachFn = () => detach(el)
    }
}
</script>