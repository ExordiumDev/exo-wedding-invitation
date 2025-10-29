<template>
  <v-container fluid class="_show_content">
    <div class="d-flex justfy-center align-center w-100">
      <v-btn variant="plain" block color="background" @click="routeInvOpen">
        <v-icon icon="mdi-chevron-double-up"></v-icon>
      </v-btn>
    </div>
    <div class="divider_"></div>
    <div
      class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100"
      ref="weddingContent"
    >
      <span class="text-h6 text-center _salina_text_2 mb-5"
        >Assalamu'alaikum Warahmatullahi Wabarakaatuh</span
      >
      <span class="_salina_text">Dengan memohon ridho dan rahmat Allah SWT</span>
      <span class="_salina_text">Kami bermaksud menyelenggarakan</span>
      <span class="_salina_text">Resepsi Pernikahan putra-putri kami</span>
      <div class="divider_"></div>
      <v-container ref="container_mempelai">
        <v-row justify="center">
          <v-col cols="12" md="5" class="pa-0">
            <div class="d-flex flex-column text-center align-center text-center">
              <v-img
                :src="brideImageUrl || brideFix"
                class="_mempelai bride my-10 zoom-inside-brides"
                cover
              ></v-img>
              <div class="d-flex flex-column" style="z-index: 10 !important">
                <span class="text-h3 _salina_text">{{ getGET_COUPLES_DATA.bride_name }}</span>
                <span class="text-none">Putri pertama</span>
                <span class="text-none">{{ getGET_COUPLES_DATA.bride_parents }}</span>
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
              <v-img
                :src="groomImageUrl || groomFix"
                class="_mempelai bride my-10 zoom-inside-groom"
                cover
              ></v-img>
              <div class="d-flex flex-column" style="z-index: 10 !important">
                <span class="text-h3 _salina_text">{{ getGET_COUPLES_DATA.groom_name }}</span>
                <span class="text-none">Putra Terakhir</span>
                <span class="text-none">{{ getGET_COUPLES_DATA.groom_parents }}</span>
                <!-- <span class="text-none">& Ibu Elfi Sahra Lubis</span> -->
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- wedding schedule -->
    <v-row class="my-10" justify="center">
      <v-col cols="12" md="4">
        <div class="divider_"></div>
        <div class="divider_"></div>
        <div class="divider_"></div>
        <div
          class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100 text-center"
          ref="weddingSchedule"
        >
          <template v-if="getGET_SCHEDULE_DATA">
            <!-- Akad -->
            <span class="text-h4 text-md-h2 _salina_text_2 mb-5">
              {{ formatDate(getGET_SCHEDULE_DATA.akad_date) }}
            </span>

            <strong class="text-none text-md-h5 _salina_text_bold">Akad Nikah</strong>
            <span class="text-none text-md-h6 _salina_text_bold font-weight-bold">
              Pukul {{ getGET_SCHEDULE_DATA.akad_time_start }} - {{ getGET_SCHEDULE_DATA.akad_time_end }}
            </span>

            <span class="text-none text-md-h6 _salina_text_bold">
              {{ getGET_SCHEDULE_DATA.akad_desc }}
            </span>

            <span class="text-none text-md-h6 _salina_text_bold">
              {{ getGET_SCHEDULE_DATA.location }}
            </span>

            <span class="text-none text-md-h6 _salina_text_bold">
              -----------------------------------------------
            </span>

            <!-- Resepsi -->
            <span class="text-none text-md-h5 _salina_text_bold"> Resepsi Pernikahan </span>

            <span class="text-none text-md-h6 _salina_text_bold">
              Pukul {{ getGET_SCHEDULE_DATA.resepsi_time_start }} - {{ getGET_SCHEDULE_DATA.resepsi_time_end }}
            </span>

            <span class="text-none text-md-h6 _salina_text_bold">
              {{ getGET_SCHEDULE_DATA.resepsi_desc }}
            </span>

            <span class="text-none text-md-h6 _salina_text_bold">
              {{ getGET_SCHEDULE_DATA.location }}
            </span>
          </template>

          <!-- Kalau belum ada data -->
          <template v-else>
            <span class="text-grey text-md-body-1 mt-5"> Jadwal belum tersedia. </span>
          </template>
        </div>
        <!-- <div class="divider_"></div>
                <div class="divider_"></div> -->
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8">
        <div class="glass-card w-100">
          <v-card-title
            class="text-background _salina_text_2 mb-2 text-center text-h6 text-md-h4"
          >
            Gallery
          </v-card-title>

          <v-carousel
            v-model="currentSlide"
            cycle
            touch
            :show-arrows="false"
            hide-delimiter-background
            height="550"
            interval="4000"
            class="custom-carousel"
          >
            <v-carousel-item
              v-for="(img, index) in getGET_GALLERY_DATA"
              :key="index"
              class="justify-center"
            >
              <v-img
                :src="baseUrl + '/api/gallery/uploads/' + img.filename"
                class="gallery-img"
                cover
              />
            </v-carousel-item>
          </v-carousel>
        </div>
      </v-col>
    </v-row>

    <!-- wedding gift -->
    <v-row justify="center" class="h-100 my-10" ref="weddingGiftCard">
      <v-col cols="12" md="6" class="d-flex justify-center">
        <div class="glass-card pa-8 text-center w-100">
          <!-- 👇 Bikin baris sendiri -->
          <div class="mb-4">
            <span class="text-h4 text-md-h4 _avenir_text_roman mb-2 d-block"
              >Wedding Gift</span
            >
          </div>

          <!-- 👇 Teks isi, baris baru -->
          <div class="text-none text-md-h6 _avenir_text_roman">
            Kehadiran dan doa restu dari Bapak/Ibu<br />
            Saudara/i adalah anugerah terindah bagi kami,<br />
            Jika memberi tanda kasih adalah bentuk cinta<br />
            yang ingin disampaikan, dengan segala kerendahan hati,<br />
            dapat melalui : 
          </div>

          <div v-if="getGET_GIFT_DATA.gifts.length > 0" class="mt-5 text-center">
            <template v-for="(group, bank) in groupedGifts" :key="bank">
              <span class="font-weight-bold d-block _avenir_text_roman">Rekening {{ bank }}</span>
              <div v-for="gift in group" :key="gift.id" class="_avenir_text_roman">
                - {{ gift.account_number }} a/n {{ gift.account_name }}
              </div>
              <!-- <strong class="text-none text-md-h6 _avenir_text_roman d-block">
                {{ index === 0 ? "" : "atau " }}
                {{ gift.bank_name }} {{ gift.account_number }} a.n {{ gift.account_name }}
              </strong> -->
            </template>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- wedding content -->

    <v-row justify="center" class="h-100 my-10" ref="weddingRsvpCard">
      <v-col cols="12" md="5" class="d-flex justify-center">
        <v-form class="w-100 glass-card" @submit.prevent="sendWish">
          <v-card variant="plain" class="pa-5">
            <v-card-item>
              <v-card-title
                class="text-h6 text-md-h4 text-center text-background _salina_text mb-5"
              >
                RSVP
              </v-card-title>

              <v-text-field
                v-model="form.name"
                label="Name"
                variant="outlined"
                class="text-center mb-2"
                :rules="[rules.required]"
              />
              <v-text-field
                v-model="form.phone"
                label="Phone Number"
                variant="outlined"
                class="text-center mb-2"
                :rules="[rules.required, rules.numeric]"
              />
              <v-text-field
                v-model="form.guestCount"
                label="Number of guests"
                variant="outlined"
                class="text-center mb-2"
                :rules="[rules.required, rules.numeric]"
              />

              <v-autocomplete
                v-model="form.attendance"
                :items="attendance"
                label="Confirmation of Attendance"
                variant="outlined"
                class="text-center mb-2"
              />
              <v-textarea
                v-model="form.message"
                label="Doa & kata-katamu"
                variant="outlined"
                class="text-center mb-2"
                no-resize
              />
            </v-card-item>

            <v-card-actions>
              <v-btn type="submit" variant="flat" block class="text-none" :disabled="onSubmitBtn">Send</v-btn>
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
            <div
              v-for="(wish, index) in getGET_WISHES_DATA"
              :key="index"
              class="chat-bubble"
              :class="index % 2 === 0 ? 'from-left' : 'from-right'"
            >
              <div class="chat-name _salina_text_bold">{{ wish.name }}</div>
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

    <div
      class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100"
      ref="weddingOutro"
    >
      <span class="text-none text-md-h3 _salina_text mb-5">Thank You</span>
      <span class="text-none text-md-h6 _salina_text text-center"
        >Merupakan suatu kehormatan dan kebahagiaan kami</span
      >
      <span class="text-none text-md-h6 _salina_text"
        >Keluarga besar yang mengundang mempelai Wanita :
      </span>
      <ul>
        <li>Keluarga Besar Bakri & Lasupu</li>
        <li>Keluarga Besar Yunus & Abdullah</li>
        <li>Keluarga Besar Latopada</li>
      </ul>

      <span class="text-none text-md-h6 _salina_text text-center"
        >Keluarga besar yang mengundang mempelai Pria :
      </span>
      <ul>
        <li>Keluarga Besar Hamdan Nasution</li>
        <li>Keluarga Besar Elfi Sahra Lubis</li>
      </ul>

      <span class="text-none text-md-h6 _salina_text"
        >apabila Bapak/Ibu/Saudara/i berkenan hadir</span
      >
      <span class="text-none text-md-h6 _salina_text"
        >untuk memberikan doa restu kepada putra-putri kami</span
      >

      <span class="_salina_text text-none text-md-h6 mt-5 text-center"
        >Wassalamu'alaikum Warahmmatullahi Wabarakaatuh</span
      >
    </div>
    <div class="divider_"></div>
    <div class="divider_"></div>
  </v-container>

  <!-- <v-dialog v-model="showThankYou" max-width="400px" persistent>
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
    </v-dialog> -->
</template>

<script>
import gsap from "gsap";
import axios from "axios";
import ovalFrame from "../assets/images/partial/Pratiwi-Ahmad-09-November-WEB-framephoto.png";
import brideFix from "../assets/images/partial/bride_fix.jpg";
import groomFix from "../assets/images/partial/groom_fix.jpg";

import { GET_GIFT_DATA, GET_SCHEDULE_DATA, GET_COUPLES_DATA, GET_WISHES_DATA, GET_GALLERY_DATA } from "../stores/actions/reqApi.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "WeddingContent",
  props: {
    slug: {
      type: String,
      required: true,
    },
    guest: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      ovalFrame,
      groomFix,
      brideFix,
      showBurung: false,

      qrCodeUrl: null,
      showThankYou: false,
      currentSlide: 0,
      address: "",
      // baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
      baseUrl: import.meta.env.VITE_API_BASE_URL_PROD || "https://api.haveyoumatiwi.com",
      burungLoaded: {
        left: false,
        right: false,
      },
      form: {
        name: "",
        phone: "",
        guestCount: "",
        attendance: "",
        message: "",
      },
      attendance: ["Hadir", "Tidak Hadir"],
      rules: {
        required: (v) => !!v || "This field is required",
        numeric: (v) => !isNaN(parseFloat(v)) || "Must be a number",
        min1: (v) => v > 0 || "Must be greater than 0",
      },
      onSubmitBtn: false,
    };
  },
  methods: {
    ...mapActions({
      actGET_GIFT_DATA: `data/${GET_GIFT_DATA}`,
      actGET_SCHEDULE_DATA: `data/${GET_SCHEDULE_DATA}`,
      actGET_COUPLES_DATA: `data/${GET_COUPLES_DATA}`,
      actGET_WISHES_DATA: `data/${GET_WISHES_DATA}`,
      actGET_GALLERY_DATA: `data/${GET_GALLERY_DATA}`,
    }),
    async sendWish() {
      try {
        this.onSubmitBtn = true;
        const res = await axios.post(`${this.baseUrl}/api/wishes`, this.form);

        if (res.data.qr_image) {
          this.qrCodeUrl = res.data.qr_image;
          this.showThankYou = true;
          // console.log("Modal aktif?", this.showThankYou);
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

        await this.actGET_WISHES_DATA();
        this.onSubmitBtn = false;
      } catch (e) {
        console.error("Error Posting Wishes:", e);
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
    formatDate(dateStr) {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      const options = { day: "numeric", month: "long", year: "numeric" };
      return date.toLocaleDateString("id-ID", options).toUpperCase();
    },

    routeInvOpen() {
      this.$router.push({ name: "inv.open" });
    },
    setShowBird() {
      this.$store.commit("SET_SHOW_BIRD", true);
    },
    showContent() {
      this.$nextTick(() => {
        const textEl = this.$refs.weddingContent;
        const container_mempelai = this.$refs.container_mempelai.$el;
        if (!textEl || !container_mempelai) return;

        const spans = textEl.querySelectorAll("span");
        const tl = gsap.timeline();
        tl.from(spans, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        })
      });
    },
  },
  computed: {
    ...mapGetters({
      getGET_SCHEDULE_DATA: `data/${GET_SCHEDULE_DATA}`,
      getGET_COUPLES_DATA: `data/${GET_COUPLES_DATA}`,
      getGET_WISHES_DATA: `data/${GET_WISHES_DATA}`,
      getGET_GALLERY_DATA: `data/${GET_GALLERY_DATA}`,
      getGET_GIFT_DATA: `data/${GET_GIFT_DATA}`,
    }),
    groupedGifts() { 
      if (!this.getGET_GIFT_DATA?.gifts) return {};
      return this.getGET_GIFT_DATA.gifts.reduce((acc, gift) => {
        if (!acc[gift.bank_name]) acc[gift.bank_name] = [];
        acc[gift.bank_name].push(gift);
        return acc;
      }, {});
    },
    brideImageUrl() {
      if (!this.getGET_COUPLES_DATA.bride_photo) return null;
      let path = this.getGET_COUPLES_DATA.bride_photo.trim();

      // kalau path belum diawali "/uploads/", tambahin prefix
      if (!path.startsWith("/uploads/")) {
        // kalau backend cuma kirim nama file (misal: "couple/nico.png" atau "nico.png")
        if (path.includes("couple/")) path = `/uploads/${path}`;
        else path = `/uploads/couple/${path}`;
      }

      return `${this.baseUrl}${path}`;
    },

    groomImageUrl() {
      if (!this.getGET_COUPLES_DATA.groom_photo) return null;
      let path = this.getGET_COUPLES_DATA.groom_photo.trim();

      if (!path.startsWith("/uploads/")) {
        if (path.includes("couple/")) path = `/uploads/${path}`;
        else path = `/uploads/couple/${path}`;
      }

      return `${this.baseUrl}${path}`;
    },
  },

  async mounted() {
    if (this.guest) {
        this.form.name = this.guest;
      }
    this.showContent();
    this.setShowBird();
    // console.log('couple ', this.getGET_GIFT_DATA)
  },
  beforeUnmount() {

  },
  watch: {
  }
};
</script>

<style scoped>
/* ========================================
  Base Styles (Desktop)
======================================== */

.mempelai_wrapper {
  position: relative;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

._mempelai.bride {
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
}

._mempelai.bride {
  border-radius: 50%;
  object-fit: cover;
  z-index: 1;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
}

._mempelai.frame {
  z-index: 2;
  pointer-events: none;
}

.chat-container {
  max-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 8px;
  overflow-y: auto;
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

.custom-carousel {
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* ✅ Semua gambar seragam ukurannya */
.gallery-img {
  object-fit: cover;
  width: 100%;
  height: 550px;
  border-radius: 20px;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

/* .gallery-img:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
} */

/* ✅ Kecilkan dan rapikan indicator carousel */
.custom-carousel .v-carousel__controls {
  bottom: 12px;
}

.custom-carousel .v-carousel__controls__item {
  width: 8px !important;
  height: 8px !important;
  margin: 0 3px !important;
  opacity: 0.6;
}

.custom-carousel .v-carousel__controls__item--active {
  background-color: #ff5a91 !important;
  opacity: 1;
}

/* ✅ Kecilkan indicator (dot) carousel */
.custom-carousel .v-carousel__controls {
  bottom: 10px;
}

.custom-carousel .v-carousel__controls__item {
  width: 8px !important;
  height: 8px !important;
  margin: 0 3px !important;
  opacity: 0.7;
}

.custom-carousel .v-carousel__controls__item--active {
  background-color: #1976d2 !important;
  opacity: 1;
}

/* Optional: efek transisi halus antar gambar */
.v-carousel-item {
  transition: transform 0.8s ease-in-out !important;
}

/* kalau style-mu scoped, tambahkan :deep() seperti ini */
:deep(.zoom-inside .v-img__img) {
  transform: scale(1.65); /* 🔥 ngezoom isi gambarnya */
  transform-origin: center center; /* titik zoom di tengah */
  transition: transform 0.3s ease-out;
}

:deep(.zoom-inside-groom .v-img__img) {
  transform: scale(1.55) translateY(14%) translateX(3%);
  transform-origin: center center;
  transition: transform 0.3s ease-out;
}

:deep(.zoom-inside-brides .v-img__img) {
  transform: scale(1.55); /* 🔥 ngezoom isi gambarnya */
  transform-origin: center center; /* titik zoom di tengah */
  transition: transform 0.3s ease-out;
}

/* ========================================
   Responsive (Mobile & Tablet)
======================================== */
@media (max-width: 768px) {
  ._mempelai.bride {
    top: 0;
    left: 0;
    width: 70%;
    height: 70%;
  }

  ._mempelai.bride {
    border-radius: 50%;
    object-fit: cover;
    z-index: 1;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  }
  ._mempelai {
    max-width: 70%;
    height: auto;
  }

  ._salina_text,
  ._salina_text_2,
  ._salina_text {
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

  .gallery-img {
    border-radius: 12px;
    margin-top: 4px;
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

  :deep(.zoom-inside-groom .v-img__img) {
    transform: scale(1.55) translateY(14%) translateX(3%);
    transform-origin: center center; /* titik zoom di tengah */
    transition: transform 0.3s ease-out;
  }

  :deep(.zoom-inside-brides .v-img__img) {
    transform: scale(1.6);
    transform-origin: center center; /* titik zoom di tengah */
    transition: transform 0.3s ease-out;
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
