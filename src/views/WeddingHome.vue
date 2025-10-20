<template>
    <v-container
        fluid 
        class="h-100 d-flex justify-center align-center flex-column perspective-wrapper">
        <!-- SECTION HOME TEXT -->
        <v-row>
            <v-col cols="12" md="12">
                <div v-if="!showAyat && !showWeddingContent" class="d-flex flex-column align-center ga-3 text-section justify-center h-100" ref="introSection">
                    <span class="text-h6 text-md-h5 _salina_text">Dear</span>
                    <span class="text-h3 text-md-h2 _salina_text">Ahmad Fauzi</span>
                    <v-divider :thickness="1" color="background"></v-divider>
                    <span class="text-h6 text-md-h5 _salina_text">We Invite you to the weeding of</span>
                    <v-btn variant="flat" class="text-none" @click="animateExit">Open the invitation</v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

.perspective-wrapper { 
    perspective: 1000px; 
    overflow: hidden;
}

._bunga_bottom_left_clover_0 { 
    width: 3rem;
    position: absolute;
    bottom: 0;
    left: 0%;
    z-index: 1;
    transform: scaleX(-1)
}

._bunga_bottom_left_clover_50 { 
    width: 3rem;
    position: absolute;
    bottom: 0;
    left: 16%;
    z-index: 2;
}

._bunga_bottom_left { 
    width: 16rem;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    transform: scaleX(-1)
}

._bunga_bottom_left_30 { 
    width: 16rem;
    position: absolute;
    bottom: 0;
    left: 8%;
    z-index: 1;
    transform: scaleX(-1)
}

._bunga_bottom_left_60 { 
    width: 12rem;
    position: absolute;
    bottom: 0;
    left: 17%;
    z-index: 1;
}

._bunga_bottom_left_90 { 
    width: 12rem;
    position: absolute;
    bottom: 0;
    left: 23%;
    z-index: 1;
}

._bunga_bottom_right { 
    width: 24rem;
    position: absolute;
    bottom: 0;
    right: -3%;
    z-index: 1;
}

._bunga_bottom_right_30 { 
    width: 12rem;
    position: absolute;
    bottom: 0;
    right: 13%;
    z-index: 1;
    transform: scaleX(-1);
}

._bunga_bottom_right_60 { 
    width: 12rem;
    position: absolute;
    bottom: 0;
    right: 18%;
    z-index: 1;
}

._bunga_bottom_right_90 { 
    width: 8rem;
    position: absolute;
    bottom: 0;
    right: 25%;
    z-index: 1;
}

.bunga-gerak { 
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}


</style>

<script>

import gsap from 'gsap'
import tiang from '../assets/images/partial/brimingham-big.png'
import imaBg from '../assets/images/non-partial/Pratiwi-Ahmad-09-November-WEB-bg-depan-tanpa-tiang.png'
import bungaGede from '../assets/images/partial/bunga-copy.svg'
import bungaWhiteRose from '../assets/images/partial/white-rose-copy.png'
import bungaClover from '../assets/images/partial/Clover.png'
import burungKiri from '../assets/images/partial/burung-kiri.png'
import burungKanan from '../assets/images/partial/burung-kanan.png'

// penganten
import mempelaiWanita from "../assets/images/partial/m_wanita.png"
import mempelaiPria from "../assets/images/partial/m-pria.png"

import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

export default { 
    data() { 
        return { 
            mempelaiWanita,
            mempelaiPria,
            tiang,
            imaBg,
            bungaGede,
            bungaWhiteRose,
            bungaClover,
            burungKiri,
            burungKanan,

            isExit: false,
            showAyat:false,
            showWeddingContent: false,
            showBurung: false,
            burungLoaded: {
                left: false,
                right: false
            },
        }
    },
    methods: {
        ...mapMutations({
            // setCRoutes: 'SET_C_ROUTES'
        }),
        animateExit() {
            this.$router.push({name: 'inv.open'});
            this.$store.commit('SET_C_ROUTES', true);
        },
        animateAyatEnter() {
            const textEl = this.$refs.textSection;
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.from(
                textEl,
                {
                    opacity: 0,
                    y: 50,
                    duration: 1.1
                },
                "-=0.6"
            );
        },
        showContent() {
            this.$nextTick(() => {
                const textEl = this.$refs.weddingContent;
                const container_mempelai = this.$refs.container_mempelai;
                this.showAyat = false;
                if (!textEl || !container_mempelai) return

                const spans = textEl.querySelectorAll('span')
                const tl = gsap.timeline()
                tl.from(spans, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                })
                .from(container_mempelai, {
                    opacity: 0,
                    y: 80,
                    duration: 0.8,
                    ease: "power3.out",
                    immediateRender: false,
                }, "+=0.5")
            })
        },
    },
    mounted() {
        const textEl = this.$refs.introSection
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(
            textEl,
            {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: "power3.out"
            },
        );
    },
    beforeUnmount() {
        if (this._handleScroll) {
            window.removeEventListener('wheel', this._handleScroll);
        }
    }
}

</script>