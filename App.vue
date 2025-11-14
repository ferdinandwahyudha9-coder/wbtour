<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
  <!-- NAVBAR -->
<header class="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">

  <div class="mx-auto max-w-6xl px-4 h-20 flex items-center justify-between md:justify-start">

    <!-- HAMBURGER MOBILE -->
    <button
      @click="mobileOpen = !mobileOpen"
      class="md:hidden text-3xl text-gray-700"
    >
      ☰
    </button>

    <!-- LOGO (CENTER DI MOBILE, NORMAL DI DESKTOP) -->
    <RouterLink
      to="/"
      class="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center"
    >
      <img :src="logo" alt="Logo WBT" class="h-16 md:h-20 w-auto object-contain" />
    </RouterLink>

    <!-- MENU DESKTOP -->
    <nav class="hidden md:flex items-center gap-6 text-[15px] font-medium text-gray-700 ml-auto">

      <a @click.prevent="goSection('home')" class="hover:text-green-600 cursor-pointer">Home</a>
      <RouterLink to="/packages" class="hover:text-green-600">Paket</RouterLink>
      <a @click.prevent="goSection('about')" class="hover:text-green-600 cursor-pointer">Tentang Kami</a>
      <a @click.prevent="goSection('contact')" class="hover:text-green-600 cursor-pointer">Kontak</a>
      <a @click.prevent="goSection('blog')" class="hover:text-green-600 cursor-pointer">Blog</a>

      <button @click="router.push('/cart')" class="hover:text-green-600">
        Keranjang ({{ cartCount }})
      </button>
    </nav>
  </div>

  <!-- MENU MOBILE -->
  <transition name="slide">
    <div
      v-if="mobileOpen"
      class="md:hidden bg-white border-b shadow px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium"
    >
      <a @click.prevent="goMobile('home')" class="hover:text-green-600 cursor-pointer">Home</a>
      <RouterLink @click="closeMobile" to="/packages" class="hover:text-green-600">Paket</RouterLink>
      <a @click.prevent="goMobile('about')" class="hover:text-green-600 cursor-pointer">Tentang Kami</a>
      <a @click.prevent="goMobile('contact')" class="hover:text-green-600 cursor-pointer">Kontak</a>
      <a @click.prevent="goMobile('blog')" class="hover:text-green-600 cursor-pointer">Blog</a>

      <button @click="goCart" class="hover:text-green-600 text-left">
        Keranjang ({{ cartCount }})
      </button>
    </div>
  </transition>
</header>
              

    <!-- HALAMAN ROUTER -->
    <main class="flex-1" :class="route.path === '/' ? '' : 'mx-auto max-w-6xl px-4 py-6'">
      <RouterView @added="showToast" />

      <!-- CART POPUP (optional) -->
      <transition name="slide-cart">
        <div v-if="showCart" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-end z-20" @click.self="showCart = false">
          <div class="w-80 bg-white h-full p-5 shadow-xl overflow-y-auto">
            <h2 class="text-lg font-semibold mb-4">Keranjang Anda</h2>

            <template v-if="cart.items.length">
              <div v-for="(item, i) in cart.items" :key="i" class="border-b pb-4 mb-4">
                <!-- Nama Paket -->
                <p class="font-semibold text-green-700 text-lg">
                  {{ item.name }}
                </p>

                <!-- Harga -->
                <p class="text-gray-700 font-medium mb-2">Rp {{ item.price.toLocaleString() }}</p>

                <!-- Keterangan Paket -->
                <p class="text-sm text-gray-600 whitespace-pre-line mb-3">
                  {{ item.description }}
                </p>

                <!-- Tombol Pilih Paket -->
                <a :href="getWhatsAppLink(pkg)" target="_blank" class="block w-full text-center bg-green-600 text-white py-2 rounded-lg mb-2"> Pilih Paket Ini </a>

                <!-- Lihat Detail -->
                <RouterLink :to="'/packages/' + item.slug" class="block w-full text-center bg-gray-200 text-gray-700 py-2 rounded-lg" @click="showCart = false"> Lihat Detail Paket </RouterLink>
              </div>
            </template>

            <p v-else class="text-gray-600 text-sm text-center">Keranjang masih kosong.</p>

            <button @click="showCart = false" class="mt-5 w-full py-2 bg-red-500 text-white rounded-lg">Tutup</button>
          </div>
        </div>
      </transition>
    </main>

    <!-- FOOTER -->
    <footer class="bg-gray-900 text-gray-300 pt-10 mt-10">
      <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img :src="logo" alt="Logo WBT" class="h-16 mb-3" />
          <p class="text-sm leading-relaxed">Wahyu Bandung Tour – Teman perjalanan terbaik Anda untuk menjelajahi Bandung & sekitarnya.</p>
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
            <li>Telepon: 082227227039</li>
            <li>
              <a :href="waFooter" target="_blank" class="text-green-400 hover:text-green-300"> WhatsApp Kami → </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="text-center text-gray-500 text-xs mt-8 border-t border-gray-800 py-4">© {{ new Date().getFullYear() }} Wahyu Bandung Tour</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCartStore } from "./stores/keranjang";
import { getWhatsAppLink } from "./utils/wa";
import logo from "./assets/wbtour.png";
const mobileOpen = ref(false);

function closeMobile() {
  mobileOpen.value = false;
}

function goMobile(id) {
  mobileOpen.value = false;
  goSection(id);
}

function goCart() {
  mobileOpen.value = false;
  router.push("/cart");
}


const router = useRouter();
const route = useRoute();

function goSection(id) {
  if (route.path !== "/") {
    router.push("/").then(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
}

const cart = useCartStore();
const cartCount = computed(() => cart.items.length);

const showCart = ref(false);

// Normalisasi nomor WA
function normalizePhoneForWa(raw) {
  if (!raw) return "";
  let digits = String(raw).replace(/\D/g, "");
  if (digits.startsWith("0")) digits = "62" + digits.slice(1);
  return digits.replace(/^\+/, "");
}

function buildWaLink(phoneRaw, message) {
  const phone = normalizePhoneForWa(phoneRaw || "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message || "")}`;
}

const waNumber = import.meta.env.VITE_WA_NUMBER || "+6282227227039";
const waFooter = computed(() => {
  const msg = "Halo, saya ingin tanya paket di Wahyu Bandung Tour.";
  return buildWaLink(waNumber, msg);
});

const toastVisible = ref(false);
function showToast() {
  toastVisible.value = true;
  setTimeout(() => (toastVisible.value = false), 1500);
}
</script>

<style>
body {
  background: #f8f8f8;
}
.slide-cart-enter-from,
.slide-cart-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-cart-enter-active,
.slide-cart-leave-active {
  transition: all 0.3s ease;
}

.slide-cart-enter-to,
.slide-cart-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
