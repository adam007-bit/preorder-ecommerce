const express = require('express');
const admin = require('firebase-admin');
const path = require('path'); 

// 1. Isytiharkan 'app' terlebih dahulu di sini!
const app = express();
app.use(express.json());

// 2. Setup CORS (Menggunakan 'app' yang telah diisytiharkan di atas)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// 3. Inisialisasi Firebase Admin
const serviceAccount = require("./serviceAccountKey.json");
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}
const db = admin.firestore();

console.log("🔥 Backend sedia untuk Pengesahan Bayaran Manual (Tanpa Storage)!");

// ----------------------------------------------------
// API 1: Ambil Semua Data Produk dari Firestore
// ----------------------------------------------------
app.get('/api/products', async (req, res) => {
  try {
    console.log("📥 Menerima permintaan untuk senarai produk...");
    const productsSnapshot = await db.collection('products').get();
    
    if (productsSnapshot.empty) {
      return res.status(200).json([]);
    }

    const products = [];
    productsSnapshot.forEach(doc => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error("❌ Ralat mengambil data produk:", error);
    return res.status(500).json({ success: false, message: "Gagal mengambil data produk." });
  }
});

// ... Sambungan kod app.use(express.static...) dan app.post('/api/orders') anda di bawah ...