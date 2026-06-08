// ----------------------------------------------------
// API 1: Ambil Semua Data Produk dari Firestore
// ----------------------------------------------------
app.get('/api/products', async (req, res) => {
  try {
    console.log("📥 Menerima permintaan untuk senarai produk...");
    const productsSnapshot = await db.collection('products').get();
    
    if (productsSnapshot.empty) {
      return res.status(200).json([]); // Pulangkan array kosong jika tiada produk
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