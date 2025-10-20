<template>
    <v-app>
        <v-main class="main-wrapper">
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
            <router-view v-slot="{Component}">
                <transition name="fade" @before-enter="lockScroll" @after-enter="unlockScroll">
                    <component :is="Component" />
                </transition>
            </router-view>
        </v-main>
    </v-app>
</template>

<style scoped>

@media (max-width : 768px) { 
    ._tiang_left { 
        width: 32% !important;
        position: fixed;
        bottom: 0 !important;
        left: 5% !important;
        z-index: 1-1;
    }

    ._tiang_right { 
        width: 32% !important;
        position: fixed;
        bottom: 0 !important;
        right: 5% !important;
        z-index: 1-1;
    }
  ._bunga_bottom_left_clover_0 { 
        width: 1rem !important;
        position: fixed;
        bottom: 0;
        left: 0%;
        z-index: 1;
        transform: scaleX(-1)
    }

  ._bunga_bottom_left_clover_50 { 
        width: 1rem;
        position: fixed;
        bottom: 0;
        left: 16%;
        z-index: 2;
    }

  ._bunga_bottom_left { 
        width: 5rem !important;
        position: fixed !important;
        bottom: 0 !important;
        left: 0;
        z-index: 1;
        transform: scaleX(-1)
    }

  ._bunga_bottom_left_30 { 
        width: 5rem !important;
        position: fixed;
        bottom: 0;
        left: 8%;
        z-index: 1;
        transform: scaleX(-1)
    }

  ._bunga_bottom_left_60 { 
        width: 3rem !important;
        position: fixed;
        bottom: 0;
        left: 17%;
        z-index: 1;
    }

  ._bunga_bottom_left_90 { 
        width:6rem !important;
        position: fixed;
        bottom: 0;
        left: 23%;
        z-index: 1;
    }

  ._bunga_bottom_right { 
        width: 6rem !important;
        position: fixed;
        bottom: 0;
        right: -3%;
        z-index: 1;
    }

  ._bunga_bottom_right_30 { 
        width: 5rem !important;
        position: fixed;
        bottom: 0;
        right: 13%;
        z-index: 1;
        transform: scaleX(-1);
    }

  ._bunga_bottom_right_60 { 
        width: 7rem !important;
        position: fixed;
        bottom: 0;
        right: 18%;
        z-index: 1;
    }

  ._bunga_bottom_right_90 { 
        width: 5.5rem !important;
        position: fixed;
        bottom: 0;
        right: 25%;
        z-index: 1;
    }
}

._tiang_left { 
    width: 12%;
    position: fixed;
    bottom: 0;
    left: 17%;
    z-index: 1-1;
}

._tiang_right { 
    width: 12%;
    position: fixed;
    bottom: 0;
    right: 17%;
    z-index: 1-1;
}

._bunga_bottom_left_clover_0 { 
    width: 3rem;
    position: fixed;
    bottom: 0;
    left: 0%;
    z-index: 1;
    transform: scaleX(-1)
}

._bunga_bottom_left_clover_50 { 
    width: 3rem;
    position: fixed;
    bottom: 0;
    left: 16%;
    z-index: 2;
}

._bunga_bottom_left { 
    width: 16rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    transform: scaleX(-1)
}

._bunga_bottom_left_30 { 
    width: 16rem;
    position: fixed;
    bottom: 0;
    left: 8%;
    z-index: 1;
    transform: scaleX(-1)
}

._bunga_bottom_left_60 { 
    width: 12rem;
    position: fixed;
    bottom: 0;
    left: 17%;
    z-index: 1;
}

._bunga_bottom_left_90 { 
    width: 12rem;
    position: fixed;
    bottom: 0;
    left: 23%;
    z-index: 1;
}

._bunga_bottom_right { 
    width: 24rem;
    position: fixed;
    bottom: 0;
    right: -3%;
    z-index: 1;
}

._bunga_bottom_right_30 { 
    width: 12rem;
    position: fixed;
    bottom: 0;
    right: 13%;
    z-index: 1;
    transform: scaleX(-1);
}

._bunga_bottom_right_60 { 
    width: 12rem;
    position: fixed;
    bottom: 0;
    right: 18%;
    z-index: 1;
}

._bunga_bottom_right_90 { 
    width: 8rem;
    position: fixed;
    bottom: 0;
    right: 25%;
    z-index: 1;
}
</style>

<script>
import bungaGede from '../assets/images/partial/bunga-copy.svg'
import bungaWhiteRose from '../assets/images/partial/white-rose-copy.png'
import bungaClover from '../assets/images/partial/Clover.png'
import burungKiri from '../assets/images/partial/burung-kiri.png'
import burungKanan from '../assets/images/partial/burung-kanan.png'
import tiang from '../assets/images/partial/brimingham-big.png'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import gsap from 'gsap'

export default {
    name: 'App',
    data() {
        return { 
            tiang,
            bungaGede,
            bungaWhiteRose,
            bungaClover,
            burungKiri,
            burungKanan,

            isLocked: false,
            isRender: false,
            dapiSrc: '',
            overlayImage: "https://lottie.host/e3b71b26-703e-4343-802e-28b8793b277b/pVIvUkQDkQ.lottie",
        }
    },
    components: {

    },
    computed: {
        ...mapState({
            cRoutes: state => state.cRoutes,
        }),
    },
    methods: {
        lockScroll() { 
            this.isLocked = true;
            document.body.style.overflow = 'hidden'
            console.log('lock scroll')
        },
        unlockScroll() { 
            this.isLocked = false;
            document.body.style.overflow = ''
            console.log('unlock scroll')
        },
        geserTiang() { 
            const leftEl = this.$refs.tiangLeft?.$el || this.$refs.tiangLeft
            const rightEl = this.$refs.tiangRight?.$el || this.$refs.tiangRight
            const tl = gsap.timeline({
                defaults: { ease: "power3.inOut" },
            });

            tl.to([leftEl, rightEl], {
                height:'70%',
                scale: 0.79,
                z:120,
                transformOrigin: 'center top',
                duration: 2, 
                ease: 'power3.inOut',
            });
        },
        ...mapActions({
            
        }),
        ...mapMutations({
            
        }),
    },
    watch: {
        cRoutes(newVal) { 
            if(newVal) { 
                this.geserTiang()
            }
        }
    },
    mounted() {
        
    },
}

</script>