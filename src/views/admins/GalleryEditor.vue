<template>
  <div class="container my-5">
    <h2 class="mb-4">Gallery Editor</h2>

    <!-- Upload Form -->
    <form @submit.prevent="uploadImages" class="mb-4">
      <div class="mb-3">
        <label for="galleryUpload" class="form-label">Pilih Foto</label>
        <input
          id="galleryUpload"
          type="file"
          class="form-control"
          multiple
          accept="image/*"
          @change="handleFileChange"
        />
      </div>

      <div class="mb-3 d-flex flex-wrap gap-3">
        <div v-for="(preview, index) in previews" :key="index" class="preview-box">
          <img :src="preview" class="preview-img" />
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Upload</button>
    </form>

    <!-- Gallery List -->
    <div class="row g-4">
      <div
        v-for="(image, index) in gallery"
        :key="index"
        class="col-6 col-sm-4 col-md-3 col-lg-2"
      >
        <div class="gallery-card position-relative shadow-sm rounded overflow-hidden">
          <img
            :src="`${baseUrl}/api/gallery/uploads/${image.filename}`"
            class="w-100 h-100 object-fit-cover"
          />
          <button @click="deleteImage(image.id)" class="btn btn-sm btn-danger delete-btn">
            &times;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// ==== STATE ====
const selectedFiles = ref([]);
const previews = ref([]);
const gallery = ref([]);
const baseUrl = import.meta.env.VITE_API_BASE_URL_PROD;

// ==== METHODS ====
async function fetchGallery() {
  try {
    const res = await axios.get(`${baseUrl}/api/gallery`);
    gallery.value = res.data;
  } catch (err) {
    console.error("❌ Gagal memuat gallery:", err);
  }
}

function handleFileChange(event) {
  selectedFiles.value = Array.from(event.target.files);
  previews.value = selectedFiles.value.map((file) => URL.createObjectURL(file));
}

async function uploadImages() {
  if (!selectedFiles.value.length) return;
  const formData = new FormData();
  selectedFiles.value.forEach((file) => formData.append("images", file));

  try {
    await axios.post(`${baseUrl}/api/gallery`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    selectedFiles.value = [];
    previews.value = [];
    await fetchGallery();
  } catch (err) {
    console.error("❌ Gagal upload:", err);
  }
}

async function deleteImage(id) {
  if (!confirm("Yakin ingin menghapus gambar ini?")) return;

  try {
    await axios.delete(`${baseUrl}/api/gallery/${id}`);
    await fetchGallery();
  } catch (err) {
    console.error("❌ Gagal menghapus gambar:", err);
  }
}

// ==== LIFECYCLE ====
onMounted(fetchGallery);
</script>

<style>
/* Preview Upload */
.preview-box {
  width: 100px;
  height: 100px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Gallery Card Style */
.gallery-card {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #f8f9fa;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.gallery-card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* Tombol Hapus */
.delete-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  background-color: rgba(255, 0, 0, 0.7);
  border: none;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0.2rem 0.5rem;
  z-index: 2;
  border-radius: 50%;
  transition: background-color 0.3s;
}
.delete-btn:hover {
  background-color: rgba(255, 0, 0, 1);
}

/* Fit Image */
.object-fit-cover {
  object-fit: cover;
}
</style>
