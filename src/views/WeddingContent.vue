<template>
    <v-container fluid class="_show_content">
        <div class="d-flex justfy-center align-center w-100">
            <v-btn variant="plain" block color="background" @click="routeInvOpen">
                <v-icon icon="mdi-chevron-double-up"></v-icon>
            </v-btn>
        </div>
        <div class="divider_"></div>
        <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100"
            ref="weddingContent">
            <span class="text-h6 text-center _salina_text_2 mb-5">Assalamu'alaikum Warahmatullahi Wabarakaatuh</span>
            <span class="_avenir_text">Dengan memohon ridho dan rahmat Allah SWT</span>
            <span class="_avenir_text">Kami bermaksud menyelenggarakan</span>
            <span class="_avenir_text">Resepsi Pernikahan putra-putri kami</span>
            <div class="divider_"></div>
            <v-container ref="container_mempelai">
                <v-row justify="center">
                    <v-col cols="12" md="5" class="pa-0">
                        <div class="d-flex flex-column text-center align-center">
                            <v-img :src="brideImageUrl || mempelaiWanita" class="_mempelai"></v-img>
                            <div class="d-flex flex-column" style="z-index: 10 !important;">
                                <span class="text-h3 _salina_text">{{ couples.bride_name }}</span>
                                <span class="text-none">Putri pertama</span>
                                <span class="text-none">{{ couples.bride_parents }}</span>
                                <!-- <span class="text-none">& Ibu Nurtina</span> -->
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
                            <v-img :src="groomImageUrl || mempelaiPria" class="_mempelai"></v-img>
                            <div class="d-flex flex-column" style="z-index: 10 !important;">
                                <span class="text-h3 _salina_text">{{ couples.groom_name }}</span>
                                <span class="text-none">Putra Terakhir</span>
                                <span class="text-none">{{ couples.groom_parents }}</span>
                                <!-- <span class="text-none">& Ibu Elfi Sahra Lubis</span> -->
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>


        <!-- wedding schedule -->
        <v-row class="my-10">
            <v-col cols="12">
                <div class="divider_"></div>
                <div class="divider_"></div>
                <div class="divider_"></div>
                <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100"
                    ref="weddingSchedule">
                    <!-- Tampilkan data kalau sudah ada -->
                    <template v-if="schedules">
                        <!-- Akad -->
                        <span class="text-h4 text-md-h2 _salina_text_2 mb-5">
                            {{ formatDate(schedules.akad_date) }}
                        </span>

                        <span class="text-none text-md-h5 _salina_text_2">Akad Nikah</span>
                        <span class="text-none text-md-h6 _salina_text">
                            Pukul {{ schedules.akad_time_start }} - {{ schedules.akad_time_end }}
                        </span>

                        <span class="text-none text-md-h6 _salina_text">
                            {{ schedules.akad_desc }}
                        </span>

                        <span class="text-none text-md-h6 _salina_text">
                            {{ schedules.location }}
                        </span>

                        <span class="text-none text-md-h6 _salina_text">
                            -----------------------------------------------
                        </span>

                        <!-- Resepsi -->
                        <span class="text-none text-md-h5 _salina_text_2">
                            Resepsi Pernikahan
                        </span>

                        <span class="text-none text-md-h6 _salina_text">
                            Pukul {{ schedules.resepsi_time_start }} - {{ schedules.resepsi_time_end }}
                        </span>

                        <span class="text-none text-md-h6 _salina_text">
                            {{ schedules.resepsi_desc }}
                        </span>

                        <span class="text-none text-md-h6 _salina_text">
                            {{ schedules.location }}
                        </span>
                    </template>

                    <!-- Kalau belum ada data -->
                    <template v-else>
                        <span class="text-grey text-md-body-1 mt-5">
                            Jadwal belum tersedia.
                        </span>
                    </template>
                </div>
                <!-- <div class="divider_"></div>
                <div class="divider_"></div> -->
            </v-col>
        </v-row>

        <!-- wedding gift -->

        <v-row>
            <v-col cols="12" md="12">
                <div class="divider_"></div>
                <div class="divider_"></div>
                <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100"
                    ref="weddingGiftCard">
                    <span class="text-h4 text-md-h4 _salina_text mb-5">Wedding Gift</span>
                    <span class="text-none text-md-h6 _avenir_text">Kehadiran dan doa restu dari Bapak/Ibu</span>
                    <span class="text-none text-md-h6 _avenir_text">Saudara/i adalah anugerah terindah bagi kami,</span>
                    <span class="text-none text-md-h6 _avenir_text">Jika memberi tanda kasih adalah bentuk cinta</span>
                    <span class="text-none text-md-h6 _avenir_text">yang ingin disampaikan, dengna segala </span>
                    <span class="text-none text-md-h6 _avenir_text">kerendahan hati, dapat melalui</span>
                    <div v-if="gifts.length > 0" class="mt-5 text-center">
                        <template v-for="(gift, index) in gifts" :key="gift.id">
                            <strong class="text-none text-md-h6 _avenir_text">
                                {{ index === 0 ? '' : 'atau ' }}
                                {{ gift.bank_name }} {{ gift.account_number }}
                                a.n {{ gift.account_name }}
                            </strong>
                            <br v-if="index < gifts.length - 1" />
                        </template>
                    </div>
                </div>
                <div class="divider_"></div>
                <div class="divider_"></div>
                <div class="divider_"></div>
                <div class="divider_"></div>
            </v-col>
        </v-row>

        <!-- wedding content -->

        <v-row justify="center" class="h-100 my-10" ref="weddingRsvpCard">
            <v-col cols="12" md="5" class="d-flex justify-center">
                <v-form class="w-100 glass-card" @submit.prevent="sendWish">
                    <v-card variant="plain" class="pa-5">
                        <v-card-item>
                            <v-card-title class="text-h6 text-md-h4 text-center text-background _salina_text mb-5">
                                RSVP
                            </v-card-title>

                            <v-text-field v-model="form.name" label="Name" variant="outlined" class="text-center mb-2"
                                :rules="[rules.required]" />

                            <v-text-field v-model="form.phone" label="Phone Number" variant="outlined"
                                class="text-center mb-2" :rules="[rules.required, rules.numeric]" />

                            <v-text-field v-model="form.guestCount" label="Number of guests" variant="outlined"
                                class="text-center mb-2" :rules="[rules.required, rules.numeric]" />

                            <v-autocomplete v-model="form.attendance" :items="attendance"
                                label="Confirmation of Attendance" variant="outlined" class="text-center mb-2" />

                            <v-textarea v-model="form.message" label="Doa & kata-katamu" variant="outlined"
                                class="text-center mb-2" no-resize />
                        </v-card-item>

                        <v-card-actions>
                            <v-btn type="submit" variant="flat" block class="text-none">Send</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>


        <!-- wedding doa  -->

        <v-row justify="center">
            <v-col cols="12" md="5">
                <v-card class="pa-4 elevation-0 glass-card">
                    <v-card-title class="text-center text-h6 mb-6 _salina_text_2">
                        Doa & Ucapan
                    </v-card-title>

                    <div class="chat-container">
                        <div v-for="(wish, index) in wishes" :key="index" class="chat-bubble"
                            :class="index % 2 === 0 ? 'from-left' : 'from-right'">
                            <div class="chat-name">{{ wish.name }}</div>
                            <div class="chat-message">{{ wish.message }}</div>
                        </div>
                    </div>
                </v-card>

            </v-col>
        </v-row>


        <!-- wedding outro -->
        <div class="divider_"></div>
        <div class="divider_"></div>
        <div class="divider_"></div>
        <div class="divider_"></div>


        <div class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100"
            ref="weddingOutro">
            <span class="text-none text-md-h3 _salina_text mb-5">Thank You</span>
            <span class="text-none text-md-h6 _avenir_text text-center">Merupakan suatu kehormatan dan kebahagiaan
                kami</span>
            <span class="text-none text-md-h6 _avenir_text">Keluarga besar yang mengundang mempelai Wanita : </span>
            <ul>
                <li>Keluarga Besar Bakri & Lasupu</li>
                <li>Keluarga Besar Yunus & Abdullah</li>
                <li>Keluarga Besar Latopada</li>
            </ul>

            <span class="text-none text-md-h6 _avenir_text text-center">Keluarga besar yang mengundang mempelai Pria :
            </span>
            <ul>
                <li>Keluarga Besar Hamdan Nasution</li>
                <li>Keluarga Besar Elfi Sahra Lubis</li>
            </ul>

            <span class="text-none text-md-h6 _avenir_text">apabila Bapak/Ibu/Saudara/i berkenan hadir</span>
            <span class="text-none text-md-h6 _avenir_text">untuk memberikan doa restu kepada putra-putri kami</span>

            <span class="_salina_text text-none text-md-h6 mt-5 text-center">Wassalamu'alaikum Warahmmatullahi
                Wabarakaatuh</span>
        </div>
        <div class="divider_"></div>
        <div class="divider_"></div>
    </v-container>

    <v-dialog v-model="showThankYou" max-width="400px" persistent>
        <v-card class="text-center pa-5 rounded-xl">
            <v-card-title class="text-h5 mb-2 font-weight-medium">
                🎉 Terima Kasih!
            </v-card-title>

            <v-card-text>
                <p class="mb-3">
                    Ucapan kamu sudah terkirim dengan sukses 💌
                </p>

                <div v-if="qrCodeUrl">
                    <v-img :src="qrCodeUrl" contain max-width="180" class="mx-auto mb-4 rounded-lg elevation-2"></v-img>

                    <v-btn color="primary" variant="flat" class="mb-2" @click="downloadQr">
                        Download QR Code
                    </v-btn>
                </div>
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
                <v-btn color="secondary" variant="text" @click="showThankYou = false">
                    Tutup
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped></style>

<script>
import gsap from 'gsap'
import axios from 'axios'
import mempelaiWanita from "../assets/images/partial/m_wanita.png"
import mempelaiPria from "../assets/images/partial/m-pria.png"

export default {
    name: 'WeddingContent',
    data() {
        return {
            mempelaiWanita,
            mempelaiPria,
            showBurung: false,
            gifts: [],
            schedules: [],
            couples: [],
            wishes: [],
            qrCodeUrl: null,
            showThankYou: false,
            address: "",
            baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
            burungLoaded: {
                left: false,
                right: false
            },
            form: {
                name: "",
                phone: "",
                guestCount: "",
                attendance: "",
                message: "",
            },
            attendance: ['Hadir', 'Tidak Hadir'],
            rules: {
                required: v => !!v || 'This field is required',
                numeric: v => !isNaN(parseFloat(v)) || 'Must be a number',
                min1: v => (v > 0) || 'Must be greater than 0',
            }
        }
    },
    methods: {
        async fetchGiftData() {
            console.log("🔍 Memulai fetchGiftData...");

            try {
                const url = `${this.baseUrl}/api/gift`;
                console.log("➡️ Fetching from:", url);

                const res = await axios.get(url);
                console.log("✅ Response diterima:", res.data);

                if (res.data?.gifts) {
                    this.gifts = res.data.gifts.map((g) => ({
                        ...g,
                        bank_logo: g.bank_logo ? `${this.baseUrl}${g.bank_logo}` : null,
                    }));
                    console.log("🎁 Data gifts berhasil diset:", this.gifts);
                } else {
                    console.warn("⚠️ Tidak ada data gifts di response!");
                }

                this.address = res.data?.address || "";
                console.log("🏠 Address:", this.address);
            } catch (err) {
                console.error("❌ Gagal memuat data gift:", err);
            }
        },

        async fetchSchedules() {
            console.log("🔍 Memulai fetchSchedules...");

            try {
                const url = `${this.baseUrl}/api/schedule/`;
                console.log("➡️ Fetching from:", url);

                const res = await axios.get(url);
                console.log("✅ Response diterima:", res.data);

                if (res.data) {

                    this.schedules = {
                        akad_date: res.data.akad_date || "",
                        akad_time_start: res.data.akad_time_start || "",
                        akad_time_end: res.data.akad_time_end || "",
                        akad_desc: res.data.akad_desc || "",
                        resepsi_date: res.data.resepsi_date || "",
                        resepsi_time_start: res.data.resepsi_time_start || "",
                        resepsi_time_end: res.data.resepsi_time_end || "",
                        resepsi_desc: res.data.resepsi_desc || "",
                        location: res.data.location || "",
                        map_link: res.data.map_link || "",
                        countdown_target: res.data.countdown_target || "",
                    };

                    console.log("📅 Data schedule berhasil diset:", this.schedule);
                } else {
                    console.warn("⚠️ Tidak ada data schedule di response!");
                }
            } catch (err) {
                console.error("❌ Gagal memuat data schedule:", err);
                this.schedules = {}; // kosongkan data biar gak error
            }
        },

        async fetchCouples() {
            console.log("Fecthing Couples dimulai gan: ");
            try {
                const url = `${this.baseUrl}/api/couple`;
                console.log("Fetching from:", url);

                const res = await axios.get(url);
                console.log("Response Di terima: ", res.data);

                if (res.data) {
                    this.couples = {
                        groom_name: res.data.groom_name || "",
                        groom_parents: res.data.groom_parents || "",
                        groom_instagram: res.data.groom_instagram || "",
                        bride_name: res.data.bride_name || "",
                        bride_parents: res.data.bride_parents || "",
                        bride_instagram: res.data.bride_instagram || "",
                        groom_photo: res.data.groom_photo || "",
                        bride_photo: res.data.bride_photo || "",
                    };
                } else {
                    console.warn("Tidak ada Couple Diterima");
                }

            } catch (err) {
                console.error("❌ Gagal memuat data schedule:", err);
                this.couples = {}; // kosongkan data biar gak error
            }
        },

        async sendWish() {
            try {
                const res = await axios.post(`${this.baseUrl}/api/wishes`, this.form);
                console.log("✅ Wish Created", res.data);

                if (res.data.qr_image) {
                    this.qrCodeUrl = res.data.qr_image;
                    this.showThankYou = true; // 🔥 tampilkan modal
                    console.log("Modal aktif?", this.showThankYou);
                } else {
                    alert("Terima kasih sudah mengisi undangan kami!");
                }

                // reset form
                this.form = {
                    name: "",
                    phone: "",
                    guestCount: "",
                    attendance: "",
                    message: "",
                };

                await this.getWishes();
            } catch (e) {
                console.error("❌ Error Posting Wishes:", e);
                alert("Gagal Mengirim Wishes.");
            }
        },

        downloadQr() {
            if (!this.qrCodeUrl) return;
            const link = document.createElement("a");
            link.href = this.qrCodeUrl;
            link.download = "qrcode.png";
            link.click();
        },

        async getWishes() {
            try {
                const res = await axios.get(`${this.baseUrl}/api/wishes`);
                this.wishes = res.data;
            } catch (e) {
                console.error("Gagal Mengambil Data", e);
            }
        },

        formatDate(dateStr) {
            if (!dateStr) return "";
            const date = new Date(dateStr);
            const options = { day: "numeric", month: "long", year: "numeric" };
            return date.toLocaleDateString("id-ID", options).toUpperCase();
        },

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
        brideImageUrl() {
            if (!this.couples.bride_photo) return null;

            let path = this.couples.bride_photo.trim();

            // kalau path belum diawali "/uploads/", tambahin prefix
            if (!path.startsWith("/uploads/")) {
                // kalau backend cuma kirim nama file (misal: "couple/nico.png" atau "nico.png")
                if (path.includes("couple/")) path = `/uploads/${path}`;
                else path = `/uploads/couple/${path}`;
            }

            return `${this.baseUrl}${path}`;
        },

        groomImageUrl() {
            if (!this.couples.groom_photo) return null;

            let path = this.couples.groom_photo.trim();

            if (!path.startsWith("/uploads/")) {
                if (path.includes("couple/")) path = `/uploads/${path}`;
                else path = `/uploads/couple/${path}`;
            }

            return `${this.baseUrl}${path}`;
        }

    },


    async mounted() {
        await this.fetchGiftData();
        await this.fetchSchedules();
        await this.fetchCouples();
        await this.getWishes();
        this.showContent();
        this.setShowBird();
    },
    beforeUnmount() {

    }
}
</script>

<style scoped>
/* ========================================
  Base Styles (Desktop)
======================================== */
.chat-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 8px;
}

.chat-bubble {
    max-width: 80%;
    padding: 12px 18px;
    border-radius: 18px;
    word-break: break-word;
    line-height: 1.4;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    transition: all 0.2s ease;
}

.chat-bubble:hover {
    transform: scale(1.02);
}

.chat-name {
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 6px;
    opacity: 0.85;
}

.chat-message {
    font-size: 1rem;
}

.from-left {
    align-self: flex-start;
    background: linear-gradient(135deg, #ffe2ec, #ffcce0);
    color: #4a2c2c;
    border-top-left-radius: 4px;
}

.from-right {
    align-self: flex-end;
    background: linear-gradient(135deg, #d9ecff, #b9dbff);
    color: #1e2a3a;
    border-top-right-radius: 4px;
}

.glass-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    padding: 20px;
}

/* ========================================
   Responsive (Mobile & Tablet)
======================================== */
@media (max-width: 768px) {
    ._mempelai {
        max-width: 70%;
        height: auto;
    }

    ._salina_text,
    ._salina_text_2,
    ._avenir_text {
        text-align: center !important;
        font-size: clamp(1rem, 4vw, 1.4rem);
    }

    .text-h3 {
        font-size: 1.6rem !important;
    }

    .text-h4,
    .text-h5,
    .text-h6 {
        font-size: 1.1rem !important;
    }

    .v-card {
        padding: 16px !important;
    }

    .v-card-title {
        font-size: 1.2rem !important;
    }

    .chat-bubble {
        max-width: 95%;
        padding: 10px 14px;
        font-size: 0.9rem;
    }

    .chat-name {
        font-size: 0.8rem;
    }

    .chat-message {
        font-size: 0.9rem;
    }

    .glass-card {
        background: rgba(255, 255, 255, 0.2);
        padding: 14px;
        border-radius: 12px;
    }

    .divider_ {
        height: 12px;
    }

    .v-form {
        width: 100% !important;
    }

    .v-text-field,
    .v-textarea,
    .v-autocomplete {
        font-size: 0.9rem;
    }

    .text-none {
        font-size: 0.95rem !important;
    }

    /* Elemen spacing antar section */
    .my-10 {
        margin-top: 24px !important;
        margin-bottom: 24px !important;
    }

    /* List Outro biar gak terlalu lebar */
    ul {
        padding-left: 18px;
        font-size: 0.9rem;
    }

    /* Center semua konten */
    .d-flex.flex-column.align-center.justify-start {
        text-align: center;
    }
}

/* ========================================
   📱 Extra Small (≤480px)
======================================== */
@media (max-width: 480px) {
    .text-h3 {
        font-size: 1.4rem !important;
    }

    ._mempelai {
        max-width: 90%;
    }

    .v-card-title {
        font-size: 1rem !important;
    }

    .chat-bubble {
        font-size: 0.85rem;
        padding: 8px 12px;
    }

    .chat-container {
        gap: 10px;
    }

    .glass-card {
        border-radius: 10px;
        padding: 12px;
    }
}
</style>
