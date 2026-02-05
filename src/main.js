import './assets/main.css' // (Opsional, jika baris ini error, hapus saja)

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Pastikan baris ini ada!

const app = createApp(App)

app.use(router) // Pastikan baris ini ada!
app.mount('#app')