import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PackagesView from '../views/PackagesView.vue'
import PackageDetailView from '../views/PackageDetailView.vue'
import CartView from '../views/CartView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/packages', name: 'packages', component: PackagesView },

  // DETAIL PAKET — gunakan dynamic slug
  { 
    path: '/packages/:slug', 
    name: 'package-detail', 
    component: PackageDetailView 
  },

  { path: '/cart', name: 'cart', component: CartView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
