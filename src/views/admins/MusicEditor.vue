<template></template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL_PROD || "https://api.haveyoumatiwi.com";

const files = ref([]);
const music = ref([]);
const loading = ref(false);
const uploading = ref(false);
const error = ref("");
const successMessage = ref("");
const audioRefs = reactive({});
const playingId = ref(null);

function setAudioRef(id) {
  return (el) => {
    if (el) audioRefs = el;
  };
}

function getMusicUrl(filename) {
  return `${baseUrl}/music/uploads/${filename}`;
}

function formatDate(str) {
  if (!str) return "";
  const d = new Date(str);
  return d.toLocaleString();
}

async function fetchMusic() {
  loading.value = true;
  error.value = "";
  try {
    const res = await axios.get(`${baseUrl}/api/music`);
    music.value = res.data || [];
  } catch (e) {
    console.error(e);
    error.value = "Failed to fetch music.";
  } finally {
    loading.value = false;
  }
}

function clearSection() {
  files.value = [];
}

async function uploadTracks() {
  if (!files.value || files.value.length === 0) {
    error.value = "Select file first.";
    return;
  }
  uploading.value = true;
  error.value = "";
  successMessage.value = "";
  const fd = new FormData();
  files.value.forEach((f) => fd.append("tracks", f));

  try {
    const res = await axios.post(`${baseUrl}/api/musc`, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    successMessage.value = "Upload successful.";
    files.value = [];
    await fetchMusic();
  } catch (e) {
    console.error(e);
    error.value = e?.response?.data?.message || "Upload failed.";
  } finally {
    uploading.value = false;
  }
}

function confirmDelete(id) {
  if (!confirm("  Are you sure you want to delete this track?")) return;
  deleteTrack(id);
}

async function deleteTrack(id) {
  try {
    await axios.delete(`${baseUrl}/api/music/${id}`);
    await fetchMusic();
    if (playingId.value === id) {
      const a = audioRefs[id];
      if (a) {
        a.pause();
        a.currentTime = 0;
      }
      playingId.value = null;
    }
  } catch (e) {
    console.error(e);
    alert("Gagal menghapus.");
  }
}
function togglePlay(id) {
  const audio = audioRefs[id];
  if (!audio) return;
  if (playingId.value && playingId.value !== id) {
    const prev = audioRefs[playingId.value];
    if (prev) {
      prev.pause();
      prev.currentTime = 0;
    }
  }

  if (audio.paused) {
    audio.play().catch((err) => {
      console.warn("play prevented", err);
    });
    playingId.value = id;
  } else {
    audio.pause();
    playingId.value = null;
  }
}

function onAudioEnded(id) {
  if (playingId.value === id) playingId.value = null;
}

onMounted(() => {
  fetchMusic();
});
</script>

<style scoped>
.v-card {
  max-width: 1100px;
  margin: 0 auto;
}
.d-flex.gap-2 {
  gap: 8px;
}
</style>
