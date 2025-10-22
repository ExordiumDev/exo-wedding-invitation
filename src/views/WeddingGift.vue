<template>
  <v-container fluid ref="wddingGift">
    <div
      class="d-flex flex-column align-center justify-start h-100 ga-1 text-background my-10 w-100"
      ref="weddingGiftCard"
    >
      <span class="text-h4 text-md-h4 _salina_text mb-5">Wedding Gift</span>
      <span class="text-none text-md-h6 _avenir_text">
        Kehadiran dan doa restu dari Bapak/Ibu
      </span>
      <span class="text-none text-md-h6 _avenir_text">
        Saudara/i adalah anugerah terindah bagi kami,
      </span>
      <span class="text-none text-md-h6 _avenir_text">
        Jika memberi tanda kasih adalah bentuk cinta
      </span>
      <span class="text-none text-md-h6 _avenir_text">
        yang ingin disampaikan, dengan segala
      </span>
      <span class="text-none text-md-h6 _avenir_text">
        kerendahan hati, dapat melalui
      </span>

      <!-- Dynamic rekening text -->
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

      <template v-else>
        <span class="text-md-body-1 mt-5 text-grey">
          Belum ada data rekening.
        </span>
      </template>

      <!-- Address -->
      <div v-if="address" class="mt-8 text-center">
        <span class="text-md-h6 _avenir_text">Atau dapat dikirim ke alamat:</span>
        <p class="text-md-body-1 _avenir_text mt-2">{{ address }}</p>
      </div>
    </div>
  </v-container>
</template>

<style scoped>

._burung_left { 
    width: 14%;
    position: absolute;
    top: 8%;
    left: 18%;
    z-index: 2;
}

._burung_right { 
    width: 14%;
    position: absolute;
    top: 8%;
    right: 17%;
    z-index: 2;
}


</style>
<script>

import gsap from 'gsap'
import axios from 'axios';
import burungKiri from '../assets/images/partial/burung-kiri.png'
import burungKanan from '../assets/images/partial/burung-kanan.png'
import { useWheelNavigation } from '../plugins/usewheeleNavigation';
import { th } from 'vuetify/locale';
export default {
    name: 'WeddingGift',
    data() { 
        return { 
            burungKiri,
            burungKanan,
            showBurung: true,
            gifts: [],
            address: "",
            baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
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

        showFormGift() {
            this.$nextTick(() => {
                const textEl = this.$refs.wddingGift.$el;
                const spans = textEl.querySelectorAll('span');
                const strongs = textEl.querySelectorAll('strong');
                const tl = gsap.timeline()
                tl.from(spans, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                }).from(strongs, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                },"+=0.1");
            })
        },
    },
    async mounted() {
        await this.fetchGiftData();
        this.showFormGift();
        const { attach, detach } = useWheelNavigation({
            nextRoute: 'inv.doa',
            prevRoute: 'inv.rsvp',
            delay: 2500,
        })
        const el = this.$refs.wddingGift.$el || this.$refs.wddingGift
        attach(el)
        this.detachFn = () => detach(el)
    }
}
</script>