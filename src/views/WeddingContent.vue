<template>
    <v-container fluid class="_show_content">
        <div class="d-flex justfy-center align-center w-100">
            <v-btn variant="plain" block color="background" @click="routeInvOpen">
                <v-icon icon="mdi-chevron-double-up"></v-icon>
            </v-btn>
        </div>
        <div class="divider_"></div>
        <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100" ref="weddingContent">
            <span class="text-h6 text-center _salina_text_2 mb-5">Assalamu'alaikum Warahmatullahi Wabarakaatuh</span>
            <span class="_avenir_text">Dengan memohon ridho dan rahmat Allah SWT</span>
            <span class="_avenir_text">Kami bermaksud menyelenggarakan</span>
            <span class="_avenir_text">Resepsi Pernikahan putra-putri kami</span>
            <v-container ref="container_mempelai">
                <v-row justify="center">
                    <v-col cols="12" md="5" class="pa-0">
                        <div class="d-flex flex-column text-center align-center">
                            <v-img :src="mempelaiWanita" class="_mempelai"></v-img>
                            <div class="d-flex flex-column" style="z-index: 10 !important;">
                                <span class="text-h3 _salina_text">Sitti Pratiwi</span>
                                <span class="text-none">Putra pertama</span>
                                <span class="text-none">Bapak Irwan Bakri</span>
                                <span class="text-none">& Ibu Nurtina</span>
                            </div>
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
                            <div class="d-flex flex-column" style="z-index: 10 !important;">
                                <span class="text-h3 _salina_text">Ahmad Abdul Gani Nasution</span>
                                <span class="text-none">Putra Terakhir</span>
                                <span class="text-none">Bapak Hamdan Nasution</span>
                                <span class="text-none">& Ibu Elfi Sahra Lubis</span>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>


        <!-- wedding schedule -->
        <v-row class="my-10">
            <v-col cols="12" col="12">
                <div class="divider_"></div>
                <div class="divider_"></div>
                <div class="divider_"></div>
                <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100" ref="weddingSchedule">
                    <span class="text-h4 text-md-h2 _salina_text_2 mb-5">9 NOVEMBER 2025</span>
                    <span class="text-none text-md-h5 _salina_text_2">Akad Nikah</span>
                    <span class="text-none text-md-h6 _salina_text">Pukul 08:00 - 09:00</span>
                    <span class="text-none text-md-h6 _salina_text">Sovereign Plaza Jl. TB. Simatupang</span>
                    <span class="text-none text-md-h6 _salina_text">No 56 Cilandak Barat. Cilandak, Jakarta Selatan</span>

                    <span class="text-none text-md-h6 _salina_text">-----------------------------------------------</span>

                    <span class="text-none text-md-h5 _salina_text_2">Resepsi Pernikahan</span>
                    <span class="text-none text-md-h6 _salina_text">Pukul 08:00 - 09:00</span>
                    <span class="text-none text-md-h6 _salina_text">Sovereign Plaza Jl. TB. Simatupang</span>
                    <span class="text-none text-md-h6 _salina_text">No 56 Cilandak Barat. Cilandak, Jakarta Selatan</span>
                </div>
                <div class="divider_"></div>
                <div class="divider_"></div>
            </v-col>
        </v-row>

        <!-- wedding content -->

        <v-row justify="center" class="h-100 my-10" ref="weddingRsvpCard">
            <v-col cols="12" md="5" class="d-flex justify-center">
                <v-form class="w-100">
                    <v-card variant="plain" class="pa-5">
                        <v-card-item>
                            <v-card-title class="text-h6 text-md-h4 text-center text-background _salina_text mb-5">RSVP</v-card-title>
                            <v-text-field label="Name" variant="outlined" class="text-h6 text-md-h5 text-center text-background _salina_text mb-2"></v-text-field>
                            <v-text-field label="Phone Number" variant="outlined" class="text-h6 text-md-h5 text-center text-background _salina_text mb-2" :rules="[rules.required, rules.numeric, rules.min1]"></v-text-field>
                            <v-text-field label="Number of guest" variant="outlined" class="text-h6 text-md-h5 text-center text-background _salina_text mb-2" :rules="[rules.required, rules.numeric, rules.min1]"></v-text-field>
                            <v-autocomplete :items="attendance" label="Confirmation of Attendance" class="text-background" variant="outlined"></v-autocomplete>
                        </v-card-item>
                        <v-card-actions>
                            <v-btn variant="flat" block class="text-none">Send</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>

        <!-- wedding gift -->

        <v-row>
            <v-col cols="12" md="12">
                <div class="divider_"></div>
                <div class="divider_"></div>
                <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100" ref="weddingGiftCard">
                    <span class="text-h4 text-md-h4 _salina_text mb-5">Wedding Gift</span>
                    <span class="text-none text-md-h6 _avenir_text">Kehadiran dan doa restu dari Bapak/Ibu</span>
                    <span class="text-none text-md-h6 _avenir_text">Saudara/i adalah anugerah terindah bagi kami,</span>
                    <span class="text-none text-md-h6 _avenir_text">Jika memberi tanda kasih adalah bentuk cinta</span>
                    <span class="text-none text-md-h6 _avenir_text">yang ingin disampaikan, dengna segala </span>
                    <span class="text-none text-md-h6 _avenir_text">kerendahan hati, dapat melalui</span>
                    <strong class="text-none text-md-h6 _avenir_text">BCA 123456789 a.n Sitti Pratiwi</strong>
                    <strong class="text-none text-md-h6 _avenir_text">atau Mandiri 123456789</strong>
                    <strong class="text-none text-md-h6 _avenir_text">a.n Ahmad Abdul Gani</strong>
                </div>
                <div class="divider_"></div>
                <div class="divider_"></div>
                <div class="divider_"></div>
                <div class="divider_"></div>
            </v-col>
        </v-row>

        <!-- wedding doa  -->

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
                <v-spacer></v-spacer>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" md="5" class="d-flex justify-center">
                <div class="bg-background w-100" style="min-height: 300px;"></div>
            </v-col>
        </v-row>

        <!-- wedding outro -->
        <div class="divider_"></div>
        <div class="divider_"></div>
        <div class="divider_"></div>
        <div class="divider_"></div>


        <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100" ref="weddingOutro">
            <span class="text-none text-md-h3 _salina_text mb-5">Thank You</span>
            <span class="text-none text-md-h6 _avenir_text text-center">Merupakan suatu kehormatan dan kebahagiaan kami</span>
            <span class="text-none text-md-h6 _avenir_text">Keluarga besar yang mengundang mempelai Wanita : </span>
            <ul>
                <li>Keluarga Besar Bakri & Lasupu</li>
                <li>Keluarga Besar Yunus & Abdullah</li>
                <li>Keluarga Besar Latopada</li>
            </ul>

            <span class="text-none text-md-h6 _avenir_text text-center">Keluarga besar yang mengundang mempelai Pria : </span>
            <ul>
                <li>Keluarga Besar Hamdan Nasution</li>
                <li>Keluarga Besar Elfi Sahra Lubis</li>
            </ul>

            <span class="text-none text-md-h6 _avenir_text">apabila Bapak/Ibu/Saudara/i berkenan hadir</span>
            <span class="text-none text-md-h6 _avenir_text">untuk memberikan doa restu kepada putra-putri kami</span>

            <span class="_salina_text text-none text-md-h6 mt-5 text-center">Wassalamu'alaikum Warahmmatullahi Wabarakaatuh</span>
        </div>
        <div class="divider_"></div>
        <div class="divider_"></div>
    </v-container>
</template>

<style scoped>

</style>

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
            },
            attendance: ['Present', 'Absent'],
            rules: {
                required: v => !!v || 'This field is required',
                numeric: v => !isNaN(parseFloat(v)) || 'Must be a number',
                min1: v => (v > 0) || 'Must be greater than 0',
            }
        }
    },
    methods: {
        routeInvOpen() { 
            this.$router.push({ name: 'inv.open' })
        },
        setShowBird() {
            this.$store.commit('SET_SHOW_BIRD', true)
        },
        showContent() {
            this.$nextTick(() => {
                const textEl = this.$refs.weddingContent;
                const container_mempelai = this.$refs.container_mempelai;
                if (!textEl || !container_mempelai) return

                const spans = textEl.querySelectorAll('span')
                const tl = gsap.timeline()
                tl.from(spans, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                })
                .from(container_mempelai, {
                    opacity: 0,
                    y: 80,
                    duration: 0.8,
                    ease: "power3.out",
                    immediateRender: false,
                }, "+=0.1")
            })
        },
    },
    computed: {
    },
    mounted() { 
        this.showContent();
        this.setShowBird();
    },
    beforeUnmount() { 

    }
}
</script>