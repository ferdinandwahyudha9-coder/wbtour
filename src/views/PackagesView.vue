<template>
  <section class="space-y-3">
    <h1 class="text-2xl font-bold">Semua Paket</h1>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <PackageCard v-for="p in packages" :key="p.id" :pkg="p" />
    </div>
  </section>
</template>
<script setup>
import PackageCard from '../components/PackageCard.vue'
import { packages } from '../data/packages'
</script>
