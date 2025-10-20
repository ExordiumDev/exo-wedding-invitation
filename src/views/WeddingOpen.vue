<template>
    <v-container 
        fluid 
        class="h-100 d-flex justify-center align-center flex-column" ref="touchArea"
    >  
        <v-row>
            <v-col cols="12" md="12">
                <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background scroll-detector" ref="textSection">
                    <v-spacer></v-spacer>
                    <span class="text-none text-md-h6 _salina_text">Dan di antara ayat-ayat-Nya ialah</span>
                    <span class="text-none text-md-h6 _salina_text">Dia menciptakan untukmu istri-istri</span>
                    <span class="text-none text-md-h6 _salina_text">dari Jenismu sendiri, supaya kamu</span>
                    <span class="text-none text-md-h6 _salina_text">merasa nyaman kepadanya, dan</span>
                    <span class="text-none text-md-h6 _salina_text">dijadikan-Nya diantaramu mawadah</span>
                    <span class="text-none text-md-h6 _salina_text">dan rahmah. Sesungguhnya pada yang</span>
                    <span class="text-none text-md-h6 _salina_text">demikian itu benar-benar terdapat</span>
                    <span class="text-none text-md-h6 _salina_text">tanda-tanda bagi kaum yang berpikir.</span>
                    <span class="text-h6 text-md-h4 _salina_text">Ar-rum ayat 21</span>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

</style>

<script>
import mempelaiWanita from "../assets/images/partial/m_wanita.png"
import mempelaiPria from "../assets/images/partial/m-pria.png"
import { useWheelNavigation } from '../plugins/usewheeleNavigation';
import gsap from 'gsap'

export default { 
    data() { 
        return {
            mempelaiWanita,
            mempelaiPria,
            showWeddingContent: false,
            showBurung: false,
            burungLoaded: {
                left: false,
                right: false
            },  
        }
    },
    methods: {
        showAyat() {
            this.$nextTick(() => {
                const textEl = this.$refs.textSection;
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
        this.showAyat()
        const { attach, detach } = useWheelNavigation({
            nextRoute: 'inv.content',
            prevRoute: 'inv.home',
            delay: 2500,
        })

        const el = this.$refs.touchArea.$el || this.$refs.touchArea
        attach(el)
        this.detachFn = () => detach(el)
    },
    beforeUnmount() {
        this.detachFn?.()
    }

}

</script>