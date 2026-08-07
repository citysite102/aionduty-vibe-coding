import { FileCode2, Zap, AlertTriangle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

// 用字串保存，逐行 render。直接把換行寫在 JSX 裡的話，JSX 會把行與行之間的
// 換行摺成一個空格，整份 md 會擠成一大段。
const CLAUDE_MD = `# 專案架構與開發紀律

## 1. 核心流程 (Core Workflow)
- 在動任何檔案之前，必須先讀取 \`docs/SDD.md\` 了解系統設計。
- 每次實作新功能前，請先產出實作步驟讓我確認。
- 測試通過後才能 commit，指令：\`npm run test\`。

## 2. 外部連線 (MCP)
- 需要讀取 Notion 規格時，請透過 Notion MCP 取得最新需求文件。
- 處理 GitHub Issues 時，請透過 GitHub MCP 取得錯誤回報的詳細內容。

## 3. 流程 SOP (Skills)
- 遇到資料庫 Schema 變動，請使用 db-migration Skill，遵照裡面的 SOP 執行。

## 4. 子系統規範 (Sub-configurations)
- \`/api\` 與 \`/frontend\` 底下各有自己的 CLAUDE.md，
  你進到那個目錄工作時會自動載入，這裡不必特別交代。

## 5. 程式碼規範 (Coding Style)
- 使用 TypeScript，禁用 \`any\`。
- 元件必須放在 \`src/components/\`，嚴禁 inline style。`;

/**
 * 三個痛點刻意橫跨三種專案。上一頁整頁在說「專案不是只有寫程式」，
 * 這一頁如果三個例子全是工程場面，等於當場把那扇門關上，
 * 不寫程式的人會確認這一段與自己無關。
 */
const PAINS = [
  { kind: '寫程式', text: '寫完新功能忘記把最新的 API 規格補回手冊，它下次又亂猜。' },
  { kind: '每月報表', text: '每個月做同一份報表，每次都要重講一遍欄位口徑和異常值怎麼算。' },
  { kind: '文件審閱', text: '心裡有一套標準條款，但沒寫下來，每次看合約都靠記憶重講一次。' },
];

/** 兩層標題用亮度分階，不另外給色相：色彩留給有語意的地方（A-1）。 */
function lineClass(line: string) {
  if (line.startsWith('## ')) return 'text-slate-200';
  if (line.startsWith('# ')) return 'text-sky-300';
  return 'text-slate-400';
}

export default function Slide21f() {
  return (
    <SlideLayout title="這跟你的專案有什麼關係？" subtitle="Real-World Application" icon={Zap}>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 mt-6">
        
        <div className="flex-1 space-y-6">
          <AnimatedBlock stepIndex={1}>
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              沒寫下來的規矩，每次都要重講一次。這件事跟你做的是哪一種專案無關。
            </p>
            <ul className="space-y-3">
              {PAINS.map((p) => (
                <li key={p.text} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="text-rose-400 mt-0.5 shrink-0" size={18} />
                  <div>
                    <span className="mr-2 rounded bg-slate-800 px-1.5 py-0.5 text-xs font-bold text-slate-400">
                      {p.kind}
                    </span>
                    <span className="text-slate-300 text-sm">{p.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="bg-sky-950/20 border border-sky-900/40 p-5 rounded-xl">
            <h4 className="text-sky-400 font-bold mb-2">💡 解決方案：動態更新的 SOP</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              只要你在對話中告訴它：「以後請幫我記得這個規則」，它就能幫你把規則補進手冊，讓 Agent 之後自動照著走。
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={3} className="flex-1">
          <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
              <FileCode2 size={16} className="text-sky-400" />
              <span className="text-slate-300 text-xs font-mono">CLAUDE.md</span>
              <span className="ml-auto text-slate-500 text-xs">一個工程專案養了一陣子之後的樣子</span>
            </div>
            <div className="p-4 text-xs font-mono leading-relaxed max-h-[400px] overflow-y-auto custom-scrollbar bg-[#0f111a]">
              {CLAUDE_MD.split('\n').map((line, i) =>
                line === '' ? (
                  <div key={i} className="h-3" />
                ) : (
                  <div key={i} className={`whitespace-pre-wrap ${lineClass(line)}`}>{line}</div>
                )
              )}
            </div>
          </div>

          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            這份是工程專案，但要看的是左邊那排章節：
            <strong className="text-slate-200">流程、外部連線、固定 SOP、分層、規範</strong>。
            換成報表或審閱專案，章節一樣，只是內容換掉。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
