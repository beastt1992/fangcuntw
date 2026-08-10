# 方寸 FANGCUN

**參數化繁體中文字型設計系統與合成字形資料集。**

[English](./README.md) · [繁體中文](./README.zh-TW.md)

> **一套骨架系統，13,000+ 個繁體字，一套可以被塑形的字型。**

方寸從筆畫骨架出發，以參數化 renderer 生成繁體中文字形。

它不是把字型視為一組固定外框，而是把字型變成一個可以操作的設計空間：字重、對比、圓角、收筆、轉角、提按等參數可以即時改變，同時保留骨架作為可編輯的結構。

同一套引擎可以輸出 **向量外框、可安裝的 OTF 字型，以及帶有參數真值的合成訓練資料**。

> ⚠️ 發布前提醒：下方所有 `[VERIFY]`、`[FILL]` 都必須用目前最新版 generator / dataset 重新確認。

---

## 方寸在做什麼

一般字型檔通常只給你最後結果：外框或像素。

方寸保留的是**字怎麼被建構出來**：

```text
GlyphWiki / KAGE 筆畫骨架
        ↓
方寸參數化筆畫 renderer
        ↓
可編輯字形外框
        ↓
Boolean cleanup + 視覺保護
        ↓
SVG / OTF / dataset samples
```

每一筆生成資料可以同時保留：

- **生成後的字形**
- **產生這個字形的參數**

因此方寸不只是一個字型設計實驗，也可以成為研究「骨架、風格參數、最終視覺結果」三者關係的成對資料來源。

---

## 核心概念

### 骨架驅動

字形從筆畫骨架生成，而不是把 13,000+ 個字視為彼此完全獨立的最終外框。

這讓大量繁體字可以共用設計規則，同時仍保留逐字檢查與調整的可能。

### 參數化字型設計

目前 renderer 提供多個設計軸，例如：

| 軸 | 範例範圍 | 改變內容 |
|---|---:|---|
| `weight` | 20–200 | 筆畫粗細 |
| `contrast` | 0.6–1.6 | 橫豎筆畫對比 |
| `round` | 0–1 | 轉角圓潤程度 |
| `taper` | 0–1.6 | 筆畫末端收細程度 |
| `hook` | 0–2 | 鉤部長度 |
| … | | |

`[FILL]` 發布前請用目前 App 的完整參數表取代這張示意表。

### 可編輯向量工作流

方寸以向量幾何為核心。

生成的字可以檢查外框、匯出 SVG，或包裝成 OTF 字型進入一般設計工作流；在生成最終外框前，骨架仍然是一種可編輯的字形表示方式。

---

## 資料集

由方寸參數化引擎從筆畫骨架生成的繁體中文合成字形資料。

每筆資料可以保留產生該字形的參數，作為 ground truth。

### 為什麼要生成資料集？

既有字型資料集會受到「能合法取得、能合法重散布多少字型」的限制，而且一般字型檔通常只提供最後輸出，不會告訴你它是由哪些設計參數產生。

生成式資料集可以提供：

- 不需要每個樣本都對應一套獨立來源字型
- **生成參數可作為 ground truth**
- **向量外框**，而不只是 raster image
- renderer 改善後可以重新生成

`[VERIFY]` 發布前仍需搜尋現有 CJK / font generation dataset。如果已有相近研究，請使用「one of the few」等較保守的表述，不要硬宣稱第一。

---

## 資料欄位

每筆資料一個樣本：

| Field | Type | 說明 |
|---|---|---|
| `char` | string | 字元 |
| `codepoint` | int | Unicode code point |
| `params` | dict[str, float] | 生成參數 |
| `svg_path` | string | SVG 外框 path data |
| `image` | image | optional raster render — `[FILL: 解析度]` |
| `n_contours` | int | contour 數 |
| `n_nodes` | int | node 數 |
| `upem` | int | units per em (`1000`) |

---

## 生成流程

```text
GlyphWiki / KAGE 筆畫骨架
        ↓
FANGCUN parametric stroke renderer
        ↓
raw outlines
        ↓
Boolean union + curve refit
        ↓
visual guard：cleanup 後如果畫面改變超過門檻就拒絕
        ↓
SVG path / OTF
```

Generator：`[FILL: GitHub URL]`  
互動版：`[FILL: app URL]`

### Sampling strategy

`[FILL]` 這裡請照實寫實際資料生成方式：

- 參數是均勻抽樣嗎？
- 是固定 style preset 再加 random perturbation 嗎？
- 每個字會產生幾個變體？
- 是否排除極端值或退化形狀？

如果不是全參數空間均勻抽樣，就不要寫成均勻抽樣。

---

## Coverage 與限制

方寸目前是實驗性軟體與合成資料集，不是一套完成度等同商業零售字型的字族。

### 骨架來源目前較單一

目前骨架來自 GlyphWiki / KAGE，基礎資料帶有明朝體取向。

參數可以改變 **字重、對比、圓角、收筆、轉角、提按** 等 rendering 特徵，但不代表它能自動產生完全不同的字形結構架構。

因此它適合研究 **style variation**，但不應被描述為具有廣泛的 structural diversity。

### 字元覆蓋

| | CJK glyph coverage |
|---|---:|
| FANGCUN dataset | `[VERIFY: 13,148]` |
| Noto Sans CJK TC | `[VERIFY: 30,285]` |

目前字元覆蓋少於大型 production CJK font。方寸目前主要貢獻是**參數化風格變化與可編輯生成**，不是罕用字覆蓋。

### 合成字形

這些是程式生成外框，不等於專業字型設計師逐字完成的零售字型。

即使輪廓在技術上成立，設計師仍可能希望進一步修正比例、節奏、spacing、optical correction 或個別字細節。

### 品質數據

`[VERIFY]` 發布前請用 release build 重跑：

- cleanup 後仍 self-intersect 的輪廓：`[VERIFY]`
- cleanup 對 rasterisation 造成的差異：`[VERIFY]`
- generation failure：`[VERIFY]`

只放實測值，不放估計值。

---

## 適合用途

可能用途包括：

- 參數化字型設計研究
- font style transfer / style disentanglement
- 中文字生成研究
- OCR / 手寫辨識的 data augmentation
- 研究筆畫參數與視覺風格的關係
- 向量中文字生成實驗
- controllable typography interface

### 不適合拿來做

- 罕用字／缺字補全
- 取代專業完成度的商業字型
- 宣稱具有大量互不相關的骨架結構多樣性

---

## 授權

**Dataset：** `[FILL: final dataset licence]`

**Generator：** MPL-2.0

**Underlying glyph data：** derived from GlyphWiki.

目前專案筆記中記載 GlyphWiki 允許 glyph data 的再利用、修改與散布，也可作為新字型的基礎資料。

⚠️ 正式發布前，請完整閱讀當下 GlyphWiki 的官方授權頁，並確認上面這句摘要沒有遺漏條件。

Source: https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス

> 這份 README 不是法律意見。若要重新散布資料集或進行商業使用，請自行確認原始授權條款。

---

## Citation

```bibtex
@misc{fangcun_dataset,
  title  = {FANGCUN: A Parametric Traditional Chinese Glyph Dataset},
  author = {[FILL]},
  year   = {[FILL]},
  url    = {[FILL]}
}
```

---

## Contact / feedback

`[FILL: GitHub Issues / contact]`

如果你發現某一類生成外框有系統性問題，歡迎開 issue。參數化 generator 的好處之一，是 renderer 層的一次修正有機會同時改善大量字形，之後再重新生成資料集。
