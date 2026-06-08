const express = require('express');
const app = express();

app.get('/api/products', (req, res) => {
  res.json([{ id: "test", name: "Test Product" }]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Running on port ${PORT}`));