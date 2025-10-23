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
                </div>
            </v-col>
        </v-row>
        <v-row class="w-100" ref="btnNext">
            <v-col cols="12" md="12">
                <v-btn @click="toRouteContent" variant="plain" block color="background">
                    <v-icon icon="mdi-chevron-double-down"></v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

</style>

<script>
import mempelaiWanita from "../assets/images/partial/m_wanita.png"
import mempelaiPria from "../assets/images/partial/m-pria.png"
import gsap from 'gsap'

export default { 
    props: { 
        guest: {
            type: String,
            default: ''
        }
    },
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
        toRouteContent() { 
            this.$router.push({ name: 'inv.content',query: {guest: this.guest} });
        },
        showBtn() { 
            this.$nextTick(() => {
                const btnEl = this.$refs.btnNext.$el;
                // const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

                gsap.from(btnEl, {
                    opacity: 0,
                    y: -20,
                    duration: 0.8,
                }, "-=0.4");
            });
        },
        showAyat() {
            this.$nextTick(() => {
                const textEl = this.$refs.textSection;
                const spans = textEl.querySelectorAll('span')
                const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

                tl.from(spans, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.2,
                }, "+=0.1");

                // tl.from(btnEl, {
                //     opacity: 0,
                //     y: -20,
                //     duration: 0.8,
                // }, "-=0.4");
            });
        },
    },
    mounted() {
        this.$store.commit("SET_SHOW_BIRD", false);
        this.showAyat();
        this.showBtn();
    },
    beforeUnmount() {
        this.detachFn?.()
    }
}

</script>