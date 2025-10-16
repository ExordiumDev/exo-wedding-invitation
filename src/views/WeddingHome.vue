<template>
    <v-container
        fluid 
        :style="{
            backgroundImage: `url(${imaBg})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }" 
        class="h-100 d-flex justify-center align-center flex-column perspective-wrapper">

        <!-- SECTION HOME TEXT -->
        <div v-if="!showAyat && !showWeddingContent" class="d-flex flex-column align-center ga-3 text-section" ref="introSection">
            <span class="text-h5 _salina_text">Dear</span>
            <span class="text-h2 _salina_text">Ahmad Fauzi</span>
            <v-divider :thickness="1" color="background"></v-divider>
            <span class="text-h5 _salina_text">We Invite you to the weeding of</span>
            <v-btn variant="flat" class="text-none" @click="animateExit">Open the invitation</v-btn>
        </div>

        <!-- SECTION INVITATION OPENED -->
        <div v-if="showAyat" class="d-flex flex-column align-center justify-start h-100 ga-1 text-background" ref="textSection">
            <v-spacer></v-spacer>
            <span class="text-h6 _salina_text_2">Dan di antara ayat-ayat-Nya ialah</span>
            <span class="text-h6 _salina_text_2">Dia menciptakan untukmu istri-istri</span>
            <span class="text-h6 _salina_text_2">dari Jenismu sendiri, supaya kamu</span>
            <span class="text-h6 _salina_text_2">merasa nyaman kepadanya, dan</span>
            <span class="text-h6 _salina_text_2">dijadikan-Nya diantaramu mawadah</span>
            <span class="text-h6 _salina_text_2">dan rahmah. Sesungguhnya pada yang</span>
            <span class="text-h6 _salina_text_2">demikian itu benar-benar terdapat</span>
            <span class="text-h6 _salina_text_2">tanda-tanda bagi kaum yang berpikir.</span>
            <span class="text-h4 mt-10 _salina_text_2">Ar-rum ayat 21</span>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
        </div>


        <div v-if="showWeddingContent" class="d-flex flex-column align-center justify-start h-100 ga-1 text-background" ref="weddingContent">
            <span class="text-h6 _salina_text_2 mb-5">Assalamu'alaikum Warahmatullahi Wabarakaatuh</span>
            <span class="_avenir_text">Dengan memohon ridho dan rahmat Allah SWT</span>
            <span class="_avenir_text">Kami bermaksud menyelenggarakan</span>
            <span class="_avenir_text">Resepsi Pernikahan putra-putri kami</span>
        </div>

        <!-- burung -->

        <v-img v-if="showWeddingContent" :src="burungKiri" class="_burung_left" ref="burungLeft"></v-img>
        <v-img v-if="showWeddingContent" :src="burungKanan" class="_burung_right" ref="burungRight"></v-img>

        <v-img :src="tiang" class="_tiang_left" ref="tiangLeft"></v-img>
        <v-img :src="tiang" class="_tiang_right" ref="tiangRight"></v-img>
        
        <v-img :src="bungaWhiteRose" class="_bunga_bottom_left"></v-img>
        <v-img :src="bungaClover" class="_bunga_bottom_left_clover_0"></v-img>
        <v-img :src="bungaClover" class="_bunga_bottom_left_clover_50"></v-img>
        <v-img :src="bungaGede" class="_bunga_bottom_left_30"></v-img>
        <v-img :src="bungaWhiteRose" class="_bunga_bottom_left_60"></v-img>
        <v-img :src="bungaGede" class="_bunga_bottom_left_90"></v-img>

        <v-img :src="bungaGede" class="_bunga_bottom_right"></v-img>
        <v-img :src="bungaWhiteRose" class="_bunga_bottom_right_30"></v-img>
        <v-img :src="bungaGede" class="_bunga_bottom_right_60"></v-img>
        <v-img :src="bungaWhiteRose" class="_bunga_bottom_right_90"></v-img>
    </v-container>
</template>

<style scoped>

._avenir_text { 
    font-family: 'Avenir';
}

._salina_text_2 { 
    font-family: 'Salina-trial-book-italic' !important;
}

._salina_text { 
    font-family: 'Salina-trial-book' !important;
}

.perspective-wrapper { 
    position: relative;
    perspective: 1000px; 
    overflow: hidden;
}

._burung_left { 
    width: 11%;
    position: absolute;
    top: 0;
    left: 22%;
    z-index: 2;
}

._burung_right { 
    width: 11%;
    position: absolute;
    top: 0;
    right: 22%;
    z-index: 2;
}


._tiang_left { 
    width: 15%;
    position: absolute;
    bottom: 0;
    left: 12%;
    z-index: 1;
}

._tiang_right { 
    width: 15%;
    position: absolute;
    bottom: 0;
    right: 12%;
    z-index: 1;
    /* transform: scaleX(-1); */
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

export default { 
    data() { 
        return { 
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
        }
    },
    methods: {
        animateExit() {
            const introEl = this.$refs.introSection;
            const leftEl = this.$refs.tiangLeft?.$el || this.$refs.tiangLeft
            const rightEl = this.$refs.tiangRight?.$el || this.$refs.tiangRight
            const tl = gsap.timeline({
                defaults: { ease: "power3.inOut" },
                onComplete: () => {
                    this.showAyat = true;
                    this.$nextTick(() => this.animateAyatEnter());
                }
            });

            tl.to([leftEl, rightEl], {
                scale: 0.821,
                z: 0,
                transformOrigin: 'center top',
                duration: 2, 
                ease: 'power3.inOut',

            }).to(introEl, {
                    opacity: 0,
                    y: -40,
                    duration: 0.8
                },"<"
            );
        },
        animateAyatEnter() {
            const textEl = this.$refs.textSection;
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.from(
                textEl,
                {
                    opacity: 0,
                    y: 50,
                    duration: 1.2
                },
                "-=0.6"
            );
        },
        showContent() {
            this.$nextTick(() => {
                const textEl = this.$refs.weddingContent
                this.showAyat = false;
                if (!textEl) return

                // animasi masuk
                gsap.from(textEl, {
                    opacity: 0,
                    y: 90,
                    duration: 1.5,
                    ease: "power3.out",
                })
            })
        }
    },
    mounted() {
        const textEl = this.$refs.introSection
        const leftEl = this.$refs.tiangLeft?.$el || this.$refs.tiangLeft
        const rightEl = this.$refs.tiangRight?.$el || this.$refs.tiangRight
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from([leftEl, rightEl], {
            opacity: 0,
            duration: 1.2,
            y: 80,
        });
        tl.from(
            textEl,
            {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: "power3.out"
            },
        );

        const handleScroll = (e) => {
            if (e.deltaY > 0 && this.showAyat && !this.showWeddingContent) {
                e.preventDefault();
                this.showWeddingContent = true;
                this.showContent();
                return;
            }

            if (e.deltaY < 0 && this.showWeddingContent) {
                e.preventDefault();
                this.showWeddingContent = false;
                this.showAyat = true;
                gsap.to(this.$refs.weddingContent, {
                    opacity: 0,
                    y: -50,
                    duration: 2,
                    onComplete: () => {
                        this.$nextTick(() => this.animateAyatEnter());
                    }
                });
            }
        }
        this._handleScroll = handleScroll;
        window.addEventListener('wheel', handleScroll, { passive: false });
    },
    beforeUnmount() {
        if (this._handleScroll) {
            window.removeEventListener('wheel', this._handleScroll);
        }
    }
}

</script>