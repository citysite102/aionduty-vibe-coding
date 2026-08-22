import { BookOpen, Lock, KeyRound, ListChecks, FileCode2, MousePointerClick } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { LiveDemo } from '../components/LiveDemo';

const STEPS = [
  {
    num: '1',
    icon: MousePointerClick,
    title: '找端點與方法',
    desc: '先看「要打去哪、用什麼動作」。POST 代表送資料出去，網址就是這支 API 的門牌。',
    color: 'sky',
  },
  {
    num: '2',
    icon: KeyRound,
    title: '看認證方式',
    desc: '幾乎每支 API 都要「證明你是誰」。通常是在 Header 夾帶一把金鑰（API Key）。',
    color: 'amber',
  },
  {
    num: '3',
    icon: ListChecks,
    title: '掌握必填參數',
    desc: '文件會標示哪些欄位是 required。少一個必填，請求就會被打回來。',
    color: 'emerald',
  },
  {
    num: '4',
    icon: FileCode2,
    title: '抄範例回應',
    desc: '直接看官方給的 Example，就知道回傳長什麼樣、該從哪個欄位取值。',
    color: 'indigo',
  },
];

/*
 * 四個定位點原本一個顏色，那是 A-1 禁的「項目編號各給一色」。
 * 編號 1234 本身已經在區分了，顏色再分一次只是噪音，而且對零基礎學員來說
 * 「四種顏色代表什麼」會變成另一個要記的東西。全部統一成 sky。
 * 鍵名保留是為了不動上面那四筆資料，值已經一致。
 */
const COLOR_MAP: Record<string, string> = {
  sky: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
  amber: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
  emerald: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
  indigo: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
};

export default function Slide10b3() {
  return (
    <SlideLayout title="一份 API 文件，先找這四個地方" subtitle="How to Read API Docs" icon={BookOpen}>
      <LiveDemo kind="browser" note="打開一份官方文件" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2 items-stretch max-w-6xl mx-auto pb-8">

        {/* LEFT: Annotated faux documentation browser */}
        <AnimatedBlock stepIndex={1} className="lg:col-span-7 flex flex-col">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden h-full flex flex-col">

            {/* Faux Browser Bar */}
            <div className="bg-[#101015] px-4 py-2.5 flex items-center gap-3 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 block" />
              </div>
              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-md px-3 py-1 text-xs font-mono text-slate-400 flex items-center gap-1.5 truncate">
                <Lock size={10} className="text-emerald-500 shrink-0" />
                <span className="truncate">platform.claude.com/docs/en/api/messages</span>
              </div>
            </div>

            {/* Doc Content */}
            <div className="p-5 space-y-4 font-mono text-xs text-left flex-1 overflow-y-auto custom-scrollbar">

              <div className="text-slate-500 font-sans text-xs">Messages API</div>

              {/* 1. Endpoint + Method */}
              <div className="border-l-2 border-sky-500 pl-3 py-1 relative">
                <span className="absolute -left-[9px] -top-1 w-4 h-4 rounded-full bg-sky-500 text-slate-950 text-xs font-black flex items-center justify-center">1</span>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-sky-500/15 text-sky-300 rounded text-xs font-black border border-sky-500/30">POST</span>
                  <span className="text-slate-200">/v1/messages</span>
                </div>
                <div className="text-xs text-sky-400/80 font-sans mt-1">端點＋方法：打去哪、用什麼動作</div>
              </div>

              {/* 2. Authentication */}
              <div className="border-l-2 border-sky-500 pl-3 py-1 relative">
                <span className="absolute -left-[9px] -top-1 w-4 h-4 rounded-full bg-sky-500 text-slate-950 text-xs font-black flex items-center justify-center">2</span>
                <div className="text-slate-400 font-sans text-xs mb-1 uppercase tracking-wider">Headers</div>
                <div className="text-slate-300"><span className="text-slate-500">x-api-key:</span> <span className="text-sky-300">&lt;YOUR_API_KEY&gt;</span></div>
                <div className="text-slate-300"><span className="text-slate-500">content-type:</span> application/json</div>
                <div className="text-xs text-sky-400/80 font-sans mt-1">認證：夾帶金鑰證明你是誰</div>
              </div>

              {/* 3. Body Parameters */}
              <div className="border-l-2 border-sky-500 pl-3 py-1 relative">
                <span className="absolute -left-[9px] -top-1 w-4 h-4 rounded-full bg-sky-500 text-slate-950 text-xs font-black flex items-center justify-center">3</span>
                <div className="text-slate-400 font-sans text-xs mb-1.5 uppercase tracking-wider">Body Parameters</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-200">model</span>
                    <span className="px-1 py-0.5 bg-rose-500/15 text-rose-300 rounded text-xs font-bold border border-rose-500/30 font-sans">required</span>
                    <span className="text-slate-500 text-xs font-sans">要用哪個模型</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-200">messages</span>
                    <span className="px-1 py-0.5 bg-rose-500/15 text-rose-300 rounded text-xs font-bold border border-rose-500/30 font-sans">required</span>
                    <span className="text-slate-500 text-xs font-sans">對話內容陣列</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-200">max_tokens</span>
                    <span className="px-1 py-0.5 bg-rose-500/15 text-rose-300 rounded text-xs font-bold border border-rose-500/30 font-sans">required</span>
                    <span className="text-slate-500 text-xs font-sans">最多回幾個字</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-60">
                    <span className="text-slate-300">temperature</span>
                    <span className="px-1 py-0.5 bg-slate-700/40 text-slate-400 rounded text-xs font-bold border border-slate-700 font-sans">optional</span>
                    <span className="text-slate-500 text-xs font-sans">回答的發散程度</span>
                  </div>
                </div>
                <div className="text-xs text-sky-400/80 font-sans mt-1.5">必填參數：紅色標籤少一個就會被打回</div>
              </div>

              {/* 4. Example Response */}
              <div className="border-l-2 border-sky-500 pl-3 py-1 relative">
                <span className="absolute -left-[9px] -top-1 w-4 h-4 rounded-full bg-sky-500 text-slate-950 text-xs font-black flex items-center justify-center">4</span>
                <div className="text-slate-400 font-sans text-xs mb-1.5 uppercase tracking-wider">Example Response</div>
                <pre className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-sky-300 leading-relaxed overflow-x-auto">{`{
  "id": "msg_01...",
  "role": "assistant",
  "content": [{ "type": "text",
    "text": "Hello!" }]
}`}</pre>
                <div className="text-xs text-sky-400/80 font-sans mt-1">範例回應：知道從 content 取值</div>
              </div>

            </div>
          </div>
        </AnimatedBlock>

        {/* RIGHT: The 4-step reading recipe */}
        <div className="lg:col-span-5 flex flex-col gap-4">

          <AnimatedBlock stepIndex={2}>
            <p className="text-slate-400 text-sm leading-relaxed text-left">
              每一份 API 文件其實都在回答同樣四個問題。
            </p>
          </AnimatedBlock>

          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <AnimatedBlock key={step.num} stepIndex={3 + idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left flex items-start gap-3.5">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${COLOR_MAP[step.color]}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono font-bold text-slate-600">STEP {step.num}</span>
                    <h4 className="text-sm font-bold text-slate-100">{step.title}</h4>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedBlock>
            );
          })}

          <AnimatedBlock stepIndex={7} className="bg-sky-500/5 border border-sky-500/20 rounded-2xl p-4 text-left mt-auto">
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              💡 把網址丟給 Claude Code，它會照同樣邏輯讀懂並寫出串接程式碼。你要做的是驗收，方法就三步。
            </p>
            <p className="text-xs text-slate-400 leading-relaxed border-t border-sky-500/20 pt-2">
              一、把文件標 <code className="font-mono text-slate-300">required</code> 的欄位抄下來，這一支是
              <code className="font-mono text-slate-300"> model</code>、
              <code className="font-mono text-slate-300">messages</code>、
              <code className="font-mono text-slate-300">max_tokens</code>。
              二、回頭數它寫的那幾行，三個都在才算過（上一頁那段是過的）。
              三、少了就這樣講：<strong className="text-slate-300">「你少填了 max_tokens，文件上這個是必填，補上去再跑一次給我看。」</strong>
            </p>
          </AnimatedBlock>

        </div>

      </div>
    </SlideLayout>
  );
}
