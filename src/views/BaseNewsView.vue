<template>
    <v-container class="py-10">
        <v-row justify="space-between">
            <v-col cols="12" md="8">
                <h1 class="font-weight-normal">Our News & Events</h1>
                <div class="_header-subtitle">
                    <p>Temukan informasi tentang acara, seminar, dan konferensi terbaru yang diadakan oleh perusahaan kami, serta kesempatan untuk berpartisipasi dan memperluas jaringan Anda</p>
                </div>
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-center">
                <v-img :src="imageHeader" max-width="300"></v-img>
            </v-col>
        </v-row>
        <v-spacer-y :size="120" />
        <v-row class="my-10">
            <v-col cols="12" md="4" v-for="(i,idx) in dataDummy" :key="idx">
                <v-card class="my-5">
                    <v-img height="200" :src="i.newsImages" cover></v-img>
                    <v-card-title>
                        {{ i.newsTitle }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ i.newsContent }}
                    </v-card-subtitle>
                    <v-spacer></v-spacer>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>

import vSpacerY from '../components/vSpacer.vue'

export default { 
    name: 'BaseNewsAll',
    components: {
        vSpacerY
    },
    data() { 
        return { 
            imageHeader: import.meta.env.VITE_APP_URL_FTP + "/portal/portals/news-img-header.png",
            dataDummy: [
                {
                    newsTitle: "Buat para bunda-bunda nih!",
                    newsContent: "Kira-kira ada yang bisa jawab gak yaa? Mau ikutan? Caranya gampang :Like, comment dan tag 3 orang teman bunda untuk ikutan ini ya",
                    newsUrl: "",
                    newsImages: import.meta.env.VITE_APP_URL_FTP + "/portal/portals/news-1.png"
                },
                {
                    newsTitle: "GIVEAWAY ALERT!!",
                    newsContent: "enjelang HUT JNE yang ke-33 Tahun",
                    newsUrl: "",
                    newsImages: import.meta.env.VITE_APP_URL_FTP + "/portal/portals/news-2.png"
                },
                {
                    newsTitle: "Ada yang spesial menuju Hari Ulang Tahun JNE",
                    newsContent: "APATKAN DISKON PROMO ONGKIR 33, Cek syarat dan ketentuan yang berlaku berikut ini ya ...",
                    newsUrl: "",
                    newsImages: import.meta.env.VITE_APP_URL_FTP + "/portal/portals/news-3.png"
                },
                {
                    newsTitle: "GIVE AWAY AKHIR TAHUN",
                    newsContent: "Ayo ikutan GIVE AWAY AKHIR TAHUN Share & Win dari JNE Tangerang dan menangkan banyak hadiah senilai JUTAAN RUPIAH",
                    newsUrl: "",
                    newsImages: import.meta.env.VITE_APP_URL_FTP + "/portal/portals/news-4.png"
                }
            ]
        }
    },
    computed: {
        
    },
    methods: {
    
    },
    mounted() {
        
    }
}

</script>