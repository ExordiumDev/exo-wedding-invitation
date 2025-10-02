<template>
    <v-container class="h-100" fluid>
        <v-row justify="center" class="h-100">
            <v-col>
                <div class="d-flex align-center my-10 flex-column w-100">
                    <p class="text-h1">Experience the</p>
                    <div class="d-flex flex-row ga-3">
                        <p class="text-h1 text-exr_accent_orange_600">Exordium</p>
                        <p class="text-h1">Services</p>
                    </div>
                    <div class="d-flex flex-column align-center my-5">
                        <p class="text-disabled text-h4">Then moment when ideas turn into reality</p>
                        <p class="text-disabled text-h4">When nothingness begins to take shape</p>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-container>
            <v-row class="my-10">
                <v-col cols="12" md="6" class="">
                    <div class="d-flex flex-column ga-3 justify-center h-100">
                        <div class="text-h5 text-exr_accent_orange_600">Benefits</div>
                        <div class="text-h3">Your Shortcut to Success</div>
                        <div class="text-h6 text-disabled">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non ducimus reprehenderit architecto rerum similique facere odit deleniti necessitatibus quo quae.</div>
                    </div>
                </v-col>
                <v-col cols="12" md="6" class="">
                    <div class="d-flex flex-wrap ga-5">
                        <v-card variant="tonal" color="exr_accent_orange_600" width="400" class="pa-3" v-for="(i, idx) in serviceShowOnCards" :key="idx">
                            <v-card-item>
                                <v-card-title>
                                    <div class="d-flex justify-space-between my-5">
                                        <div class="text-h5">{{ i.title }}</div>
                                        <v-icon color="exr_accent_orange_600" icon="mdi-check-circle"></v-icon>
                                    </div>
                                </v-card-title>
                            </v-card-item>
                            <v-card-text>
                                <div class="text-h6">{{i.desc}}</div>
                            </v-card-text>
                        </v-card>
                    </div>
                </v-col>
            </v-row>
            <v-row no-gutters class="my-10" justify="center">
                <v-col cols="12" md="6" class="d-flex flex-column align-center my-10 text-center ga-3">
                    <div class="_titlesFeatures text-h5 text-exr_accent_orange_600">
                        Features
                    </div>
                    <div class="_subtitlesFeatures">
                        <h1 class="text-h2">Whats makes us different</h1>
                    </div>
                    <div>
                        <div class="text-h5 text-disabled">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem fugiat, odit similique quasi sint reiciendis quidem iure veritatis optio facere tenetur.</div>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4" v-for="(i,idx) in serviceShowOnCards2" :key="idx">
                    <v-card variant="flat" color="">
                        <v-card-item>
                            <v-card-title>
                                <div class="d-flex flex-column align-center ga-3">
                                    <v-icon :class="i.ico" class="text-exr_accent_orange_600"></v-icon>
                                    <div class="text-h5">{{ i.title }}</div>
                                </div>
                            </v-card-title>
                        </v-card-item>
                        <v-card-text>
                            <div class="d-flex text-h6 my-5 text-disabled">
                                {{ i.desc }}
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-row justify="center" class="mt-10 bg-ligthCustom pa-10 align-center">
            <v-col cols="12" md="4" class="justify-center d-flex">
                <v-img src="../../public/exr-logo.png" class="rounded-xl" width="400" height="400" cover></v-img>
            </v-col>
            <v-col cols="12" md="8">
                <p class="text">
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

.glow-shadow {
    box-shadow: 0 0 20px rgba(234, 88, 12, 0.6);
    animation: pulseShadow 2s infinite alternate;
}

@keyframes pulseShadow {
    0% {
        box-shadow: 0 0 10px rgba(234, 88, 12, 0.3);
    }
    100% {
        box-shadow: 0 -30px 120px rgba(234, 88, 12, 0.8);
    }
}

</style>

<script>

export default { 
    name: 'BaseHomeView',
    data() { 
        return { 
            logoByFTP: import.meta.env.VITE_APP_URL_FTP + "/portal/portals/jala-logo-web.png",
            serviceShowOnCards:[
                {   
                    id: 1,
                    title: 'Web Development',
                    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, rerum a. Fuga, eius dolorum et beatae explicabo'
                },  
                {   
                    id: 2,
                    title: 'Mobile Development',
                    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, rerum a. Fuga, eius dolorum et beatae explicabo'
                },  
                {   
                    id: 3,
                    title: 'UI/UX Design',
                    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, rerum a. Fuga, eius dolorum et beatae explicabo'
                },  
                {   
                    id: 4,
                    title: 'Mobile Development',
                    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, rerum a. Fuga, eius dolorum et beatae explicabo'
                },  
            ],
            serviceShowOnCards2:[
                {   
                    id: 1,
                    ico: 'fa-solid fa-mobile',
                    title: 'Mobile Friendly',
                    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, rerum a. Fuga, eius dolorum et beatae'
                }, 
                {   
                    id: 2,
                    ico: 'fa-solid fa-check-circle',
                    title: 'Social Proof',
                    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, rerum a. Fuga, eius dolorum et beatae'
                }, 
                {   
                    id: 3,
                    ico: 'fa-solid fa-circle-dot',
                    title: 'Targeted Content',
                    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, rerum a. Fuga, eius dolorum et beatae'
                }, 
                {   
                    id: 4,
                    ico: 'fa-solid fa-eye',
                    title: 'Strong Visuals',
                    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, rerum a. Fuga, eius dolorum et beatae'
                }, 
                {   
                    id: 5,
                    ico: 'fa-solid fa-mouse-pointer',
                    title: 'Clear CTA',
                    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, rerum a. Fuga, eius dolorum et beatae'
                }, 
                {   
                    id: 6,
                    ico: 'fa-solid fa-file',
                    title: 'Clear Headline',
                    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, rerum a. Fuga, eius dolorum et beatae'
                }, 
            ],
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