# 8/9 工作坊 Banner：圖片生成 Prompt（含文字版）

## 工具選擇

繁體中文的排版品質差異很大，建議優先順序：

| 工具 | 中文表現 | 備註 |
|---|---|---|
| Nano Banana（Gemini 2.5 Flash Image） | 佳 | 對「照我寫的字原樣輸出」的指令服從度高，可對話式修字 |
| GPT Image | 佳 | 排版乾淨，偶爾會自行簡化筆畫 |
| Ideogram | 中上 | 英文極強，中文偶有異體字 |
| Midjourney | 中文較弱 | 建議只生底圖，文字另外疊 |

**共通建議**：生成後把每個字放大檢查一次，特別是「實」「體」「灣」「樹」這類筆畫多的字。若有一兩個字歪掉，用同一工具做局部重繪（inpaint）比整張重生快。

視覺基調沿用課程簡報：深底 `#020617`、卡片灰 `#0F172A`、主色 sky `#38BDF8`。只用一個強調色。

---

## 要出現在圖上的文字（請原樣複製，勿改字）

```
主標：從對話框，走進終端機
副標：讓 AI 自己動手，你負責驗收・從 Vibe Coding 到代理工程
日期：2026.08.09 SUN
資訊：09:30 - 17:30｜台北小樹屋｜限額 18 位
```

### 為什麼主標不放「Vibe Coding」

這個詞在工程社群已經帶有貶義，常被用來指沒人看得懂、出事沒人扛的程式碼。放在最大字會讓有經驗的人第一眼誤判課程層次。但對入門受眾來說，它仍是辨識度最高的入口，拿掉會失去搜尋與識別。

因此主標改用課程實際的轉變（從對話框走進終端機），Vibe Coding 降到副標當關鍵字用，並緊接「代理工程」表明課程的落點。這也跟簡報第 4 到 7 頁的演進論述一致。

主標偏概念性，所以副標必須把好處講白：「讓 AI 自己動手，你負責驗收」補足了「走進終端機之後會怎樣」。這兩行是一組，不要只留主標。

### 替代主標（可直接換掉上方主標字串）

| 方向 | 主標 | 適合場合 |
|---|---|---|
| 交辦感 | 讓 AI 自己動手，你負責驗收 | 通用，目前作為副標使用 |
| 成果感 | 一天，做出一個真的能用的工具 | 社群導流、入門受眾 |
| 對比感（目前採用） | 從對話框，走進終端機 | 貼近課程主軸，靠副標補足說明 |
| 專業感 | 代理工程實作日 | 內部 Slack，對外辨識度低 |

換主標時記得同步改三處：各比例 prompt 內的字串、1:1 版的兩行斷句、以及文末「修字的追加指令」。

---

## 版本 A：終端機質感（推薦主視覺）

### 16:9 橫式（社群貼文、Slack、活動頁主圖）

```
A minimalist dark-mode event banner for a hands-on AI coding workshop,
16:9 landscape.

Background: deep navy-black (#020617) with a very subtle grid texture
and soft vignette.

Right third: a floating terminal window in gentle perspective, dark
slate panel (#0F172A), thin border (#1E293B), three muted window dots,
abstract monospace code lines glowing cyan-blue (#38BDF8), a soft
cursor glow, faint light particles drifting upward.

Left two-thirds: clean typographic layout, left-aligned, generous
spacing. Render this text EXACTLY as written, in Traditional Chinese,
correct stroke-accurate characters, no invented glyphs:

Small monospace label at top, wide letter-spacing, grey (#64748B):
"2026.08.09 SUN"

Large bold headline, near-white (#F1F5F9):
"從對話框，走進終端機"

Medium subheading below, muted grey (#94A3B8):
"讓 AI 自己動手，你負責驗收・從 Vibe Coding 到代理工程"

Thin cyan divider line (#38BDF8), then a small info line (#64748B):
"09:30 - 17:30｜台北小樹屋｜限額 18 位"

Typography: clean geometric sans-serif for Chinese, monospace for
numbers and Latin. Editorial poster design, high contrast, cinematic
soft lighting, one accent color only. Text must be crisp, perfectly
legible, correctly spelled, and not distorted.
```

### 1:1 方形（IG、Threads、Facebook）

```
A minimalist dark-mode event key visual, 1:1 square.

Background: deep navy-black (#020617), subtle grid texture.

Lower half: a floating terminal window in gentle perspective, dark
slate (#0F172A), thin border, abstract monospace code lines glowing
cyan-blue (#38BDF8), soft cursor glow, faint rising light particles.

Upper half: centered typographic block. Render this text EXACTLY as
written, in Traditional Chinese, stroke-accurate, no invented glyphs:

Small monospace label, wide letter-spacing, grey (#64748B):
"2026.08.09 SUN"

Large bold headline, near-white (#F1F5F9), two lines:
"從對話框"
"走進終端機"

Below the headline, smaller, muted grey (#94A3B8):
"讓 AI 自己動手，你負責驗收"

Small info line at the bottom edge, grey (#64748B):
"09:30 - 17:30｜台北小樹屋｜限額 18 位"

Clean geometric sans-serif for Chinese, monospace for Latin and
numbers. Editorial poster design, high contrast, single accent color.
Text must be crisp, perfectly legible, and not distorted.
```

### 4:1 長條（Google 表單頁首，建議 1600 x 400 px）

```
An ultra-wide minimalist dark event banner, 4:1 letterbox.

Background: deep navy-black (#020617), subtle grid texture, thin faint
horizontal light streaks travelling right to left.

Far right: a small floating terminal window, dark slate (#0F172A),
thin border, abstract code lines glowing cyan-blue (#38BDF8).

Left 70%: left-aligned typographic layout. Render this text EXACTLY
as written, in Traditional Chinese, stroke-accurate, no invented
glyphs:

Large bold headline, near-white (#F1F5F9):
"從對話框，走進終端機"

Small monospace line below, grey (#64748B):
"2026.08.09 SUN｜09:30 - 17:30｜台北小樹屋"

Clean geometric sans-serif for Chinese, monospace for Latin and
numbers. Minimal, professional, high contrast, one accent color.
Text must be crisp, perfectly legible, and not distorted.
```

---

## 版本 B：工作坊現場感

```
A 16:9 event banner combining illustration and typography.

Scene: a small hands-on tech workshop viewed from a slightly elevated
three-quarter angle. Six to eight people at long wooden tables with
open laptops, faces abstract and unrendered. Each laptop screen glows
soft cyan-blue (#38BDF8), the only saturated color in the frame. Dim
calm room, deep slate tones (#0F172A, #1E293B), soft warm overhead
lighting, coffee cups and snack bowls on the tables.

A dark translucent panel overlays the left side, carrying this text.
Render it EXACTLY as written, in Traditional Chinese, stroke-accurate,
no invented glyphs:

"2026.08.09 SUN"
"從對話框，走進終端機"
"讓 AI 自己動手，你負責驗收・從 Vibe Coding 到代理工程"
"09:30 - 17:30｜台北小樹屋｜限額 18 位"

Headline near-white (#F1F5F9), supporting text grey (#94A3B8), small
label in monospace. Editorial flat illustration with subtle depth,
clean lines, professional, not corporate stock photo. Text must be
crisp, perfectly legible, and not distorted.
```

---

## 版本 C：抽象概念（對話框到終端機）

```
A 16:9 minimalist conceptual event poster.

Background: deep navy-black (#020617), vast negative space.

Center composition: on the left, a simple rounded chat bubble outline
in muted grey, static and closed. On the right, an open terminal panel
(#0F172A) with a thin border, glowing cyan-blue (#38BDF8) abstract
code lines and a bright cursor. Between them, a thin stream of light
particles flowing left to right.

Below the composition, centered typography. Render this text EXACTLY
as written, in Traditional Chinese, stroke-accurate, no invented
glyphs:

Large bold headline, near-white (#F1F5F9):
"從對話框，走進終端機"

Small line below, grey (#64748B):
"2026.08.09 SUN｜09:30 - 17:30｜台北小樹屋｜限額 18 位"

Extremely minimal, geometric, editorial, one accent color only, soft
glow instead of gradients. Text must be crisp, perfectly legible, and
not distorted.
```

---

## 負面提示（Negative Prompt）

支援的工具請一併填入：

```
garbled text, distorted characters, invented chinese glyphs,
simplified chinese, japanese kanji, misspelled words, duplicated text,
watermark, signature, rainbow gradient, purple and pink neon,
cyberpunk cliche, matrix falling green code, robot, humanoid AI face,
glowing brain, 3d render, stock photo, cluttered, busy composition,
low contrast, blurry
```

Midjourney 參數寫法：

```
--ar 16:9 --style raw --no garbled text, watermark, robot, glowing brain, rainbow gradient
```

---

## 修字的追加指令

若第一次生成的中文有瑕疵，接續下這幾句（Nano Banana、GPT Image 皆適用）：

```
Keep the entire composition, colors, and layout identical. Only fix
the Chinese typography: re-render all Chinese characters with correct,
stroke-accurate Traditional Chinese glyphs. The exact strings are:
"從對話框，走進終端機"
"讓 AI 自己動手，你負責驗收・從 Vibe Coding 到代理工程"
"09:30 - 17:30｜台北小樹屋｜限額 18 位"
Do not change anything else.
```

---

## 圖片用途對照

| 用途 | 建議版本與比例 | 圖上文字量 |
|---|---|---|
| 社群貼文主圖 | A 版 16:9 | 完整四行 |
| IG / Threads | A 版 1:1 | 主標、日期、資訊三行 |
| Google 表單頁首 | A 版 4:1 | 主標加一行資訊即可 |
| Slack 貼文縮圖 | A 版 16:9 | 完整四行 |
| 報名頁第二張圖 | B 版現場感 | 完整四行 |
