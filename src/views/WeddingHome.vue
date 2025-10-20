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

        <!-- SECTION INVITATION OPENED -->
        <!-- <div v-if="showWeddingContent" class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100" ref="weddingContent">
            <span class="text-h6 _salina_text_2 mb-5">Assalamu'alaikum Warahmatullahi Wabarakaatuh</span>
            <span class="_avenir_text">Dengan memohon ridho dan rahmat Allah SWT</span>
            <span class="_avenir_text">Kami bermaksud menyelenggarakan</span>
            <span class="_avenir_text">Resepsi Pernikahan putra-putri kami</span>
            <v-container ref="container_mempelai">
                <v-row justify="center">
                    <v-col cols="12" md="5" class="pa-0">
                        <div class="d-flex flex-column text-center align-center">
                            <v-img :src="mempelaiWanita" class="_mempelai"></v-img>
                            <span class="text-h3 _salina_text">Sitti Pratiwi</span>
                            <span class="text-none">Putra pertama</span>
                            <span class="text-none">Bapak Irwan Bakri</span>
                            <span class="text-none">& Ibu Nurtina</span>
                        </div>
                    </v-col>
                    <v-col cols="12" md="1" class="pa-0">
                        <div class="d-flex flex-column text-center align-center h-100 justify-center">
                            <v-spacer></v-spacer>
                            <span class="text-h1 _salina_text">&</span>
                            <v-spacer></v-spacer>
                            <v-spacer></v-spacer>
                            <v-spacer></v-spacer>
                        </div>
                    </v-col>
                    <v-col cols="12" md="5" class="pa-0">
                        <div class="d-flex flex-column text-center align-center">
                            <v-img :src="mempelaiPria" class="_mempelai"></v-img>
                            <span class="text-h3 _salina_text">Ahmad Abdul Gani Nasution</span>
                            <span class="text-none">Putra Terakhir</span>
                            <span class="text-none">Bapak Hamdan Nasution</span>
                            <span class="text-none">& Ibu Elfi Sahra Lubis</span>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div> -->

        <!-- burung -->

        <v-img v-if="showBurung" :src="burungKiri" class="_burung_left" ref="burungLeft"></v-img>
        <v-img v-if="showBurung" :src="burungKanan" class="_burung_right" ref="burungRight"></v-img>
    </v-container>
</template>

<style scoped>

.perspective-wrapper { 
    perspective: 1000px; 
    overflow: hidden;
}

/* ._tiang_left { 
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
} */


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
            }
        }
    },
    methods: {
        ...mapMutations({
            // setCRoutes: 'SET_C_ROUTES'
        }),
        animateExit() {
            this.$router.push({name: 'inv.open'});
            this.$store.commit('SET_C_ROUTES', true);
            
            // const introEl = this.$refs.introSection;
            // const leftEl = this.$refs.tiangLeft?.$el || this.$refs.tiangLeft
            // const rightEl = this.$refs.tiangRight?.$el || this.$refs.tiangRight
            // const tl = gsap.timeline({
            //     defaults: { ease: "power3.inOut" },
            //     onComplete: () => {
            //         this.showAyat = true;
            //         this.$nextTick(() => this.animateAyatEnter());
            //     }
            // });

            // tl.to([leftEl, rightEl], {
            //     // scale: 0.821,
            //     height:'70%',
            //     scale: 0.821,
            //     z:90,
            //     transformOrigin: 'center top',
            //     duration: 2, 
            //     ease: 'power3.inOut',
            // }).to(introEl, {
            //         opacity: 0,
            //         y: -40,
            //         duration: 0.8
            //     },"<"
            // );
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
                    onComplete: () => {
                        this.burungEnter()
                    }
                }, "+=0.5")
            })
        },
        burungEnter() { 
            this.showBurung = true;
            this.$nextTick(()=>{
                const burungKiri = this.$refs.burungLeft?.$el;
                const burungKanan = this.$refs.burungRight?.$el;

                if (!burungKiri || !burungKanan) return;
                gsap.from([burungKiri, burungKanan], { 
                    opacity: 0,
                    y: -30,
                    duration: 1,
                    stagger: 0.35,
                    ease: "power3.out",
                })
            })
        }
    },
    mounted() {
        const svgContent = this.$refs.svgContent
        console.log('svg content ', svgContent);
        const textEl = this.$refs.introSection
        const leftEl = this.$refs.tiangLeft?.$el || this.$refs.tiangLeft
        const rightEl = this.$refs.tiangRight?.$el || this.$refs.tiangRight
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // tl.from([leftEl, rightEl], {
        //     opacity: 0,
        //     duration: 1.2,
        //     y: 80,
        // });
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
                this.showAyat = true;
                this.showWeddingContent = false;
                this.showBurung = false;
                gsap.to(this.$refs.weddingContent, {
                    opacity: 0,
                    y: -50,
                    duration: 2,
                    // onComplete: () => {
                    //     this.$nextTick(() => this.animateAyatEnter());
                    // }
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