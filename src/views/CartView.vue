<template>
  <div class="min-h-screen py-10">

    <h1 class="text-3xl font-bold mb-6">Keranjang Anda</h1>

    <div v-if="cart.items.length" class="space-y-5">

      <div
        v-for="item in cart.items"
        :key="item.id"
        class="flex gap-4 bg-white p-4 shadow rounded-lg"
      >

        <!-- Foto -->
        <img
          :src="item.thumbnail"
          alt="Foto Paket"
          class="w-28 h-20 object-cover rounded-lg"
        />

        <!-- Detail -->
        <div class="flex-1">

          <p class="text-xl font-semibold">{{ item.title }}</p>

          <p class="text-green-700 font-medium mb-1">
            Rp {{ item.price.toLocaleString() }}
          </p>

          <p class="text-gray-600 text-sm">
            {{ item.city }} • {{ item.days }}H{{ item.nights }}M
          </p>

          <div class="mt-3 flex gap-3">

            <!-- WA -->
            <a
              :href="getWhatsAppLink(item)"
              target="_blank"
              class="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Pilih Paket Ini
            </a>

            <!-- Detail link -->
            <RouterLink
              :to="'/packages/' + item.slug"
              class="bg-gray-200 px-4 py-2 rounded-md"
            >
              Detail Paket
            </RouterLink>

          </div>
        </div>

        <!-- Hapus -->
        <button
          @click="cart.remove(item.id)"
          class="text-red-500 text-xl"
        >
          ✕
        </button>

      </div>

      <!-- Pesan Semua -->
      <a
        :href="waAll"
        target="_blank"
        class="block w-full bg-green-700 text-white text-center py-3 rounded-lg mt-6 text-lg"
      >
        Pesan Semua via WhatsApp
      </a>
    </div>

    <p v-else class="text-gray-500 text-center text-lg">
      Keranjang Anda masih kosong.
    </p>

  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "../stores/keranjang";
import { getWhatsAppLink } from "../utils/wa";

const cart = useCartStore();

// WA semua item
const waAll = computed(() => {
  let msg = "Halo, saya ingin memesan paket berikut:\n\n";

  cart.items.forEach((item) => {
    msg += `• ${item.title} - Rp ${item.price.toLocaleString()}\n`;
  });

  return `https://wa.me/6282227227039?text=${encodeURIComponent(msg)}`;
});
</script>
