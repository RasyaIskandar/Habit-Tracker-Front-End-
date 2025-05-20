# Frontend UMKM Web App

Frontend aplikasi UMKM berbasis React dan Vite. Terhubung dengan backend Laravel melalui API endpoint. Dibangun untuk memberikan antarmuka yang cepat, ringan, dan responsif bagi pengguna UMKM.

---

## 🚀 Teknologi yang Digunakan

- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/) - untuk request API
- [Tailwind CSS](https://tailwindcss.com/) - untuk styling

---

## 🛠️ Langkah Install & Menjalankan Frontend

### 1. Masuk ke Folder Frontend
```bash
cd frontend

npm install

npm run dev
http://localhost:5173

🌐 Koneksi ke Backend Laravel
Pastikan backend Laravel sudah berjalan di http://127.0.0.1:8000.
VITE_API_BASE_URL=http://127.0.0.1:8000/api

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

export default api

api.get('/products').then((res) => {
  console.log(res.data)
})

frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── api.js
├── .env
├── index.html
├── package.json
└── vite.config.js

🖼️ Screenshot Tampilan Aplikasi
Beranda

Halaman Produk

📄 Lisensi
Project ini menggunakan lisensi MIT.
Silakan digunakan dan dikembangkan sesuai kebutuhan.


---

### Catatan:
- File `.env` di frontend digunakan untuk menyimpan URL API Laravel.
- Gambar screenshot mengarah ke folder `../screenshots/`, yang sebaiknya berada di root project bersama folder `backend/` dan `frontend/`.
- Jika kamu belum buat struktur komponen atau halaman, bisa aku bantu scaffold juga.

Perlu versi bahasa Inggris? Atau mau aku bantu generate struktur file React lengkap juga?

Cek atau buat file .env di folder frontend (kalau belum ada), lalu tambahkan:
