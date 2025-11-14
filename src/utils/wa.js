export function getWhatsAppLink(item) {
  if (!item || typeof item !== 'object') {
    return "#";
  }

  const name = item.name || item.title || "Paket Tidak Dikenal";
  const price = item.price || 0;
  const qty = item.quantity || 1;
  const img = item.img || item.thumbnail || "";

  const text = `
📦 *${name}*
💰 Harga: Rp ${price.toLocaleString()}
🔢 Jumlah: ${qty}
🖼 Foto: ${img || "Tidak tersedia"}
  `;

  const phone = import.meta.env.VITE_WA_NUMBER || "082227227039";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
