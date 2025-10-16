<template>
    <v-container 
        fluid 
        :style="{
            backgroundImage: `url(${imaBg})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }" 
        class="h-100 d-flex justify-center align-center flex-column">
        <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background" ref="textSection">
            <v-spacer></v-spacer>
            <span class="text-h6">Dan di antara ayat-ayat-Nya ialah</span>
            <span class="text-h6">Dia menciptakan untukmu istri-istri</span>
            <span class="text-h6">dari Jenismu sendiri, supaya kamu</span>
            <span class="text-h6">merasa nyaman kepadanya, dan</span>
            <span class="text-h6">dijadikan-Nya diantaramu mawadah</span>
            <span class="text-h6">dan rahmah. Sesungguhnya pada yang</span>
            <span class="text-h6">demikian itu benar-benar terdapat</span>
            <span class="text-h6">tanda-tanda bagi kaum yang berpikir.</span>
            <span class="text-h4">Ar-rum ayat 21</span>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
        </div>

        <v-img :src="tiangKecil" class="_tiang_left" ref="tiangLeft"></v-img>
        <v-img :src="tiangKecil" class="_tiang_right" ref="tiangRight"></v-img>
        
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

._tiang_left { 
    width: 7%;
    position: absolute;
    bottom: 16%;
    left: 13%;
    z-index: 1;
}

._tiang_right { 
    width: 7%;
    position: absolute;
    bottom: 16%;
    right: 13%;
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

</style>

<script>
import gsap from 'gsap'
import tiang from '../assets/images/partial/brimingham-big.png'
import tiangKecil from '../assets/images/partial/brimingham-sm.png'
import imaBg from '../assets/images/non-partial/Pratiwi-Ahmad-09-November-WEB-bg-depan-tanpa-tiang.png'
import bungaGede from '../assets/images/partial/bunga-copy.svg'
import bungaWhiteRose from '../assets/images/partial/white-rose-copy.png'
import bungaClover from '../assets/images/partial/Clover.png'

export default { 
    data() { 
        return { 
            tiang,
            imaBg,
            bungaGede,
            bungaWhiteRose,
            bungaClover,
            tiangKecil
        }
    },
    computed: {
        imgs() { 
            
        }
    },
    mounted() {
        const textEl = this.$refs.textSection;
        this.animateOnMount(textEl);
    }
}

</script>