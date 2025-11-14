import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { formatIDR } from '../data/packages'

export const useCartStore = defineStore('cart', () => {
  const saved = localStorage.getItem('cart-items')
  const items = ref(saved ? JSON.parse(saved) : [])

  watch(items, (v) => localStorage.setItem('cart-items', JSON.stringify(v)), { deep: true })

  // ADD item (paket)
  function add(pkg) {
    // Standarisasi agar cart selalu punya data yg benar
    const newItem = {
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      img: pkg.img,                 // <-- wajib agar foto muncul
      slug: pkg.slug,
      description: pkg.description || '',
      quantity: pkg.quantity || 1
    }

    if (!items.value.find(i => i.id === newItem.id)) {
      items.value.push(newItem)
    }
  }

  // REMOVE item menggunakan index
  function remove(index) {
    items.value.splice(index, 1)
  }

  function clear() {
    items.value = []
  }

  const total = computed(() => items.value.reduce((s, p) => s + p.price, 0))
  const totalFormatted = computed(() => formatIDR(total.value))

  return { items, add, remove, clear, total, totalFormatted }
})
