# Ufridge — CLAUDE.md

冰箱租賃服務網站，部署於 [ufridge.co](https://ufridge.co)，目標用戶為學生宿舍租客。

---

## 技術架構

| 層級 | 技術 |
|------|------|
| 前端框架 | 純 HTML / CSS / JavaScript（無打包工具） |
| UI 樣式庫 | [Pico CSS v1](https://picocss.com/)（CDN 載入） |
| 後端 / 資料儲存 | Google Apps Script + Google Sheets |
| 託管平台 | GitHub Pages（自訂網域 `ufridge.co` via `CNAME`） |
| PWA | `manifest.json` + `sw.js`（Service Worker 離線快取） |
| 深色模式 | CSS `@media (prefers-color-scheme: dark)` |
| 響應式 | CSS Grid + `@media (max-width: 768px)` |

**無任何 Node.js、npm、打包流程**，所有修改直接編輯原始檔案即可生效。

---

## 資料夾結構

```
Ufridge/
├── index.html              # 首頁：商品展示、租賃流程、預約入口
├── agreement.html          # 定型化契約頁（必須捲動閱讀才能繼續）
├── order.html              # 訂單填寫頁（需通過 agreement 才能進入）
├── 404.html                # 自訂錯誤頁
├── privacy-policy.html     # 隱私權政策
├── terms-of-service.html   # 使用條款
├── CNAME                   # GitHub Pages 自訂網域設定
├── manifest.json           # PWA App Manifest
├── sw.js                   # Service Worker（離線快取）
│
├── css/
│   ├── style.css           # 全站主要樣式（含 dark mode）
│   └── product.css         # 商品詳情頁專用樣式（含 dark mode）
│
├── js/
│   └── script.js           # 冰箱圖片切換 + 訂單表單送出邏輯
│
├── images/
│   ├── Mark.png            # 品牌 Logo（深色背景）
│   ├── W_Mark.png          # 品牌 Logo（白色版）
│   ├── fridge1.jpg         # 93L 冰箱外觀圖
│   ├── fridge1o.jpg        # 93L 冰箱開門圖
│   ├── fridge2.jpg         # 50L 冰箱外觀圖
│   ├── fridge2o.jpg        # 50L 冰箱開門圖
│   ├── ice-pattern.svg     # Hero 區塊背景裝飾
│   ├── lines-pattern.svg   # 租賃流程區背景裝飾
│   ├── icon-192.png        # PWA 圖示 192px
│   ├── icon-512.png        # PWA 圖示 512px
│   └── ufridge_qr.png      # 網站 QR Code
│
└── product/
    ├── fridge1.html        # 93/101L 冰箱詳情頁（含方案定價）
    └── fridge2.html        # 50L 冰箱詳情頁（含方案定價）
```

---

## 現有功能

### 使用者預約流程
```
index.html → agreement.html → order.html → Google Sheets
```
1. 首頁點「立即租借」→ `agreement.html`
2. 使用者必須**捲動到底部**才能解鎖勾選框
3. 勾選同意後，點「繼續預約」→ 以 `sessionStorage.setItem('agreementAccepted', 'true')` 設定旗標，跳轉 `order.html`
4. `order.html` 一進入就檢查 `sessionStorage`，若無旗標直接跳回 `agreement.html`
5. 送出表單 → `js/script.js` POST JSON 至 Google Apps Script → 寫入 Google Sheets

### 訂單表單欄位（order.html）
- 冰箱型號（radio）：A 93/101L（可選）、B 50L（`disabled`，暫不提供）
- 租賃時長（radio）：三個月（`disabled`）、半年（`disabled`）、一年、試營運 $300、試營運含暑住 $500
- 宿舍（select）、房號、姓名、LINE ID
- 手機號碼：`pattern="09\d{8}"`（台灣格式驗證）
- 付款方式（radio）：訂金 20% / 全額付款
- 備註（選填）
- 需勾選同意使用條款及隱私權政策才能送出

### 冰箱圖片互動（js/script.js）
`toggleFridge(img)` 函式：點擊冰箱圖片切換「關門圖 ↔ 開門圖」，透過 `data-closed` / `data-open` 屬性管理圖片路徑。

### PWA（Service Worker）
- `sw.js` 快取 `index.html`、`css/style.css`、`js/script.js`、`images/Mark.png`
- 快取版本名稱：`ufridge-v1`（變更靜態資源時需手動更新版本號）
- Service Worker 僅在 `index.html` 中註冊，`order.html` 的 SW 註冊已被 comment 掉

### 商品定價
| 商品 | 月租 | 學期租 | 年租 | 押金 |
|------|------|--------|------|------|
| 93/101L（fridge1） | $300 | $1,300 | $2,400 | $400 |
| 50L（fridge2） | $150 | $700 | $1,200 | $400 |

---

## 開發注意事項

### Google Apps Script
- 表單 POST 目標 URL 寫死在 `js/script.js` 第 64 行（`GOOGLE_SCRIPT_URL` 常數）
- 後端期望回傳 `{ "result": "success" }` 的 JSON，否則前端會顯示錯誤
- 本地開發時無法測試表單送出（跨域），需部署後測試

### 導覽列 / Footer 重複
各頁面的 `<nav>` 和 `<footer>` HTML **完全重複**，沒有共用模板系統。修改導覽列或 Footer 時，必須同時更新以下所有檔案：
`index.html`、`agreement.html`、`order.html`、`404.html`、`privacy-policy.html`、`terms-of-service.html`、`product/fridge1.html`、`product/fridge2.html`

### 法律頁面 CSS 重複
`privacy-policy.html` 和 `terms-of-service.html` 的 `<style>` 區塊內容完全相同，日後若要修改法律頁樣式，需同步更新兩個檔案。

### Service Worker 版本管理
每次更新靜態資源（CSS / JS / 圖片），必須手動更新 `sw.js` 第 1 行的 `CACHE_NAME`（例如 `ufridge-v1` → `ufridge-v2`），否則使用者瀏覽器會持續使用舊快取。

### product/ 子目錄的路徑
`product/fridge1.html` 和 `product/fridge2.html` 的靜態資源路徑均使用 `../` 相對路徑（例如 `../css/style.css`、`../images/Mark.png`），新增商品頁時需注意這一點。

### 停用中的選項
以下 radio 選項目前設為 `disabled`（附 `opacity:0.45; cursor:not-allowed;` 樣式），重新開放時需移除 `disabled` 屬性和 inline style：
- `order.html`：`model-b`（B 小鮮綠 50L）
- `order.html`：`duration-3`（三個月）
- `order.html`：`duration-6`（半年）

### Pico CSS 版本
使用 **Pico CSS v1**（非 v2），兩個版本的 class 名稱有差異，升級前需確認相容性。
