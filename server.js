const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Serve static
app.use(express.static(path.join(__dirname, 'public')));

// API products - TEST (data statik)
app.get('/api/products', (req, res) => {
  console.log("GET /api/products called");
  res.json([
    { id: "test1", name: "Test Product", category: "Test", variations: [{ size: "10mg", type: "Kit", price: 100 }] }
  ]);
});

// API stock
app.get('/api/stock', (req, res) => {
  res.json({});
});

// API orders
app.post('/api/orders', (req, res) => {
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));