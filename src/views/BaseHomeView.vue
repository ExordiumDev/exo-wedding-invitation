<template>
    <v-container class="h-100" fluid>
        <v-row justify="center" class="h-100 w-100">
            <v-col>
                <div class="d-flex justify-center my-10">
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
        <v-row justify="center" justify-lg="center">
            <v-col cols="12" md="8">
                <v-carousel show-arrows="hover" cycle interval="5000" transition="fade-transition">
                    <v-carousel-item v-for="(i,idx) in items" :key="idx">
                        <v-row>
                            <v-col cols="8">
                                <v-img :src="i.image" cover></v-img>
                            </v-col>
                            <v-col cols="4">
                                <p>{{ i.title }}</p>
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
                    image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
                    title: "bacod 1",
                    text: "Gambar di kiri, teks di kanan."
                },
                {
                    image: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg",
                    title: "bacod 2",
                    text: "Gambar di kanan, teks di kiri."
                },
                {
                    image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
                    title: "bacod 3",
                    text: "Atur layout sesuai kebutuhan."
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