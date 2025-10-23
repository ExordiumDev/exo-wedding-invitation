<template>
  <transition name="fade-scale">
    <div v-if="visible" class="music-float">
      <v-btn icon elevation="8" size="x-large" class="music-btn" @click="toggleMute">
        <v-icon
          size="30"
          class="music-icon"
          :class="{ muted: isMuted }"
          transition="scale-transition"
        >
          {{ isMuted ? "mdi-volume-off" : "mdi-volume-high" }}
        </v-icon>
      </v-btn>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    audioRef: Object,
  },
  data() {
    return {
      isMuted: false,
      visible: false,
    };
  },
  watch: {
    audioRef: {
      immediate: true,
      handler(audio) {
        if (audio) {
          this.setupAudio(audio);
        }
      },
    },
  },
  mounted() {
    // Biar muncul smooth
    setTimeout(() => {
      this.visible = true;
    }, 500);
  },
  methods: {
    setupAudio(audio) {
      this.isMuted = audio.muted;

      audio.addEventListener("play", () => {
        this.isMuted = audio.muted;
      });

      audio.addEventListener("volumechange", () => {
        this.isMuted = audio.muted;
      });
    },
    toggleMute() {
      const audio = this.audioRef;
      if (!audio) return;

      this.isMuted = !this.isMuted;
      audio.muted = this.isMuted;

      // Auto play kalau unmute
      if (!this.isMuted && audio.paused) {
        audio.play().catch((e) => console.warn("Autoplay prevented:", e));
      }
    },
  },
};
</script>

<style scoped>
.music-float {
  position: fixed;
  bottom: 26px;
  right: 26px;
  z-index: 3000;
}

/* 🎵 Button styling */
.music-btn {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.15) !important;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 50% !important;
  transition: all 0.3s ease;
}

.music-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.25) !important;
}

/* 🎧 Icon */
.music-icon {
  transition: transform 0.3s ease, color 0.3s ease;
}

.music-icon.muted {
  color: #ff6b6b !important;
  transform: rotate(-15deg) scale(0.9);
}

/* 🌫️ Fade + Scale Transition */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
