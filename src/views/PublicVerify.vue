<template>
  <div class="verify-page">
    <!-- Admin Button -->
    <router-link to="/login" class="admin-btn">
      <span class="admin-icon">🔐</span>
      <span class="admin-text">Admin</span>
    </router-link>

    <!-- Main Container -->
    <div class="main-container">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="main-title">
            <span class="title-text gradient-text">VERIZH</span>
            <span class="title-sub">Verifikasi Ijazah Digital</span>
          </h1>
          <p class="header-description">
            Validasi keaslian dokumen akademik dengan teknologi blockchain
          </p>
          <div class="header-badges">
            <div class="badge blockchain">
              <span class="badge-icon">🔗</span>
              <span class="badge-text">Blockchain Powered</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Upload Section -->
        <div v-if="!isVerifying && !result" class="upload-section">
          <div class="upload-card">
            <div class="card-header">
              <div class="card-icon">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M17 8L12 3L7 8" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 3V15" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h2>Unggah Dokumen Ijazah</h2>
              <p>Pilih file PDF asli untuk memulai verifikasi</p>
            </div>

            <div class="upload-area-wrapper">
              <div class="upload-area" 
                   @dragover.prevent="handleDragOver" 
                   @dragleave.prevent="handleDragLeave"
                   @drop.prevent="handleFileDrop"
                   @click="triggerFileInput"
                   :class="{ 'dragover': isDragging }">
                <input type="file" 
                       ref="fileInput" 
                       @change="handleFileUpload" 
                       accept=".pdf" 
                       class="hidden-input" />
                
                <div class="upload-content">
                  <div v-if="!fileToCheck" class="upload-placeholder">
                    <div class="placeholder-icon">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 21.7893 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V8L14 2Z" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 2V8H20" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="placeholder-text">
                      <h3>Drop file PDF di sini</h3>
                      <p>atau klik untuk memilih file</p>
                    </div>
                    <div class="file-specs">
                      <span class="spec">Format: PDF</span>
                      <span class="spec">Maks: 10MB</span>
                    </div>
                  </div>
                  
                  <div v-else class="file-preview">
                    <div class="preview-header">
                      <div class="file-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 21.7893 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V8L14 2Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M14 2V8H20" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <div class="file-info">
                        <h4>{{ fileToCheck.name }}</h4>
                        <p>{{ formatFileSize(fileToCheck.size) }} • PDF Document</p>
                      </div>
                      <button @click.stop="removeFile" class="remove-btn" title="Hapus file">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6 6L18 18" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    <div class="preview-footer" v-if="generatedHash">
                      <div class="hash-preview">
                        <span class="hash-label">Preview Hash:</span>
                        <code class="hash-value">{{ shortenHash(generatedHash) }}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="action-buttons">
              <button @click="resetVerification" class="btn btn-outline" v-if="fileToCheck">
                Batal
              </button>
              <button @click="startVerification" 
                      class="btn btn-primary"
                      :class="{ 'disabled': !fileToCheck }"
                      :disabled="!fileToCheck || isVerifying">
                <span v-if="!isVerifying">Mulai Verifikasi</span>
                <span v-else>Memproses...</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Verification Process -->
        <div v-if="isVerifying" class="verification-process">
          <div class="process-card">
            <!-- Process Header -->
            <div class="process-header">
              <div class="process-icon">
                <div class="scanning-animation">
                  <div class="scan-line"></div>
                </div>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h2>Memverifikasi Dokumen</h2>
              <p class="process-subtitle">Sedang memproses dan memvalidasi dokumen Anda...</p>
            </div>

            <!-- Progress Steps -->
            <div class="progress-steps">
              <div class="step" :class="{ 'active': currentStep >= 1, 'completed': currentStep > 1 }">
                <div class="step-number">
                  <span v-if="currentStep > 1">✓</span>
                  <span v-else>1</span>
                </div>
                <div class="step-content">
                  <h4>Membaca Dokumen</h4>
                  <p>Memproses file PDF yang diunggah</p>
                </div>
                <div class="step-status">
                  <div class="step-dot" :class="{ 'pulse': currentStep === 1 }"></div>
                </div>
              </div>

              <div class="step" :class="{ 'active': currentStep >= 2, 'completed': currentStep > 2 }">
                <div class="step-number">
                  <span v-if="currentStep > 2">✓</span>
                  <span v-else>2</span>
                </div>
                <div class="step-content">
                  <h4>Generating Hash</h4>
                  <p>Membuat sidik digital SHA-256</p>
                </div>
                <div class="step-status">
                  <div class="step-dot" :class="{ 'pulse': currentStep === 2 }"></div>
                </div>
              </div>

              <div class="step" :class="{ 'active': currentStep >= 3, 'completed': currentStep > 3 }">
                <div class="step-number">
                  <span v-if="currentStep > 3">✓</span>
                  <span v-else>3</span>
                </div>
                <div class="step-content">
                  <h4>Query Blockchain</h4>
                  <p>Mencari kecocokan dalam ledger</p>
                </div>
                <div class="step-status">
                  <div class="step-dot" :class="{ 'pulse': currentStep === 3 }"></div>
                </div>
              </div>

              <div class="step" :class="{ 'active': currentStep >= 4, 'completed': currentStep > 4 }">
                <div class="step-number">
                  <span v-if="currentStep > 4">✓</span>
                  <span v-else>4</span>
                </div>
                <div class="step-content">
                  <h4>Validasi Data</h4>
                  <p>Memverifikasi metadata dokumen</p>
                </div>
                <div class="step-status">
                  <div class="step-dot" :class="{ 'pulse': currentStep === 4 }"></div>
                </div>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: progress + '%' }"></div>
              </div>
              <div class="progress-text">{{ Math.round(progress) }}%</div>
            </div>

            <!-- Hash Display -->
            <div class="hash-display" v-if="generatedHash">
              <div class="hash-header">
                <span class="hash-label">SHA-256 Hash:</span>
                <button @click="copyHash(generatedHash)" class="btn-copy" title="Salin hash">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="2"/>
                    <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  Copy
                </button>
              </div>
              <div class="hash-value-container">
                <code>{{ generatedHash }}</code>
              </div>
            </div>

            <!-- Estimated Time -->
            <div class="time-estimate">
              <div class="time-icon">⏱️</div>
              <div class="time-content">
                <span class="time-label">Estimasi waktu tersisa:</span>
                <span class="time-value">{{ estimatedTime }} detik</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Result Section -->
        <div v-if="result" class="result-section">
          <div :class="['result-card', result.status === 'VALID' ? 'valid' : 'invalid']">
            <!-- Result Header -->
            <div class="result-header">
              <div class="result-icon">
                <div class="icon-circle" :class="result.status === 'VALID' ? 'success' : 'error'">
                  <svg v-if="result.status === 'VALID'" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
              <div class="result-title">
                <h2 v-if="result.status === 'VALID'">✅ Verifikasi Berhasil</h2>
                <h2 v-else>❌ Verifikasi Gagal</h2>
                <p class="result-subtitle" v-if="result.status === 'VALID'">
                  Dokumen terverifikasi asli dengan integritas terjamin
                </p>
                <p class="result-subtitle" v-else>
                  Dokumen tidak ditemukan dalam database Blockchain
                </p>
              </div>
            </div>

            <!-- Valid Result Content -->
            <div v-if="result.status === 'VALID' && result.data" class="result-content">
              <!-- Student Information -->
              <div class="info-section">
                <h3>Informasi Mahasiswa</h3>
                <div class="info-grid">
                  <div class="info-card">
                    <div class="info-label">Nama Lengkap</div>
                    <div class="info-value">{{ result.data.nama }}</div>
                  </div>
                  <div class="info-card">
                    <div class="info-label">Nomor Induk</div>
                    <div class="info-value code">{{ result.data.nim }}</div>
                  </div>
                  <div class="info-card">
                    <div class="info-label">Program Studi</div>
                    <div class="info-value">{{ result.data.prodi }}</div>
                  </div>
                  <div class="info-card">
                    <div class="info-label">IPK Akhir</div>
                    <div class="gpa-display">
                      <div class="gpa-bar">
                        <div class="gpa-fill" :style="{ width: (result.data.ipk / 4) * 100 + '%' }"></div>
                      </div>
                      <span class="gpa-value">{{ result.data.ipk }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Blockchain Information -->
              <div class="blockchain-section">
                <h3>Informasi Blockchain</h3>
                <div class="blockchain-grid">
                  <div class="blockchain-item">
                    <div class="item-label">Timestamp</div>
                    <div class="item-value">{{ formatTimestamp(result.timestamp) }}</div>
                  </div>
                  <div class="blockchain-item">
                    <div class="item-label">Digital Hash</div>
                    <div class="hash-container">
                      <code class="hash-code">{{ shortenHash(result.hash || result.pdf_hash) }}</code>
                      <button @click="copyHash(result.hash || result.pdf_hash)" class="hash-copy-btn" title="Salin hash">
                        📋
                      </button>
                    </div>
                  </div>
                  <div class="blockchain-item">
                    <div class="item-label">Status</div>
                    <div class="status-badge success">Terverifikasi</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Invalid Result Content -->
            <div v-else-if="result.status === 'INVALID'" class="invalid-content">
              <div class="warning-card">
                <div class="warning-icon">⚠️</div>
                <div class="warning-content">
                  <h3>Dokumen Tidak Valid</h3>
                  <p>Hash digital tidak cocok dengan catatan Blockchain kami. Kemungkinan:</p>
                  <ul>
                    <li>Dokumen telah dimodifikasi</li>
                    <li>File bukan ijazah asli institusi</li>
                    <li>Belum terdaftar dalam sistem Blockchain</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Error Result Content -->
            <div v-else-if="result.error" class="error-content">
              <div class="warning-card">
                <div class="warning-icon">🚫</div>
                <div class="warning-content">
                  <h3>Terjadi Kesalahan</h3>
                  <p>{{ result.error }}</p>
                  <p>Silakan coba lagi atau hubungi administrator.</p>
                </div>
              </div>
            </div>

            <!-- Result Actions -->
            <div class="result-actions">
              <button @click="resetVerification" class="action-btn secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" stroke-width="2"/>
                  <path d="M9 12H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Verifikasi Lagi
              </button>
              <button v-if="result.status === 'VALID'" @click="downloadCertificate" class="action-btn primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Download Sertifikat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// State
const fileToCheck = ref(null)
const result = ref(null)
const isVerifying = ref(false)
const isDragging = ref(false)
const currentStep = ref(0)
const progress = ref(0)
const generatedHash = ref('')
const estimatedTime = ref(3)

// Refs
const fileInput = ref(null)

// Methods
const handleDragOver = (event) => {
  event.preventDefault()
  isDragging.value = true
}

const handleDragLeave = (event) => {
  event.preventDefault()
  isDragging.value = false
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf') {
    if (file.size > 10 * 1024 * 1024) {
      alert('File terlalu besar. Maksimal 10MB.')
      return
    }
    fileToCheck.value = file
    generateLocalHash(file)
  } else {
    alert('Hanya file PDF yang diperbolehkan')
  }
  isDragging.value = false
}

const handleFileDrop = (event) => {
  event.preventDefault()
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  
  if (file && file.type === 'application/pdf') {
    if (file.size > 10 * 1024 * 1024) {
      alert('File terlalu besar. Maksimal 10MB.')
      return
    }
    fileToCheck.value = file
    generateLocalHash(file)
  } else {
    alert('Hanya file PDF yang diperbolehkan')
  }
}

const generateLocalHash = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    generatedHash.value = hashHex
  } catch (error) {
    console.error('Error generating hash:', error)
    // Fallback to simple hash if crypto API is not available
    const reader = new FileReader()
    reader.onload = (e) => {
      const buffer = e.target.result
      const hash = Array.from(new Uint8Array(buffer.slice(0, 32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
      generatedHash.value = hash
    }
    reader.readAsArrayBuffer(file)
  }
}

const removeFile = () => {
  fileToCheck.value = null
  generatedHash.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const startVerification = async () => {
  if (!fileToCheck.value) return
  
  isVerifying.value = true
  currentStep.value = 0
  progress.value = 0
  result.value = null
  
  // Reset steps
  currentStep.value = 1
  progress.value = 25
  
  // Step 1: Processing file
  setTimeout(() => {
    currentStep.value = 2
    progress.value = 50
  }, 1000)
  
  // Step 2: Generating hash
  setTimeout(() => {
    currentStep.value = 3
    progress.value = 75
  }, 2000)
  
  // Step 3: Query blockchain
  setTimeout(async () => {
    currentStep.value = 4
    progress.value = 90
    estimatedTime.value = 1
    
    try {
      await verifyIjazah()
    } catch (error) {
      console.error('Verification error:', error)
      result.value = {
        error: 'Gagal terhubung ke server. Pastikan backend berjalan di http://localhost:5000'
      }
      isVerifying.value = false
    }
  }, 3000)
}

const verifyIjazah = async () => {
  if (!fileToCheck.value) return
  
  const formData = new FormData()
  formData.append('file', fileToCheck.value)

  try {
    console.log('Sending request to backend...')
    const response = await axios.post('https://verizh-chain.vercel.app/verify_ijazah', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 10000
    })
    
    console.log('Response received:', response.data)
    result.value = response.data
    
  } catch (error) {
    console.error('Verification error:', error)
    
    if (error.code === 'ECONNREFUSED') {
      result.value = {
        error: 'Tidak dapat terhubung ke server. Pastikan backend Flask berjalan di port 5000.'
      }
    } else if (error.response) {
      // Server responded with error status
      if (error.response.status === 404) {
        result.value = { status: 'INVALID' }
      } else if (error.response.status === 400) {
        result.value = { error: 'Format file tidak valid' }
      } else {
        result.value = { error: `Server error: ${error.response.status}` }
      }
    } else if (error.request) {
      // Request made but no response
      result.value = {
        error: 'Tidak ada respon dari server. Pastikan backend berjalan.'
      }
    } else {
      // Something else happened
      result.value = { error: 'Terjadi kesalahan saat verifikasi' }
    }
  } finally {
    isVerifying.value = false
    progress.value = 100
    estimatedTime.value = 0
  }
}

const copyHash = async (hash) => {
  if (!hash) return
  
  try {
    await navigator.clipboard.writeText(hash)
    alert('Hash berhasil disalin!')
  } catch (err) {
    console.error('Gagal menyalin hash:', err)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = hash
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('Hash berhasil disalin!')
  }
}

const resetVerification = () => {
  fileToCheck.value = null
  result.value = null
  isVerifying.value = false
  generatedHash.value = ''
  currentStep.value = 0
  progress.value = 0
  estimatedTime.value = 3
  
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const downloadCertificate = () => {
  if (!result.value || result.value.status !== 'VALID') return
  
  const certificate = {
    title: 'Sertifikat Verifikasi Ijazah Digital',
    student: result.value.data,
    timestamp: result.value.timestamp,
    hash: result.value.hash || result.value.pdf_hash,
    verifiedAt: new Date().toISOString(),
    institution: 'Verizh Blockchain Verification System'
  }
  
  const blob = new Blob([JSON.stringify(certificate, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `sertifikat-verifikasi-${result.value.data.nim}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatTimestamp = (timestamp) => {
  if (!timestamp) return '-'
  try {
    return new Date(timestamp * 1000).toLocaleString('id-ID', {
      dateStyle: 'full',
      timeStyle: 'medium'
    })
  } catch (e) {
    return 'Invalid date'
  }
}

const shortenHash = (hash) => {
  if (!hash) return ''
  if (hash.length <= 20) return hash
  return `${hash.substring(0, 10)}...${hash.substring(hash.length - 10)}`
}
</script>

<style scoped>
/* Base Styles */
.verify-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 20px;
  position: relative;
}

/* Admin Button */
.admin-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 12px 20px;
  border-radius: 50px;
  text-decoration: none;
  color: #374151;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 100;
  border: 1px solid #e5e7eb;
}

.admin-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  color: #4F46E5;
}

/* Main Container */
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 80px;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 60px;
  padding: 0 20px;
}

.header-content {
  max-width: 700px;
  margin: 0 auto;
}

.main-title {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.gradient-text {
  font-size: 3.5rem;
  font-weight: 800;
  color: #1F2937;
  line-height: 1.1;
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-sub {
  font-size: 1.5rem;
  font-weight: 600;
  color: #6B7280;
}

.header-description {
  font-size: 1.125rem;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 24px;
}

.header-badges {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 14px;
}

.badge.blockchain {
  background: rgba(79, 70, 229, 0.1);
  color: #4F46E5;
  border: 1px solid rgba(79, 70, 229, 0.2);
}

/* Main Content */
.main-content {
  max-width: 800px;
  margin: 0 auto;
}

/* Upload Card */
.upload-card {
  background: white;
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid #F3F4F6;
}

.card-header {
  text-align: center;
  margin-bottom: 40px;
}

.card-icon {
  margin-bottom: 20px;
}

.card-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 8px;
}

.card-header p {
  color: #6B7280;
  font-size: 1.125rem;
}

/* Upload Area */
.upload-area-wrapper {
  margin-bottom: 40px;
}

.upload-area {
  border: 3px dashed #D1D5DB;
  border-radius: 20px;
  padding: 60px 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #F9FAFB;
}

.upload-area:hover {
  border-color: #9CA3AF;
  background: #F3F4F6;
}

.upload-area.dragover {
  border-color: #4F46E5;
  background: #EEF2FF;
}

.hidden-input {
  display: none;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.upload-placeholder {
  text-align: center;
}

.placeholder-icon {
  margin-bottom: 20px;
  opacity: 0.5;
}

.placeholder-text h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.placeholder-text p {
  color: #6B7280;
  margin-bottom: 20px;
}

.file-specs {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.spec {
  background: #E5E7EB;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #4B5563;
}

/* File Preview */
.file-preview {
  width: 100%;
}

.preview-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.file-icon {
  flex-shrink: 0;
}

.file-info {
  flex: 1;
}

.file-info h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
  word-break: break-all;
}

.file-info p {
  color: #6B7280;
  font-size: 14px;
  margin: 0;
}

.remove-btn {
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: #E5E7EB;
  color: #EF4444;
}

.preview-footer {
  padding: 0 20px;
}

.hash-preview {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.hash-label {
  color: #6B7280;
  font-weight: 500;
}

.hash-value {
  font-family: 'Monaco', 'Consolas', monospace;
  color: #4F46E5;
  background: #F3F4F6;
  padding: 4px 8px;
  border-radius: 6px;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 16px;
}

.btn {
  flex: 1;
  padding: 16px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-primary {
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
  color: white;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.btn-primary:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
}

.btn-primary.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn-outline {
  background: white;
  color: #374151;
  border: 2px solid #D1D5DB;
}

.btn-outline:hover {
  background: #F9FAFB;
  border-color: #9CA3AF;
}

/* Verification Process */
.verification-process {
  margin-top: 20px;
}

.process-card {
  background: white;
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid #F3F4F6;
}

.process-header {
  text-align: center;
  margin-bottom: 48px;
}

.process-icon {
  position: relative;
  display: inline-block;
  margin-bottom: 24px;
}

.scanning-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  overflow: hidden;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #4F46E5, transparent);
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.process-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 8px;
}

.process-subtitle {
  color: #6B7280;
  font-size: 1.125rem;
}

/* Progress Steps */
.progress-steps {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}

.step {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #F9FAFB;
  border-radius: 16px;
  border: 2px solid #E5E7EB;
  transition: all 0.3s ease;
}

.step.active {
  border-color: #4F46E5;
  background: #EEF2FF;
}

.step.completed {
  border-color: #10B981;
  background: #ECFDF5;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #E5E7EB;
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: #4F46E5;
  color: white;
}

.step.completed .step-number {
  background: #10B981;
  color: white;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
}

.step-content p {
  color: #6B7280;
  font-size: 14px;
  margin: 0;
}

.step-status {
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #E5E7EB;
  transition: all 0.3s ease;
}

.step.active .step-dot {
  background: #4F46E5;
}

.step-dot.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

/* Progress Bar */
.progress-container {
  margin-bottom: 40px;
}

.progress-bar {
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
  position: relative;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, #4F46E5, #7C3AED);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-text {
  text-align: right;
  font-size: 14px;
  font-weight: 600;
  color: #4F46E5;
}

/* Hash Display */
.hash-display {
  background: #F9FAFB;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 32px;
  border: 1px solid #E5E7EB;
}

.hash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.hash-label {
  font-size: 14px;
  font-weight: 600;
  color: #6B7280;
}

.btn-copy {
  background: none;
  border: 1px solid #D1D5DB;
  color: #6B7280;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.btn-copy:hover {
  background: #E5E7EB;
  color: #4F46E5;
  border-color: #4F46E5;
}

.hash-value-container {
  background: white;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}

.hash-value-container code {
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 14px;
  color: #374151;
  word-break: break-all;
}

/* Time Estimate */
.time-estimate {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #F0F9FF;
  border-radius: 12px;
  border: 1px solid #BAE6FD;
}

.time-icon {
  font-size: 24px;
}

.time-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.time-label {
  font-size: 12px;
  color: #0369A1;
  font-weight: 500;
}

.time-value {
  font-size: 14px;
  font-weight: 600;
  color: #0369A1;
}

/* Result Section */
.result-section {
  margin-top: 20px;
}

.result-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
}

.result-card.valid {
  border-color: #10B981;
}

.result-card.invalid {
  border-color: #EF4444;
}

/* Result Header */
.result-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 40px;
  background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
  border-bottom: 1px solid #E5E7EB;
}

.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-circle.success {
  background: linear-gradient(135deg, #10B981, #059669);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.icon-circle.error {
  background: linear-gradient(135deg, #EF4444, #DC2626);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.result-title h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 8px;
}

.result-subtitle {
  color: #6B7280;
  font-size: 1.125rem;
  margin: 0;
}

/* Result Content */
.result-content {
  padding: 40px;
}

.info-section {
  margin-bottom: 40px;
}

.info-section h3,
.blockchain-section h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #F3F4F6;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-card {
  background: #F9FAFB;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
}

.info-label {
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.info-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1F2937;
}

.info-value.code {
  font-family: 'Monaco', 'Consolas', monospace;
  color: #4F46E5;
}

.gpa-display {
  display: flex;
  align-items: center;
  gap: 12px;
}

.gpa-bar {
  flex: 1;
  height: 6px;
  background: #E5E7EB;
  border-radius: 3px;
  overflow: hidden;
}

.gpa-fill {
  height: 100%;
  background: linear-gradient(90deg, #4F46E5, #7C3AED);
  border-radius: 3px;
  transition: width 1s ease;
}

.gpa-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1F2937;
  min-width: 40px;
}

/* Blockchain Section */
.blockchain-section {
  margin-bottom: 40px;
}

.blockchain-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.blockchain-item {
  background: #F9FAFB;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
}

.item-label {
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.item-value {
  font-size: 1rem;
  font-weight: 600;
  color: #1F2937;
}

.hash-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hash-code {
  flex: 1;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 14px;
  color: #4F46E5;
  word-break: break-all;
}

.hash-copy-btn {
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.2s;
}

.hash-copy-btn:hover {
  background: #E5E7EB;
  color: #4F46E5;
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.success {
  background: #D1FAE5;
  color: #065F46;
}

/* Invalid Content */
.invalid-content,
.error-content {
  padding: 40px;
}

.warning-card {
  display: flex;
  gap: 24px;
  padding: 32px;
  background: #FEF2F2;
  border-radius: 16px;
  border: 1px solid #FECACA;
}

.error-content .warning-card {
  background: #FEF3C7;
  border-color: #FDE68A;
}

.warning-icon {
  font-size: 2.5rem;
  color: #DC2626;
  flex-shrink: 0;
}

.error-content .warning-icon {
  color: #D97706;
}

.warning-content h3 {
  color: #DC2626;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.error-content .warning-content h3 {
  color: #D97706;
}

.warning-content p {
  color: #991B1B;
  margin-bottom: 16px;
  line-height: 1.6;
}

.error-content .warning-content p {
  color: #92400E;
}

.warning-content ul {
  color: #991B1B;
  padding-left: 20px;
  margin: 0;
}

.warning-content li {
  margin-bottom: 4px;
  font-size: 14px;
}

/* Result Actions */
.result-actions {
  display: flex;
  gap: 16px;
  padding: 32px 40px;
  border-top: 1px solid #E5E7EB;
  background: #F9FAFB;
}

.action-btn {
  flex: 1;
  padding: 16px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.action-btn.primary {
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
  color: white;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
}

.action-btn.secondary {
  background: white;
  color: #374151;
  border: 2px solid #D1D5DB;
}

.action-btn.secondary:hover {
  background: #F9FAFB;
  border-color: #9CA3AF;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-container {
    padding-top: 60px;
  }
  
  .gradient-text {
    font-size: 2.5rem;
  }
  
  .title-sub {
    font-size: 1.25rem;
  }
  
  .upload-card,
  .process-card {
    padding: 32px;
  }
  
  .upload-area {
    padding: 40px 24px;
  }
  
  .result-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 32px;
  }
  
  .result-content {
    padding: 32px;
  }
  
  .info-grid,
  .blockchain-grid {
    grid-template-columns: 1fr;
  }
  
  .result-actions {
    flex-direction: column;
    padding: 24px 32px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .admin-btn {
    top: 16px;
    right: 16px;
  }
  
  .admin-btn .admin-text {
    display: none;
  }
}

@media (max-width: 480px) {
  .gradient-text {
    font-size: 2rem;
  }
  
  .upload-card,
  .process-card {
    padding: 24px;
  }
  
  .upload-area {
    padding: 32px 20px;
  }
  
  .card-header h2 {
    font-size: 1.75rem;
  }
  
  .process-header h2 {
    font-size: 1.75rem;
  }
  
  .result-title h2 {
    font-size: 1.75rem;
  }
  
  .step {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .warning-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>