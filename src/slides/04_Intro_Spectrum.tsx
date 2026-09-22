import { Layers, Bot, Sparkles, Heart, Code2, Terminal, ShieldCheck, Keyboard } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { hoverIsolateGrid, hoverIsolateCard } from '../components/hoverIsolate';

interface BadgeProps {
  name: string;
  className: string;
  icon: any;
  /** 官網。現場示範時可以直接點開，沒有官網的（例如「純手寫程式」）就不給。 */
  href?: string;
}

/**
 * 有 href 就渲染成連結。App.tsx 的點擊處理已經放行 <a>，
 * 所以點開官網不會順便把投影片推進一格。
 */
function ToolBadge({ name, className, icon: Icon, href }: BadgeProps) {
  const base = `inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border ${className}`;
  const content = (
    <>
      <Icon size={11} className="shrink-0" />
      <span>{name}</span>
    </>
  );

  if (!href) {
    return <span className={base}>{content}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={href.replace(/^https:\/\//, '')}
      className={`${base} hover:border-sky-500/50 hover:text-sky-300 transition-colors`}
    >
      {content}
    </a>
  );
}

export default function SlideIntroSpectrum() {
  return (
    <SlideLayout title="照你的目標，挑一種 AI 工具" subtitle="Choosing the Right Tool" icon={Layers}>
      <div className="pt-4 max-w-6xl mx-auto h-full flex flex-col">
        <p className="text-slate-400 text-sm mb-6 text-center">
          從 1 到 5，它能自己動手的範圍愈來愈大：第 1 格只回你一段字，第 5 格直接在你的資料夾裡改檔案。
          第 4 格的 Agent 也會自己動手，但它的手在雲端，不在你的電腦上。
        </p>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ${hoverIsolateGrid}`}>
          <AnimatedBlock stepIndex={1} className={`bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between h-[210px] ${hoverIsolateCard}`}>
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-1.5">1. 純對話聊天 (對話式 AI)</h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <ToolBadge name="ChatGPT" href="https://chatgpt.com" className="bg-slate-950 border-slate-800 text-slate-300" icon={Bot} />
                <ToolBadge name="Claude" href="https://claude.ai" className="bg-slate-950 border-slate-800 text-slate-300" icon={Sparkles} />
                <ToolBadge name="Gemini" href="https://gemini.google.com" className="bg-slate-950 border-slate-800 text-slate-300" icon={Sparkles} />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                你問、它答，給你一段程式碼。但它看不到你的專案，貼上去對不對要你自己負責。
              </p>
            </div>
            <div className="text-slate-500 text-xs bg-slate-950 px-3 py-2 rounded border border-slate-800/40">適合：一次性的思考、語法諮詢、打草稿</div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className={`bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between h-[210px] ${hoverIsolateCard}`}>
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-1.5">2. AI App Builder (低程式碼平台)</h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <ToolBadge name="Base44" href="https://base44.com" className="bg-slate-950 border-slate-800 text-slate-300" icon={Code2} />
                <ToolBadge name="Lovable" href="https://lovable.dev" className="bg-slate-950 border-slate-800 text-slate-300" icon={Heart} />
                <ToolBadge name="v0" href="https://v0.app" className="bg-slate-950 border-slate-800 text-slate-300" icon={Terminal} />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                講一句話就生出能用的網站。方便，但程式碼放在平台上，要客製就卡住。
              </p>
            </div>
            <div className="text-slate-500 text-xs bg-slate-950 px-3 py-2 rounded border border-slate-800/40">適合：行銷活動頁、不會寫程式，要快做出最小可用版本</div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className={`bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between h-[210px] ${hoverIsolateCard}`}>
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-1.5">3. 瀏覽器原型工具</h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <ToolBadge name="Google AI Studio" href="https://aistudio.google.com" className="bg-slate-950 border-slate-800 text-slate-300" icon={Bot} />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                一句話生出一個完整的網頁，畫面跟背後存取資料的那一層都有，可以直接上線，也可以把程式碼匯出帶走。
              </p>
            </div>
            <div className="text-slate-500 text-xs bg-slate-950 px-3 py-2 rounded border border-slate-800/40">適合：快速驗證產品 Idea，準備好接續實踐開發</div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4} className={`bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between h-[210px] ${hoverIsolateCard}`}>
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-1.5">4. 雲端自主 Agent</h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <ToolBadge name="Manus" href="https://manus.im" className="bg-slate-950 border-slate-800 text-slate-300" icon={Sparkles} />
                <ToolBadge name="Devin" href="https://devin.ai" className="bg-slate-950 border-slate-800 text-slate-300" icon={Bot} />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                給它一個目標，它在雲端一台隔離的虛擬電腦裡自己查、自己寫、自己測，做完交件。
              </p>
            </div>
            <div className="text-slate-500 text-xs bg-slate-950 px-3 py-2 rounded border border-slate-800/40">適合：多步驟繁瑣任務、結果導向的背景自動化</div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className={`bg-sky-950/30 border border-sky-500/50 rounded-xl p-5 shadow-[0_0_30px_-5px_rgba(14,165,233,0.2)] flex flex-col justify-between h-[210px] ${hoverIsolateCard}`}>
            <div>
              <h3 className="text-lg font-bold text-sky-200 mb-1.5">5. 開發級 Agent / CLI (本機執行)</h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <ToolBadge name="Claude Code" href="https://claude.com/claude-code" className="bg-slate-950 border-slate-800 text-slate-300" icon={Terminal} />
                <ToolBadge name="Codex" href="https://openai.com/codex" className="bg-slate-950 border-slate-800 text-slate-300" icon={Bot} />
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                在你自己的電腦上動工。讀得到真實檔案、跑得動指令、管得了 Git。
              </p>
            </div>
            <div className="text-sky-300 text-xs bg-sky-900/30 px-3 py-2 rounded border border-sky-500/20">適合：真實專案執行開發、自動化除錯、長期維護的系統</div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={6} className={`bg-slate-900/50 border border-slate-800/50 rounded-xl p-5 flex flex-col justify-between h-[210px] ${hoverIsolateCard}`}>
            <div>
              <h3 className="text-lg font-bold text-slate-400 mb-1.5">6. 自己手寫 (The Baseline)</h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <ToolBadge name="你親自把關的那幾塊" className="bg-slate-950 border-slate-800 text-slate-400" icon={Keyboard} />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                不是不能用 AI，而是你決定哪些地方要親自把關。
              </p>
            </div>
            <div className="text-slate-500 text-xs bg-slate-950 px-3 py-2 rounded border border-slate-800">適合：關鍵核心模組、極度安全敏感的架構</div>
          </AnimatedBlock>
        </div>

        <Callout
          stepIndex={7}
          className="mt-6 max-w-4xl mx-auto text-left"
          footnote="第 5 格的工具要付費方案，月費 20 美金起，或儲值 5 美金按用量計費。另外有些事要自己接：低程式碼平台通常內建託管資料庫，這是它們方便的原因；第 5 格要自己選一個資料庫服務接上去。這就是「方便」與「掌控」的取捨。"
        >
          <strong className="text-sky-300">這門課從第 5 格開始。</strong>
          把需求講清楚這件事，換到第 2、3 格一樣用得上。
          <strong className="text-slate-100">選第 5 格的理由是程式碼在你自己的電腦裡</strong>：
          規則寫下來之後，你看得到它有沒有照做。別人的平台上驗不了這一步。
        </Callout>
      </div>
    </SlideLayout>
  );
}
