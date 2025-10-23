# 使用官方 Node.js 18 LTS 版本作為基礎映像
FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴套件 (只安裝生產環境依賴)
RUN npm ci --omit=dev

# 複製所有應用程式檔案
COPY . .

# 暴露端口 3000
EXPOSE 3000

# 設定環境變數
ENV NODE_ENV=production

# 啟動應用程式
CMD ["node", "index.js"]