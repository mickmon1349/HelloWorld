const express = require('express');

const app = express();

// 使用環境變數PORT，無設定時預設3000
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World in SanChung');
});

app.get('/api/info', (req, res) => {
  res.json({
    message: 'Hello World API',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop the server`);
});

process.on('SIGINT', () => {
  console.log('\nServer is shutting down...');
  process.exit(0);
});
