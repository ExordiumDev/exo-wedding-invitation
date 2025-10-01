<template>
    <v-container class="h-100" fluid>
        <v-row justify="center" class="h-100">
            <v-col>
                <div class="d-flex align-center my-10 flex-column w-100">
                    <p class="text-h1">Experience the</p>
                    <div class="d-flex flex-row ga-3">
                        <p class="text-h1 text-exr_accent_orange">Exordium</p>
                        <p class="text-h1">Services</p>
                    </div>
                    <div class="d-flex flex-column align-center my-5">
                        <p class="text-disabled text-h4">Then moment when ideas turn into reality</p>
                        <p class="text-disabled text-h4">When nothingness begins to take shape</p>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row justify="center" class="my-10 bg-ligthCustom pa-10 align-center glow-shadow">
            <v-col cols="12" md="4" class="justify-center d-flex">
                <v-img src="../../public/exr-logo.png" class="rounded-xl" width="400" height="400" cover></v-img>
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

.glow-shadow {
    box-shadow: 0 0 20px rgba(234, 88, 12, 0.6);
    animation: pulseShadow 2s infinite alternate;
}

@keyframes pulseShadow {
    0% {
        box-shadow: 0 0 10px rgba(234, 88, 12, 0.3);
    }
    100% {
        box-shadow: 0 0 110px rgba(234, 88, 12, 1);
    }
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