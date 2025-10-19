<template>
    <v-container 
        fluid 
        class="h-100 d-flex justify-center align-center flex-column" ref="touchArea">
        <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background scroll-detector" ref="textSection">
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

.scroll-detector { 
    touch-action: none !important;
    overflow: hidden !important;
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

export default { 
    data() { 
        return {
            showWeddingContent: false,
            showBurung: false,
            burungLoaded: {
                left: false,
                right: false
            }            
        }
    },
    computed: {
        imgs() { 
            
        }
    },
    mounted() {
        const textEl = this.$refs.textSection;
        this.animateOnMount(textEl);

        const handleScroll = (e) => {
            if (e.deltaY > 0 ) {
                e.preventDefault();

                this.$router.push({ name: 'inv.content' });
                return
            }
        }
        this._handleScroll = handleScroll;


        window.addEventListener('wheel', handleScroll, { passive: false });

        // mobile touch detect 
        const area = this.$refs.touchArea.$el;
        let startY = 0;

        const handleTouchStart = (e) => {
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            const diffY = e.touches[0].clientY - startY;

            if (diffY < -50) {
                console.log("touch move up detected");
                this.$router.push({ name: 'inv.open' });
                e.preventDefault();
            }
            else if (diffY > 50) { 
                e.preventDefault();
                console.log("swipe down detected");
                this.$router.push({ name: 'inv.open' });
            }
        };

        this._handleTouchStart = handleTouchStart;
        this._handleTouchMove = handleTouchMove;
        area.addEventListener('touchstart', handleTouchStart, { passive: false });
        area.addEventListener('touchmove', handleTouchMove, { passive: false });

    },
    beforeMount() { 
        if (this._handleScroll) {
            window.removeEventListener('wheel', this._handleScroll);
        }
    }
}

</script>