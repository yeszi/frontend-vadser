<template>
  <div class="dashboard-layout">
    <!-- Mobile Header -->
    <header class="mobile-header" v-if="isMobile">
      <div class="mobile-header-content">
        <div class="mobile-brand">
          <span class="brand-icon">⛓️</span>
          <h2>Verizh Admin</h2>
        </div>
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">
          ☰
        </button>
      </div>
    </header>

    <!-- Sidebar -->
    <aside :class="['sidebar', { 'mobile-open': isMobileMenuOpen }]">
      <div class="sidebar-header">
        <div class="brand">
          <span class="brand-icon">⛓️</span>
          <h3>Verizh Admin</h3>
        </div>
        <div class="admin-info">
          <div class="admin-avatar">A</div>
          <div class="admin-details">
            <span class="admin-name">Administrator</span>
            <span class="admin-status online">● Online</span>
          </div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <button 
          :class="['nav-btn', { active: currentView === 'ledger' }]"
          @click="setView('ledger')">
          <span class="nav-icon">📊</span>
          <span class="nav-text">Data Ledger</span>
          <span class="nav-badge" v-if="chainData.length">{{ chainData.length }}</span>
        </button>

        <button 
          :class="['nav-btn', { active: currentView === 'register' }]"
          @click="setView('register')">
          <span class="nav-icon">📝</span>
          <span class="nav-text">Registrasi</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <button class="logout-btn" @click="logout">
          <span class="logout-icon">🚪</span>
          <span class="logout-text">Keluar</span>
        </button>
      </div>
    </aside>

    <!-- Mobile Overlay -->
    <div v-if="isMobile && isMobileMenuOpen" class="mobile-overlay" @click="toggleMobileMenu"></div>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Desktop Header -->
      <header class="desktop-header" v-if="!isMobile">
        <div class="header-left">
          <h1>{{ currentView === 'ledger' ? 'Database Blockchain' : 'Registrasi Ijazah' }}</h1>
          <p class="subtitle">{{ currentView === 'ledger' ? 'Mode Baca' : 'Mode Tulis' }}</p>
        </div>
        <div class="header-right">
          <button class="refresh-btn" @click="fetchChain" title="Refresh">
            🔄
          </button>
          <div class="stats">
            <span class="stat-item">{{ chainData.length }} Data</span>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="content">
        <!-- Alert -->
        <div class="alert">
          <div class="alert-icon">⚠️</div>
          <div class="alert-content">
            <strong>Mode Permanen Aktif</strong>
            <p>Data tersimpan di Blockchain tidak dapat diedit atau dihapus.</p>
          </div>
        </div>

        <!-- Form Section -->
        <section v-if="currentView === 'register'" class="form-section">
          <div class="form-card">
            <h3 class="form-title">Formulir Akademik</h3>
            
            <div class="form-grid">
              <div class="form-group">
                <label>Nama Lengkap</label>
                <input type="text" v-model="nama" placeholder="Nama Mahasiswa" class="form-input">
              </div>
              
              <div class="form-group">
                <label>NIM</label>
                <input type="text" v-model="nim" placeholder="Nomor Induk" class="form-input">
              </div>
              
              <div class="form-group">
                <label>Program Studi</label>
                <input type="text" v-model="prodi" placeholder="Jurusan" class="form-input">
              </div>
              
              <div class="form-group">
                <label>IPK</label>
                <input type="number" v-model="ipk" step="0.01" placeholder="0.00" class="form-input">
              </div>
            </div>

            <div class="file-upload">
              <label class="file-label">Upload Ijazah (PDF)</label>
              <div class="file-drop-area" @click="triggerFileInput" @dragover.prevent @drop="handleFileDrop">
                <input type="file" ref="fileInput" @change="handleFileUpload" accept=".pdf" class="file-input">
                <div class="drop-content">
                  <span class="drop-icon">{{ fileIjazah ? '✅' : '📄' }}</span>
                  <p class="drop-text">{{ fileIjazah ? fileIjazah.name : 'Klik atau drop file PDF' }}</p>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button class="btn secondary" @click="clearForm">
                Reset
              </button>
              <button class="btn primary" @click="uploadIjazah" :disabled="loading">
                <span v-if="loading" class="loader"></span>
                <span v-else>🔒 Simpan ke Blockchain</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Table Section -->
        <section v-if="currentView === 'ledger'" class="table-section">
          <div class="table-card">
            <div class="table-header">
              <h3>Riwayat Blok</h3>
              <div class="table-controls">
                <div class="search-box">
                  <input type="text" v-model="searchQuery" placeholder="Cari..." class="search-input">
                </div>
              </div>
            </div>

            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Waktu</th>
                    <th>Mahasiswa</th>
                    <th>Program Studi</th>
                    <th>IPK</th>
                    <th>Hash</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(block, index) in filteredChain" :key="index">
                    <td>
                      <div class="timestamp">
                        <div class="date">{{ formatDate(block.timestamp) }}</div>
                        <div class="time">{{ formatTime(block.timestamp) }}</div>
                      </div>
                    </td>
                    <td>
                      <div class="student-info">
                        <div class="student-name">{{ block.student_data.nama }}</div>
                        <div class="student-nim">{{ block.student_data.nim }}</div>
                      </div>
                    </td>
                    <td>{{ block.student_data.prodi }}</td>
                    <td>
                      <span class="ipk-badge">IPK {{ block.student_data.ipk }}</span>
                    </td>
                    <td>
                      <code class="hash" :title="block.pdf_hash" @click="copyHash(block.pdf_hash)">
                        {{ shortenHash(block.pdf_hash) }}
                      </code>
                    </td>
                  </tr>
                  <tr v-if="filteredChain.length === 0">
                    <td colspan="5" class="empty-state">
                      <div class="empty-content">
                        📭 Tidak ada data
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="table-footer">
              <div class="table-info">
                Menampilkan {{ filteredChain.length }} dari {{ chainData.length }} data
              </div>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="stats-grid" v-if="chainData.length > 0">
            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <div class="stat-content">
                <h4>Total Data</h4>
                <p class="stat-value">{{ chainData.length }}</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">⭐</div>
              <div class="stat-content">
                <h4>Rata-rata IPK</h4>
                <p class="stat-value">{{ averageIPK }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// State
const currentView = ref('ledger')
const isMobile = ref(false)
const isMobileMenuOpen = ref(false)
const searchQuery = ref('')

// Form state
const nama = ref('')
const nim = ref('')
const prodi = ref('')
const ipk = ref('')
const fileIjazah = ref(null)
const loading = ref(false)

// Data state
const chainData = ref([])

// API
const API_URL = 'https://verizh-chain.vercel.app'

// Computed
const filteredChain = computed(() => {
  if (!searchQuery.value) return chainData.value
  
  const query = searchQuery.value.toLowerCase()
  return chainData.value.filter(block => 
    block.student_data.nama.toLowerCase().includes(query) ||
    block.student_data.nim.toLowerCase().includes(query) ||
    block.student_data.prodi.toLowerCase().includes(query)
  )
})

const averageIPK = computed(() => {
  if (chainData.value.length === 0) return '0.00'
  const total = chainData.value.reduce((sum, block) => 
    sum + parseFloat(block.student_data.ipk), 0)
  return (total / chainData.value.length).toFixed(2)
})

// Methods
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const setView = (view) => {
  currentView.value = view
  if (isMobile.value) {
    isMobileMenuOpen.value = false
  }
}

const logout = () => {
  localStorage.removeItem('isAdminAuthenticated')
  router.push('/login')
}

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf') {
    fileIjazah.value = file
  }
}

const handleFileDrop = (event) => {
  event.preventDefault()
  const file = event.dataTransfer.files[0]
  if (file && file.type === 'application/pdf') {
    fileIjazah.value = file
  }
}

const clearForm = () => {
  nama.value = ''
  nim.value = ''
  prodi.value = ''
  ipk.value = ''
  fileIjazah.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const uploadIjazah = async () => {
  if (!nama.value || !nim.value || !prodi.value || !ipk.value || !fileIjazah.value) {
    alert('Harap isi semua field')
    return
  }

  if (!confirm('Data akan disimpan permanen ke Blockchain. Lanjutkan?')) {
    return
  }

  loading.value = true
  const formData = new FormData()
  formData.append('file', fileIjazah.value)
  formData.append('nama', nama.value)
  formData.append('nim', nim.value)
  formData.append('prodi', prodi.value)
  formData.append('ipk', ipk.value)

  try {
    await axios.post(`${API_URL}/upload_ijazah`, formData)
    alert('Data berhasil disimpan!')
    clearForm()
    await fetchChain()
    currentView.value = 'ledger'
  } catch (error) {
    alert('Gagal menyimpan data: ' + (error.response?.data?.message || 'Error'))
  } finally {
    loading.value = false
  }
}

const fetchChain = async () => {
  try {
    const response = await axios.get(`${API_URL}/chain`)
    chainData.value = response.data.chain
  } catch (error) {
    console.error('Gagal mengambil data:', error)
  }
}

const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('id-ID')
}

const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const shortenHash = (hash) => {
  return hash.substring(0, 8) + '...' + hash.substring(hash.length - 6)
}

const copyHash = async (hash) => {
  try {
    await navigator.clipboard.writeText(hash)
    alert('Hash berhasil disalin!')
  } catch (error) {
    console.error('Gagal menyalin hash:', error)
  }
}

// Lifecycle
onMounted(() => {
  checkMobile()
  fetchChain()
  
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const fileInput = ref(null)
</script>

<style scoped>
/* Reset & Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard-layout {
  display: flex;
  min-height: 100vh;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: #f8fafc;
}

/* Mobile Header */
.mobile-header {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem;
}

.mobile-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-brand h2 {
  font-size: 1.25rem;
  color: #1e293b;
}

.brand-icon {
  font-size: 1.5rem;
}

.mobile-menu-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 50;
  transition: transform 0.3s ease;
}

.sidebar-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #334155;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.brand h3 {
  font-size: 1.25rem;
  font-weight: 600;
}

.admin-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.admin-avatar {
  width: 40px;
  height: 40px;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.admin-details {
  display: flex;
  flex-direction: column;
}

.admin-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.admin-status {
  font-size: 0.75rem;
  color: #94a3b8;
}

.admin-status.online {
  color: #10b981;
}

.sidebar-nav {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: none;
  border: none;
  color: #cbd5e1;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
  text-align: left;
}

.nav-btn:hover {
  background: rgba(255,255,255,0.05);
  color: white;
}

.nav-btn.active {
  background: #3b82f6;
  color: white;
}

.nav-icon {
  font-size: 1.125rem;
}

.nav-text {
  flex: 1;
}

.nav-badge {
  background: rgba(255,255,255,0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid #334155;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.2);
  color: #ef4444;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(239,68,68,0.2);
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 40;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 280px;
  min-height: 100vh;
}

.desktop-header {
  background: white;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left h1 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: #64748b;
  font-size: 0.875rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.refresh-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background 0.2s;
}

.refresh-btn:hover {
  background: #f1f5f9;
}

.stats {
  display: flex;
  gap: 1rem;
}

.stat-item {
  background: #f1f5f9;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  color: #475569;
}

/* Content */
.content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Alert */
.alert {
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 0.75rem;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.alert-icon {
  font-size: 1.5rem;
  color: #92400e;
}

.alert-content {
  flex: 1;
}

.alert-content strong {
  color: #92400e;
  display: block;
  margin-bottom: 0.25rem;
}

.alert-content p {
  color: #92400e;
  font-size: 0.875rem;
  opacity: 0.9;
}

/* Form Card */
.form-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.form-title {
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
}

/* File Upload */
.file-upload {
  margin-bottom: 2rem;
}

.file-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
}

.file-drop-area {
  border: 2px dashed #cbd5e1;
  border-radius: 0.75rem;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: #f8fafc;
}

.file-drop-area:hover {
  border-color: #94a3b8;
  background: #f1f5f9;
}

.file-input {
  display: none;
}

.drop-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.drop-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.drop-text {
  color: #64748b;
  font-size: 0.95rem;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.btn {
  padding: 0.875rem 1.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn.primary {
  background: #1e293b;
  color: white;
}

.btn.primary:hover:not(:disabled) {
  background: #0f172a;
}

.btn.primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn.secondary {
  background: white;
  border: 2px solid #e2e8f0;
  color: #475569;
}

.btn.secondary:hover {
  background: #f1f5f9;
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Table Card */
.table-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow: hidden;
}

.table-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-header h3 {
  font-size: 1.25rem;
  color: #1e293b;
}

.table-controls {
  display: flex;
  gap: 1rem;
}

.search-box {
  position: relative;
}

.search-input {
  padding: 0.625rem 1rem 0.625rem 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  width: 250px;
  background: #f8fafc;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
}

/* Table */
.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.data-table thead {
  background: #f8fafc;
}

.data-table th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
  border-bottom: 1px solid #e2e8f0;
}

.data-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.timestamp {
  display: flex;
  flex-direction: column;
}

.date {
  font-weight: 600;
  color: #1e293b;
}

.time {
  font-size: 0.875rem;
  color: #64748b;
}

.student-info {
  display: flex;
  flex-direction: column;
}

.student-name {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.student-nim {
  font-size: 0.875rem;
  color: #64748b;
}

.ipk-badge {
  background: #dbeafe;
  color: #1e40af;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.hash {
  background: #f1f5f9;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  color: #475569;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-block;
}

.hash:hover {
  background: #e2e8f0;
}

.empty-state {
  text-align: center;
  padding: 3rem !important;
}

.empty-content {
  color: #94a3b8;
  font-size: 1rem;
}

.table-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-info {
  color: #64748b;
  font-size: 0.875rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.stat-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2rem;
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 0.75rem;
}

.stat-content h4 {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

/* Responsive */
@media (max-width: 1024px) {
  .main-content {
    margin-left: 0;
    padding-top: 64px;
  }
  
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
  
  .mobile-header {
    display: block;
  }
  
  .content {
    padding: 1rem;
  }
  
  .desktop-header {
    display: none;
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .table-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .search-input {
    width: 100%;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .data-table th,
  .data-table td {
    padding: 0.75rem 1rem;
  }
  
  .form-card,
  .table-card {
    padding: 1.5rem 1rem;
  }
}
</style>