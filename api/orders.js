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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customer, items, totalAmount, paymentDetails, shipping } = req.body;

    if (!customer || !items || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Data tidak lengkap' });
    }

    // Use Firestore transaction to update stock and save order
    await db.runTransaction(async (transaction) => {
      const stockRefs = [];

      // Check and prepare stock updates
      for (const item of items) {
        const key = `${item.prodId}_${item.size}_${item.type}`.replace(/\s/g, '_');
        const docRef = db.collection('inventory').doc(key);
        const doc = await transaction.get(docRef);

        if (!doc.exists) {
          // Create new inventory with stock 100 if not exists
          transaction.set(docRef, { stock: 100, initialStock: 100 });
          stockRefs.push({ docRef, newStock: 100 - item.qty });
        } else {
          const currentStock = doc.data().stock;
          if (currentStock < item.qty) {
            throw new Error(`Stok ${item.prodName} (${item.size} - ${item.type}) tidak mencukupi`);
          }
          stockRefs.push({ docRef, newStock: currentStock - item.qty });
        }
      }

      // Apply stock updates
      for (const { docRef, newStock } of stockRefs) {
        transaction.update(docRef, { stock: newStock });
      }

      // Create order document
      const orderId = `ORD-${Date.now()}`;
      const newOrder = {
        orderId,
        customer,
        items,
        totalAmount: parseFloat(totalAmount),
        status: paymentDetails?.payLater ? 'Pay Later' : 'Pending Verification',
        delivery_status: 'Unfulfilled',
        shipping: shipping || {},
        paymentDetails: {
          ...paymentDetails,
          receiptData: null // we don't store base64 receipt in DB
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      transaction.set(db.collection('orders').doc(orderId), newOrder);
    });

    res.status(201).json({ success: true, message: 'Order saved successfully' });
  } catch (error) {
    console.error('Order error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};