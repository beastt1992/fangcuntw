# 方寸 FANGCUN

**以骨架與參數設計繁體中文字型的瀏覽器工作台。**

線上使用：https://fangcuntw.vercel.app/

方寸可在瀏覽器中拖曳字形骨架，調整字重、對比、圓角、字面率等設計軸，預覽黑體、圓體、明體與手寫等風格，並輸出可安裝使用的 OTF 字型。

## 主要功能

- 繁體中文字形與 GlyphWiki／KAGE 資料匯入。
- 骨架、部件框與變體編輯。
- 字重、對比、圓角、字面率、字寬、書寫感等參數。
- 工作台、展示與原樣對照模式。
- OTF、SVG、筆順動畫與專案檔匯出。
- Service Worker 離線快取，可作為 PWA 使用。

## 本機啟動

方寸是靜態網頁，不需要建置工具。請以本機 HTTP 伺服器開啟，避免瀏覽器對 `file://` 的限制：

```bash
python3 -m http.server 8080
```

瀏覽器開啟：

```text
http://localhost:8080/
```

部署時請至少提供：

```text
index.html
sw.js
manifest.webmanifest
icon.svg
icon-192.png
icon-512.png
```

## 授權

方寸的原創程式碼依 **Mozilla Public License 2.0（MPL-2.0）**授權。完整條款請見 [`LICENSE`](LICENSE)。

簡要而言：

- 可以免費使用，包括商業使用。
- 可以修改及散布。
- 散布修改過的 MPL 檔案時，該檔案及修改內容仍須依 MPL-2.0 提供原始碼。
- 與方寸放在不同檔案中的獨立程式或服務，不會只因組合使用而自動改採 MPL。
- MPL 不授予「方寸」、`FANGCUN`、Logo 或官方視覺的品牌使用權。

這只是方便閱讀的摘要，實際權利與義務以 `LICENSE` 全文為準。

## 第三方程式與字形資料

本專案包含或使用：

- `opentype.js`：MIT License。
- GlyphWiki 字形資料：GlyphWiki Data and Article Usage Licence。
- Noto CJK、CNS11643／TW-Kai：只作開發校準參考，本發行包未包含其字型檔。
- 官方 KAGE engine：只作開發比對參考，本發行包未包含 GPL 程式碼。

完整資訊請見 [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) 與 [`LICENSES/`](LICENSES/)。

## 匯出字型的使用

匯出的 OTF 安裝到電腦後，可在 Word、PowerPoint 等軟體中選用；也可在 Illustrator 中排版並轉成外框，成為可編輯的向量圖形。

MPL-2.0 不會僅因使用方寸就自動套用到匯出的字型，但輸出內容若包含 GlyphWiki 資料或其他第三方素材，仍須遵守其來源條款。

## 品牌政策

「方寸」、「FANGCUN」、官方 Logo、App 圖示及宣傳視覺不包含在 MPL-2.0 的品牌授權中。非官方分支請使用不同名稱並清楚標示來源。詳見 [`TRADEMARKS.md`](TRADEMARKS.md)。

## 發行前檢查

- 保留 `LICENSE`、`NOTICE`、`THIRD_PARTY_NOTICES.md`。
- 保留 `index.html` 中 opentype.js 的 MIT 聲明。
- 新增第三方套件或字形來源時更新授權清單。
- 若未來直接內嵌 GPL 的官方 KAGE engine，先重新評估整體授權。

## 作者

DBeast  
https://github.com/beastt1992

---

本專案仍在開發階段。字形完整度、標點、字距與不同作業系統的字型相容性仍需要持續測試。
