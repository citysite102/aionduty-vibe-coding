# 教學模擬（sim/）

用三個 agent 模擬一次真實授課，找出簡報本身的結構破洞。

```
講師 lecturer ──逐字稿──→ 學生 student ──反應──→ 觀察員 observer ──診斷──→ findings/
（誠實標缺口）            （不准裝懂）           （只看前兩份，不腦補）
```

## 目錄

| 路徑 | 內容 |
|---|---|
| `personas/` | 學員人格庫，每個一份。都是職場工作者，技術底子不同 |
| `transcript/` | 講師逐字稿，一段一檔 `seg-P{起}-P{迄}.md` |
| `reactions/` | 學員反應，一段一檔 `seg-P{起}-P{迄}.{persona}.md` |
| `state/` | 各 persona 的知識累積狀態，`{persona}.md`，會被覆寫 |
| `findings/` | 觀察員診斷，一段一檔 |
| `handoff.md` | 段落之間的交棒摘要，讓下一段的講師知道前面講過什麼 |

## 怎麼跑

```
/simulate 76 87              # 用預設 persona（marketer）跑第 76 到 87 頁
/simulate 76 87 pm           # 換一個學員背景跑同一段
/simulate 76 87 marketer,pm  # 同一段同時跑兩種學員，觀察員會比對差異
```

頁碼是 LIVE 頁碼，對照表：

```bash
node scripts/slide-manifest.mjs --sections   # 看分節範圍
node scripts/slide-manifest.mjs 76 87        # 看某段有哪些頁、對應哪些檔案
node scripts/slide-manifest.mjs --dead       # 看哪些 src/slides/ 的檔案不會播
```

## 為什麼分段跑，不一次跑完

整份簡報的逐字稿會超過單一 agent 能好好處理的長度，而且學生的知識是累積的，
必須一段跑完、狀態存檔，下一段才能正確判斷「這個名詞前面講過了沒有」。
建議照分節跑，或每次 10 到 12 頁。

## 頁碼會位移，所以舊產物過期得很快

`transcript/`、`reactions/`、`findings/`、`handoff.md` 檔名裡的 P 編號是**當時那一輪的
LIVE 頁碼**。插頁、搬頁、拆預錄頁都會讓它整批失效，而檔名本身看不出來。

判斷方式：跑 `node scripts/slide-manifest.mjs --sections`，拿其中一段的標題去對
`findings/` 裡同一個 P 區間寫的是不是同一頁。對不上就整批歸檔，不要只補新的段落，
否則 `handoff.md` 會拿舊頁碼去告訴下一段的講師「前面講過什麼」。

歸檔就是把那四個目錄與 `handoff.md` 移到 `archive/{日期}/`，並在裡面寫一份 README
說明當時是幾頁、涵蓋到哪、為什麼作廢。已經歸檔的兩輪在 `archive/` 底下。
