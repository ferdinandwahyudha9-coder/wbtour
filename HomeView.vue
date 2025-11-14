<template>
  <div class="overflow-x-hidden">

    <!-- HERO SECTION -->
    <section id="home" class="relative w-screen h-[calc(100vh-56px)] overflow-hidden">
      <img
        :src="heroUrl"
        alt="Hero"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/40"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
      >
        <h1 class="mb-6 text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          Mulai Rencanakan Perjalananmu 🌍
        </h1>

        <div
          class="flex w-11/12 md:w-2/3 lg:w-1/2 bg-white rounded-full overflow-hidden shadow-2xl"
        >
          <input
            v-model="q"
            type="text"
            placeholder="Cari destinasi atau paket..."
            class="flex-1 px-5 py-3 text-gray-700 outline-none"
            @keyup.enter="goSearch"
          />
          <button
            class="px-6 py-3 bg-green-600 text-white font-semibold hover:bg-green-700 transition-all"
            @click="goSearch"
          >
            Search
          </button>
        </div>
      </div>
    </section>

    <!-- PRODUK UNGGULAN -->
    <section class="bg-gray-50 py-16 px-6 md:px-12 text-center">
      <h2 class="text-3xl font-bold mb-10 text-gray-800">Paket Populer</h2>

      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <div
          v-for="(pkg, i) in featured"
          :key="i"
          class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <img
            :src="pkg.image"
            alt=""
            class="h-52 w-full object-cover cursor-pointer"
            @click="goDetail(pkg)"
          />

          <div class="p-5 text-left">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              {{ pkg.name }}
            </h3>
            <p class="text-gray-600 mb-4">{{ pkg.desc }}</p>
            <div class="flex gap-2">
              <button
                class="px-5 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700"
                @click="router.push({ name: 'packages', query: { q: pkg.name } })"
              >
                Lihat Paket
              </button>
              <a
                :href="getWhatsAppLink(pkg)"
                target="_blank"
                class="px-5 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600"
              >
                Pesan via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL DETAIL PAKET -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
        @click="closeModal"
      >
        <div
          class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative"
          @click.stop
        >
          <h2 class="text-2xl font-bold mb-3 text-gray-800">
            {{ selectedPackage.name }}
          </h2>

          <img
            :src="selectedPackage.image"
            class="w-full h-48 object-cover rounded-xl mb-4"
          />

          <p class="text-gray-600 mb-6">
            {{ selectedPackage.desc }}
          </p>

          <button
            class="px-5 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700"
            @click="closeModal"
          >
            Tutup
          </button>
        </div>
      </div>
    </section>

    <!-- TENTANG KAMI -->
    <section id="about" class="bg-white py-20 px-6 md:px-12 border-t">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1500&auto=format&fit=crop"
          class="w-full md:w-1/2 rounded-3xl shadow-lg object-cover"
        />
        <div class="flex-1 text-gray-700">
          <h2 class="text-3xl font-bold mb-4 text-gray-800">Tentang Kami</h2>
          <p class="mb-4 leading-relaxed">
            <strong>Wbtour</strong> adalah partner perjalanan Anda dalam
            mewujudkan liburan impian. Kami menyediakan berbagai pilihan paket
            wisata terbaik dengan harga bersahabat dan pelayanan profesional.
          </p>
          <p class="mb-6 leading-relaxed">
            Dengan jaringan luas dan pengalaman bertahun-tahun, kami siap
            membantu Anda menjelajahi keindahan dunia dengan aman dan nyaman.
          </p>
          <button class="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all">
            Hubungi Kami
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const q = ref("");
const showModal = ref(false);
const selectedPackage = ref({});

function openModal(pkg) {
  selectedPackage.value = pkg;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-');
}

function goDetail(pkg) {
  router.push({
    name: "package-detail",
    params: { slug: slugify(pkg.name) }
  });
}

function goSearch() {
  router.push({ name: 'packages', query: { q: q.value || "" } });
}

// Fungsi pembuat link WhatsApp aman
function getWhatsAppLink(pkg) {
  const phone = "082227227039";
  const text = `
Halo, saya ingin memesan paket ini:
====================
*${pkg.name || "-"}*
Harga: ${pkg.price || "-"}
Jumlah: 1
Foto: ${pkg.image || "-"}
====================
  `;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

const heroUrl = ref(
  "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2000&auto=format&fit=crop"
);

// Semua paket lengkap dengan name, price, image
const featured = [
  {
    name: "Bali Getaway",
    desc: "Nikmati liburan tropis di Bali dengan akomodasi terbaik.",
    price: 1850000,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Tour Yogyakarta",
    desc: "Jelajahi budaya dan alam Yogyakarta yang memukau.",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Labuan Bajo",
    desc: "Nikmati keindahan komodo dan pulau-pulau eksotis.",
    price: 2500000,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1000&auto=format&fit=crop",
  },
];
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

@media (max-width: 640px) {
  #home h1 {
    font-size: 1.9rem;
    line-height: 1.3;
    padding: 0 10px;
  }

  #home input {
    padding: 10px 14px;
    font-size: 0.9rem;
  }

  #home button {
    padding: 10px 16px;
    font-size: 0.9rem;
  }

  section .grid {
    grid-template-columns: 1fr !important;
  }

  section .grid > div {
    margin: 0 auto;
    width: 100%;
  }
}
</style>
