const express = require('express');
const admin = require('firebase-admin');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Init Firebase Admin (tanpa Storage)
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  serviceAccount = require("./serviceAccountKey.json");
}
if (!admin.apps.length) {
  admin.initializeApp({ 
    credential: admin.credential.cert(serviceAccount)
    // Tiada storage bucket
  });
}
const db = admin.firestore();

// Serve static
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
    if (err) res.sendFile(path.join(__dirname, 'index.html'));
  });
});

// API products
app.get('/api/products', async (req, res) => {
  try {
    const snapshot = await db.collection('products').get();
    const products = [];
    snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Gagal ambil produk" });
  }
});

// API stock
app.get('/api/stock', async (req, res) => {
  try {
    const snapshot = await db.collection('inventory').get();
    const stockMap = {};
    snapshot.forEach(doc => { stockMap[doc.id] = doc.data().stock; });
    res.json(stockMap);
  } catch (error) {
    res.json({});
  }
});

// API orders + tolak stok (tanpa upload resit)
app.post('/api/orders', async (req, res) => {
  try {
    const { customer, items, totalAmount, paymentDetails, shipping } = req.body;
    if (!customer || !items || !totalAmount) {
      return res.status(400).json({ success: false, message: "Data tidak lengkap" });
    }

    // Transaction to reduce stock and save order
    await db.runTransaction(async (transaction) => {
      const stockRefs = [];
      for (const item of items) {
        const key = `${item.prodId}_${item.size}_${item.type}`.replace(/\s/g, '_');
        const docRef = db.collection('inventory').doc(key);
        const doc = await transaction.get(docRef);
        if (!doc.exists) {
          transaction.set(docRef, { stock: 100, initialStock: 100 });
          stockRefs.push({ docRef, newStock: 100 - item.qty });
        } else {
          const currentStock = doc.data().stock;
          if (currentStock < item.qty) throw new Error(`Stok ${item.prodName} tidak cukup`);
          stockRefs.push({ docRef, newStock: currentStock - item.qty });
        }
      }
      for (const { docRef, newStock } of stockRefs) {
        transaction.update(docRef, { stock: newStock });
      }
      const orderId = `ORD-${Date.now()}`;
      const newOrder = {
        orderId, customer, items, totalAmount: parseFloat(totalAmount),
        status: paymentDetails?.payLater ? 'Pay Later' : 'Pending Verification',
        delivery_status: 'Unfulfilled', shipping: shipping || {},
        paymentDetails: { ...paymentDetails, receiptData: null },
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };
      transaction.set(db.collection('orders').doc(orderId), newOrder);
    });

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));