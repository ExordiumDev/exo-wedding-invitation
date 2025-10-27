<template>
  <v-container
    fluid
    class="h-100 d-flex justify-center align-center flex-column perspective-wrapper"
  >
    <!-- SECTION HOME TEXT -->
    <v-row class="w-100">
      <v-col cols="12" md="12">
        <div
          class="d-flex flex-column align-center ga-3 text-section justify-center h-100"
          ref="introSection"
        >
          <span class="text-h6 text-md-h5 _salina_text">Dear</span>
          <span class="text-h4 text-md-h2 _salina_text text-center">
            {{ guestName || "Tamu Undangan" }}
          </span>
          <v-divider
            class="w-100 my-2 _divider_b"
            :thickness="4"
            color="background"
          ></v-divider>
          <span class="text-h6 text-md-h5 _salina_text">
            We invite you to the wedding of
          </span>
          <!-- <div class="d-flex flex-column w-100 my-5 my-md-10 _bride_groom_text_container">
                        <span class="text-h3 text-md-h1 _salina_text text-background tight-text _bride_text">Pratiwi</span>
                        <span class="text-h3 text-md-h1 _salina_text text-background text-end tight-text _and_text">&</span>
                        <span class="text-h3 text-md-h1 _salina_text text-background text-end tight-text _groom_text">Ahmad</span>
                    </div> -->
          <div
            class="d-flex flex-column w-100 my-5 my-md-10 _bride_groom_text_container align-center"
          >
            <v-img :src="logoBrideGroom" width="1000" height="300" contain />
          </div>

          <v-btn variant="flat" class="text-none" @click="animateExit">
            Open the invitation
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
@media (max-width: 768px) {
  ._divider_b {
    max-width: 80% !important;
  }

  ._bride_text {
    padding-left: 13% !important;
  }

  ._and_text {
    padding-right: 24% !important;
  }

  ._groom_text {
    padding-right: 20% !important;
  }

  ._bride_groom_image {
    width: 80%;
    max-width: 500px;
    height: auto;
    object-fit: contain;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<script>
import gsap from "gsap";
import tiang from "../assets/images/partial/brimingham-big.png";
import imaBg from "../assets/images/non-partial/Pratiwi-Ahmad-09-November-WEB-bg-depan-tanpa-tiang.png";
import bungaGede from "../assets/images/partial/bunga-copy.svg";
import bungaWhiteRose from "../assets/images/partial/white-rose-copy.png";
import bungaClover from "../assets/images/partial/Clover.png";
import burungKiri from "../assets/images/partial/burung-kiri.png";
import burungKanan from "../assets/images/partial/burung-kanan.png";
import logoBrideGroom from "../assets/images/non-partial/Pratiwi-Ahmad-09-November-WEB-logo-PratiwiAhmad.png";

// penganten

import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    guest: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tiang,
      imaBg,
      bungaGede,
      logoBrideGroom,
      bungaWhiteRose,
      bungaClover,
      burungKiri,
      burungKanan,
      guestName: null,
      isExit: false,
      showAyat: false,
      showWeddingContent: false,
      showBurung: false,
      burungLoaded: {
        left: false,
        right: false,
      },
    };
  },
  methods: {
    ...mapMutations({
      // setCRoutes: 'SET_C_ROUTES'
    }),
    animateExit() {
      const bgm = this.$root.$refs.bgm;
      if (bgm) {
        bgm.play().catch((err) => console.log("error", err));
      }
      this.$router.push({ name: "inv.open", query: { guest: this.guest } });
      this.$store.commit("SET_C_ROUTES", true);
    },
    animateAyatEnter() {
      const textEl = this.$refs.textSection;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(
        textEl,
        {
          opacity: 0,
          y: 50,
          duration: 1.1,
        },
        "-=0.6"
      );
    },
    showContent() {
      this.$nextTick(() => {
        const textEl = this.$refs.weddingContent;
        const container_mempelai = this.$refs.container_mempelai;
        if (!textEl || !container_mempelai) return;

        const spans = textEl.querySelectorAll("span");
        const tl = gsap.timeline();
        tl.from(spans, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        }).from(
          container_mempelai,
          {
            opacity: 0,
            y: 80,
            duration: 0.8,
            ease: "power3.out",
            immediateRender: false,
          },
          "+=0.5"
        );
      });
    },
  },
  mounted() {
    this.$store.commit("SET_SHOW_BIRD", false);

    const textEl = this.$refs.introSection;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(textEl, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
    });

    const guest = this.$route.query.guest;
    if (guest) {
      this.guestName = decodeURIComponent(guest);
    }
  },
  beforeUnmount() {
    if (this._handleScroll) {
      window.removeEventListener("wheel", this._handleScroll);
    }
  },
  watch: {
    "$route.query.guest"(val) {
      this.guestName = val ? decodeURIComponent(val) : null;
    },
  },
};
</script>
