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
            <v-row justify="center">
                <v-col cols="12" md="12">
                    <div class="d-flex flex-column align-center ga-3 my-10">
                        <div class="text-h5 text-exr_accent_orange_600">Team</div>
                        <div class="text-h4">The Company Dream Team</div>
                    </div>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="12" md="3" v-for="(i, idx) in companyDreamTeam" :key=idx>
                    <v-card class="mx-auto hover-card h-100 d-flex flex-column" rounded="lg" variant="tonal">
                        <v-img height="450px" :src="i.img_src" cover></v-img>
                        <v-card-title>
                            <div class="d-flex ga-2">
                                <div class="d-flex text-h5">{{ i.f_name }}</div>
                                <div class="d-flex text-h5 text-exr_accent_orange_600">{{ i.l_name }}</div>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <div class="text-h6 text-disabled">{{ i.job_title }}</div>
                        </v-card-text>
                        <v-card-actions class="mt-auto">
                            <div class="d-flex ga-3 pa-3">
                                <v-icon :class="i.github_ico"></v-icon>
                                <v-icon :class="i.x_ico"></v-icon>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <div style="min-height: 200px;"></div> <!-- spacer -->
            <v-row class="my-10">
                <v-col cols="12" md="6">
                    <div class="d-flex flex-column my-10">
                        <div class="d-flex flex-column ga-3">
                            <div class="text-exr_accent_orange_600 text-h6">Contact</div>
                            <div class="text-h4">Connect With Us</div>
                            <div class="text-h6 text-disabled">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ipsam sint enim exercitationem ex autem corrupti quas tenetur</div>
                        </div>
                        <div class="">
                            <div class="d-flex flex-column my-10" v-for="(i,idx) in companyContactUs" :key="idx">
                                <div class="d-flex flex-row ga-3">
                                    <v-icon :class="i.contact_us_ico"></v-icon>
                                    <div class="text-h6">{{ i.title }}</div>
                                </div>
                                <div class="_desc_contact_us text-h6">{{ i.desc }}</div>
                            </div>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card class="py-5" color="">
                        <v-card-item>
                            <div class="d-flex ga-3 pt-5">
                                <v-text-field
                                    variant="outlined"
                                    label="First Name"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    variant="outlined"
                                    label="Last Name"
                                ></v-text-field>
                            </div>
                            <v-text-field
                                variant="outlined"
                                label="E-mail"
                                required
                            ></v-text-field>
    
                            <v-select
                                label="Subject"
                                clearable
                                chips
                                :items="['Web Development', 'Mobile Development', 'UI Design']"
                                variant="outlined"
                                required
                            ></v-select>

                            <v-textarea clearable variant="outlined" label="Message" row-height="25" rows="4">

                            </v-textarea>
                            <v-btn class="me-4 w-100" variant="tonal" color="exr_accent_orange_600">submit</v-btn>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
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
            companyContactUs:[
                {   
                    id: 1,
                    title: 'Find Us',
                    desc: '742 Evergreen Terrace, Springfield, IL 62704',
                    contact_us_ico: 'fa-solid fa-building',
                },
                {   
                    id: 2,
                    title: 'Call Us',
                    desc: '+1 (619) 123-4567',
                    contact_us_ico: 'fa-solid fa-phone',
                },
                {   
                    id: 3,
                    title: 'Mail Us',
                    desc: 'exordium@gmail.com',
                    contact_us_ico: 'fa-solid fa-envelope',
                },
            ],
            companyDreamTeam:[
                {   
                    id: 1,
                    f_name: 'Achmed',
                    l_name: 'Gracias',
                    job_title: 'Flutter mobile developer',
                    img_src: '../../src/assets/achmed_gracias.jpg',
                    github_ico: 'fa-brands fa-github',
                    x_ico: 'fa-brands fa-x-twitter',

                },
                {   
                    id: 2,
                    f_name: 'Armenskuy',
                    l_name: 'Py',
                    job_title: 'Senior Backend Engineer',
                    img_src: '../../src/assets/armanskuy.png',
                    github_ico: 'fa-brands fa-github',
                    x_ico: 'fa-brands fa-x-twitter',
                },
                {   
                    id: 3,
                    f_name: 'Ido',
                    l_name: 'Rahadi',
                    job_title: 'Vue Frontend Developer',
                    img_src: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
                    github_ico: 'fa-brands fa-github',
                    x_ico: 'fa-brands fa-x-twitter',
                },
            ],
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
                    title: 'Security',
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