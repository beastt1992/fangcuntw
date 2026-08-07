# 第三方成果與授權聲明

本文件記錄「方寸 FANGCUN」目前發行包內含或在開發階段使用的第三方成果。
方寸原創程式碼採 **MPL-2.0**；下列第三方項目維持各自的授權，不因與方寸一同散布而改變。

## 1. opentype.js

- 用途：在瀏覽器內建立、讀寫及匯出 OpenType／OTF 字型。
- 專案：https://github.com/opentypejs/opentype.js
- 授權：MIT License
- 著作權聲明：Copyright (c) 2020 Frederik De Bleser
- 完整授權文字：`LICENSES/opentypejs-MIT.txt`

目前 `index.html` 內含 opentype.js 程式碼，因此重新散布單檔 HTML 時，請保留其內嵌的 MIT 授權聲明，或確保本文件與 MIT 授權文字一併提供。

## 2. GlyphWiki 字形資料

- 用途：KAGE 字形資料、部件資訊與字形基礎資料。
- 網站：https://glyphwiki.org/
- 授權名稱：GlyphWiki Data and Article Usage Licence（資料及記事使用許諾）
- 授權摘要：允許任何人自由使用、重製及修改登記於 GlyphWiki 的字形資料與記事；亦允許作為新字型的基礎。記事中的外部引用內容仍須依其原始來源授權處理。
- 參考文字：`LICENSES/GlyphWiki-Data-and-Article-Usage-License.txt`

本專案主動標示 GlyphWiki 來源，以利追溯與尊重資料社群。若日文原始授權與翻譯內容有差異，應以日文原文為準。

## 3. Noto Sans CJK／Noto Serif CJK

- 用途：僅於開發階段作為量測、校準及視覺比較參考。
- 授權：SIL Open Font License 1.1
- 狀態：本發行包未包含 Noto 字型檔或其輪廓資料。

## 4. CNS11643 全字庫／TW-Kai

- 用途：僅於開發階段作為臺灣正體中文字形、楷書筆形及量測參考。
- 提供機關：數位發展部／全字庫。
- 公開資料頁：https://data.gov.tw/dataset/5961
- 授權：資料集頁面載明可依使用目的選擇「政府資料開放授權條款－第1版」或「SIL Open Font License 1.1」。
- 狀態：本發行包未包含 TW-Kai 或全字庫字型檔。

## 5. KAGE engine

- 專案：https://github.com/kurgm/kage-engine
- 授權：GPL-3.0
- 用途：僅在開發與比對階段作為參考。
- 狀態：本發行包未包含官方 KAGE engine 的 GPL 程式碼。

若未來直接把官方 KAGE engine 併入瀏覽器端發行包，必須重新檢視整體授權相容性與散布義務，不能只沿用目前的 MPL-2.0 聲明。

## 6. 使用者匯出的 OTF／SVG

MPL-2.0 是方寸程式碼的授權，通常不會僅因使用方寸而自動套用到使用者產生的輸出檔。
但輸出字型若包含 GlyphWiki 資料、第三方素材或其他受授權限制的內容，仍應遵守相關來源條款。使用者也應確保自己加入的 Logo、字形、圖像及品牌內容具有合法使用權。

---

本文件是專案授權資訊整理，不構成法律意見。正式商業發行、加入新依賴或改變資料來源前，應重新進行授權盤點。
