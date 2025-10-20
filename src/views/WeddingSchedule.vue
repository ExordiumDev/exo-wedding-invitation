<template>
    <v-container fluid>
        <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100" ref="weddingSchedule">
            <span class="text-h4 text-md-h2 _salina_text_2 mb-5">9 NOVEMBER 2025</span>
            <span class="text-none text-md-h5 _salina_text_2">Akad Nikah</span>
            <span class="text-none text-md-h6 _salina_text">Pukul 08:00 - 09:00</span>
            <span class="text-none text-md-h6 _salina_text">Sovereign Plaza Jl. TB. Simatupang</span>
            <span class="text-none text-md-h6 _salina_text">No 56 Cilandak Barat. Cilandak, Jakarta Selatan</span>

            <span class="text-none text-md-h6 _salina_text">-----------------------------------------------</span>

            <span class="text-none text-md-h5 _salina_text_2">Resepsi Pernikahan</span>
            <span class="text-none text-md-h6 _salina_text">Pukul 08:00 - 09:00</span>
            <span class="text-none text-md-h6 _salina_text">Sovereign Plaza Jl. TB. Simatupang</span>
            <span class="text-none text-md-h6 _salina_text">No 56 Cilandak Barat. Cilandak, Jakarta Selatan</span>
        </div>
    </v-container>
</template>

<script>

import gsap from 'gsap'
import { useWheelNavigation } from '../plugins/usewheeleNavigation';

export default {
    data() { 
        return {

        }
    },
    methods: { 
        showSchedule() {
            this.$nextTick(() => {
                const textEl = this.$refs.weddingSchedule;
                const spans = textEl.querySelectorAll('span')
                const tl = gsap.timeline()
                tl.from(spans, {
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
        this.showSchedule()
        const { attach, detach } = useWheelNavigation({
            nextRoute: 'inv.rsvp',
            prevRoute: 'inv.content',
            delay: 2500,
        })

        const el = this.$refs.weddingSchedule.$el || this.$refs.weddingSchedule
        attach(el)
        this.detachFn = () => detach(el)
    },
    beforeUnmount() { 
        if (this._handleScroll) {
            window.removeEventListener('wheel', this._handleScroll);
        }
    }
}
</script>