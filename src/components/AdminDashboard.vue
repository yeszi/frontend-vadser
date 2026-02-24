<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Navbar Modern -->
    <nav class="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h1 class="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">VeriZh Chain Admin</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-xl">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span class="text-sm font-medium text-indigo-700">{{ username }}</span>
            </div>
            <button @click="logout" class="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Connection Status Card -->
        <div v-if="connectionStatus" 
             :class="connectionStatus.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-yellow-500 to-amber-500'" 
             class="mb-6 p-4 rounded-xl shadow-lg text-white transform hover:scale-[1.02] transition-transform duration-200">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg v-if="connectionStatus.type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium">{{ connectionStatus.message }}</p>
            </div>
          </div>
        </div>

        <!-- Main Card -->
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Issue New Certificate</h2>
            <div class="flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full">
              <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span class="text-xs text-indigo-700 font-medium">Blockchain Ready</span>
            </div>
          </div>
          
          <!-- FORM 8 FIELD -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Nama Event -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Nama Event <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-indigo-500">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </span>
                <input 
                  v-model="form.nama_event" 
                  type="text" 
                  class="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="Contoh: Wisuda Periode I 2024"
                  required
                />
              </div>
            </div>
            
            <!-- Nama Lokasi -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Nama Lokasi <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-indigo-500">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </span>
                <input 
                  v-model="form.nama_lokasi" 
                  type="text" 
                  class="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="Contoh: Auditorium UMRAH"
                  required
                />
              </div>
            </div>
            
            <!-- Latitude dengan GPS -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Latitude <span class="text-red-500">*</span>
                <button 
                  @click="getCurrentLocation" 
                  type="button"
                  class="ml-2 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors"
                >
                  📍 GPS
                </button>
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2 2 2 4-4 2 2 4-4 2 2 2-2"></path>
                  </svg>
                </span>
                <input 
                  v-model="form.latitude" 
                  type="text" 
                  class="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="Contoh: 0.9174839"
                  required
                />
              </div>
            </div>
            
            <!-- Longitude dengan GPS -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Longitude <span class="text-red-500">*</span>
                <button 
                  @click="getCurrentLocation" 
                  type="button"
                  class="ml-2 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors"
                >
                  📍 GPS
                </button>
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2 2 2 4-4 2 2 4-4 2 2 2-2"></path>
                  </svg>
                </span>
                <input 
                  v-model="form.longitude" 
                  type="text" 
                  class="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="Contoh: 104.4567281"
                  required
                />
              </div>
            </div>
            
            <!-- Waktu Mulai -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Waktu Mulai <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.waktu_mulai" 
                type="datetime-local" 
                class="w-full px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                required
              />
            </div>
            
            <!-- Waktu Selesai -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Waktu Selesai <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.waktu_selesai" 
                type="datetime-local" 
                class="w-full px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                required
              />
            </div>
            
            <!-- Nama Peserta -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Nama Peserta <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.nama_peserta" 
                type="text" 
                class="w-full px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                placeholder="Contoh: Grayesi Silitonga"
                required
              />
            </div>
            
            <!-- Keterangan -->
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Keterangan <span class="text-red-500">*</span>
              </label>
              <textarea 
                v-model="form.keterangan" 
                rows="4"
                class="w-full px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none"
                placeholder="Tambahkan keterangan..."
                required
              ></textarea>
            </div>
          </div>

          <!-- Info Field -->
          <div class="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <p class="text-sm font-medium text-indigo-900"><strong>8 Field wajib:</strong> nama_event, nama_lokasi, latitude, longitude, waktu_mulai, waktu_selesai, nama_peserta, keterangan</p>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl animate-shake">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-red-700 text-sm whitespace-pre-line">{{ error }}</p>
            </div>
          </div>
          
          <!-- Success Message -->
          <div v-if="success" class="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-xl">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p class="text-green-700 text-sm">{{ success }}</p>
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            @click="submitCertificate" 
            :disabled="loading"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-4 rounded-xl disabled:opacity-50 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing on Blockchain...
            </span>
            <span v-else class="flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Generate Blockchain Certificate
            </span>
          </button>

          <!-- Certificate Result Card -->
          <div v-if="certificateResult" class="mt-8 animate-slideUp">
            <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-indigo-100 shadow-xl">
              <!-- Header Sukses -->
              <div class="text-center mb-6">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-4 shadow-lg">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-green-600">Certificate Generated Successfully!</h3>
                <p class="text-sm text-gray-500 mt-1">Sertifikat telah diamankan ke Blockchain</p>
              </div>

              <!-- DATA SERTIFIKAT -->
              <div class="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm">
                <h4 class="font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Certificate Details
                </h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div class="bg-gray-50 p-3 rounded-lg">
                    <span class="text-gray-500 block text-xs">Nama Event</span>
                    <span class="font-semibold text-gray-800">{{ certificateResult.nama_event || '-' }}</span>
                  </div>
                  <div class="bg-gray-50 p-3 rounded-lg">
                    <span class="text-gray-500 block text-xs">Nama Lokasi</span>
                    <span class="font-semibold text-gray-800">{{ certificateResult.nama_lokasi || '-' }}</span>
                  </div>
                  <div class="bg-gray-50 p-3 rounded-lg">
                    <span class="text-gray-500 block text-xs">Latitude</span>
                    <span class="font-semibold text-gray-800">{{ certificateResult.latitude || '-' }}</span>
                  </div>
                  <div class="bg-gray-50 p-3 rounded-lg">
                    <span class="text-gray-500 block text-xs">Longitude</span>
                    <span class="font-semibold text-gray-800">{{ certificateResult.longitude || '-' }}</span>
                  </div>
                  <div class="bg-gray-50 p-3 rounded-lg">
                    <span class="text-gray-500 block text-xs">Waktu Mulai</span>
                    <span class="font-semibold text-gray-800">{{ formatDate(certificateResult.waktu_mulai) }}</span>
                  </div>
                  <div class="bg-gray-50 p-3 rounded-lg">
                    <span class="text-gray-500 block text-xs">Waktu Selesai</span>
                    <span class="font-semibold text-gray-800">{{ formatDate(certificateResult.waktu_selesai) }}</span>
                  </div>
                  <div class="bg-gray-50 p-3 rounded-lg">
                    <span class="text-gray-500 block text-xs">Nama Peserta</span>
                    <span class="font-semibold text-gray-800">{{ certificateResult.nama_peserta || '-' }}</span>
                  </div>
                  <div class="col-span-2 bg-gray-50 p-3 rounded-lg">
                    <span class="text-gray-500 block text-xs">Keterangan</span>
                    <span class="font-semibold text-gray-800">{{ certificateResult.keterangan || '-' }}</span>
                  </div>
                </div>
              </div>

              <!-- HASH DAN QR CODE -->
              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <!-- Bagian Kiri: Hash Info -->
                <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
                  <h4 class="font-semibold text-indigo-900 mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                    Blockchain Info
                  </h4>
                  <div class="space-y-3">
                    <div>
                      <label class="text-xs text-indigo-700 font-medium block mb-1">Current Hash (SHA-256)</label>
                      <div class="font-mono text-xs break-all bg-white/80 p-3 rounded-lg border border-indigo-200">
                        {{ certificateResult.cert_hash }}
                      </div>
                    </div>
                    <div>
                      <label class="text-xs text-indigo-700 font-medium block mb-1">Previous Hash</label>
                      <div class="font-mono text-xs break-all bg-white/80 p-3 rounded-lg border border-indigo-200">
                        {{ certificateResult.previous_hash || '0' }}
                      </div>
                    </div>
                    <div>
                      <label class="text-xs text-indigo-700 font-medium block mb-1">Timestamp</label>
                      <div class="text-sm font-medium text-indigo-900">
                        {{ new Date().toLocaleString('id-ID') }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bagian Kanan: QR Code -->
                <div class="bg-white rounded-xl p-5 border-2 border-dashed border-indigo-300 shadow-inner">
                  <h4 class="font-semibold text-gray-800 mb-3 text-center">Scan to Verify</h4>
                  <div class="flex justify-center">
                    <qrcode-vue 
                      :value="verificationUrl" 
                      :size="160" 
                      level="H" 
                      class="mx-auto p-2 bg-white rounded-lg shadow-md"
                    />
                  </div>
                  <p class="text-center text-xs text-gray-500 mt-2">
                    Gunakan QR code untuk verifikasi cepat
                  </p>
                </div>
              </div>

              <!-- VERIFICATION LINK -->
              <div class="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <label class="text-xs text-blue-700 font-medium block mb-2">🔗 Verification Link</label>
                <div class="flex items-center gap-2 bg-white rounded-lg p-1">
                  <a 
                    :href="verificationUrl" 
                    target="_blank" 
                    class="text-blue-600 hover:underline text-sm break-all flex-1 px-3 py-2"
                  >
                    {{ verificationUrl }}
                  </a>
                  <button 
                    @click="copyToClipboard(verificationUrl)" 
                    class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    Copy Link
                  </button>
                </div>
              </div>

              <!-- BUTTON RESET -->
              <div class="mt-6 text-center">
                <button 
                  @click="resetForm" 
                  class="text-sm text-gray-500 hover:text-indigo-600 transition-colors flex items-center justify-center mx-auto"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Buat Sertifikat Baru
                </button>
              </div>
            </div>
          </div>
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
      API_URL: 'https://vadser-chain.vercel.app',
      FRONTEND_URL: 'https://vadser.vercel.app',
      connectionStatus: null
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
      // Show toast notification
      this.showToast('URL copied to clipboard!', 'success')
    },
    
    showToast(message, type = 'success') {
      // Simple alert for now, you can implement a proper toast component
      alert(message)
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
          this.showToast('Lokasi berhasil didapatkan!', 'success')
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
    
    async testConnection() {
      try {
        const res = await axios.get(`${this.API_URL}/chain`)
        this.connectionStatus = {
          type: 'success',
          message: `✅ Connected to blockchain! Total blocks: ${res.data.length || 0}`
        }
        setTimeout(() => {
          this.connectionStatus = null
        }, 5000)
      } catch (err) {
        this.connectionStatus = {
          type: 'error',
          message: `❌ Cannot connect to backend: ${err.message}`
        }
      }
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
      
      const lat = parseFloat(this.form.latitude.replace(',', '.'))
      const lng = parseFloat(this.form.longitude.replace(',', '.'))
      
      if (isNaN(lat) || lat < -90 || lat > 90) {
        throw new Error('❌ Latitude harus angka antara -90 dan 90')
      }
      
      if (isNaN(lng) || lng < -180 || lng > 180) {
        throw new Error('❌ Longitude harus angka antara -180 dan 180')
      }
      
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
        
        console.log('📤 Mengirim data ke:', `${this.API_URL}/issue-sertifikat`)
        console.log('📦 Data:', postData)
        
        const response = await axios.post(`${this.API_URL}/issue-sertifikat`, postData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        })
        
        console.log('✅ Response:', response.data)
        
        if (response.data.success) {
          this.certificateResult = {
            ...postData,
            cert_hash: response.data.hash,
            previous_hash: response.data.previous_hash || '0'
          }
          
          this.verificationUrl = `${this.FRONTEND_URL}/verify/${response.data.hash}`
          
          this.success = '✅ Sertifikat berhasil dibuat!'
          
          // Auto scroll to certificate
          setTimeout(() => {
            document.querySelector('.certificate-result')?.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        }
        
      } catch (err) {
        console.error('❌ Error:', err)
        
        if (err.response) {
          this.error = `❌ Error ${err.response.status}: ${JSON.stringify(err.response.data)}`
        } else if (err.request) {
          this.error = '❌ Tidak ada response dari server. Tapi data MUNGKIN sudah masuk!'
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
    } else {
      this.testConnection()
    }
  }
}
</script>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideUp {
  animation: slideUp 0.5s ease-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.6s;
}
</style>