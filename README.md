# FANGCUN 方寸

**A parametric Traditional Chinese type design system and synthetic glyph dataset.**

[English](./README.md) · [繁體中文](./README.zh-TW.md)

> **One skeleton system. 13,000+ Traditional Chinese glyphs. A typeface you can shape.**

FANGCUN generates Traditional Chinese glyphs from stroke skeletons with a parametric renderer.

Instead of treating a font as a fixed set of outlines, FANGCUN exposes a controllable design space: weight, contrast, roundness, stroke endings, corner treatment, brush pressure, and other style parameters can be changed while the underlying glyph skeleton remains editable.

The same engine can produce **vector outlines, installable OTF fonts, and parameter-labelled synthetic training data**.

> ⚠️ Before release, every value marked `[VERIFY]` or `[FILL]` below should be checked against the current generator and dataset.

---

## What makes FANGCUN different

Most font files give you only the final result: outlines or pixels.

FANGCUN keeps the **construction logic** visible:

```text
GlyphWiki / KAGE stroke skeletons
        ↓
FANGCUN parametric stroke renderer
        ↓
editable glyph outlines
        ↓
Boolean cleanup + visual guard
        ↓
SVG / OTF / dataset samples
```

Each generated dataset sample can keep both:

- the **glyph output**
- the **parameters that produced it**

That makes FANGCUN useful not only as a type-design experiment, but also as a source of paired data for studying the relationship between glyph structure, style parameters, and visual output.

---

## Core ideas

### Skeleton-based generation

Glyphs are generated from stroke skeleton data rather than edited as thousands of unrelated final outlines.

This makes it possible to apply shared design rules across a large Traditional Chinese character set while still allowing individual glyphs to be inspected and adjusted.

### Parametric type design

The renderer exposes multiple design axes. Examples include:

| Axis | Example range | What it changes |
|---|---:|---|
| `weight` | 20–200 | stroke thickness |
| `contrast` | 0.6–1.6 | horizontal vs. vertical stroke contrast |
| `round` | 0–1 | corner rounding |
| `taper` | 0–1.6 | how much strokes thin toward the end |
| `hook` | 0–2 | hook-terminal length |
| … | | |

`[FILL]` Replace this table with the complete current axis list from the app.

### Editable vector workflow

FANGCUN is designed around vector geometry.

Generated glyphs can be inspected as outlines, exported as SVG, or packaged into OTF fonts for use in normal design workflows. The skeleton remains useful as an editable representation before final outline generation.

---

## Dataset

Synthetic Traditional Chinese glyphs generated from stroke skeletons by the FANGCUN parametric engine.

Every sample can include the parameters that produced it as ground truth.

### Why generate a dataset?

Existing font datasets are constrained by the fonts that can be legally obtained and redistributed. Font files also usually provide only the final output, without a record of the design parameters that produced it.

A generated dataset can provide:

- style variation without requiring a separate source font for every sample
- **generation parameters as ground truth**
- **vector outlines**, not only raster images
- repeatable regeneration when the renderer improves

`[VERIFY]` Before claiming uniqueness, search current CJK/font-generation datasets. If similar datasets exist, use wording such as “one of the few” rather than “the first”.

---

## Dataset schema

One sample per record:

| Field | Type | Notes |
|---|---|---|
| `char` | string | character |
| `codepoint` | int | Unicode code point |
| `params` | dict[str, float] | generation parameters |
| `svg_path` | string | SVG outline path data |
| `image` | image | optional raster render — `[FILL: resolution]` |
| `n_contours` | int | contour count |
| `n_nodes` | int | node count |
| `upem` | int | units per em (`1000`) |

---

## Generation pipeline

```text
GlyphWiki / KAGE stroke skeletons
        ↓
FANGCUN parametric stroke renderer
        ↓
raw outlines
        ↓
Boolean union + curve refit
        ↓
visual guard: reject cleanup that changes the raster beyond threshold
        ↓
SVG path / OTF
```

Generator: `[FILL: GitHub URL]`  
Interactive app: `[FILL: app URL]`

### Sampling strategy

`[FILL]` Document the actual sampling strategy used by the released dataset:

- Are parameters sampled uniformly?
- Are samples based on fixed style presets plus random perturbation?
- How many variants are generated per character?
- Are extreme or degenerate parameter combinations excluded?

Do not describe the dataset as uniformly sampled across the full design space unless that is actually how it is generated.

---

## Coverage and limitations

FANGCUN is experimental software and a synthetic dataset, not a finished retail typeface family.

### One underlying skeleton source

The current skeletons come from GlyphWiki / KAGE data and are Mincho-oriented.

The parameters can change **weight, contrast, roundness, stroke endings, corner treatment, brush pressure**, and other rendering characteristics, but they do not automatically provide a completely different underlying glyph architecture.

This is useful for studying **style variation**, but should not be presented as broad structural diversity.

### Character coverage

| | CJK glyph coverage |
|---|---:|
| FANGCUN dataset | `[VERIFY: 13,148]` |
| Noto Sans CJK TC | `[VERIFY: 30,285]` |

The current dataset covers fewer characters than a large production CJK font. Its contribution is primarily **parametric style variation and editable generation**, not rare-character coverage.

### Synthetic output

Generated outlines are not the same thing as a professionally finished retail typeface.

Even when contours are technically valid, type designers may still want to refine proportions, rhythm, spacing, local optical corrections, or individual glyph details.

### Quality figures

`[VERIFY]` Re-run these on the release build before publishing:

- self-intersecting contours after cleanup: `[VERIFY]`
- rasterisation difference introduced by cleanup: `[VERIFY]`
- glyphs failing generation: `[VERIFY]`

Keep these as measured values, not estimates.

---

## Intended uses

Potential uses include:

- parametric type-design research
- font style transfer / style disentanglement
- Chinese character generation research
- data augmentation for OCR and handwriting recognition
- studying relationships between stroke parameters and perceived style
- vector glyph generation experiments
- controllable typography interfaces

### Out of scope

- rare / missing character coverage
- a substitute for professionally designed typefaces
- guaranteed structural diversity across unrelated typeface architectures

---

## Licensing

**Dataset:** `[FILL: final dataset licence]`

**Generator:** MPL-2.0

**Underlying glyph data:** derived from GlyphWiki.

The current project notes state that GlyphWiki permits reuse, modification and redistribution of its glyph data, including use as source material for new fonts.

⚠️ Before release, read the complete current GlyphWiki licence page and make sure this summary is accurate.

Source: https://glyphwiki.org/wiki/GlyphWiki:データ・記事のライセンス

> This README is not legal advice. If you plan to redistribute the dataset or use it commercially, review the original licences yourself.

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

If you find a systematic defect in generated outlines, please open an issue. One advantage of a parametric generator is that a renderer-level fix can improve many glyphs at once, and the dataset can then be regenerated.
