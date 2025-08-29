<template>
    <v-container class="h-100" fluid>
        <v-row justify="center" class="h-100 w-100">
            <v-col>
                <div class="d-flex justify-center my-10 flex-wrap">
                    <div class="d-flex">
                        <h1>Welcome to</h1>
                    </div>
                    <div class="d-flex text-danger mx-5">
                        <h1 class="text-red">JALA</h1>
                    </div>
                    <div class="d-flex">
                        <h1>Era</h1>
                    </div>
                </div>
                <div class="_subtitle d-flex justify-center">
                    <h3>Where all our system are Connected</h3>
                </div>
            </v-col>
        </v-row>
        <v-row justify="center" justify-lg="center" class="my-10">
            <v-col cols="12" md="8">
                <v-carousel show-arrows="hover" cycle interval="5000" transition="fade-transition">
                    <v-carousel-item v-for="(i,idx) in items" :key="idx">
                        <v-row>
                            <v-col cols="12" md="8">
                                <v-img :src="i.image" cover></v-img>
                            </v-col>
                            <v-col cols="12" md="4">
                                <div class="_carouse-content-header">
                                    <h3 class="font-weight-light">{{ i.title }}</h3>
                                </div>
                                <div class="_carousel-content py-5">
                                    <p>{{ i.content }}</p>
                                </div>
                                <div class="_carousel-content-footer py-5">
                                    <a :href=i.url>
                                        <p>{{ i.url }}</p>
                                    </a>
                                </div>
                            </v-col>
                        </v-row>
                    </v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>
        <v-row justify="center" class="my-10 bg-ligthCustom pa-10 align-center">
            <v-col cols="12" md="4">
                <v-img :src="logoByFTP"></v-img>
            </v-col>
            <v-col cols="12" md="8">
                <p>
                    Jalaniaga is more than just a shipping company. We go above and beyond just getting your package from point A to point B. Our team is dedicated to providing exceptional customer service, and we pride ourselves on delivering the highest level of satisfaction to our clients.
                    With Jalaniaga, you can have peace of mind knowing that your package is being handled by experienced logistic professionals. Our state-of-the-art technology allows us to track every step of the delivery process, ensuring that your package arrives at its destination on time, every time.
                    We offer a wide range of shipping services, including domestic and international shipping, air freight, warehousing, and last-mile delivery. Whatever your needs are, our team is ready to go above and beyond to make sure that your packages are delivered on time, every time.
                    At Jalaniaga, we believe that every shipment tells a unique story. Let us help you tell yours. Contact us today to learn how we can help you with your logistics needs.
                    Feel free to customize and expand on this draft, and let me know if you need any further assistance.
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

.v-list-item {
    padding-left: 0 !important;
    padding-right: 0 !important;
}
.v-list-item-title {
    margin: 0.5rem !important;
    padding: 0 !important;
}

</style>

<script>

export default { 
    name: 'BaseHomeView',
    data() { 
        return { 
            logoByFTP: import.meta.env.VITE_APP_URL_FTP + "/portal/portals/jala-logo-web.png",
            items:[
                {
                    image: import.meta.env.VITE_APP_URL_FTP + "/portal/portals/news-1.png",
                    title: "“GIVE AWAY AKHIR TAHUN” WAJIB CEK CAPTION👇👇👇",
                    content: "Ayo ikutan GIVE AWAY AKHIR TAHUN Share & Win dari JNE Tangerang dan menangkan banyak hadiah senilai JUTAAN RUPIAH🤑🤑🤑 Caranya : Like, comment dan repost postingan ini di FEED Instagram kalian ya! 👉(JANGAN PRIVATE Instagram kalian) 👈 Jangan lupa follow kami dan tag 3 orang temanmu untuk ikutan ya, biar makin rame! PERIODE 22 - 28 DESEMBER 2023 *Syarat & ketentuan berlaku*",
                    url: "https://www.instagram.com/p/C1JZP4Srlsc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                },
                {
                    image: import.meta.env.VITE_APP_URL_FTP + "/portal/portals/news-4.png",
                    title: "🚨GIVE AWAY TIME 🚨",
                    content: "Yuk ikutan! Kita punya VOUCHER M. A. P senilai jutaan rupiah yang bisa kamu gunakan untuk berbagai keperluan lho! Eitss, tapi jawab dulu pertanyaannya. Semoga kamu bisa jadi 5 orang yang beruntung ya!Jangan lupa follow kami, dan tag 3 orang temanmu ya! Untuk pertanyaannya bisa di cek melalui postingan IG JNE Tangerang berikut ya ! (Gak follow IG JNE Tangerang gk boleh dapet 😝)",
                    url: "https://www.instagram.com/p/C0LrEEJrdqn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                },
                {
                    image: import.meta.env.VITE_APP_URL_FTP + "/portal/portals/news-3.png",
                    title: "🚨GIVEAWAY ALERT!!🚨",
                    content: "Menjelang HUT JNE yang ke-33 Tahun, @jne.tangerang & @jne_id mau bagi-bagi hadiah lagi nih buat kalian #TemanJNE 🥳🥳 Hadiahnya berupa Produk dari @troveast.id & juga Top Up Saldo E wallet ✨ Untuk tata cara mengikutinya bisa di cek melalui postingan IG JNE Tangerang berikut ya !",
                    url: "https://www.instagram.com/p/Cz-PSbfrZ11/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                }
            ]
        }
    },
    computed: { 
        
    },
    methods: {
        
    },
    mounted() {
        this.$nextTick(() => { 
        })
    }
}

</script>