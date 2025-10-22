<template>
  <div class="container my-5">
    <h2>Edit Mempelai</h2>

    <div class="row">
      <!-- Mempelai Pria -->
      <div class="col-md-6">
        <h4>Mempelai Pria</h4>
        <div class="mb-2">
          <label>Nama:</label>
          <input v-model="groom.name" class="form-control" />
        </div>
        <div class="mb-2">
          <label>Orang Tua:</label>
          <input v-model="groom.parents" class="form-control" />
        </div>
        <div class="mb-2">
          <label>Instagram:</label>
          <input v-model="groom.instagram" class="form-control" />
        </div>
        <div class="mb-2">
          <label>Foto:</label>
          <input
            type="file"
            @change="onFileChange($event, 'groom')"
            class="form-control"
          />
          <div v-if="groom.preview" class="mt-2">
            <img :src="groom.preview" class="img-thumbnail" style="max-height: 200px" />
          </div>
        </div>
      </div>

      <!-- Mempelai Wanita -->
      <div class="col-md-6">
        <h4>Mempelai Wanita</h4>
        <div class="mb-2">
          <label>Nama:</label>
          <input v-model="bride.name" class="form-control" />
        </div>
        <div class="mb-2">
          <label>Orang Tua:</label>
          <input v-model="bride.parents" class="form-control" />
        </div>
        <div class="mb-2">
          <label>Instagram:</label>
          <input v-model="bride.instagram" class="form-control" />
        </div>
        <div class="mb-2">
          <label>Foto:</label>
          <input
            type="file"
            @change="onFileChange($event, 'bride')"
            class="form-control"
          />
          <div v-if="bride.preview" class="mt-2">
            <img :src="bride.preview" class="img-thumbnail" style="max-height: 200px" />
          </div>
        </div>
      </div>
    </div>

    <!-- Custom slug -->
    <div class="mb-3 mt-4">
      <label>Slug Undangan (contoh: rai-hanni):</label>
      <input v-model="slug" class="form-control" placeholder="rai-hanni" />
      <small class="text-muted"
        >Slug ini akan digunakan di URL undangan /:slug/:guestName</small
      >
    </div>

    <button class="btn btn-primary mt-4" @click="save">Simpan</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// ==== state ====
const groom = ref({
  name: '',
  parents: '',
  instagram: '',
  image: null,
  preview: '',
})

const bride = ref({
  name: '',
  parents: '',
  instagram: '',
  image: null,
  preview: '',
})

const slug = ref('')

// ==== methods ====
function onFileChange(event, type) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    if (type === 'groom') groom.value.preview = reader.result
    else if (type === 'bride') bride.value.preview = reader.result
  }
  reader.readAsDataURL(file)

  if (type === 'groom') groom.value.image = file
  else if (type === 'bride') bride.value.image = file
}

async function fetchCouple() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL_PROD}/api/couple`)
    const data = res.data

    groom.value.name = data.groom_name || ''
    groom.value.parents = data.groom_parents || ''
    groom.value.instagram = data.groom_instagram || ''
    if (data.groom_photo) {
      groom.value.preview = `${import.meta.env.VITE_API_BASE_URL_PROD}/uploads/couple/${data.groom_photo}`
    }

    bride.value.name = data.bride_name || ''
    bride.value.parents = data.bride_parents || ''
    bride.value.instagram = data.bride_instagram || ''
    if (data.bride_photo) {
      bride.value.preview = `${import.meta.env.VITE_API_BASE_URL_PROD}/uploads/couple/${data.bride_photo}`
    }

    slug.value = data.slug || ''
  } catch (err) {
    console.error('❌ Gagal mengambil data couple:', err)
  }
}

async function save() {
  const formData = new FormData()
  formData.append('groom_name', groom.value.name)
  formData.append('groom_parents', groom.value.parents)
  formData.append('groom_instagram', groom.value.instagram)
  if (groom.value.image) formData.append('groom_photo', groom.value.image)

  formData.append('bride_name', bride.value.name)
  formData.append('bride_parents', bride.value.parents)
  formData.append('bride_instagram', bride.value.instagram)
  if (bride.value.image) formData.append('bride_photo', bride.value.image)

  formData.append('slug', slug.value)

  try {
    await axios.put(`${import.meta.env.VITE_API_BASE_URL_PROD}/api/couple`, formData)
    alert('✅ Data berhasil disimpan!')
  } catch (err) {
    console.error('❌ Gagal menyimpan data:', err)
    alert('❌ Gagal menyimpan data.')
  }
}

// ==== lifecycle ====
onMounted(fetchCouple)
</script>


<style>
img.img-thumbnail {
  border-radius: 10px;
}
</style>