<template>
    <v-container fluid>
        <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100" ref="weddingContent">
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
            <v-img v-if="showBurung" :src="burungKiri" class="_burung_left" ref="burungLeft"></v-img>
            <v-img v-if="showBurung" :src="burungKanan" class="_burung_right" ref="burungRight"></v-img>
        </div>
    </v-container>
</template>


<style scoped>

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

</style>

<script>
import gsap from 'gsap'
import mempelaiWanita from "../assets/images/partial/m_wanita.png"
import mempelaiPria from "../assets/images/partial/m-pria.png"
import burungKiri from '../assets/images/partial/burung-kiri.png'
import burungKanan from '../assets/images/partial/burung-kanan.png'
import { useWheelNavigation } from '../plugins/usewheeleNavigation';

export default {
    name: 'WeddingContent',
    data() {
        return { 
            mempelaiWanita,
            mempelaiPria,
            burungKiri,
            burungKanan,
            showBurung: false,
            burungLoaded: {
                left: false,
                right: false
            }
        }
    },
    methods: {
        showContent() {
            this.$nextTick(() => {
                const textEl = this.$refs.weddingContent;
                const container_mempelai = this.$refs.container_mempelai;
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
                }, "+=0.1")
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
    computed: {
    },
    mounted() { 
        this.showContent();
        const { attach, detach } = useWheelNavigation({ nextRoute: 'inv.schedule', delay: 5000 })
        const el = this.$refs.weddingContent
        attach(el)
        this.detachFn = () => detach(el)
    },
    beforeUnmount() { 

    }
}
</script>