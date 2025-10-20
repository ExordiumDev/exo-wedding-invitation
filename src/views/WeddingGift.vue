<template>
    <v-container fluid ref="wddingGift">
        <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100" ref="weddingGiftCard">
            <span class="text-h4 text-md-h4 _salina_text mb-5">Wedding Gift</span>
            <span class="text-none text-md-h6 _avenir_text">Kehadiran dan doa restu dari Bapak/Ibu</span>
            <span class="text-none text-md-h6 _avenir_text">Saudara/i adalah anugerah terindah bagi kami,</span>
            <span class="text-none text-md-h6 _avenir_text">Jika memberi tanda kasih adalah bentuk cinta</span>
            <span class="text-none text-md-h6 _avenir_text">yang ingin disampaikan, dengna segala </span>
            <span class="text-none text-md-h6 _avenir_text">kerendahan hati, dapat melalui</span>
            <strong class="text-none text-md-h6 _avenir_text">BCA 123456789 a.n Sitti Pratiwi</strong>
            <strong class="text-none text-md-h6 _avenir_text">atau Mandiri 123456789</strong>
            <strong class="text-none text-md-h6 _avenir_text">a.n Ahmad Abdul Gani</strong>
        </div>
        <!-- <v-img v-if="showBurung" :src="burungKiri" class="_burung_left" ref="burungLeft"></v-img>
        <v-img v-if="showBurung" :src="burungKanan" class="_burung_right" ref="burungRight"></v-img> -->
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
import burungKiri from '../assets/images/partial/burung-kiri.png'
import burungKanan from '../assets/images/partial/burung-kanan.png'
import { useWheelNavigation } from '../plugins/usewheeleNavigation';
export default {
    name: 'WeddingGift',
    data() { 
        return { 
            burungKiri,
            burungKanan,
            showBurung: true,
        }
    },
    methods: {
        showFormGift() {
            this.$nextTick(() => {
                const textEl = this.$refs.wddingGift.$el;
                const spans = textEl.querySelectorAll('span');
                const strongs = textEl.querySelectorAll('strong');
                const tl = gsap.timeline()
                tl.from(spans, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                }).from(strongs, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                },"+=0.1");
            })
        },
    },
    mounted() {
        this.showFormGift();
        const { attach, detach } = useWheelNavigation({
            nextRoute: 'inv.doa',
            prevRoute: 'inv.rsvp',
            delay: 2500,
        })
        const el = this.$refs.wddingGift.$el || this.$refs.wddingGift
        attach(el)
        this.detachFn = () => detach(el)
    }
}
</script>