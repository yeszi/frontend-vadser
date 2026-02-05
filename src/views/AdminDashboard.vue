<template>
  <div class="dashboard-layout">
    <!-- Mobile Header -->
    <header class="mobile-header" v-if="isMobile">
      <div class="mobile-header-inner">
        <div class="mobile-header-left">
          <button class="mobile-menu-btn" @click="toggleMobileMenu">
            <span class="menu-icon" :class="{ 'open': isMobileMenuOpen }"></span>
          </button>
          <div class="mobile-brand">
            <div class="mobile-logo">⛓️</div>
            <div class="mobile-brand-text">
              <h1>Verizh</h1>
              <span class="mobile-badge">Admin</span>
            </div>
          </div>
        </div>
        
        <div class="mobile-header-right">
          <button class="mobile-action-btn" @click="fetchChain">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.1-5.9M22 12.5a10 10 0 0 1-18.1 5.9" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <div class="mobile-user">
            <div class="mobile-user-avatar">A</div>
          </div>
        </div>
      </div>
      
      <!-- Mobile Page Info -->
      <div class="mobile-page-info">
        <h2 class="mobile-page-title">
          {{ currentView === 'ledger' ? 'Data Blockchain' : 'Registrasi Ijazah' }}
        </h2>
        <div class="mobile-page-subtitle">
          <span class="mobile-mode-badge">{{ currentView === 'ledger' ? 'Mode Baca' : 'Mode Tulis' }}</span>
          <span class="mobile-data-count">{{ chainData.length }} data</span>
        </div>
      </div>
    </header>

    <!-- Tablet Header -->
    <header class="tablet-header" v-if="isTablet">
      <div class="tablet-header-inner">
        <div class="tablet-header-left">
          <button class="tablet-menu-btn" @click="toggleMobileMenu">
            <span class="menu-icon" :class="{ 'open': isMobileMenuOpen }"></span>
          </button>
          <div class="tablet-brand">
            <div class="tablet-logo">⛓️</div>
            <h1>Verizh Admin</h1>
          </div>
        </div>
        
        <div class="tablet-header-center">
          <div class="tablet-page-info">
            <h2>{{ currentView === 'ledger' ? 'Data Blockchain' : 'Registrasi Ijazah' }}</h2>
            <span class="tablet-mode-badge">{{ currentView === 'ledger' ? 'Mode Baca' : 'Mode Tulis' }}</span>
          </div>
        </div>
        
        <div class="tablet-header-right">
          <div class="tablet-stats">
            <div class="tablet-stat-item">
              <span class="stat-icon">📊</span>
              <span class="stat-value">{{ chainData.length }}</span>
            </div>
          </div>
          <button class="tablet-action-btn" @click="fetchChain">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.1-5.9M22 12.5a10 10 0 0 1-18.1 5.9" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Sidebar for Mobile/Tablet -->
    <aside :class="['sidebar-mobile', { 'open': isMobileMenuOpen }]" 
           v-if="isMobile || isTablet">
      <div class="sidebar-mobile-inner">
        <!-- Sidebar Header -->
        <div class="sidebar-mobile-header">
          <div class="sidebar-mobile-brand">
            <div class="sidebar-logo">⛓️</div>
            <div class="sidebar-brand-text">
              <h2>Verizh</h2>
              <p>Blockchain Admin</p>
            </div>
          </div>
          <button class="sidebar-close-btn" @click="toggleMobileMenu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- User Info -->
        <div class="sidebar-mobile-user">
          <div class="sidebar-user-avatar">A</div>
          <div class="sidebar-user-info">
            <h3>Administrator</h3>
            <p class="user-status">
              <span class="status-dot online"></span>
              Online
            </p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-mobile-nav">
          <div class="nav-section">
            <h4 class="nav-section-title">Menu Utama</h4>
            <div class="nav-items">
              <button 
                :class="['nav-item', { active: currentView === 'ledger' }]"
                @click="setView('ledger')">
                <span class="nav-icon">📊</span>
                <span class="nav-text">Data Ledger</span>
                <span class="nav-badge" v-if="chainData.length">{{ chainData.length }}</span>
              </button>

              <button 
                :class="['nav-item', { active: currentView === 'register' }]"
                @click="setView('register')">
                <span class="nav-icon">📝</span>
                <span class="nav-text">Registrasi</span>
              </button>
            </div>
          </div>

          <div class="nav-section">
            <h4 class="nav-section-title">Sistem</h4>
            <div class="nav-items">
              <button class="nav-item">
                <span class="nav-icon">⚙️</span>
                <span class="nav-text">Pengaturan</span>
              </button>
              <button class="nav-item" @click="logout">
                <span class="nav-icon">🚪</span>
                <span class="nav-text">Keluar</span>
              </button>
            </div>
          </div>
        </nav>

        <!-- Connection Status -->
        <div class="sidebar-mobile-footer">
          <div class="connection-status">
            <div class="status-indicator connected">
              <div class="pulse-ring"></div>
            </div>
            <div class="status-text">
              <span class="status-title">Blockchain Aktif</span>
              <span class="status-subtitle">{{ chainData.length }} blok</span>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Desktop Sidebar -->
    <aside class="desktop-sidebar" v-if="!isMobile && !isTablet">
      <div class="desktop-sidebar-inner">
        <!-- Logo -->
        <div class="desktop-sidebar-header">
          <div class="desktop-logo-container">
            <div class="desktop-logo">⛓️</div>
            <div class="desktop-logo-text">
              <h1>Verizh</h1>
              <p>Blockchain Admin</p>
            </div>
          </div>
        </div>

        <!-- User -->
        <div class="desktop-sidebar-user">
          <div class="desktop-user-avatar">A</div>
          <div class="desktop-user-info">
            <h3>Administrator</h3>
            <p class="desktop-user-role">Super Admin</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="desktop-sidebar-nav">
          <div class="desktop-nav-section">
            <h4 class="desktop-nav-title">MENU UTAMA</h4>
            <div class="desktop-nav-items">
              <button 
                :class="['desktop-nav-item', { active: currentView === 'ledger' }]"
                @click="setView('ledger')">
                <span class="desktop-nav-icon">📊</span>
                <span class="desktop-nav-text">Data Ledger</span>
                <span class="desktop-nav-badge" v-if="chainData.length">{{ chainData.length }}</span>
              </button>

              <button 
                :class="['desktop-nav-item', { active: currentView === 'register' }]"
                @click="setView('register')">
                <span class="desktop-nav-icon">📝</span>
                <span class="desktop-nav-text">Registrasi</span>
              </button>
            </div>
          </div>

          <div class="desktop-nav-section">
            <h4 class="desktop-nav-title">SISTEM</h4>
            <div class="desktop-nav-items">
              <button class="desktop-nav-item">
                <span class="desktop-nav-icon">⚙️</span>
                <span class="desktop-nav-text">Pengaturan</span>
              </button>
              <button class="desktop-nav-item" @click="logout">
                <span class="desktop-nav-icon">🚪</span>
                <span class="desktop-nav-text">Keluar</span>
              </button>
            </div>
          </div>
        </nav>

        <!-- Status -->
        <div class="desktop-sidebar-footer">
          <div class="desktop-connection-status">
            <div class="desktop-status-indicator connected">
              <div class="desktop-pulse-ring"></div>
            </div>
            <div class="desktop-status-text">
              <span class="desktop-status-title">Blockchain Aktif</span>
              <span class="desktop-status-subtitle">{{ chainData.length }} blok</span>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile Overlay -->
    <div v-if="(isMobile || isTablet) && isMobileMenuOpen" 
         class="mobile-overlay" 
         @click="toggleMobileMenu"></div>

    <!-- Main Content -->
    <main :class="[
      'main-content', 
      { 
        'mobile-active': isMobile,
        'tablet-active': isTablet,
        'desktop-active': !isMobile && !isTablet,
        'menu-open': isMobileMenuOpen 
      }
    ]">
      <!-- Desktop Header -->
      <header class="desktop-header" v-if="!isMobile && !isTablet">
        <div class="desktop-header-inner">
          <div class="desktop-header-left">
            <div class="desktop-page-info">
              <h1 class="desktop-page-title">
                {{ currentView === 'ledger' ? 'Database Blockchain' : 'Registrasi Ijazah' }}
              </h1>
              <div class="desktop-page-subtitle">
                <span class="desktop-mode-badge">{{ currentView === 'ledger' ? 'Mode Baca' : 'Mode Tulis' }}</span>
                <span class="desktop-page-time">{{ currentTime }}</span>
              </div>
            </div>
          </div>

          <div class="desktop-header-right">
            <div class="desktop-header-actions">
              <div class="desktop-stats">
                <div class="desktop-stat-item">
                  <span class="desktop-stat-icon">📊</span>
                  <div class="desktop-stat-info">
                    <span class="desktop-stat-label">Total Data</span>
                    <span class="desktop-stat-value">{{ chainData.length }}</span>
                  </div>
                </div>
                <div class="desktop-stat-item">
                  <span class="desktop-stat-icon">⭐</span>
                  <div class="desktop-stat-info">
                    <span class="desktop-stat-label">Rata IPK</span>
                    <span class="desktop-stat-value">{{ averageIPK }}</span>
                  </div>
                </div>
              </div>
              
              <button class="desktop-refresh-btn" @click="fetchChain">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.1-5.9M22 12.5a10 10 0 0 1-18.1 5.9" 
                        stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <div class="content-area">
        <!-- Alert -->
        <div class="alert-banner" v-if="!alertDismissed">
          <div class="alert-content">
            <div class="alert-icon">⚠️</div>
            <div class="alert-text">
              <strong>Mode Permanen Aktif</strong>
              <p>Data tersimpan di Blockchain tidak dapat diedit atau dihapus.</p>
            </div>
          </div>
          <button class="alert-close" @click="dismissAlert">×</button>
        </div>

        <!-- Dynamic Content -->
        <div class="dynamic-content">
          <!-- Register Form -->
          <section v-if="currentView === 'register'" class="register-section">
            <div class="section-header">
              <h2 class="section-title">
                <span class="title-icon">📝</span>
                Formulir Registrasi Ijazah
              </h2>
              <p class="section-description">Masukkan data lengkap mahasiswa untuk disimpan ke blockchain</p>
            </div>

            <div class="register-form-container">
              <!-- Form Grid -->
              <div class="form-card">
                <div class="form-card-header">
                  <h3>Data Mahasiswa</h3>
                  <p>Informasi identitas lengkap</p>
                </div>
                
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">
                      <span class="label-icon">👤</span>
                      Nama Lengkap
                    </label>
                    <input type="text" v-model="nama" placeholder="Masukkan nama lengkap" class="form-input">
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">
                      <span class="label-icon">🔢</span>
                      NIM
                    </label>
                    <input type="text" v-model="nim" placeholder="Masukkan NIM" class="form-input">
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">
                      <span class="label-icon">🎓</span>
                      Program Studi
                    </label>
                    <input type="text" v-model="prodi" placeholder="Masukkan program studi" class="form-input">
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">
                      <span class="label-icon">⭐</span>
                      IPK
                    </label>
                    <div class="input-with-suffix">
                      <input type="number" v-model="ipk" step="0.01" placeholder="0.00" class="form-input">
                      <span class="input-suffix">/ 4.00</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- File Upload -->
              <div class="form-card">
                <div class="form-card-header">
                  <h3>Dokumen Ijazah</h3>
                  <p>Upload file ijazah dalam format PDF</p>
                </div>
                
                <div class="file-upload-area">
                  <div class="upload-instructions">
                    <div class="instruction-icon">📄</div>
                    <div class="instruction-text">
                      <h4>Upload File Ijazah</h4>
                      <p>Drag & drop file PDF atau klik untuk memilih</p>
                    </div>
                  </div>
                  
                  <div class="upload-dropzone" 
                       :class="{ 'has-file': fileIjazah, 'dragover': isDragOver }"
                       @click="triggerFileInput"
                       @dragover.prevent="handleDragOver"
                       @dragleave="handleDragLeave"
                       @drop="handleFileDrop">
                    <input type="file" ref="fileInput" @change="handleFileUpload" accept=".pdf" class="file-input">
                    
                    <div class="dropzone-content">
                      <div class="dropzone-icon" v-if="!fileIjazah">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" 
                                stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                          <polyline points="17 8 12 3 7 8" 
                                  stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                          <line x1="12" y1="3" x2="12" y2="15" 
                                stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                      </div>
                      
                      <div class="file-preview" v-if="fileIjazah">
                        <div class="file-icon">📄</div>
                        <div class="file-info">
                          <div class="file-name">{{ fileIjazah.name }}</div>
                          <div class="file-size">{{ formatFileSize(fileIjazah.size) }}</div>
                        </div>
                        <button class="remove-file-btn" @click.stop="removeFile">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div class="dropzone-text" v-if="!fileIjazah">
                        <p><strong>Klik untuk memilih file</strong></p>
                        <p>atau drag and drop di sini</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="upload-requirements">
                    <p>📋 <strong>Persyaratan:</strong> File PDF maksimal 5MB</p>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="form-actions">
                <button class="btn btn-secondary" @click="clearForm">
                  <span class="btn-icon">🗑️</span>
                  Reset Form
                </button>
                <button class="btn btn-primary" @click="uploadIjazah" :disabled="loading || !formValid">
                  <span v-if="loading" class="btn-loader"></span>
                  <span v-else class="btn-content">
                    <span class="btn-icon">🔒</span>
                    Simpan ke Blockchain
                  </span>
                </button>
              </div>
            </div>
          </section>

          <!-- Ledger Table -->
          <section v-if="currentView === 'ledger'" class="ledger-section">
            <div class="section-header">
              <div class="header-content">
                <h2 class="section-title">
                  <span class="title-icon">📊</span>
                  Data Blockchain Ledger
                </h2>
                <p class="section-description">Riwayat data yang tersimpan di blockchain</p>
              </div>
              
              <div class="header-actions">
                <div class="search-container">
                  <span class="search-icon">🔍</span>
                  <input type="text" v-model="searchQuery" placeholder="Cari nama, NIM, atau prodi..." class="search-input">
                </div>
                
                <div class="table-controls">
                  <button class="control-btn export-btn" @click="exportData">
                    <span class="control-icon">📥</span>
                    <span class="control-text" v-if="!isMobile">Ekspor</span>
                  </button>
                  <button class="control-btn refresh-btn" @click="refreshData">
                    <span class="control-icon">🔄</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Data Table -->
            <div class="data-table-container">
              <div class="table-responsive">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th class="timestamp-col">Waktu</th>
                      <th class="student-col">Mahasiswa</th>
                      <th class="prodi-col">Prodi</th>
                      <th class="ipk-col">IPK</th>
                      <th class="hash-col">Hash</th>
                      <th class="actions-col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(block, index) in paginatedChain" :key="index">
                      <td>
                        <div class="timestamp-cell">
                          <div class="date">{{ formatDate(block.timestamp) }}</div>
                          <div class="time">{{ formatTime(block.timestamp) }}</div>
                        </div>
                      </td>
                      <td>
                        <div class="student-cell">
                          <div class="student-avatar">{{ getInitials(block.student_data.nama) }}</div>
                          <div class="student-info">
                            <div class="student-name">{{ block.student_data.nama }}</div>
                            <div class="student-nim">{{ block.student_data.nim }}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="prodi-badge">{{ block.student_data.prodi }}</span>
                      </td>
                      <td>
                        <div class="ipk-cell">
                          <span class="ipk-value">{{ block.student_data.ipk }}</span>
                          <div class="ipk-bar">
                            <div class="ipk-fill" :style="{ width: (block.student_data.ipk / 4) * 100 + '%' }"></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="hash-cell" @click="copyHash(block.pdf_hash)">
                          <code class="hash-code">{{ shortenHash(block.pdf_hash) }}</code>
                          <span class="hash-tooltip">Klik untuk salin</span>
                        </div>
                      </td>
                      <td>
                        <div class="actions-cell">
                          <button class="action-btn view-btn" @click="viewDetails(block)">
                            <span class="action-icon">👁️</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Empty State -->
                    <tr v-if="filteredChain.length === 0">
                      <td colspan="6">
                        <div class="empty-state">
                          <div class="empty-icon">📭</div>
                          <div class="empty-text">
                            <h3>Tidak ada data</h3>
                            <p v-if="searchQuery">Tidak ada hasil untuk "{{ searchQuery }}"</p>
                            <p v-else>Belum ada data yang tersimpan</p>
                          </div>
                          <button class="empty-action-btn" @click="setView('register')" v-if="!searchQuery">
                            + Tambah Data Baru
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Table Footer -->
              <div class="table-footer">
                <div class="table-info">
                  <span class="info-text">Menampilkan {{ showingStart }}-{{ showingEnd }} dari {{ filteredChain.length }} data</span>
                </div>
                
                <div class="pagination" v-if="totalPages > 1">
                  <button class="pagination-btn" :disabled="currentPage === 1" @click="currentPage = 1">
                    «
                  </button>
                  <button class="pagination-btn" :disabled="currentPage === 1" @click="currentPage--">
                    ‹
                  </button>
                  
                  <div class="page-numbers">
                    <span class="page-info">Halaman {{ currentPage }} dari {{ totalPages }}</span>
                  </div>
                  
                  <button class="pagination-btn" :disabled="currentPage === totalPages" @click="currentPage++">
                    ›
                  </button>
                  <button class="pagination-btn" :disabled="currentPage === totalPages" @click="currentPage = totalPages">
                    »
                  </button>
                </div>
              </div>
            </div>

            <!-- Statistics -->
            <div class="statistics-container">
              <h3 class="statistics-title">Statistik Blockchain</h3>
              
              <div class="statistics-grid">
                <div class="stat-card">
                  <div class="stat-icon total">📊</div>
                  <div class="stat-content">
                    <h4>Total Data</h4>
                    <p class="stat-value">{{ chainData.length }}</p>
                  </div>
                </div>
                
                <div class="stat-card">
                  <div class="stat-icon average">⭐</div>
                  <div class="stat-content">
                    <h4>Rata-rata IPK</h4>
                    <p class="stat-value">{{ averageIPK }}</p>
                  </div>
                </div>
                
                <div class="stat-card">
                  <div class="stat-icon recent">🕒</div>
                  <div class="stat-content">
                    <h4>Update Terakhir</h4>
                    <p class="stat-value" v-if="chainData.length > 0">
                      {{ formatRelativeTime(chainData[0].timestamp) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// Responsive state
const isMobile = ref(false)
const isTablet = ref(false)
const isMobileMenuOpen = ref(false)

// View state
const currentView = ref('ledger')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const isDragOver = ref(false)
const alertDismissed = ref(false)

// Form state
const nama = ref('')
const nim = ref('')
const prodi = ref('')
const ipk = ref('')
const fileIjazah = ref(null)
const loading = ref(false)

// Data state
const chainData = ref([])
const currentTime = ref(new Date().toLocaleTimeString('id-ID'))

// API
const API_URL = 'http://localhost:5000'

// Computed
const formValid = computed(() => {
  return nama.value && nim.value && prodi.value && ipk.value && fileIjazah.value
})

const filteredChain = computed(() => {
  if (!searchQuery.value) return chainData.value
  
  const query = searchQuery.value.toLowerCase()
  return chainData.value.filter(block => 
    block.student_data.nama.toLowerCase().includes(query) ||
    block.student_data.nim.toLowerCase().includes(query) ||
    block.student_data.prodi.toLowerCase().includes(query)
  )
})

const paginatedChain = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredChain.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredChain.value.length / itemsPerPage.value)
})

const showingStart = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const showingEnd = computed(() => {
  const end = currentPage.value * itemsPerPage.value
  return end > filteredChain.value.length ? filteredChain.value.length : end
})

const averageIPK = computed(() => {
  if (chainData.value.length === 0) return '0.00'
  const total = chainData.value.reduce((sum, block) => 
    sum + parseFloat(block.student_data.ipk), 0)
  return (total / chainData.value.length).toFixed(2)
})

// Methods
const checkResponsive = () => {
  const width = window.innerWidth
  isMobile.value = width < 768
  isTablet.value = width >= 768 && width < 1024
  
  // Close mobile menu on larger screens
  if (width >= 1024) {
    isMobileMenuOpen.value = false
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const setView = (view) => {
  currentView.value = view
  if (isMobile.value || isTablet.value) {
    isMobileMenuOpen.value = false
  }
  currentPage.value = 1
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

const handleDragOver = (event) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = () => {
  isDragOver.value = false
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  handleFileSelection(file)
}

const handleFileDrop = (event) => {
  event.preventDefault()
  isDragOver.value = false
  const file = event.dataTransfer.files[0]
  handleFileSelection(file)
}

const handleFileSelection = (file) => {
  if (file) {
    if (file.type === 'application/pdf') {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB')
        return
      }
      fileIjazah.value = file
    } else {
      alert('Hanya file PDF yang diperbolehkan')
    }
  }
}

const removeFile = () => {
  fileIjazah.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const clearForm = () => {
  if (!confirm('Yakin ingin mengosongkan form?')) return
  
  nama.value = ''
  nim.value = ''
  prodi.value = ''
  ipk.value = ''
  removeFile()
}

const uploadIjazah = async () => {
  if (!formValid.value) {
    alert('Harap isi semua field dan upload file ijazah')
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
    const response = await axios.post(`${API_URL}/upload_ijazah`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    if (response.data.success) {
      alert('✅ Data berhasil disimpan di Blockchain!')
      clearForm()
      await fetchChain()
      currentView.value = 'ledger'
    }
  } catch (error) {
    alert('❌ Gagal menyimpan data: ' + (error.response?.data?.message || error.message))
  } finally {
    loading.value = false
  }
}

const fetchChain = async () => {
  try {
    const response = await axios.get(`${API_URL}/chain`)
    chainData.value = response.data.chain.reverse()
  } catch (error) {
    console.error('Gagal mengambil data:', error)
  }
}

const refreshData = () => {
  fetchChain()
}

const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatRelativeTime = (timestamp) => {
  const now = Math.floor(Date.now() / 1000)
  const diff = now - timestamp
  
  if (diff < 60) return 'Baru saja'
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
  return `${Math.floor(diff / 86400)} hari lalu`
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
}

const shortenHash = (hash) => {
  if (isMobile.value) {
    return hash.substring(0, 4) + '...' + hash.substring(hash.length - 4)
  }
  return hash.substring(0, 8) + '...' + hash.substring(hash.length - 8)
}

const copyHash = async (hash) => {
  try {
    await navigator.clipboard.writeText(hash)
    alert('✅ Hash berhasil disalin ke clipboard!')
  } catch (error) {
    console.error('Gagal menyalin hash:', error)
  }
}

const viewDetails = (block) => {
  alert(`Detail Data:\nNama: ${block.student_data.nama}\nNIM: ${block.student_data.nim}\nProdi: ${block.student_data.prodi}\nIPK: ${block.student_data.ipk}`)
}

const exportData = () => {
  const dataStr = JSON.stringify(chainData.value, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
  const exportFileDefaultName = `blockchain-data-${new Date().toISOString().split('T')[0]}.json`
  
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

const dismissAlert = () => {
  alertDismissed.value = true
}

// Lifecycle
onMounted(() => {
  checkResponsive()
  fetchChain()
  
  // Update time every minute
  const timer = setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString('id-ID')
  }, 60000)
  
  window.addEventListener('resize', checkResponsive)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen.value) {
      toggleMobileMenu()
    }
  })
})

onUnmounted(() => {
  clearInterval(timer)
  window.removeEventListener('resize', checkResponsive)
  window.removeEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen.value) {
      toggleMobileMenu()
    }
  })
})

const fileInput = ref(null)
</script>

<style scoped>
/* ===== BASE STYLES ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

/* ===== MOBILE HEADER (0-767px) ===== */
.mobile-header {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 0;
}

.mobile-header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.mobile-header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-menu-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.menu-icon {
  position: relative;
  width: 18px;
  height: 2px;
  background: #1e293b;
  transition: all 0.3s ease;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 2px;
  background: #1e293b;
  left: 0;
  transition: all 0.3s ease;
}

.menu-icon::before {
  top: -6px;
}

.menu-icon::after {
  bottom: -6px;
}

.menu-icon.open {
  background: transparent;
}

.menu-icon.open::before {
  transform: rotate(45deg) translate(4px, 4px);
}

.menu-icon.open::after {
  transform: rotate(-45deg) translate(4px, -4px);
}

.mobile-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mobile-logo {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
}

.mobile-brand-text {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.mobile-brand-text h1 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
}

.mobile-badge {
  background: #f1f5f9;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.mobile-header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mobile-action-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
}

.mobile-user-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
}

.mobile-page-info {
  padding: 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.mobile-page-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.mobile-page-subtitle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
}

.mobile-mode-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.mobile-data-count {
  color: #64748b;
  font-weight: 500;
}

/* ===== TABLET HEADER (768px-1023px) ===== */
.tablet-header {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.tablet-header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.tablet-header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.tablet-menu-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.tablet-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.tablet-logo {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
}

.tablet-brand h1 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
}

.tablet-header-center {
  flex: 2;
  display: flex;
  justify-content: center;
}

.tablet-page-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.tablet-page-info h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}

.tablet-mode-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.tablet-header-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}

.tablet-stats {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.tablet-stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.stat-icon {
  font-size: 1rem;
}

.stat-value {
  font-weight: 700;
  color: #1e293b;
  font-size: 0.875rem;
}

.tablet-action-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
}

/* ===== MOBILE/TABLET SIDEBAR ===== */
.sidebar-mobile {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  max-width: 85vw;
  background: white;
  z-index: 1100;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

.sidebar-mobile.open {
  transform: translateX(0);
}

.sidebar-mobile-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sidebar-mobile-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-mobile-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sidebar-logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.sidebar-brand-text h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.125rem;
}

.sidebar-brand-text p {
  font-size: 0.75rem;
  color: #64748b;
}

.sidebar-close-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
}

.sidebar-mobile-user {
  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.sidebar-user-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
}

.sidebar-user-info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.user-status {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: #64748b;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-dot.online {
  background: #10b981;
}

.sidebar-mobile-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.nav-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
}

.nav-items {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: transparent;
  border: none;
  border-radius: 10px;
  color: #64748b;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
}

.nav-item:hover {
  background: #f8fafc;
  color: #475569;
}

.nav-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.nav-icon {
  font-size: 1.125rem;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  flex: 1;
}

.nav-badge {
  background: rgba(255,255,255,0.2);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

.nav-item.active .nav-badge {
  background: rgba(255,255,255,0.3);
}

.sidebar-mobile-footer {
  padding: 1.5rem 1rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-indicator {
  position: relative;
  width: 12px;
  height: 12px;
  background: #10b981;
  border-radius: 50%;
}

.status-indicator.connected .pulse-ring {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px solid rgba(16, 185, 129, 0.3);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.status-text {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.status-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
}

.status-subtitle {
  font-size: 0.75rem;
  color: #64748b;
}

/* ===== DESKTOP SIDEBAR (1024px+) ===== */
.desktop-sidebar {
  display: none;
  width: 280px;
  background: white;
  border-right: 1px solid #e2e8f0;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  overflow-y: auto;
}

.desktop-sidebar-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.desktop-sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.desktop-logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.desktop-logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.desktop-logo-text h1 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.125rem;
}

.desktop-logo-text p {
  font-size: 0.75rem;
  color: #64748b;
}

.desktop-sidebar-user {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid #f1f5f9;
}

.desktop-user-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
}

.desktop-user-info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.125rem;
}

.desktop-user-role {
  font-size: 0.75rem;
  color: #64748b;
}

.desktop-sidebar-nav {
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
}

.desktop-nav-section {
  margin-bottom: 1.5rem;
  padding: 0 1.5rem;
}

.desktop-nav-title {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
  padding-left: 0.5rem;
}

.desktop-nav-items {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.desktop-nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-radius: 10px;
  color: #64748b;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
}

.desktop-nav-item:hover {
  background: #f8fafc;
  color: #475569;
}

.desktop-nav-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.desktop-nav-icon {
  font-size: 1.125rem;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.desktop-nav-text {
  flex: 1;
}

.desktop-nav-badge {
  background: rgba(255,255,255,0.2);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

.desktop-nav-item.active .desktop-nav-badge {
  background: rgba(255,255,255,0.3);
}

.desktop-sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;
}

.desktop-connection-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.desktop-status-indicator {
  position: relative;
  width: 12px;
  height: 12px;
  background: #10b981;
  border-radius: 50%;
}

.desktop-status-indicator.connected .desktop-pulse-ring {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px solid rgba(16, 185, 129, 0.3);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.desktop-status-text {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.desktop-status-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
}

.desktop-status-subtitle {
  font-size: 0.75rem;
  color: #64748b;
}

/* ===== MOBILE OVERLAY ===== */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(2px);
  z-index: 1050;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ===== MAIN CONTENT ===== */
.main-content {
  min-height: 100vh;
  background: #f8fafc;
  transition: margin-left 0.3s ease;
}

/* Desktop Layout */
.main-content.desktop-active {
  margin-left: 280px;
}

/* Tablet Layout */
.main-content.tablet-active {
  padding-top: 72px;
}

/* Mobile Layout */
.main-content.mobile-active {
  padding-top: 112px; /* Header + Page Info */
}

/* Desktop Header */
.desktop-header {
  display: none;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.desktop-header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.desktop-header-left {
  flex: 1;
}

.desktop-page-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.desktop-page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.desktop-page-subtitle {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
}

.desktop-mode-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.desktop-page-time {
  color: #64748b;
  font-weight: 500;
}

.desktop-header-right {
  flex-shrink: 0;
}

.desktop-header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.desktop-stats {
  display: flex;
  gap: 1rem;
}

.desktop-stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  min-width: 120px;
}

.desktop-stat-icon {
  font-size: 1.25rem;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.desktop-stat-info {
  display: flex;
  flex-direction: column;
}

.desktop-stat-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.desktop-stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.desktop-refresh-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.desktop-refresh-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #475569;
}

/* ===== CONTENT AREA ===== */
.content-area {
  padding: 1.5rem;
}

@media (min-width: 768px) {
  .content-area {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .dashboard-layout {
    flex-direction: row;
  }
}

/* Alert Banner */
.alert-banner {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border: 1px solid #fcd34d;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
}

.alert-icon {
  color: #92400e;
  margin-top: 0.125rem;
  font-size: 1.25rem;
}

.alert-text strong {
  display: block;
  color: #92400e;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.alert-text p {
  color: #92400e;
  font-size: 0.875rem;
  opacity: 0.9;
}

.alert-close {
  background: none;
  border: none;
  color: #92400e;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.125rem;
  margin: -0.5rem -0.5rem -0.5rem 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  line-height: 1;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert-close:hover {
  background: rgba(146, 64, 14, 0.1);
}

/* Section Header */
.section-header {
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    margin-bottom: 2rem;
  }
}

.header-content {
  flex: 1;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-description {
  color: #64748b;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.header-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

@media (min-width: 768px) {
  .header-actions {
    flex-direction: row;
    align-items: center;
    width: auto;
  }
}

.search-container {
  position: relative;
  flex: 1;
}

@media (min-width: 768px) {
  .search-container {
    min-width: 300px;
  }
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 1rem;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.9375rem;
  background: white;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.table-controls {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  color: #475569;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.control-icon {
  font-size: 1rem;
}

/* ===== REGISTER FORM ===== */
.register-form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .register-form-container {
    gap: 2rem;
  }
}

.form-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}

@media (min-width: 768px) {
  .form-card {
    padding: 2rem;
  }
}

.form-card-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.form-card-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.form-card-header p {
  color: #64748b;
  font-size: 0.875rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .desktop-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 280px;
    display: flex;
    flex-direction: column;
    z-index: 50;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
}

.label-icon {
  font-size: 1rem;
  opacity: 0.7;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  background: white;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-with-suffix {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-suffix .form-input {
  padding-right: 4rem;
}

.input-suffix {
  position: absolute;
  right: 1rem;
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
  pointer-events: none;
}

/* File Upload */
.file-upload-area {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.upload-instructions {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.instruction-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  flex-shrink: 0;
}

.instruction-text h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.instruction-text p {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
}

.upload-dropzone {
  border: 2px dashed #cbd5e1;
  border-radius: 16px;
  padding: 2rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8fafc;
  position: relative;
  overflow: hidden;
}

@media (min-width: 768px) {
  .upload-dropzone {
    padding: 3rem;
  }
}

.upload-dropzone:hover {
  border-color: #94a3b8;
  background: #f1f5f9;
}

.upload-dropzone.has-file {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.05);
}

.upload-dropzone.dragover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.file-input {
  display: none;
}

.dropzone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.dropzone-icon {
  color: #94a3b8;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
}

.file-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.file-info {
  flex: 1;
  text-align: left;
  min-width: 0;
}

.file-name {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 0.875rem;
  color: #64748b;
}

.remove-file-btn {
  background: none;
  border: none;
  color: #ef4444;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-file-btn:hover {
  background: rgba(239, 68, 68, 0.1);
}

.dropzone-text {
  color: #64748b;
}

.dropzone-text p {
  margin: 0.25rem 0;
}

.dropzone-text p:first-child strong {
  color: #475569;
}

.upload-requirements {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  font-size: 0.875rem;
  color: #64748b;
}

.upload-requirements p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.upload-requirements strong {
  color: #475569;
}

/* Form Actions */
.form-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

@media (min-width: 768px) {
  .form-actions {
    flex-direction: row;
    justify-content: flex-end;
  }
}

.btn {
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
  width: 100%;
}

@media (min-width: 768px) {
  .btn {
    width: auto;
    padding: 0.875rem 2rem;
  }
}

.btn-secondary {
  background: white;
  border: 2px solid #e2e8f0;
  color: #475569;
}

.btn-secondary:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn-icon {
  font-size: 1.125rem;
}

.btn-loader {
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

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ===== DATA TABLE ===== */
.data-table-container {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .data-table-container {
    margin-bottom: 2rem;
  }
}

.table-responsive {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 800px;
}

.data-table thead {
  background: #f8fafc;
}

.data-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #475569;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .data-table th {
    padding: 1.25rem 1.5rem;
  }
}

.data-table tbody tr {
  transition: all 0.2s ease;
}

.data-table tbody tr:hover {
  background: #f8fafc;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

@media (min-width: 768px) {
  .data-table td {
    padding: 1.25rem 1.5rem;
  }
}

/* Table Cells */
.timestamp-cell {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 120px;
}

.timestamp-cell .date {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.9375rem;
}

.timestamp-cell .time {
  font-size: 0.875rem;
  color: #64748b;
}

.student-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 200px;
}

.student-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .student-avatar {
    width: 40px;
    height: 40px;
    font-size: 0.875rem;
  }
}

.student-info {
  flex: 1;
  min-width: 0;
}

.student-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.9375rem;
  margin-bottom: 0.125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.student-nim {
  font-size: 0.8125rem;
  color: #64748b;
}

.prodi-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}

.ipk-cell {
  min-width: 100px;
}

.ipk-value {
  font-weight: 700;
  color: #1e293b;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.ipk-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.ipk-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
  transition: width 1s ease;
}

.hash-cell {
  cursor: pointer;
  position: relative;
  min-width: 140px;
}

.hash-code {
  background: #f8fafc;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.8125rem;
  color: #475569;
  word-break: break-all;
  display: block;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.hash-cell:hover .hash-code {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.hash-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-5px);
  background: #1e293b;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 100;
}

.hash-cell:hover .hash-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-10px);
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
  min-width: 80px;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
}

.action-btn:hover {
  transform: translateY(-1px);
}

.view-btn:hover {
  background: #f0f9ff;
  border-color: #bae6fd;
  color: #0369a1;
}

.action-icon {
  font-size: 1.125rem;
}

/* Empty State */
.empty-state {
  padding: 3rem 1rem;
  text-align: center;
}

@media (min-width: 768px) {
  .empty-state {
    padding: 4rem 2rem;
  }
}

.empty-icon {
  font-size: 3rem;
  color: #cbd5e1;
  margin-bottom: 1rem;
}

.empty-text h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
}

.empty-text p {
  color: #94a3b8;
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
}

.empty-action-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.empty-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* Table Footer */
.table-footer {
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #f8fafc;
}

@media (min-width: 768px) {
  .table-footer {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
  }
}

.table-info {
  text-align: center;
}

@media (min-width: 768px) {
  .table-info {
    text-align: left;
  }
}

.info-text {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.pagination-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.pagination-btn:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-info {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  padding: 0 0.5rem;
}

/* Statistics */
.statistics-container {
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .statistics-container {
    margin-top: 2rem;
  }
}

.statistics-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.statistics-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .statistics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .statistics-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stat-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.stat-icon.total {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stat-icon.average {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.stat-icon.recent {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-content h4 {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
}

/* ===== RESPONSIVE DISPLAY RULES ===== */

/* Mobile (0-767px) */
@media (max-width: 767px) {
  .mobile-header {
    display: block;
  }
  
  .tablet-header,
  .desktop-sidebar,
  .desktop-header {
    display: none;
  }
  
  .main-content.mobile-active {
    padding-top: 112px;
  }
}

/* Tablet (768px-1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .tablet-header {
    display: block;
  }
  
  .mobile-header,
  .desktop-sidebar,
  .desktop-header {
    display: none;
  }
  
  .main-content.tablet-active {
    padding-top: 72px;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .mobile-header,
  .tablet-header {
    display: none;
  }
  
  .desktop-sidebar,
  .desktop-header {
    display: block;
  }
  
  .main-content.desktop-active {
    margin-left: 280px;
    padding-top: 0;
  }
}

/* Large Desktop (1200px+) */
@media (min-width: 1200px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .statistics-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Extra Large Desktop (1400px+) */
@media (min-width: 1400px) {
  .content-area {
    max-width: 1400px;
    margin: 0 auto;
  }
}

/* ===== TOUCH FRIENDLY ===== */
@media (hover: none) and (pointer: coarse) {
  .nav-item,
  .btn,
  .action-btn,
  .control-btn {
    min-height: 44px;
    min-width: 44px;
  }
  
  .form-input,
  .search-input {
    font-size: 16px; /* Prevents iOS zoom on focus */
  }
  
  .hash-cell:active .hash-code {
    background: #f1f5f9;
  }
}

/* ===== PRINT STYLES ===== */
@media print {
  .mobile-header,
  .tablet-header,
  .desktop-sidebar,
  .sidebar-mobile,
  .desktop-header,
  .alert-banner,
  .header-actions,
  .table-controls,
  .actions-cell,
  .table-footer,
  .form-actions {
    display: none !important;
  }
  
  .main-content {
   flex: 1;
    margin-left: 280px;
    min-height: 100vh;
    width: calc(100% - 280px);
  }
  
  .content-area {
     max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .data-table-container {
    border: none !important;
    box-shadow: none !important;
  }
  
  .data-table th {
    background: #f0f0f0 !important;
    color: #000 !important;
  }
}
</style>