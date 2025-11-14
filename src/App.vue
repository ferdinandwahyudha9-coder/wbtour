<template>
  <div class="min-h-screen flex flex-col bg-gray-50">

    <!-- NAVBAR -->
    <header class="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
      <div class="mx-auto max-w-6xl px-4 h-20 flex items-center justify-between">

        <!-- LOGO -->
        <RouterLink to="/" class="flex items-center gap-3">
          <img :src="logo" alt="Logo WBT" class="h-20 w-auto object-contain" />
        </RouterLink>

        <nav class="flex items-center gap-6 text-[15px] font-medium text-gray-700">

          <!-- SCROLL LINKS -->
          <a @click.prevent="goSection('home')" class="hover:text-green-600 cursor-pointer">Home</a>
          <RouterLink to="/packages" class="hover:text-green-600">Paket</RouterLink>
          <a @click.prevent="goSection('about')" class="hover:text-green-600 cursor-pointer">Tentang Kami</a>
          <a @click.prevent="goSection('contact')" class="hover:text-green-600 cursor-pointer">Kontak</a>
          <a @click.prevent="goSection('blog')" class="hover:text-green-600 cursor-pointer">Blog</a>

          <!-- Keranjang (langsung ke halaman /cart) -->
          <RouterLink to="/cart" class="hover:text-green-600 cursor-pointer">
            Keranjang ({{ cartCount }})
          </RouterLink>

        </nav>
      </div>
    </header>

    <!-- HALAMAN ROUTER -->
    <main
      class="flex-1"
      :class="route.path === '/' ? '' : 'mx-auto max-w-6xl px-4 py-6'"
    >
      <RouterView @added="showToast" />
    </main>

    <!-- FOOTER -->
    <footer class="bg-gray-900 text-gray-300 pt-10 mt-10">

      <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <img :src="logo" alt="Logo WBT" class="h-16 mb-3" />
          <p class="text-sm leading-relaxed">
            Wahyu Bandung Tour – Teman perjalanan terbaik Anda untuk menjelajahi Bandung & sekitarnya.
          </p>
        </div>

        <div>
          <h2 class="font-semibold text-white mb-3">Navigasi</h2>
          <ul class="space-y-2 text-sm">
            <li><a @click.prevent="goSection('home')" class="hover:text-white cursor-pointer">Home</a></li>
            <li><RouterLink to="/packages" class="hover:text-white">Paket</RouterLink></li>
            <li><RouterLink to="/cart" class="hover:text-white">Keranjang</RouterLink></li>
          </ul>
        </div>

        <div id="contact">
          <h2 class="font-semibold text-white mb-3">Kontak</h2>
          <ul class="space-y-2 text-sm">
            <li>Email: wb.tour@gmail.com</li>
            <li>Telepon: 0822-2722-7039</li>
            <li>
              <a :href="waFooter" target="_blank" class="text-green-400 hover:text-green-300">
                WhatsApp Kami →
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div class="text-center text-gray-500 text-xs mt-8 border-t border-gray-800 py-4">
        © {{ new Date().getFullYear() }} Wahyu Bandung Tour
      </div>

    </footer>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from './stores/keranjang'
import { getWhatsAppLink } from './utils/wa'
import logo from './assets/wbtour.png'

const router = useRouter()
const route = useRoute()

// Fungsi scroll halaman
function goSection(id) {
  if (route.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 350)
    })
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

// Keranjang
const cart = useCartStore()
const cartCount = computed(() => cart.items.length)

// WA Footer
const waFooter = `https://wa.me/6282227227039?text=${encodeURIComponent(
  'Halo, saya ingin tanya paket di Wahyu Bandung Tour.'
)}`

// Toast
const toastVisible = ref(false)
function showToast() {
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 1500)
}
</script>

<style>
body {
  background: #f8f8f8;
}
</style>
