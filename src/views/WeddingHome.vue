<template>
    <v-container
        fluid 
        class="h-100 d-flex justify-center align-center flex-column perspective-wrapper">


        <!-- svg bajingan -->
        <div style="max-width: 100px; max-height: 100px;">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1942" height="1836">
                <path d="M0 0 C2.31141604 2.85074644 3 4.3139451 3 8 C3.75667969 8.09796875 4.51335937 8.1959375 5.29296875 8.296875 C12.75334855 10.23463599 17.24206269 20.18231234 20.8984375 26.3515625 C21.59908126 27.56763752 22.29959913 28.78378508 23 30 C23.36383789 30.61456055 23.72767578 31.22912109 24.10253906 31.86230469 C33.60346007 48.01634675 38.86073934 65.63253347 43.3125 83.75 C43.54283936 84.68134766 43.77317871 85.61269531 44.01049805 86.57226562 C48.40563617 105.39797286 49.70517749 124.30240971 50.625 143.5625 C50.74649148 145.96033245 50.86888355 148.35811944 50.9921875"></path>
            </svg>
        </div>

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


        <div v-if="showWeddingContent" class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100" ref="weddingContent">
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
        </div>

        <!-- burung -->

        <v-img v-if="showBurung" :src="burungKiri" class="_burung_left" ref="burungLeft"></v-img>
        <v-img v-if="showBurung" :src="burungKanan" class="_burung_right" ref="burungRight"></v-img>

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
    perspective: 1000px; 
    overflow: hidden;
}

._mempelai {
    width: 22rem;
    max-width: 22rem;
    height: auto;
}


._burung_left { 
    width: 14%;
    position: absolute;
    top: 8%;
    left: 18%;
    z-index: 2;
}

._burung_right { 
    width: 14%;
    position: absolute;
    top: 8%;
    right: 17%;
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

// penganten
import mempelaiWanita from "../assets/images/partial/m_wanita.png"
import mempelaiPria from "../assets/images/partial/m-pria.png"

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
                // scale: 0.821,
                height:'70%',
                scale: 0.821,
                z:90,
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