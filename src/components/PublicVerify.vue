<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">VeriZh Chain</h1>
        <p class="text-gray-600">Digital Certificate Verification</p>
      </div>
      
      <!-- Loading -->
      <div v-if="loading" class="text-center py-8">
        <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600">Verifying certificate on blockchain...</p>
      </div>
      
      <!-- Error -->
      <div v-else-if="error" class="text-center py-8">
        <div class="text-red-500 text-6xl mb-4">✗</div>
        <h2 class="text-xl font-bold text-red-600 mb-2">Invalid Certificate</h2>
        <p class="text-gray-600 mb-4">{{ error }}</p>
      </div>
      
      <!-- Success -->
      <div v-else-if="certificate" class="text-center">
        <div class="text-green-500 text-6xl mb-4">✓</div>
        <h2 class="text-xl font-bold text-green-600 mb-2">Certificate Valid</h2>
        <p class="text-gray-600 mb-6">{{ certificate.message || 'Verified on Blockchain' }}</p>
        
        <div class="border-t border-b border-gray-200 py-6">
          <h3 class="text-lg font-semibold mb-4">Certificate Details</h3>
          
          <!-- Grid untuk 8 metadata -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div class="bg-gray-50 p-3 rounded">
              <label class="block text-xs text-gray-500 uppercase mb-1">Nama Event</label>
              <p class="font-semibold">{{ certificate.nama_event || '-' }}</p>
            </div>
            
            <div class="bg-gray-50 p-3 rounded">
              <label class="block text-xs text-gray-500 uppercase mb-1">Nama Lokasi</label>
              <p class="font-semibold">{{ certificate.nama_lokasi || '-' }}</p>
            </div>
            
            <div class="bg-gray-50 p-3 rounded">
              <label class="block text-xs text-gray-500 uppercase mb-1">Latitude</label>
              <p class="font-semibold">{{ formatCoordinate(certificate.latitude) }}</p>
            </div>
            
            <div class="bg-gray-50 p-3 rounded">
              <label class="block text-xs text-gray-500 uppercase mb-1">Longitude</label>
              <p class="font-semibold">{{ formatCoordinate(certificate.longitude) }}</p>
            </div>
            
            <div class="bg-gray-50 p-3 rounded">
              <label class="block text-xs text-gray-500 uppercase mb-1">Waktu Mulai</label>
              <p class="font-semibold">{{ formatDate(certificate.waktu_mulai) }}</p>
            </div>
            
            <div class="bg-gray-50 p-3 rounded">
              <label class="block text-xs text-gray-500 uppercase mb-1">Waktu Selesai</label>
              <p class="font-semibold">{{ formatDate(certificate.waktu_selesai) }}</p>
            </div>
            
            <div class="bg-gray-50 p-3 rounded">
              <label class="block text-xs text-gray-500 uppercase mb-1">Nama Peserta</label>
              <p class="font-semibold">{{ certificate.nama_peserta || '-' }}</p>
            </div>
            
            <div class="md:col-span-2 bg-gray-50 p-3 rounded">
              <label class="block text-xs text-gray-500 uppercase mb-1">Keterangan</label>
              <p class="font-semibold">{{ certificate.keterangan || '-' }}</p>
            </div>
          </div>
          
          <!-- Blockchain Hashes -->
          <div class="mt-6 space-y-3">
            <div class="p-3 bg-gray-100 rounded-md">
              <label class="block text-xs text-gray-500 uppercase mb-1">Current Hash (SHA-256)</label>
              <p class="font-mono text-xs break-all">{{ certificate.cert_hash }}</p>
            </div>
            
            <div class="p-3 bg-gray-100 rounded-md">
              <label class="block text-xs text-gray-500 uppercase mb-1">Previous Hash</label>
              <p class="font-mono text-xs break-all">{{ certificate.previous_hash || 'Genesis Block' }}</p>
            </div>
          </div>
        </div>
        
        <!-- QR Code for this certificate -->
        <div class="mt-6">
          <p class="text-sm text-gray-600 mb-2">Scan to verify again</p>
          <div class="flex justify-center">
            <qrcode-vue :value="currentUrl" :size="150" level="H" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import QrcodeVue from 'qrcode.vue'
import API_BASE_URL from '../config/api'

export default {
  name: 'PublicVerify',
  components: {
    QrcodeVue
  },
  setup() {
    const route = useRoute()
    const certificate = ref(null)
    const loading = ref(true)
    const error = ref(null)
    
    const hash = computed(() => route.params.hash)
    const currentUrl = computed(() => window.location.href)
    
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
    
    const formatCoordinate = (coord) => {
      if (coord === null || coord === undefined) return '-'
      return Number(coord).toFixed(6)
    }
    
    onMounted(async () => {
      try {
        if (!hash.value) {
          throw new Error('No hash provided')
        }
        
        console.log('🔍 Verifying hash:', hash.value)
        console.log('📡 API URL:', `${API_BASE_URL}/verify/${hash.value}`)
        
        const response = await axios.get(`${API_BASE_URL}/verify/${hash.value}`)
        
        console.log('✅ Verification response:', response.data)
        
        if (response.data.status === 'VALID') {
          certificate.value = response.data.data
        } else {
          error.value = response.data.message || 'Certificate not found'
        }
        
      } catch (err) {
        console.error('❌ Verification error:', err)
        
        if (err.response) {
          if (err.response.status === 404) {
            error.value = err.response.data.message || 'Certificate not found'
          } else {
            error.value = err.response.data.message || 'Verification failed'
          }
        } else {
          error.value = err.message
        }
      } finally {
        loading.value = false
      }
    })
    
    return {
      certificate,
      loading,
      error,
      hash,
      currentUrl,
      formatDate,
      formatCoordinate
    }
  }
}
</script>