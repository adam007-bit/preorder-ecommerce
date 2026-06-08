// test.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/products', (req, res) => {
  res.json({ message: 'Success! The API route is working.' });
});

app.listen(port, () => {
  console.log(`Test server listening on port ${port}`);
});