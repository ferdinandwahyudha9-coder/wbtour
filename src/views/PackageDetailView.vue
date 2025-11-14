<template>
  <div v-if="pkg" class="pb-20">

    <!-- HERO -->
    <section class="relative w-full h-64 md:h-96">
      <img :src="pkg.thumbnailLarge || pkg.thumbnail"
           class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/40"></div>

      <div class="absolute inset-0 flex flex-col justify-center text-center text-white px-4">
        <h1 class="text-3xl md:text-4xl font-bold mb-2">
          {{ pkg.title }}
        </h1>
        <p class="text-lg opacity-90">
          {{ pkg.city }} • {{ pkg.days }} Hari {{ pkg.nights }} Malam
        </p>
        <p class="mt-3 text-2xl font-extrabold text-green-300">
          {{ formatIDR(pkg.price) }}/pax
        </p>
      </div>
    </section>

    <!-- INCLUDE / EXCLUDE -->
    <section class="max-w-5xl mx-auto p-4 grid md:grid-cols-3 gap-6">

      <!-- INCLUDE -->
      <div class="md:col-span-2">
        <h2 class="text-xl font-bold mb-2 border-b pb-1">Include:</h2>
        <ul class="space-y-1 text-gray-700">
          <li v-for="(inc, i) in pkg.includes" :key="i">• {{ inc }}</li>
        </ul>

        <h2 class="text-xl font-bold mt-6 mb-2 border-b pb-1">Exclude:</h2>
        <ul class="space-y-1 text-gray-700">
          <li v-for="(exc, i) in pkg.excludes" :key="i">• {{ exc }}</li>
        </ul>
      </div>

      <!-- ⭐ PRICE BOX -->
      <div class="md:col-span-1">
        <div class="p-5 rounded-xl shadow-md bg-white border">

          <p class="text-lg font-semibold">
            Mulai <span class="text-yellow-600">{{ formatIDR(pkg.price) }}</span>
          </p>

          <div class="mt-3 space-y-2 text-sm text-gray-600">
            <p class="flex items-center gap-2">
              📅 Pesan sekarang untuk keberangkatan besok
            </p>
            <p class="flex items-center gap-2">
              💰 Jaminan Harga Terbaik
            </p>
          </div>

          <!-- WhatsApp -->
          <button
            @click="order"
            class="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition"
          >
            PESAN SEKARANG!
          </button>

          <!-- Keranjang -->
          <button
            @click="addToCart"
            class="w-full mt-2 bg-gray-800 hover:bg-black text-white py-3 rounded-lg transition"
          >
            TAMBAH KE KERANJANG
          </button>

        </div>
      </div>
      <!-- ⭐ END PRICE BOX -->
    </section>

    <!-- ITINERARY -->
    <section class="max-w-5xl mx-auto p-4 mt-6">
      <div class="flex gap-3 border-b">
        <button @click="tab = 'itinerary'"
                :class="tabBtn('itinerary')">ITINERARY</button>

        <button @click="tab = 'harga'"
                :class="tabBtn('harga')">HARGA</button>
      </div>

      <!-- TAB ITINERARY -->
      <div v-if="tab === 'itinerary'" class="mt-5 space-y-6">
        <div v-for="(day, index) in pkg.itinerary" :key="index" class="p-4 border rounded-lg">
          <h3 class="text-lg font-bold mb-2">Day {{ index + 1 }}</h3>
          <ul class="list-disc ml-5 space-y-1">
            <li v-for="(item, i2) in day" :key="i2">{{ item }}</li>
          </ul>
        </div>
      </div>

      <!-- TAB HARGA -->
      <div v-if="tab === 'harga'" class="mt-5">
        <div class="p-4 border rounded-lg">
          <h3 class="text-lg font-bold mb-3">Harga Paket Wisata</h3>

          <div v-for="(opt, idx) in pkg.priceOptions" :key="idx"
               class="flex justify-between border-b pb-2 mb-2">
            <span>{{ opt.name }}</span>
            <span class="font-bold text-green-700">{{ formatIDR(opt.price) }}</span>
          </div>
        </div>
      </div>
    </section>

    <div class="text-center mt-10">
      <RouterLink to="/packages" class="text-blue-600 underline">← Kembali</RouterLink>
    </div>
  </div>

  <div v-else class="p-10 text-center">
    <h1 class="text-2xl font-bold">Paket Tidak Ditemukan</h1>
    <RouterLink to="/packages" class="text-blue-600 underline mt-2 block">← Kembali</RouterLink>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { packages, formatIDR } from '@/data/packages'
import { useCartStore } from '@/stores/keranjang'
import { getWhatsAppLink } from '@/utils/wa'
import { ref } from 'vue'

const route = useRoute()
const pkg = packages.find(p => p.slug === route.params.slug)

const cart = useCartStore()
const tab = ref('itinerary')

function addToCart() {
  cart.add(pkg)
}

function order() {
  const msg = `Halo admin, saya tertarik paket ${pkg.title} (${pkg.days}H${pkg.nights}M) dengan harga ${formatIDR(pkg.price)}`
  window.open(waLink(import.meta.env.VITE_WA_NUMBER, msg), '_blank')
}

const tabBtn = t => `
  px-4 py-2 border-b-2 
  ${tab.value === t ? 'border-green-600 text-green-600 font-semibold'
                    : 'border-transparent text-gray-500'}
`
</script>

<style scoped>
button {
  transition: 0.2s;
}
</style>
