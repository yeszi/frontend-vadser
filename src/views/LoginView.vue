<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="brand-header">
        <div class="icon-bg">🔐</div>
        <h2>Admin Portal</h2>
        <p>Verifikasi Ijazah Blockchain</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>Username</label>
          <input type="text" v-model="username" placeholder="admin" required />
        </div>
        
        <div class="input-group">
          <label>Password</label>
          <input type="password" v-model="password" placeholder="••••••••" required />
        </div>

        <button type="submit" class="btn-login" :disabled="loading">
          <span v-if="!loading">Masuk Dashboard</span>
          <span v-else class="loader"></span>
        </button>
      </form>
      
      <router-link to="/" class="back-link">
        <span class="arrow">←</span> Kembali ke Beranda
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  try {
    const response = await axios.post('https://verizh-chain.vercel.app/login', {
      username: username.value,
      password: password.value
    });

    if (response.data.success) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      router.push('/admin');
    }
  } catch (error) {
    alert("Username atau Password salah!");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Modern Reset */
* { font-family: 'Inter', sans-serif; box-sizing: border-box; }

.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  padding: 20px;
}

.login-card {
  background: rgba(255, 255, 255, 1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  text-align: center;
  animation: slideUp 0.5s ease-out;
}

.brand-header h2 {
  font-family: 'Poppins', sans-serif;
  color: #1e293b;
  margin: 10px 0 5px;
  font-weight: 700;
}

.brand-header p { color: #64748b; font-size: 0.9rem; margin-bottom: 30px; }

.icon-bg {
  font-size: 2.5rem;
  background: #f1f5f9;
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  margin: 0 auto;
}

.input-group { text-align: left; margin-bottom: 20px; }
.input-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #334155; font-size: 0.9rem; }

input { 
  width: 100%; 
  padding: 14px; 
  border: 2px solid #e2e8f0; 
  border-radius: 10px; 
  font-size: 1rem;
  transition: all 0.3s;
  background: #f8fafc;
}

input:focus { 
  border-color: #3b82f6; 
  background: #fff;
  outline: none; 
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.btn-login {
  width: 100%;
  padding: 14px;
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: transform 0.2s;
}

.btn-login:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2); }
.btn-login:disabled { opacity: 0.7; cursor: not-allowed; }

.back-link {
  display: inline-block;
  margin-top: 25px;
  color: #64748b;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s;
}
.back-link:hover { color: #2563eb; }

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>