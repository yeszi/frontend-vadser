import { createRouter, createWebHistory } from 'vue-router'
import PublicVerify from '../views/PublicVerify.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PublicVerify
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard,
    meta: { requiresAuth: true } // Menandai halaman ini butuh login
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Penjaga Pintu (Navigation Guard)
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated');

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Kalau mau ke Admin tapi belum login, tendang ke Login
    next('/login');
  } else {
    next();
  }
});

export default router