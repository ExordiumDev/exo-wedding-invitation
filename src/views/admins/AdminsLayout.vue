<template>
  <div class="admin-layout">
    <!-- Overlay -->
    <div v-if="isSidebarOpen" class="overlay" @click="toggleSidebar"></div>

    <!-- Sidebar (Drawer) -->
    <aside class="sidebar" :class="{ open: isSidebarOpen }">
      <h3>🎛️ Editor Menu</h3>
      <ul>
        <li>
          <router-link to="/editor/hero" active-class="active">Hero Editor</router-link>
        </li>
        <li>
          <router-link to="/editor/couple" active-class="active"
            >Couple Editor</router-link
          >
        </li>
        <li>
          <router-link to="/editor/gallery" active-class="active"
            >Gallery Editor</router-link
          >
        </li>
        <li>
          <router-link to="/editor/wishes" active-class="active"
            >Wishes Editor</router-link
          >
        </li>
        <li>
          <router-link to="/editor/music" active-class="active">Music Editor</router-link>
        </li>

        <li>
          <router-link to="/editor/gift" active-class="active">Gift Editor</router-link>
        </li>
        <li>
          <router-link to="/editor/schedule" active-class="active"
            >Schedule Editor</router-link
          >
        </li>
      </ul>
    </aside>

    <!-- Main Content Area -->
    <div class="main-area">
      <!-- Navbar -->
      <nav class="navbar">
        <button class="menu-btn" @click="toggleSidebar">☰</button>
        <div class="welcome-text">👋 Welcome, Admin</div>
        <button class="logout-btn" @click="logout">Logout</button>
      </nav>

      <!-- Editor Content -->
      <main class="editor-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function logout() {
  localStorage.removeItem("token");
  router.push("/admin");
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
}

/* Overlay untuk HP */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 900;
}

/* Sidebar */
.sidebar {
  width: 220px;
  background-color: #212529;
  color: white;
  padding: 25px 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}
.sidebar h3 {
  font-size: 20px;
  margin-bottom: 25px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  margin-bottom: 15px;
}
.sidebar a {
  color: #adb5bd;
  text-decoration: none;
  font-size: 16px;
  display: block;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background 0.3s, color 0.3s;
}
.sidebar a:hover,
.sidebar a.active {
  background-color: #ffc107;
  color: #212529;
}

/* Main Area */
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f1f3f5;
  min-width: 0; /* biar table ga kepotong */
}

/* Navbar */
.navbar {
  background-color: #fff;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  z-index: 1001;
  position: relative;
}
.menu-btn {
  display: none;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
}
.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.logout-btn:hover {
  background-color: #c82333;
}

/* Editor Content */
.editor-content {
  padding: 20px;
  flex: 1;
  overflow-x: auto; /* biar table bisa scroll full */
}

/* Responsive */
@media (max-width: 992px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    transform: translateX(-100%);
    z-index: 1000;
  }
  .sidebar.open {
    transform: translateX(0);
  }
  .menu-btn {
    display: block;
  }
  .admin-layout {
    flex-direction: column;
  }
  .main-area {
    flex: none;
    min-width: 100%;
  }
}
</style>
