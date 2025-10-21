<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h2 class="title">Admin Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="username"
            type="text"
            id="username"
            placeholder="Enter username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" class="login-button">Login</button>

        <transition name="fade">
          <p v-if="error" class="error-msg">{{ error }}</p>
        </transition>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// === state ===
const username = ref('')
const password = ref('')
const error = ref(null)

const router = useRouter()

// === methods ===
async function login() {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
      username: username.value,
      password: password.value,
    })

    const token = res.data.token
    localStorage.setItem('token', token)
    router.push('/editor')
  } catch (err) {
    error.value = 'Username atau password salah!'
  }
}
</script>


<style>
.backgorund-color{
  background-color: #007bff;
}

.login-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #f4f4f9; */
   background: linear-gradient(135deg, #007bff 0%, #66a6ff 100%);
}

.login-card {
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
}

.title {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}

.form-group {
  margin-bottom: 18px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #444;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
}

.login-button {
  width: 100%;
  background: #007bff;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-button:hover {
  background: #0056b3;
}

.error-msg {
  color: #e63946;
  text-align: center;
  margin-top: 15px;
  font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>