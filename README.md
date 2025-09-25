# 🎬 Movie-Database

一個基於 **React + TypeScript + Vite** 開發的電影資料庫應用，支援電影搜尋、收藏清單、排序、抽籤隨機選片、電影詳細資訊等功能。專案已部署於 GitHub Pages：
👉 [Movie Database Demo](https://hsuwayne.github.io/Movie-Database)

## 🚀 功能特色

- **電影搜尋**：透過 TMDB API 搜尋電影。
- **收藏待看清單**：將電影加入或移除收藏。
- **排序功能**：支援依照上映日期、評分、片名排序。
- **隨機抽籤 (Lottery)**：提供隨機抽選功能，幫助選擇要看的電影。
- **電影詳細資訊**：點擊卡片開啟 Modal 顯示完整資訊。

## 🛠️ 技術棧

- **React 19 + TypeScript 5**
- **Vite**：開發與打包工具
- **Ant Design**：UI 元件庫
- **Axios**：API 請求
- **React Router**：路由管理
- **Vitest**：測試框架
- **GitHub Pages**：部署

## 📂 專案結構 (部分)

```text
movie-app/
├─ public/              # 靜態資源
├─ src/
│  ├─ api/              # TMDB API 請求
│  ├─ components/       # UI 元件 (MovieCard, SortSelect ...)
│  │  └─ components/    # 頁面佈局 (AppLayout, Sider ...)
│  ├─ contexts/         # 全域狀態 (WatchListContext, MessageContext)
│  ├─ pages/            # 頁面 (WatchList, Home ...)
│  ├─ styles/           # 樣式 (globals.scss, app.scss ...)
│  ├─ types/            # 型別定義、變數
│  ├─ utils/            # 工具 (cache, apiService ...)
│  └─ App.tsx           # Route管理
├─ test/                # 測試程式碼
├─ .env                 # 放置 TMDB APIKEY
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## 📦 安裝與執行

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 打包專案
npm run build

# 打包專案並部署至 GitHub Pages
npm run deploy
```

## ✅ 測試

專案使用 [Vitest](https://vitest.dev/)進行單元測試：

```bash
npm run test
```

## 🌍 部署

專案使用 `gh-pages` 套件自動部署至 GitHub Pages。
打包完成後的檔案會輸出至 `/dist`，並透過 `npm run deploy` 上傳。
