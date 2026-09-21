import { Terminal, Globe, Code2, Sparkles } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function Slide10b2() {
  return (
    <SlideLayout 
      title="讓 Agent 幫你讀文件並串接" 
      subtitle="Agent Reads Docs & Connects APIs"
      icon={Terminal}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2 items-stretch max-w-6xl mx-auto pb-6">
        
        {/* Left column: Explanation of workflow */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-xs font-mono text-sky-400 font-bold tracking-wider uppercase mb-3">
                Agent Workflows
              </div>
              <p className="text-slate-300 text-base leading-relaxed mb-4">
                以前要接一支 API，最花時間的不是寫程式，是翻那份很厚的英文文件，搞懂欄位到底叫什麼名字、金鑰要怎麼帶。
              </p>
              <p className="text-slate-400 text-base leading-relaxed">
                現在你可以把文件的網址直接給 Claude Code。它會自己把那一頁讀完，抓出要填哪些欄位，寫出一段可以直接跑的程式碼。
                它讀的是當下抓到的那一頁，抓錯版本或抓到別的頁面它不會告訴你，所以下一頁那四個定位點是你自己要對的。
              </p>
            </div>

            <div className="mt-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2.5">
              <div className="text-base font-bold text-sky-400 flex items-center gap-1.5">
                <Sparkles size={16} />
                <span>三個步驟</span>
              </div>
              <ol className="text-sm text-slate-400 space-y-1.5 list-decimal list-inside font-medium">
                <li><strong className="text-slate-300">給網址：</strong>把那份官方文件的網址貼給它</li>
                <li><strong className="text-slate-300">它自己去讀：</strong>Agent 把那一頁抓下來讀完</li>
                <li><strong className="text-slate-300">寫出程式碼：</strong>照文件上的欄位名稱寫，不是自己編</li>
              </ol>
            </div>
          </AnimatedBlock>
        </div>

        {/* Right column: The interactive terminal mockup */}
        <div className="lg:col-span-7">
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-full flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-300 mb-4 flex items-center gap-2">
                <Code2 size={18} className="text-emerald-400" />
                示範：請它讀完文件再動手
              </h3>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col gap-3 font-mono text-sm max-h-[440px] overflow-y-auto custom-scrollbar">
                {/* User Prompt */}
                <div className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-xs font-bold text-slate-300">U</div>
                  <div className="bg-slate-900 text-slate-300 p-3 rounded-2xl rounded-tl-none leading-relaxed border border-slate-800 w-full">
                    幫我閱讀這份文件 <code className="text-sky-400 font-bold underline">https://platform.claude.com/docs/en/api/messages</code>，並且寫一個能夠發送訊息給 Claude 的 Node.js 腳本。
                  </div>
                </div>
                
                {/* Agent Action Indicator */}
                <div className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 text-xs font-bold text-sky-400">C</div>
                  <div className="bg-slate-900 text-slate-300 p-3 rounded-2xl rounded-tl-none w-full border border-slate-800">
                    <div className="text-xs text-sky-400 font-bold mb-2 flex items-center gap-1.5">
                      <Globe size={14}/> Fetching https://platform.claude.com/docs/en/api/messages...
                    </div>
                    <p className="mb-3 text-sm text-slate-400">我讀完 Messages API 的文件了。下面這段是照文件寫的，用的是官方套件 <code>@anthropic-ai/sdk</code>：</p>

                    {/*
                      模擬學員反應：零基礎的人看到這一塊會整個放空，然後接下來兩頁都跟不上。
                      問題不是程式碼在這裡，而是沒有人告訴他這一塊不用讀。
                      加一行說清楚要看的是什麼，程式碼就從門檻變成證據。
                    */}
                    <div className="mb-3 rounded-lg border border-sky-500/25 bg-sky-500/5 px-3 py-2">
                      <p className="text-sm text-slate-300 leading-relaxed font-sans">
                        <strong className="text-slate-100">下面這段不用讀懂。</strong>
                        要看的只有一件事：這幾行裡的
                        <code className="mx-1 font-mono text-sky-300">model</code>、
                        <code className="mx-1 font-mono text-sky-300">max_tokens</code>、
                        <code className="mx-1 font-mono text-sky-300">messages</code>
                        都是它從那份文件裡抄下來的，不是它自己編的。
                      </p>
                    </div>

                    <pre className="bg-slate-950 p-3 rounded-xl text-sm text-sky-300 font-mono overflow-x-auto border border-slate-800">
{`import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// 解析說明文件：Messages API 請求主體與必需參數
const msg = await anthropic.messages.create({
  model: "claude-sonnet-5",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello!" }],
});

console.log(msg.content[0].text);`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedBlock>
        </div>
        
      </div>
    </SlideLayout>
  );
}
