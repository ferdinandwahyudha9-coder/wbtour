// src/utils/wa.js
export function getWhatsAppLink(pkg) {
  const phoneRaw = "082227227039";
  let phone = phoneRaw.replace(/\D/g,'');
  if(phone.startsWith("0")) phone = "62" + phone.slice(1);

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
