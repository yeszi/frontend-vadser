<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Main Card -->
    <div class="relative max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-block p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">VeriZh Chain</h1>
        <p class="text-gray-500 mt-2">Digital Certificate Verification</p>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="relative">
          <div class="w-24 h-24 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <svg class="w-12 h-12 text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
        </div>
        <p class="text-gray-600 text-lg">Verifying certificate on blockchain...</p>
        <p class="text-gray-400 text-sm mt-2">Please wait while we validate the authenticity</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8">
        <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-red-600 mb-3">Invalid Certificate</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button @click="goBack" class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
          Go Back
        </button>
      </div>
      
      <!-- Success State -->
      <div v-else-if="certificate" class="text-center">
        <!-- Success Animation -->
        <div class="relative mb-6">
          <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-32 h-32 border-4 border-green-200 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold text-green-600 mb-2">Certificate Valid</h2>
        <p class="text-gray-500 mb-8">Verified on Blockchain • {{ new Date().toLocaleDateString('id-ID') }}</p>
        
        <!-- Certificate Details Card -->
        <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 mb-6 border border-gray-200 shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">
            <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Certificate Details
          </h3>
          
          <!-- Grid untuk 8 metadata -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label class="block text-xs text-gray-500 uppercase mb-1">Nama Event</label>
              <p class="font-semibold text-gray-800">{{ certificate.nama_event || '-' }}</p>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label class="block text-xs text-gray-500 uppercase mb-1">Nama Lokasi</label>
              <p class="font-semibold text-gray-800">{{ certificate.nama_lokasi || '-' }}</p>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label class="block text-xs text-gray-500 uppercase mb-1">Latitude</label>
              <p class="font-semibold text-gray-800">{{ certificate.latitude || '-' }}</p>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label class="block text-xs text-gray-500 uppercase mb-1">Longitude</label>
              <p class="font-semibold text-gray-800">{{ certificate.longitude || '-' }}</p>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label class="block text-xs text-gray-500 uppercase mb-1">Waktu Mulai</label>
              <p class="font-semibold text-gray-800">{{ formatDate(certificate.waktu_mulai) }}</p>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label class="block text-xs text-gray-500 uppercase mb-1">Waktu Selesai</label>
              <p class="font-semibold text-gray-800">{{ formatDate(certificate.waktu_selesai) }}</p>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label class="block text-xs text-gray-500 uppercase mb-1">Nama Peserta</label>
              <p class="font-semibold text-gray-800">{{ certificate.nama_peserta || '-' }}</p>
            </div>
            
            <div class="md:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label class="block text-xs text-gray-500 uppercase mb-1">Keterangan</label>
              <p class="font-semibold text-gray-800">{{ certificate.keterangan || '-' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Blockchain Hashes Card -->
        <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h4 class="font-semibold text-indigo-900 mb-4 flex items-center justify-center">
            <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
            Blockchain Hashes
          </h4>
          <div class="space-y-3">
            <div class="p-4 bg-white/80 rounded-lg border border-indigo-200">
              <label class="block text-xs text-indigo-700 font-medium uppercase mb-2">Current Hash (SHA-256)</label>
              <p class="font-mono text-xs break-all text-gray-800">{{ certificate.cert_hash }}</p>
            </div>
            
            <div class="p-4 bg-white/80 rounded-lg border border-indigo-200">
              <label class="block text-xs text-indigo-700 font-medium uppercase mb-2">Previous Hash</label>
              <p class="font-mono text-xs break-all text-gray-800">{{ certificate.previous_hash || 'Genesis Block' }}</p>
            </div>
          </div>
        </div>

        <!-- Verification Badge -->
        <div class="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
          <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Verified by VeriZh Chain Blockchain</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'PublicVerify',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const certificate = ref(null)
    const loading = ref(true)
    const error = ref(null)
    
    const API_URL = 'https://vadser-chain.vercel.app'
    
    const formatDate = (dateString) => {
      if (!dateString) return '-'
      try {
        const date = new Date(dateString)
        return date.toLocaleString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      } catch {
        return dateString
      }
    }

    const goBack = () => {
      router.push('/')
    }
    
    onMounted(async () => {
      try {
        const hash = route.params.hash
        if (!hash) throw new Error('No hash provided')
        
        const response = await axios.get(`${API_URL}/verify/${hash}`)
        
        if (response.data.status === 'VALID') {
          certificate.value = response.data.data
        } else {
          error.value = response.data.message || 'Certificate not found'
        }
      } catch (err) {
        error.value = err.response?.data?.message || err.message
      } finally {
        loading.value = false
      }
    })
    
    return {
      certificate,
      loading,
      error,
      formatDate,
      goBack
    }
  }
}
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>