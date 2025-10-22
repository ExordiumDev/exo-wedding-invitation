<template>
  <div class="container py-4">
    <h2 class="mb-4">Edit Jadwal Acara</h2>

    <form @submit.prevent="submitSchedule" class="row g-3">
      <!-- Akad -->
      <div class="col-md-6">
        <label class="form-label">Tanggal Akad</label>
        <input v-model="form.akad_date" type="date" class="form-control" required />
      </div>
      <div class="col-md-6">
        <label class="form-label">Jam Mulai Akad</label>
        <input v-model="form.akad_time_start" type="time" class="form-control" required />
      </div>
      <div class="col-md-6">
        <label class="form-label">Jam Akhir Akad</label>
        <input v-model="form.akad_time_end" type="time" class="form-control" required />
      </div>
      <div class="col-12">
        <label class="form-label">Deskripsi Akad</label>
        <input v-model="form.akad_desc" type="text" class="form-control" />
      </div>

      <!-- Resepsi -->
      <div class="col-md-6">
        <label class="form-label">Tanggal Resepsi</label>
        <input v-model="form.resepsi_date" type="date" class="form-control" required />
      </div>
      <div class="col-md-6">
        <label class="form-label">Jam Awal Resepsi</label>
        <input
          v-model="form.resepsi_time_start"
          type="time"
          class="form-control"
          required
        />
      </div>
      <div class="col-md-6">
        <label class="form-label">Jam Akhir Resepsi</label>
        <input
          v-model="form.resepsi_time_end"
          type="time"
          class="form-control"
          required
        />
      </div>
      <div class="col-12">
        <label class="form-label">Deskripsi Resepsi</label>
        <input v-model="form.resepsi_desc" type="text" class="form-control" />
      </div>

      <!-- Lokasi -->
      <div class="col-12">
        <label class="form-label">Lokasi</label>
        <textarea v-model="form.location" class="form-control" rows="2"></textarea>
      </div>
      <div class="col-12">
        <label class="form-label">Google Maps Link</label>
        <input v-model="form.map_link" type="text" class="form-control" />
      </div>

      <!-- Countdown -->
      <div class="col-12">
        <label class="form-label">Target Countdown (YYYY-MM-DDTHH:MM:SS)</label>
        <input
          v-model="form.countdown_target"
          type="datetime-local"
          class="form-control"
        />
      </div>

      <!-- Tombol -->
      <div class="col-12 d-flex gap-2 mt-3">
        <button type="submit" class="btn btn-success">Simpan</button>
        <button
          type="button"
          class="btn btn-danger"
          @click="deleteSchedule"
          v-if="isExisting"
        >
          Hapus
        </button>
      </div>
    </form>

    <div v-if="message" class="alert alert-info mt-3">{{ message }}</div>

    <!-- PREVIEW -->
    <div v-if="isExisting" class="mt-5">
      <h4 class="mb-3">Preview Jadwal</h4>

      <!-- Akad -->
      <div class="mb-3">
        <h5>Akad</h5>
        <p><strong>Tanggal:</strong> {{ form.akad_date }}</p>
        <p>
          <strong>Waktu:</strong>
          {{ form.akad_time_start }} - {{ form.akad_time_end }}
        </p>
        <p><strong>Deskripsi:</strong> {{ form.akad_desc }}</p>
      </div>

      <!-- Resepsi -->
      <div class="mb-3">
        <h5>Resepsi</h5>
        <p><strong>Tanggal:</strong> {{ form.resepsi_date }}</p>
        <p>
          <strong>Waktu:</strong>
          {{ form.resepsi_time_start }} - {{ form.resepsi_time_end }}
        </p>
        <p><strong>Deskripsi:</strong> {{ form.resepsi_desc }}</p>
      </div>

      <!-- Lokasi -->
      <div class="mb-3">
        <h5>Lokasi</h5>
        <p>{{ form.location }}</p>
        <a :href="form.map_link" target="_blank">📍 Google Maps</a>
      </div>

      <!-- Countdown -->
      <div class="mb-3">
        <h5>Countdown Target</h5>
        <p>{{ form.countdown_target }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

// === state ===
const form = reactive({
  akad_date: '',
  akad_time_start: '',
  akad_time_end: '',
  akad_desc: '',
  resepsi_date: '',
  resepsi_time_start: '',
  resepsi_time_end: '',
  resepsi_desc: '',
  location: '',
  map_link: '',
  countdown_target: '',
})

const isExisting = ref(false)
const message = ref('')
const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"

// === methods ===
async function fetchSchedule() {
  try {
    const res = await axios.get(`${baseUrl}/api/schedule/`)
    Object.assign(form, res.data)
    isExisting.value = true
  } catch (err) {
    message.value = 'Belum ada jadwal, silakan isi dan simpan.'
  }
}

async function submitSchedule() {
  try {
    const res = await axios.post(`${baseUrl}/api/schedule/`, form)
    message.value = res.data.message
    isExisting.value = true
  } catch (err) {
    console.error(err)
    message.value = 'Gagal menyimpan data.'
  }
}

async function deleteSchedule() {
  if (!confirm('Yakin ingin menghapus jadwal ini?')) return

  try {
    const res = await axios.delete(`${baseUrl}/api/schedule/`)
    message.value = res.data.message
    isExisting.value = false
    Object.keys(form).forEach((key) => (form[key] = ''))
  } catch (err) {
    message.value = 'Gagal menghapus data.'
  }
}

// === lifecycle ===
onMounted(fetchSchedule)
</script>


<style scoped>
.container {
  max-width: 700px;
}
</style>