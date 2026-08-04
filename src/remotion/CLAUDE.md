# Remotion 動畫規範

**適用範圍只有這個目錄。**投影片在 `src/slides/`，走的是根目錄那份 `CLAUDE.md` 的 A、B、D 章，兩邊的節奏機制完全不同：投影片沒有 frame 的概念，它靠 `currentStep` 推進。不要把這裡的規則套到投影片上，也不要反過來。

> 這個目錄目前沒有被任何投影片引用，屬保留狀態。`src/components/RemotionPlayer.tsx` 也還沒有人用。

## 畫布

- 解析度 1920×1080，fps 30
- 每個概念一個 Composition

## 色彩

- 背景：深色 `#0E0F13`
- 主文字：`#F5F5F4`
- 次要文字／灰階：`#8A8F98`
- 主色 accent：`#5B8DEF`（只用在當下要強調的那一個元素，其他一律灰階）
- 不要引入 `theme.ts` 以外的顏色

投影片那邊用的是 Tailwind 色階（`slate`／`sky`／`orange` 等），這裡用的是 hex，兩套不要混。

## 字體

- 中文：Noto Sans TC
- 英文／程式碼：JetBrains Mono（用於指令、`/goal` 等 token）

## 動態

- **沿用根目錄 `CLAUDE.md` A-3 的六條動態原則**（一次只動一個重點、禁止常駐無限動畫、進場只用 opacity 加小位移等）。那六條跟渲染方式無關，兩邊共用。
- 時間一律用 frame 控制（`useCurrentFrame`、`interpolate`、`spring`），**嚴禁 `setTimeout`**。
- 不要用 CSS `transition` 或 `animate-spin`。逐格輸出時不生效，預覽會跟成品不一致，改用 `interpolate`。
- spring 統一取用 `theme.ts` 的 `springConfig`，不要各自寫 damping／stiffness。
- 不要用 `frame % N` 驅動 spring，會在每個週期邊界跳變。
- 不要 hardcode 畫布中心座標（如 `960`），改用相對值。
