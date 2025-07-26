// script.js
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
