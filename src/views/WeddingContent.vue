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
        </div>
    </v-container>
</template>



<script>
import gsap from 'gsap'
import mempelaiWanita from "../assets/images/partial/m_wanita.png"
import mempelaiPria from "../assets/images/partial/m-pria.png"

export default {
    name: 'WeddingContent',
    data() {
        return { 
            mempelaiWanita,
            mempelaiPria,
            showBurung: false,
            burungLoaded: {
                left: false,
                right: false
            }
        }
    },
    methods: {
    },
    computed: {
    },
    mounted() { 
        const handleScroll = (e) => {
            if (e.deltaY < 0 ) {
                e.preventDefault();

                this.$router.push({ name: 'inv.open' });
                return
            }
        }
        this._handleScroll = handleScroll;
        window.addEventListener('wheel', handleScroll, { passive: false });
    }
}
</script>