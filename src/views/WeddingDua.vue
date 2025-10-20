<template>
    <v-container fluid ref="weddingDua" id="weddingDua-wrapper">
        <v-row justify="center" class="h-100 _form_container">
            <v-col cols="12" md="5" class="d-flex justify-center">
                <v-form ref="weddingDuaForm">
                    <v-card variant="plain" color="">
                        <v-card-item>
                            <v-card-title>
                                <span class="text-h6 text-md-h4 text-center text-background _salina_text mb-5 text-wrap">Doa dan Kata Hangat untuk kami</span>
                            </v-card-title>
                            <v-text-field label="Name" variant="outlined" class="text-h6 text-md-h5 text-center text-background _salina_text my-2"></v-text-field>
                            <v-textarea label="Doa & kata-katamu" variant="outlined" class="text-h6 text-md-h5 text-center text-background _salina_text mb-2" no-resize></v-textarea>
                        </v-card-item>
                        <v-card-actions>
                            <v-btn variant="elevated" block class="text-none">Send</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" md="5" class="d-flex justify-center">
                <div class="bg-background w-100" style="min-height: 300px;"></div>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

._form_container { 
    max-height: 60%;
    overflow: auto;
}



</style>
<script>

import burungKiri from '../assets/images/partial/burung-kiri.png'
import burungKanan from '../assets/images/partial/burung-kanan.png'
import gsap from 'gsap'

export default {
    name: 'WeddingGift',
    data() { 
        return { 
            burungKiri,
            burungKanan,
            showBurung: true,
            preOutro: true,
            outro: false,
        }
    },
    methods: {
        closedInv() { 
            this.$router.push({name : 'inv.home'})
        },
        showDoaForm() {
            this.$nextTick(() => {
                const cardEl = this.$refs.weddingDuaForm.$el || this.$refs.weddingDuaForm;
                if ( !cardEl ) return

                const tl = gsap.timeline()
                tl.from(cardEl, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                }, "+=0.1")
            });
        },
    },
    mounted() {
        this.showDoaForm()       
    },
    beforeUnmount() { 

    }
}
</script>