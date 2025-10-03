// 引入 Express 模組
const express = require('express');

// 創建 Express 應用程式實例
const app = express();

// 定義端口號
const PORT = 3000;

// 定義根路由,回傳 "Hello World"
app.get('/', (req, res) => {
  res.send('Hello World');
});

// 額外的路由範例
app.get('/api/info', (req, res) => {
  res.json({
    message: 'Hello World API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop the server`);
});

// 優雅地處理關閉
process.on('SIGINT', () => {
  console.log('\nServer is shutting down...');
  process.exit(0);
});