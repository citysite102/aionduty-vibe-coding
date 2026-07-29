# AI On Duty：Vibe Coding 補充單元教材

課程簡報。線上瀏覽：<https://citysite102.github.io/aionduty-vibe-coding/>

## 操作方式

| 按鍵 | 動作 |
|---|---|
| `空白鍵` | 下一步（同一頁還有內容就先展開，沒有就換頁） |
| `→` / `Enter` | 只在同一頁內推進 |
| `←` | 上一步 |
| 右下角下拉選單 | 直接跳到指定頁 |
| 右下角 `T －／＋` | 調整全站字級（85% 到 150%） |

## 本機執行

需要 Node.js 18 以上。

```bash
npm install
npm run dev      # 開發模式
npm run build    # 產出 dist/
npm run lint     # 型別檢查（tsc --noEmit）
```

## 這份簡報是怎麼做的

它不是簡報軟體做的，是一個 React + Tailwind 的網頁專案，整份都在終端機裡用 Claude Code 改出來的。做法寫在簡報第 57 頁，規範本身放在 [`CLAUDE.md`](./CLAUDE.md)：畫布、配色、字體、動態原則的負面清單，以及新增或搬動投影片時要走的檢查清單。

`.claude/settings.json` 裡有一個 PreToolUse hook，會擋掉中文破折號。這類「我一定會忘記提醒」的規矩，交給程式擋比較可靠。

## 專案結構

```
src/
  App.tsx            投影片順序、標題、鍵盤與下拉選單
  slides/            一頁一個檔案，命名為 編號_模組_主題.tsx
  components/        SlideLayout、AnimatedBlock 等共用元件
  remotion/          Remotion 動畫元件（目前保留，未被投影片引用）
CLAUDE.md            專案共用規範（AGENTS.md 是它的 symlink）
```

## 部署

推到 `main` 就會觸發 `.github/workflows/deploy.yml`，自動 build 並發布到 GitHub Pages。
