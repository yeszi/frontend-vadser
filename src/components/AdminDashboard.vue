<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-800">VeriZh Chain - Admin</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">{{ username }}</span>
            <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-2xl font-bold mb-6">Issue New Certificate</h2>
          
          <!-- FORM 8 FIELD -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Nama Event -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nama Event <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.nama_event" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Wisuda Periode I 2024"
                required
              />
            </div>
            
            <!-- Nama Lokasi -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nama Lokasi <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.nama_lokasi" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Auditorium UMRAH"
                required
              />
            </div>
            
            <!-- Latitude dengan GPS -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Latitude <span class="text-red-500">*</span>
                <button 
                  @click="getCurrentLocation" 
                  type="button"
                  class="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                >
                  📍 GPS
                </button>
              </label>
              <input 
                v-model="form.latitude" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: 0.9174839"
                required
              />
            </div>
            
            <!-- Longitude dengan GPS -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Longitude <span class="text-red-500">*</span>
                <button 
                  @click="getCurrentLocation" 
                  type="button"
                  class="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                >
                  📍 GPS
                </button>
              </label>
              <input 
                v-model="form.longitude" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: 104.4567281"
                required
              />
            </div>
            
            <!-- Waktu Mulai -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Waktu Mulai <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.waktu_mulai" 
                type="datetime-local" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <!-- Waktu Selesai -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Waktu Selesai <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.waktu_selesai" 
                type="datetime-local" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <!-- Nama Peserta -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nama Peserta <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.nama_peserta" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Grayesi Silitonga"
                required
              />
            </div>
            
            <!-- Keterangan -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Keterangan <span class="text-red-500">*</span>
              </label>
              <textarea 
                v-model="form.keterangan" 
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tambahkan keterangan..."
                required
              ></textarea>
            </div>
          </div>

          <!-- Info Field -->
          <div class="mb-4 p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
            <strong>8 Field wajib:</strong> nama_event, nama_lokasi, latitude, longitude, waktu_mulai, waktu_selesai, nama_peserta, keterangan
          </div>

          <!-- Error Message -->
          <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded-md whitespace-pre-line">
            {{ error }}
          </div>
          
          <!-- Success Message -->
          <div v-if="success" class="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {{ success }}
          </div>

          <!-- Submit Button -->
          <button 
            @click="submitCertificate" 
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            <span v-if="loading">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
            <span v-else>Generate Blockchain Certificate</span>
          </button>

          <!-- ========== BAGIAN SERTIFIKAT DENGAN URL VERCEL ========== -->
          <div v-if="certificateResult" class="mt-8 p-6 bg-gray-50 rounded-md border border-gray-200">
            <!-- Header Sukses -->
            <div class="text-center mb-6">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-green-700">✅ CERTIFICATE GENERATED!</h3>
              <p class="text-sm text-gray-500 mt-1">Sertifikat berhasil diamankan ke Blockchain</p>
            </div>

            <!-- DATA SERTIFIKAT (8 FIELD) -->
            <div class="bg-white rounded-lg p-4 mb-4 border border-gray-200">
              <h4 class="font-semibold text-gray-700 mb-3 pb-2 border-b">📋 DATA SERTIFIKAT</h4>
              <div class="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span class="text-gray-500 block text-xs">Nama Event</span>
                  <span class="font-medium">{{ certificateResult.nama_event || '-' }}</span>
                </div>
                <div>
                  <span class="text-gray-500 block text-xs">Nama Lokasi</span>
                  <span class="font-medium">{{ certificateResult.nama_lokasi || '-' }}</span>
                </div>
                <div>
                  <span class="text-gray-500 block text-xs">Latitude</span>
                  <span class="font-medium">{{ certificateResult.latitude || '-' }}</span>
                </div>
                <div>
                  <span class="text-gray-500 block text-xs">Longitude</span>
                  <span class="font-medium">{{ certificateResult.longitude || '-' }}</span>
                </div>
                <div>
                  <span class="text-gray-500 block text-xs">Waktu Mulai</span>
                  <span class="font-medium">{{ formatDate(certificateResult.waktu_mulai) }}</span>
                </div>
                <div>
                  <span class="text-gray-500 block text-xs">Waktu Selesai</span>
                  <span class="font-medium">{{ formatDate(certificateResult.waktu_selesai) }}</span>
                </div>
                <div>
                  <span class="text-gray-500 block text-xs">Nama Peserta</span>
                  <span class="font-medium">{{ certificateResult.nama_peserta || '-' }}</span>
                </div>
                <div class="col-span-2">
                  <span class="text-gray-500 block text-xs">Keterangan</span>
                  <span class="font-medium">{{ certificateResult.keterangan || '-' }}</span>
                </div>
              </div>
            </div>

            <!-- HASH DAN QR CODE -->
            <div class="grid md:grid-cols-2 gap-4">
              <!-- Bagian Kiri: Hash Info -->
              <div class="bg-gray-100 rounded-lg p-4">
                <h4 class="font-semibold text-gray-700 mb-3">🔗 BLOCKCHAIN INFO</h4>
                <div class="space-y-3">
                  <div>
                    <label class="text-xs text-gray-500 block">Current Hash (SHA-256)</label>
                    <div class="font-mono text-xs break-all bg-white p-2 rounded border">
                      {{ certificateResult.cert_hash }}
                    </div>
                  </div>
                  <div>
                    <label class="text-xs text-gray-500 block">Previous Hash</label>
                    <div class="font-mono text-xs break-all bg-white p-2 rounded border">
                      {{ certificateResult.previous_hash || '0' }}
                    </div>
                  </div>
                  <div>
                    <label class="text-xs text-gray-500 block">Timestamp</label>
                    <div class="text-sm">
                      {{ new Date().toLocaleString('id-ID') }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bagian Kanan: QR Code -->
              <div class="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300">
                <h4 class="font-semibold text-gray-700 mb-3 text-center">📱 QR CODE</h4>
                <div class="flex justify-center">
                  <qrcode-vue 
                    :value="verificationUrl" 
                    :size="180" 
                    level="H" 
                    class="mx-auto"
                  />
                </div>
                <p class="text-center text-xs text-gray-500 mt-2">
                  Scan untuk verifikasi
                </p>
              </div>
            </div>

            <!-- VERIFICATION LINK (PASTIKAN INI PAKAI URL VERCEL) -->
            <div class="mt-4 p-3 bg-blue-50 rounded-lg">
              <label class="text-xs text-gray-500 block mb-1">🔗 VERIFICATION LINK</label>
              <div class="flex items-center gap-2">
                <a 
                  :href="verificationUrl" 
                  target="_blank" 
                  class="text-blue-600 hover:underline text-sm break-all flex-1"
                >
                  {{ verificationUrl }}
                </a>
                <button 
                  @click="copyToClipboard(verificationUrl)" 
                  class="bg-white hover:bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm border"
                >
                  Copy
                </button>
              </div>
            </div>

            <!-- BUTTON RESET -->
            <div class="mt-4 text-center">
              <button 
                @click="resetForm" 
                class="text-sm text-gray-500 hover:text-gray-700"
              >
                ↻ Buat Sertifikat Baru
              </button>
            </div>
          </div>
          <!-- ========== END BAGIAN SERTIFIKAT ========== -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import axios from 'axios'

export default {
  name: 'AdminDashboard',
  components: {
    QrcodeVue
  },
  data() {
    return {
      form: {
        nama_event: '',
        nama_lokasi: '',
        latitude: '',
        longitude: '',
        waktu_mulai: '',
        waktu_selesai: '',
        nama_peserta: '',
        keterangan: ''
      },
      loading: false,
      error: null,
      success: null,
      certificateResult: null,
      verificationUrl: '',
      username: 'Admin',
      API_URL: 'https://verizh-chain.vercel.app',  
      FRONTEND_URL: 'https://verizh.vercel.app'  
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/')
    },
    
    formatDate(datetime) {
      if (!datetime) return '-'
      try {
        const date = new Date(datetime)
        return date.toLocaleString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      } catch {
        return datetime
      }
    },
    
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
      alert('URL copied to clipboard!')
    },
    
    getCurrentLocation() {
      if (!navigator.geolocation) {
        alert('Browser tidak mendukung GPS')
        return
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.form.latitude = position.coords.latitude.toString()
          this.form.longitude = position.coords.longitude.toString()
        },
        (error) => {
          alert('Gagal mendapatkan lokasi: ' + error.message)
        }
      )
    },
    
    resetForm() {
      this.form = {
        nama_event: '',
        nama_lokasi: '',
        latitude: '',
        longitude: '',
        waktu_mulai: '',
        waktu_selesai: '',
        nama_peserta: '',
        keterangan: ''
      }
      this.certificateResult = null
      this.verificationUrl = ''
      this.error = null
      this.success = null
    },
    
    validateForm() {
      const required = [
        'nama_event', 'nama_lokasi', 'latitude', 'longitude', 
        'waktu_mulai', 'waktu_selesai', 'nama_peserta', 'keterangan'
      ]
      
      for (const field of required) {
        if (!this.form[field] || this.form[field].trim() === '') {
          throw new Error(`❌ ${field.replace(/_/g, ' ')} wajib diisi!`)
        }
      }
      
      // Validasi latitude/longitude
      const lat = parseFloat(this.form.latitude.replace(',', '.'))
      const lng = parseFloat(this.form.longitude.replace(',', '.'))
      
      if (isNaN(lat) || lat < -90 || lat > 90) {
        throw new Error('❌ Latitude harus angka antara -90 dan 90')
      }
      
      if (isNaN(lng) || lng < -180 || lng > 180) {
        throw new Error('❌ Longitude harus angka antara -180 dan 180')
      }
      
      // Validasi waktu
      const mulai = new Date(this.form.waktu_mulai)
      const selesai = new Date(this.form.waktu_selesai)
      
      if (selesai <= mulai) {
        throw new Error('❌ Waktu selesai harus setelah waktu mulai')
      }
    },
    
    async submitCertificate() {
      try {
        this.error = null
        this.success = null
        this.certificateResult = null
        this.validateForm()
        
        this.loading = true
        
        const token = localStorage.getItem('token')
        if (!token) throw new Error('❌ Silakan login ulang')
        
        // Data yang dikirim
        const postData = {
          nama_event: this.form.nama_event.trim(),
          nama_lokasi: this.form.nama_lokasi.trim(),
          latitude: parseFloat(this.form.latitude.replace(',', '.')),
          longitude: parseFloat(this.form.longitude.replace(',', '.')),
          waktu_mulai: this.form.waktu_mulai,
          waktu_selesai: this.form.waktu_selesai,
          nama_peserta: this.form.nama_peserta.trim(),
          keterangan: this.form.keterangan.trim()
        }
        
        console.log('📤 Mengirim data:', postData)
        
        // Kirim ke backend
        const response = await axios.post(`${this.API_URL}/issue-sertifikat`, postData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        })
        
        console.log('✅ Response:', response.data)
        
        if (response.data.success) {
          // SET DATA SERTIFIKAT DENGAN LENGKAP
          this.certificateResult = {
            ...postData,
            cert_hash: response.data.hash,
            previous_hash: response.data.previous_hash || '0'
          }
          
          // 🔥 PERBAIKAN UTAMA: PAKAI FRONTEND_URL, BUKAN WINDOW.LOCATION.ORIGIN
          this.verificationUrl = `${this.FRONTEND_URL}/verify/${response.data.hash}`
          
          this.success = '✅ Sertifikat berhasil dibuat!'
        }
        
      } catch (err) {
        console.error('❌ Error:', err)
        
        if (err.response) {
          this.error = `❌ Error ${err.response.status}: ${JSON.stringify(err.response.data)}`
        } else if (err.request) {
          this.error = '❌ Tidak ada response dari server. Tapi data MUNGKIN sudah masuk!'
          // Tampilkan data sementara untuk testing
          const dummyHash = 'HASH-' + Date.now()
          this.certificateResult = {
            ...this.form,
            cert_hash: dummyHash,
            previous_hash: '0'
          }
          this.verificationUrl = `${this.FRONTEND_URL}/verify/${dummyHash}`
        } else {
          this.error = `❌ ${err.message}`
        }
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
/* Animasi loading */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>