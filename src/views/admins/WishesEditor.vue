<template>
  <div class="container-fluid my-4 editor-wishes">
    <h2 class="mb-4">Wishes & Attendance Admin</h2>

    <!-- Tabs -->
    <ul class="nav nav-tabs mb-3">
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'rsvp' }"
          @click="activeTab = 'rsvp'"
        >
          RSVP Users
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'admin' }"
          @click="activeTab = 'admin'"
        >
          Admin Validation
        </button>
      </li>
    </ul>

    <!-- Tab 1: RSVP Users -->
    <div v-if="activeTab === 'rsvp'">
      <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
        <input
          v-model="searchRSVP"
          type="text"
          class="form-control w-50"
          placeholder="Search nama..."
        />
        <div class="d-flex gap-2 ms-auto">
          <button
            @click="fetchWishes"
            class="btn btn-outline-secondary btn-sm"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
            <span v-else>Refresh</span>
          </button>
          <select v-model.number="itemsPerPage" class="form-select w-auto">
            <option v-for="n in [5, 10, 20, 50]" :key="n" :value="n">
              {{ n }} / page
            </option>
          </select>
        </div>
      </div>

      <!-- responsive wrapper -->
      <div class="table-responsive custom-scroll">
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr>
              <th>Nama</th>
              <th>Jumlah Tamu</th>
              <th>Status RSVP</th>
              <th>Phone</th>
              <th>Ucapan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="wish in paginatedRSVP" :key="wish.id">
              <td>{{ wish.name }}</td>
              <td>{{ wish.guest_count }}</td>
              <td>
                <span
                  :class="[
                    'badge',
                    wish.attendance === 'Hadir' ? 'bg-success' : 'bg-secondary',
                  ]"
                >
                  {{ wish.attendance }}
                </span>
              </td>
              <td>{{ wish.phone }}</td>
              <td>{{ wish.message }}</td>
            </tr>
            <tr v-if="filteredRSVP.length === 0">
              <td colspan="5" class="text-center text-muted">Tidak ada data.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination RSVP -->
      <nav v-if="totalPagesRSVP > 1" class="mt-2">
        <ul class="pagination pagination-sm flex-wrap">
          <li class="page-item" :class="{ disabled: currentPageRSVP === 1 }">
            <button class="page-link" @click="changePageRSVP(currentPageRSVP - 1)">
              Prev
            </button>
          </li>
          <li
            class="page-item"
            v-for="page in totalPagesRSVP"
            :key="page"
            :class="{ active: currentPageRSVP === page }"
          >
            <button class="page-link" @click="changePageRSVP(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPageRSVP === totalPagesRSVP }">
            <button class="page-link" @click="changePageRSVP(currentPageRSVP + 1)">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Tab 2: Admin Validation -->
    <div v-if="activeTab === 'admin'">
      <div class="mb-3 d-flex gap-2 align-items-center flex-wrap">
        <input
          v-model="searchAdmin"
          type="text"
          class="form-control"
          placeholder="Search nama atau QR..."
        />
        <button @click="openScanner" class="btn btn-primary btn-sm">Open Scanner</button>
        <button
          @click="fetchWishes"
          class="btn btn-outline-secondary btn-sm"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm"></span>
          <span v-else>Refresh</span>
        </button>
        <select v-model.number="itemsPerPage" class="form-select w-auto ms-auto">
          <option v-for="n in [5, 10, 20, 50]" :key="n" :value="n">{{ n }} / page</option>
        </select>
      </div>

      <div class="alert alert-success">
        Total tamu hadir (validasi nyata): <strong>{{ totalGuestsAdmin }}</strong>
      </div>

      <!-- responsive wrapper -->
      <div class="table-responsive custom-scroll">
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr>
              <th>Nama</th>
              <th>Jumlah Tamu</th>
              <th>Status Kehadiran</th>
              <th>Ucapan</th>
              <th>QR Code</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="wish in paginatedAdmin" :key="wish.id">
              <td>{{ wish.name }}</td>
              <td>{{ wish.guest_count }}</td>
              <td>
                <span :class="['badge', wish.is_used ? 'bg-success' : 'bg-secondary']">
                  {{ wish.is_used ? "Hadir" : "Belum" }}
                </span>
              </td>
              <td>{{ wish.message }}</td>
              <td>{{ wish.qr_code_value }}</td>
              <td>
                <button
                  v-if="!wish.is_used"
                  class="btn btn-sm btn-outline-success"
                  @click="markAttendance(wish.id)"
                >
                  Tandai Hadir
                </button>
              </td>
            </tr>
            <tr v-if="filteredAdmin.length === 0">
              <td colspan="7" class="text-center text-muted">Tidak ada data.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Admin -->
      <nav v-if="totalPagesAdmin > 1" class="mt-2">
        <ul class="pagination pagination-sm flex-wrap">
          <li class="page-item" :class="{ disabled: currentPageAdmin === 1 }">
            <button class="page-link" @click="changePageAdmin(currentPageAdmin - 1)">
              Prev
            </button>
          </li>
          <li
            class="page-item"
            v-for="page in totalPagesAdmin"
            :key="page"
            :class="{ active: currentPageAdmin === page }"
          >
            <button class="page-link" @click="changePageAdmin(page)">{{ page }}</button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPageAdmin === totalPagesAdmin }"
          >
            <button class="page-link" @click="changePageAdmin(currentPageAdmin + 1)">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Fullscreen Scanner Modal -->
    <div v-if="scannerOpen" class="scanner-modal">
      <video ref="video" autoplay playsinline></video>
      <button class="btn-close btn-close-white" @click="closeScanner"></button>
      <p v-if="scanError" class="text-danger">{{ scanError }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
// import { BrowserMultiFormatReader } from "@zxing/library";
import { BrowserMultiFormatReader } from '@zxing/browser';


const baseUrl = import.meta.env.VITE_API_BASE_URL;

// 🔹 State
const wishes = ref([]);
const activeTab = ref("rsvp");
const scannerOpen = ref(false);
const scanError = ref(null);
const searchRSVP = ref("");
const searchAdmin = ref("");
const scanner = ref(null);
const video = ref(null);
const loading = ref(false);

// Pagination
const currentPageRSVP = ref(1);
const currentPageAdmin = ref(1);
const itemsPerPage = 5;

// 🔹 Computed Properties

// RSVP
const filteredRSVP = computed(() =>
  wishes.value.filter((w) =>
    w.name.toLowerCase().includes(searchRSVP.value.toLowerCase())
  )
);

const paginatedRSVP = computed(() => {
  const start = (currentPageRSVP.value - 1) * itemsPerPage;
  return filteredRSVP.value.slice(start, start + itemsPerPage);
});

const totalPagesRSVP = computed(() =>
  Math.ceil(filteredRSVP.value.length / itemsPerPage)
);

// Admin
const filteredAdmin = computed(() =>
  wishes.value.filter(
    (w) =>
      w.name.toLowerCase().includes(searchAdmin.value.toLowerCase()) ||
      w.qr_code_value.toLowerCase().includes(searchAdmin.value.toLowerCase())
  )
);

const paginatedAdmin = computed(() => {
  const start = (currentPageAdmin.value - 1) * itemsPerPage;
  return filteredAdmin.value.slice(start, start + itemsPerPage);
});

const totalPagesAdmin = computed(() =>
  Math.ceil(filteredAdmin.value.length / itemsPerPage)
);

const totalGuestsAdmin = computed(() =>
  wishes.value
    .filter((w) => w.is_used)
    .reduce((acc, w) => acc + (parseInt(w.guest_count) || 0), 0)
);

// 🔹 Methods

const changePageRSVP = (page) => {
  if (page >= 1 && page <= totalPagesRSVP.value) {
    currentPageRSVP.value = page;
  }
};

const changePageAdmin = (page) => {
  if (page >= 1 && page <= totalPagesAdmin.value) {
    currentPageAdmin.value = page;
  }
};

const fetchWishes = async () => {
  try {
    loading.value = true;
    const res = await axios.get(`${baseUrl}/api/wishes`);
    wishes.value = res.data;
  } catch (err) {
    console.error("❌ Gagal mengambil wishes:", err);
  } finally {
    loading.value = false;
  }
};

const markAttendance = async (id) => {
  try {
    const res = await axios.post(`${baseUrl}/api/wishes/${id}/mark`);
    alert(res.data.message);

    const index = wishes.value.findIndex((w) => w.id === id);
    if (index !== -1) {
      wishes.value[index] = {
        ...wishes.value[index],
        attendance: "Hadir",
        is_used: true,
      };
    }
  } catch (err) {
    console.error("❌ Gagal menandai hadir:", err);
    alert("Gagal menandai hadir");
  }
};

const openScanner = async () => {
  scannerOpen.value = true;
  scanError.value = null;

  scanner.value = new BrowserMultiFormatReader();
  try {
    const devices = await scanner.value.listVideoInputDevices();
    if (!devices.length) {
      scanError.value = "Tidak ada kamera tersedia.";
      return;
    }

    const deviceId = devices[0].deviceId;

    await scanner.value.decodeFromVideoDevice(deviceId, video.value, async (result, err) => {
      if (result) {
        try {
          const res = await axios.post(`${baseUrl}/api/wishes/validate`, {
            qr_code: result.getText(),
          });
          alert(res.data.message);

          const index = wishes.value.findIndex(
            (w) => w.qr_code_value === result.getText()
          );
          if (index !== -1) {
            wishes.value[index] = {
              ...wishes.value[index],
              attendance: "Hadir",
              is_used: true,
            };
          }

          closeScanner();
        } catch (e) {
          scanError.value = "Gagal validasi QR.";
          console.error(e);
        }
      }
      if (err && err.name !== "NotFoundException") console.error(err);
    });
  } catch (err) {
    console.error(err);
    scanError.value = "Gagal mengakses kamera.";
  }
};

const closeScanner = () => {
  if (scanner.value) scanner.value.reset();
  scannerOpen.value = false;
};

// 🔹 Lifecycle
onMounted(fetchWishes);
</script>


<style>
.table-responsive {
  -webkit-overflow-scrolling: touch;
}

.custom-scroll {
  max-width: 100vw; /* biar table bisa full lebar viewport */
  overflow-x: auto;
}

/* scanner modal */
.scanner-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}
.scanner-modal video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.scanner-modal .btn-close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1060;
}
</style>