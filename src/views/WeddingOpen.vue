<template>
    <v-container 
        fluid 
        class="h-100 d-flex justify-center align-center flex-column">
        <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background" ref="textSection">
            <v-spacer></v-spacer>
            <span class="text-h6 _salina_text">Dan di antara ayat-ayat-Nya ialah</span>
            <span class="text-h6 _salina_text">Dia menciptakan untukmu istri-istri</span>
            <span class="text-h6 _salina_text">dari Jenismu sendiri, supaya kamu</span>
            <span class="text-h6 _salina_text">merasa nyaman kepadanya, dan</span>
            <span class="text-h6 _salina_text">dijadikan-Nya diantaramu mawadah</span>
            <span class="text-h6 _salina_text">dan rahmah. Sesungguhnya pada yang</span>
            <span class="text-h6 _salina_text">demikian itu benar-benar terdapat</span>
            <span class="text-h6 _salina_text">tanda-tanda bagi kaum yang berpikir.</span>
            <span class="text-h4 _salina_text">Ar-rum ayat 21</span>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
        </div>
    </v-container>
</template>

<style scoped>


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