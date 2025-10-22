<template>
  <div class="container py-4">
    <h2 class="mb-4">Wedding Gift Editor</h2>

    <!-- Alamat Rumah -->
    <div class="mb-4">
      <label class="form-label">Alamat Rumah:</label>
      <textarea
        v-model="addressText"
        class="form-control"
        rows="4"
        placeholder="Masukkan alamat rumah"
      ></textarea>
      <button @click="updateAddress" class="btn btn-success mt-2">Simpan Alamat</button>
    </div>

    <hr />

    <!-- Form Tambah/Edit Rekening -->
    <div class="card p-3 mb-4">
      <h5>{{ editId ? "Edit Rekening" : "Tambah Rekening" }}</h5>
      <div class="mb-2">
        <label class="form-label">Nama Bank</label>
        <input v-model="form.bank_name" type="text" class="form-control" />
      </div>
      <div class="mb-2">
        <label class="form-label">Nomor Rekening</label>
        <input v-model="form.account_number" type="text" class="form-control" />
      </div>
      <div class="mb-2">
        <label class="form-label">Nama Pemilik</label>
        <input v-model="form.account_name" type="text" class="form-control" />
      </div>
      <div class="mb-2">
        <label class="form-label">Logo Bank</label>
        <input type="file" class="form-control" @change="handleFileChange" />
        <img
          v-if="previewLogo"
          :src="previewLogo"
          class="mt-2"
          style="max-height: 80px"
        />
      </div>
      <button @click="submitForm" class="btn btn-primary">
        {{ editId ? "Update" : "Tambah" }}
      </button>
      <button v-if="editId" @click="resetForm" class="btn btn-secondary ms-2">
        Batal
      </button>
    </div>

    <!-- Daftar Rekening -->
    <div class="row g-3">
      <div v-for="gift in gifts" :key="gift.id" class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <img
              v-if="gift.bank_logo"
              :src="baseUrl + gift.bank_logo"
              alt="Logo Bank"
              class="mb-2"
              style="max-height: 60px"
            />
            <h6 class="mb-1">{{ gift.bank_name }}</h6>
            <p class="mb-1">
              <strong>{{ gift.account_number }}</strong>
            </p>
            <p class="mb-2">{{ gift.account_name }}</p>
            <button @click="editGift(gift)" class="btn btn-sm btn-warning me-2">
              Edit
            </button>
            <button @click="deleteGift(gift.id)" class="btn btn-sm btn-danger">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL_PROD;

// state
const gifts = ref([]);
const addressText = ref("");
const editId = ref(null);
const file = ref(null);
const previewLogo = ref(null);

const form = reactive({
  bank_name: "",
  account_number: "",
  account_name: "",
});

// 🚀 fetch semua data gift & address
const fetchAll = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/gift`);
    gifts.value = res.data.gifts;
    addressText.value = res.data.address || "";
  } catch (err) {
    console.error("❌ Gagal memuat data:", err);
  }
};

// 📷 handle file upload
const handleFileChange = (e) => {
  file.value = e.target.files[0];
  if (file.value) {
    previewLogo.value = URL.createObjectURL(file.value);
  }
};

// 💾 simpan atau update gift
const submitForm = async () => {
  const formData = new FormData();
  formData.append("bank_name", form.bank_name);
  formData.append("account_number", form.account_number);
  formData.append("account_name", form.account_name);
  if (file.value) {
    formData.append("bank_logo", file.value);
  }

  try {
    if (editId.value) {
      await axios.put(`${baseUrl}/api/gift/${editId.value}`, formData);
    } else {
      await axios.post(`${baseUrl}/api/gift`, formData);
    }
    resetForm();
    await fetchAll();
  } catch (err) {
    console.error("❌ Gagal simpan:", err);
  }
};

// 🗑️ hapus gift
const deleteGift = async (id) => {
  if (!confirm("Yakin ingin menghapus rekening ini?")) return;
  try {
    await axios.delete(`${baseUrl}/api/gift/${id}`);
    await fetchAll();
  } catch (err) {
    console.error("❌ Gagal hapus:", err);
  }
};

// 🏠 update alamat pengiriman
const updateAddress = async () => {
  try {
    await axios.put(`${baseUrl}/api/gift/address`, {
      address_text: addressText.value,
    });
    alert("Alamat berhasil diperbarui!");
  } catch (err) {
    console.error("❌ Gagal simpan alamat:", err);
  }
};

// ✏️ edit data gift
const editGift = (gift) => {
  editId.value = gift.id;
  form.bank_name = gift.bank_name;
  form.account_number = gift.account_number;
  form.account_name = gift.account_name;
  previewLogo.value = gift.bank_logo
    ? `${baseUrl}${gift.bank_logo.startsWith("/") ? "" : "/"}${gift.bank_logo}`
    : null;
  file.value = null;
};

// 🔄 reset form
const resetForm = () => {
  editId.value = null;
  form.bank_name = "";
  form.account_number = "";
  form.account_name = "";
  previewLogo.value = null;
  file.value = null;
};

onMounted(fetchAll);
</script>


<style scoped>
.card img {
  display: block;
  max-width: 100%;
}
</style>