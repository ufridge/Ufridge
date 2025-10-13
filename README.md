# 🧊 Ufridge — 冰箱租賃網站

> 🎓 本專案為學校專題製作，旨在展示網站設計與前端開發能力。  
> 提供使用者方便瀏覽冰箱商品、了解租賃方案、並可直接線上預約。

---

## 🚀 專案簡介

**Ufridge** 是一個結合「冰箱租賃」與「產品展示」的響應式網站。  
以乾淨藍白配色與簡約介面呈現，提供學生與租屋族快速查詢與預約服務。

🔹 使用者可：
- 瀏覽可租用冰箱商品  
- 點擊圖片查看冰箱內部格局  
- 進入詳細頁面了解租賃方案  
- 透過 Google 表單預約租借  
- 於行動裝置使用浮動「立即租借」按鈕

---

## 🧱 專案結構
<pre>
Ufridge/
├── index.html               # 首頁（商品瀏覽與租借入口）
├── product/
│   ├── fridge1.html         # 東元 101L 冷藏冷凍冰箱介紹頁
│   ├── fridge2.html         # 東元 50L 小型冰箱介紹頁
│
├── css/
│   ├── style.css            # 全站共用樣式（主題色、導覽列、排版）
│   ├── product.css          # 商品頁專用樣式（價目表、圖片配置）
│
├── js/
│   └── script.js            # 冰箱圖片開關與互動功能
│
├── images/
│   ├── fridge1.jpg
│   ├── fridge1o.jpg         # 開門圖
│   ├── fridge2.jpg
│   ├── fridge2o.jpg
│   ├── Mark.png             # 網站商標
│   └── ice-pattern.svg      # 背景紋理
│
└── README.md                # 專案說明文件
</pre>
---

## 💡 使用方式

1. 開啟 [`index.html`](./index.html) 進入主頁。  
2. 點擊冰箱圖片可切換「開門／關門」視角。  
3. 點擊冰箱名稱可前往詳細介紹頁面。  
4. 在詳細頁面查看租賃方案與價格。  
5. 點擊「立即租借」按鈕後，進入 Google 表單預約頁。

> 📱 網站具備完整 **響應式設計**，在手機上瀏覽體驗優化（含底部浮動 CTA 按鈕）。

---

## 🧰 使用技術

| 類別 | 技術 |
|------|------|
| 前端框架 | [PicoCSS](https://picocss.com/) |
| 語言 | HTML5, CSS3, JavaScript |
| 圖片 | Unsplash / 自行拍攝 |
| 表單服務 | Google Forms |
| 部署平台 | [GitHub Pages](https://pages.github.com/) |

---

## 🎨 設計亮點

- 藍白主色調搭配透明導覽列  
- Hero 區宣傳標語搭配漸層背景與冰晶紋理  
- 「卡片式價目表」設計清晰、具層次  
- 行動裝置自適應排版  
- 導覽列固定頂部、具半透明效果  

---

## 🔧 未來可擴充功能

- ✅ 後台商品管理（新增／下架商品）  
- ✅ 使用者登入與租借紀錄查詢  
- ✅ 自動寄信通知與線上付款功能  
- ✅ 多語言版本（中文 / 英文切換）  

---

## 👨‍💻 開發與維護

**開發者：** Kuan  
**聯絡方式：** [service@ufridge.com](mailto:service@ufridge.com)  
**GitHub 專案頁面：** [https://github.com/ufridge/Ufridge](https://github.com/ufridge/Ufridge)  
**網站預覽：** [https://ufridge.github.io/Ufridge/](https://ufridge.github.io/Ufridge/)

---

## 🪪 授權條款

本專案僅供學術及非商業用途，版權所有 © 2025 Ufridge.  
未經授權，請勿用於商業用途。

---

## 🧊 QR Code

若需行動快速進入網站，可掃描下方 QR Code：  

![Ufridge QR Code](./images/ufridge_qr.png)

---

> Made with 💙 by Kuan