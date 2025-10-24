<template>
  <v-app class="main-wrapper">
    <v-main>
      <!-- 🌸 Background hanya muncul di non-admin/editor routes -->
      <template v-if="!isAdminRoute">
        <v-img :src="tiang" class="_tiang_left" ref="tiangLeft"></v-img>
        <v-img :src="tiang" class="_tiang_right" ref="tiangRight"></v-img>

        <v-img :src="bungaWhiteRose" class="_bunga_bottom_left"></v-img>
        <v-img :src="bungaClover" class="_bunga_bottom_left_clover_0"></v-img>
        <v-img :src="bungaClover" class="_bunga_bottom_left_clover_50"></v-img>
        <v-img :src="bungaGede" class="_bunga_bottom_left_30"></v-img>
        <v-img :src="bungaWhiteRose" class="_bunga_bottom_left_60"></v-img>
        <v-img :src="bungaGede" class="_bunga_bottom_left_90"></v-img>

        <v-img :src="bungaGede" class="_bunga_bottom_right"></v-img>
        <v-img :src="bungaWhiteRose" class="_bunga_bottom_right_30"></v-img>
        <v-img :src="bungaGede" class="_bunga_bottom_right_60"></v-img>
        <v-img :src="bungaWhiteRose" class="_bunga_bottom_right_90"></v-img>

        <v-img
          v-if="$store.state.showBird"
          :src="burungKiri"
          class="_burung_left"
          ref="burungLeft"
        ></v-img>
        <v-img
          v-if="$store.state.showBird"
          :src="burungKanan"
          class="_burung_right"
          ref="burungRight"
        ></v-img>
      </template>

      <!-- 🌐 Halaman konten -->
      <router-view v-slot="{ Component }">
        <component :is="Component" />
        <!-- <transition name="fade">
        </transition> -->
      </router-view>
      <audio ref="bgm" :src="musicUrl"></audio>
      <MusicController v-if="!isAdminRoute" :audio-ref="$refs.bgm" />
    </v-main>
  </v-app>
</template>

<script>
import bungaGede from "../assets/images/partial/bunga-copy.svg";
import bungaWhiteRose from "../assets/images/partial/white-rose-copy.png";
import bungaClover from "../assets/images/partial/Clover.png";
import burungKiri from "../assets/images/partial/burung-kiri.png";
import burungKanan from "../assets/images/partial/burung-kanan.png";
import tiang from "../assets/images/partial/brimingham-big.png";
import musicUrl from "../assets/sound/matiwi-backsong.mp3";
import MusicController from "../components/MusicController.vue";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import gsap from "gsap";

export default {
  name: "App",
  data() {
    return {
      musicUrl,
      tiang,
      bungaGede,
      bungaWhiteRose,
      bungaClover,
      burungKiri,
      burungKanan,
      isLocked: false,
      isRender: false,
    };
  },
  components: {
    MusicController,
  },
  computed: {
    ...mapState({
      cRoutes: (state) => state.cRoutes,
      showBird: (state) => state.showBird,
    }),
    isAdminRoute() {
      // 🔍 deteksi route admin/editor
      const path = this.$route.path;
      return path.startsWith("/admin") || path.startsWith("/editor");
    },
  },
  methods: {
    balikinTiang() {
      const leftEl = this.$refs.tiangLeft?.$el || this.$refs.tiangLeft;
      const rightEl = this.$refs.tiangRight?.$el || this.$refs.tiangRight;
      const isMobile = window.innerWidth <= 768;
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      if (isMobile) {
        tl.to([leftEl, rightEl], {
          height: "50%",
          yPercent: 20,
          scale: 1,
          duration: 2,
        });
      } else {
        tl.to([leftEl, rightEl], {
          height: "70%",
          scale: 1,
          z: 0,
          transformOrigin: "center top",
          duration: 2,
        });
      }
    },
    geserTiang() {
      const leftEl = this.$refs.tiangLeft?.$el || this.$refs.tiangLeft;
      const rightEl = this.$refs.tiangRight?.$el || this.$refs.tiangRight;
      const isMobile = window.innerWidth <= 768;
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      if (isMobile) {
        tl.to([leftEl, rightEl], {
          height: "30%",
          yPercent: -8,
          scale: 0.7,
          duration: 2,
        });
      } else {
        tl.to([leftEl, rightEl], {
          height: "70%",
          scale: 0.79,
          z: 120,
          transformOrigin: "center top",
          duration: 2,
        });
      }
    },
    munculBurung() {
      this.$nextTick(() => {
        const burungKiri = this.$refs.burungLeft?.$el;
        const burungKanan = this.$refs.burungRight?.$el;
        if (!burungKiri || !burungKanan) return;
        gsap.from([burungKiri, burungKanan], {
          opacity: 0,
          y: -30,
          duration: 1,
          stagger: 0.35,
          ease: "power3.out",
        });

        //Animasi burung
        [burungKiri, burungKanan].forEach((el, i) => {
          gsap.to(el, {
            y: "+=10",
            duration: 3 + Math.random() * 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: Math.random(),
          });
        });
      });
    },
    ...mapActions({}),
    ...mapMutations({}),
  },
  mounted() { 
    const updateAppDimensions = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
      document.documentElement.style.setProperty('--app-width', `${window.innerWidth}px`);
    };
    window.addEventListener('resize', updateAppDimensions);
    updateAppDimensions();

window.dispatchEvent(new Event('resize'));
  },
  watch: {
    $route(to) {
      const audio = this.$refs.bgm;
      if (to.path !== "/matiwi/home") {
        this.$store.commit("SET_C_ROUTES", true);
        this.geserTiang();
        audio.play().catch((err) => {
          console.log("error ", err);
        });
      } else if (to.path === "/matiwi/home") {
        audio.pause();
        audio.currentTime = 0;
        this.$store.commit("SET_C_ROUTES", false);
        this.balikinTiang();
      }
    },
    showBird(newVal) {
      if (newVal) {
        this.munculBurung();
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  ._burung_left {
    width: 20% !important;
    position: fixed;
    bottom: 0 !important;
    left: 8% !important;
    z-index: -1 !important;
    opacity: 0.8;
  }

  ._burung_right {
    width: 20% !important;
    position: fixed;
    bottom: 0;
    right: 9% !important;
    z-index: -1 !important;
    opacity: 0.8;
  }
  ._tiang_left {
    width: 22% !important;
    position: fixed;
    bottom: 0 !important;
    left: 5% !important;
    z-index: -1 !important;
  }

  ._tiang_right {
    width: 22% !important;
    position: fixed;
    bottom: 0 !important;
    right: 5% !important;
    z-index: -1;
  }
  ._bunga_bottom_left_clover_0 {
    width: 1rem !important;
    position: fixed;
    bottom: 0;
    left: 0%;
    z-index: -1;
    transform: scaleX(-1);
  }

  ._bunga_bottom_left_clover_50 {
    width: 1rem;
    position: fixed;
    bottom: 0;
    left: 16%;
    z-index: -1 !important;
  }

  ._bunga_bottom_left {
    width: 5rem !important;
    position: fixed !important;
    bottom: 0 !important;
    left: 0;
    z-index: -1 !important;
    transform: scaleX(-1);
  }

  ._bunga_bottom_left_30 {
    width: 5rem !important;
    position: fixed;
    bottom: 0;
    left: 8%;
    z-index: -1 !important;
    transform: scaleX(-1);
  }

  ._bunga_bottom_left_60 {
    width: 3rem !important;
    position: fixed;
    bottom: 0;
    left: 17%;
    z-index: -1 !important;
  }

  ._bunga_bottom_left_90 {
    width: 6rem !important;
    position: fixed;
    bottom: 0;
    left: 23%;
    z-index: -1 !important;
  }

  ._bunga_bottom_right {
    width: 6rem !important;
    position: fixed;
    bottom: 0;
    right: -3%;
    z-index: -1 !important;
  }

  ._bunga_bottom_right_30 {
    width: 5rem !important;
    position: fixed;
    bottom: 0;
    right: 13%;
    z-index: -1 !important;
    transform: scaleX(-1);
  }

  ._bunga_bottom_right_60 {
    width: 7rem !important;
    position: fixed;
    bottom: 0;
    right: 18%;
    z-index: -1 !important;
  }

  ._bunga_bottom_right_90 {
    width: 5.5rem !important;
    position: fixed;
    bottom: 0;
    right: 25%;
    z-index: -1 !important;
  }
}

._burung_left {
  width: 12%;
  position: fixed;
  top: 8%;
  left: 14%;
  z-index: 0;
}

._burung_right {
  width: 12%;
  position: fixed;
  top: 8%;
  right: 14%;
  z-index: 0;
}

._tiang_left {
  width: 12%;
  position: fixed;
  bottom: 0;
  left: 17%;
  z-index: 1-1;
}

._tiang_right {
  width: 12%;
  position: fixed;
  bottom: 0;
  right: 17%;
  z-index: 1-1;
}

._bunga_bottom_left_clover_0 {
  width: 3rem;
  position: fixed;
  bottom: 0;
  left: 0%;
  z-index: 1;
  transform: scaleX(-1);
}

._bunga_bottom_left_clover_50 {
  width: 3rem;
  position: fixed;
  bottom: 0;
  left: 16%;
  z-index: 2;
}

._bunga_bottom_left {
  width: 16rem;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  transform: scaleX(-1);
}

._bunga_bottom_left_30 {
  width: 16rem;
  position: fixed;
  bottom: 0;
  left: 8%;
  z-index: 1;
  transform: scaleX(-1);
}

._bunga_bottom_left_60 {
  width: 12rem;
  position: fixed;
  bottom: 0;
  left: 17%;
  z-index: 1;
}

._bunga_bottom_left_90 {
  width: 12rem;
  position: fixed;
  bottom: 0;
  left: 23%;
  z-index: 1;
}

._bunga_bottom_right {
  width: 24rem;
  position: fixed;
  bottom: 0;
  right: -3%;
  z-index: 1;
}

._bunga_bottom_right_30 {
  width: 12rem;
  position: fixed;
  bottom: 0;
  right: 13%;
  z-index: 1;
  transform: scaleX(-1);
}

._bunga_bottom_right_60 {
  width: 12rem;
  position: fixed;
  bottom: 0;
  right: 18%;
  z-index: 1;
}

._bunga_bottom_right_90 {
  width: 8rem;
  position: fixed;
  bottom: 0;
  right: 25%;
  z-index: 1;
}
</style>
