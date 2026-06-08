const admin = require('firebase-admin');

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  try {
    const snapshot = await db.collection('inventory').get();
    const stockMap = {};
    snapshot.forEach(doc => {
      stockMap[doc.id] = doc.data().stock;
    });
    res.status(200).json(stockMap);
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({ error: 'Gagal mengambil stok' });
  }
};