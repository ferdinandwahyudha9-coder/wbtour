<template>
  <article class="card">

    <!-- Klik gambar → masuk detail paket -->
    <router-link
      :to="{ name: 'package-detail', params: { slug: pkg.slug } }"
    >
      <img
        :src="pkg.thumbnail"
        :alt="pkg.title"
        class="h-44 w-full object-cover cursor-pointer"
      />
    </router-link>

    <div class="p-4 space-y-2">

      <div class="text-xs text-gray-500">
        {{ pkg.city }} • {{ pkg.days }}H{{ pkg.nights }}M
      </div>

      <!-- Judul juga bisa diklik ke detail paket -->
      <router-link
        :to="{ name: 'package-detail', params: { slug: pkg.slug } }"
        class="text-lg font-bold hover:underline block"
      >
        {{ pkg.title }}
      </router-link>

      <div class="text-base font-extrabold">
        {{ formatIDR(pkg.price) }}
      </div>

      <p class="text-sm text-gray-600">
        Highlight: {{ pkg.highlights.join(', ') }}
      </p>

      <div class="flex gap-2 pt-2">
        <button class="btn btn-ghost" @click="addToCart">
          Tambah ke Keranjang
        </button>
        <button class="btn btn-primary" @click="order">
          Pesan via WA
        </button>
      </div>

    </div>
  </article>
</template>

<script setup>
import { useCartStore } from '../stores/keranjang'
import { getWhatsAppLink } from '../utils/wa'
import { formatIDR } from '../data/packages'

const props = defineProps({ pkg: Object })
const cart = useCartStore()

function addToCart() {
  cart.add(props.pkg)
}

function order() {
  const msg = `Halo admin, saya tertarik paket ${props.pkg.title} (${props.pkg.days}H${props.pkg.nights}M) harga ${formatIDR(props.pkg.price)}`
  window.open(waLink(import.meta.env.VITE_WA_NUMBER, msg), '_blank')
}
</script>
