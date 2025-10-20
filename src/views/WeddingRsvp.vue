<template>
    <v-container fluid class="h-100" ref="weddingRsvp">
        <v-row justify="center" class="h-100" ref="weddingRsvpCard">
            <v-col cols="12" md="5" class="d-flex justify-center">
                <v-form class="w-100">
                    <v-card variant="plain" class="pa-5">
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

import gsap from 'gsap'
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
    methods: {
        showForm() {
            this.$nextTick(() => {
                const cardEl = this.$refs.weddingRsvpCard.$el;
                const tl = gsap.timeline()
                tl.from(cardEl, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                }, "+=0.1")
            });
        },
    },
    mounted() { 
        this.showForm();
        const { attach, detach } = useWheelNavigation({
            nextRoute: 'inv.gift',
            prevRoute: 'inv.schedule',
            delay: 2500,
        })

        const el = this.$refs.weddingRsvp.$el || this.$refs.weddingRsvp
        attach(el)
        this.detachFn = () => detach(el)

    },
    beforeUnmount() { 
        // if (this._handleScroll) {
        //     window.removeEventListener('wheel', this._handleScroll);
        // }
    }
}
</script>