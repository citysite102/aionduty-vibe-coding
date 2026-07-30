import React from 'react';
import { Target, FileCode, CheckCircle, PenTool } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideClaudeProjectsExamples() {
  const activeData = {
    instructions: [
      {
        title: "前端 React 元件開發",
        desc: "上傳公司 UI Library 說明檔",
        prompt: "你是一個資深前端，請完全使用 Tailwind CSS 與 Lucide Icons。不要使用任何額外的 CSS 檔，回覆時直接給出完整可執行的程式碼，不需要解釋原理。"
      },
      {
        title: "行銷文案與社群貼文",
        desc: "上傳品牌 Tone of Voice 指南、過去高互動貼文",
        prompt: "你是行銷總監。撰寫文案時請保持幽默且專業的語氣，禁止使用過度誇飾的形容詞，每篇貼文最後必須包含 3 個相關 Hashtag。"
      }
    ]
  };

  return (
    <SlideLayout 
      title="Claude Projects 實戰設定範例"
      subtitle="Hands-on with Custom Instructions & Knowledge Base" 
      icon={Target}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        <div className="lg:col-span-5 space-y-4">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl h-full">
            <h3 className="text-emerald-400 font-bold text-lg mb-5 flex items-center gap-2">
              <FileCode size={20} />
              知識庫該放什麼？
            </h3>
            <ul className="space-y-4">
              {[
                "團隊內部的 API 文件與 Swagger JSON",
                "程式碼開發規範或 Linter 規則",
                "產品 PRD 規格書與使用者故事",
                "品牌視覺指南或文案範本"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <CheckCircle size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-base text-slate-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-5 bg-sky-950/30 border border-sky-900/50 rounded-xl">
               <p className="text-sm text-sky-400 leading-relaxed">
                 <strong>實踐建議：</strong> 請依據「任務情境」切分專案，例如建立「官網改版 Project」、「資料分析 Project」，避免將不相關的資訊混雜，確保 AI 讀取的上下文精準。
               </p>
            </div>
          </AnimatedBlock>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl h-full">
            <h3 className="text-sky-400 font-bold text-lg mb-5 flex items-center gap-2">
              <PenTool size={20} />
              自訂指令範例
            </h3>
            <div className="space-y-6">
              {activeData.instructions.map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                    <span className="text-lg font-bold text-amber-400">{item.title}</span>
                    <span className="text-sm text-slate-400 font-mono bg-slate-900 px-3 py-1.5 rounded-md">
                      知識庫: {item.desc}
                    </span>
                  </div>
                  <div className="bg-[#1e1e1e] p-5 rounded-xl border border-slate-800 font-mono text-base text-slate-300 leading-relaxed">
                    {item.prompt}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </SlideLayout>
  );
}
