<template>
  <div class="editor-container">
    <h2>Edit Hero Section</h2>

    <form @submit.prevent="saveHero">
      <div class="form-group">
        <label>Judul:</label>
        <input v-model="hero.title" type="text" class="form-control" />
      </div>

      <div class="form-group">
        <label>Subjudul:</label>
        <input v-model="hero.subtitle" type="text" class="form-control" />
      </div>

      <div class="form-group">
        <label>Upload Gambar (boleh lebih dari 1):</label>
        <input type="file" multiple accept="image/*" @change="handleImageUpload" />
      </div>

      <div class="preview-gallery">
        <div
          v-for="(image, index) in hero.background_image"
          :key="index"
          class="preview-item"
        >
          <img :src="`${backendUrl}/uploads/hero/${image}`" alt="preview" />
          <button type="button" @click="deleteImage(image)">🗑️</button>
        </div>
      </div>

      <button type="submit" class="btn btn-success mt-3">💾 Simpan Perubahan</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// ==== state ====
const hero = ref({
  title: '',
  subtitle: '',
  background_image: [],
})

const baseUrl = import.meta.env.VITE_API_BASE_URL_PROD

// ==== methods ====
async function fetchHero() {
  try {
    const res = await axios.get(`${baseUrl}/api/hero`)
    hero.value = res.data
  } catch (err) {
    console.error('❌ Gagal mengambil data hero:', err)
  }
}

async function saveHero() {
  try {
    await axios.put(`${baseUrl}/api/hero`, {
      title: hero.value.title,
      subtitle: hero.value.subtitle,
      background_image: hero.value.background_image,
    })
    alert('✅ Data berhasil disimpan!')
  } catch (err) {
    console.error('❌ Gagal menyimpan data hero:', err)
    alert('Gagal menyimpan data.')
  }
}

async function handleImageUpload(event) {
  const files = event.target.files
  if (!files.length) return

  const formData = new FormData()
  for (let file of files) {
    formData.append('images', file)
  }

  try {
    const res = await axios.post(`${baseUrl}/api/hero/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    if (!Array.isArray(hero.value.background_image)) {
      hero.value.background_image = []
    }

    // Tambahkan gambar baru ke list
    hero.value.background_image.push(...res.data.filenames)
  } catch (err) {
    console.error('❌ Upload gagal:', err)
    if (err.response) {
      console.error('response error: ', err.response.data)
      alert(`Upload gagal: ${err.response.data.message || 'Terjadi kesalahan'}`)
    } else {
      alert('Upload gagal. Periksa koneksi.')
    }
  }
}

async function deleteImage(filename) {
  if (!confirm('Yakin hapus gambar ini?')) return

  try {
    await axios.delete(`${baseUrl}/api/hero/image/${filename}`)
    hero.value.background_image = hero.value.background_image.filter(img => img !== filename)
  } catch (err) {
    console.error('❌ Gagal hapus gambar:', err)
    alert('Gagal menghapus gambar.')
  }
}

// ==== lifecycle ====
onMounted(fetchHero)
</script>


<style scoped>
.editor-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
}

.form-group {
  margin-bottom: 1.2rem;
}

.preview-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 15px;
}

.preview-item {
  position: relative;
  width: 120px;
  height: 80px;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-item button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 24px;
  height: 24px;
}
</style>