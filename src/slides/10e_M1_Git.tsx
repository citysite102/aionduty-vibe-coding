import { GitCommit, GitPullRequest, GitBranch, FolderGit2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion } from 'motion/react';

export default function Slide10e() {
  return (
    <SlideLayout title="用 Git 存檔，改壞了可以回去" subtitle="Version Control" icon={FolderGit2}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-4 max-w-6xl mx-auto items-center h-full">
        
        <div className="space-y-6">
          <AnimatedBlock stepIndex={1}>
            <h2 className="text-3xl font-bold text-slate-100 mb-4">就像是遊戲的「存檔點」</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              以前你可能會把檔案命名為 <code>報告_final_v2_真的最後版.docx</code>。Git 就是程式碼的時光機，幫你記錄每一次的修改，隨時可以回到過去。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="space-y-4">
            <div className="flex gap-4 items-start bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="p-2 bg-emerald-900/30 text-emerald-400 rounded-lg shrink-0"><GitCommit size={20} /></div>
              <div>
                <strong className="text-slate-200 block mb-1">Commit (提交)</strong>
                <p className="text-slate-400 text-sm">把目前的進度打包成一個節點，並寫下「做了什麼改變」。</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="p-2 bg-sky-900/30 text-sky-400 rounded-lg shrink-0"><GitBranch size={20} /></div>
              <div>
                <strong className="text-slate-200 block mb-1">Branch (分支)</strong>
                <p className="text-slate-400 text-sm">開發新功能時，分出一條獨立的線，即使搞砸了也不會影響主線 (main)。</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="p-2 bg-sky-900/30 text-sky-400 rounded-lg shrink-0"><GitPullRequest size={20} /></div>
              <div>
                <strong className="text-slate-200 block mb-1">Push / Pull (推送與拉取)</strong>
                <p className="text-slate-400 text-sm">與雲端 (如 GitHub) 同步你的存檔，方便備份或與他人協作。<span className="text-slate-500">出貨那一段會實際做一次。</span></p>
              </div>
            </div>
          </AnimatedBlock>

          {/* Tip Box */}
          <AnimatedBlock stepIndex={4} className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-xl text-sm text-slate-400 space-y-2">
            <p className="leading-relaxed">
              💡 <strong className="text-slate-200">存的不只是程式碼。</strong>
              Git 記的是「這個資料夾裡的文字檔，每一版長什麼樣」。所以你之後寫的 <code className="font-mono text-orange-300">CLAUDE.md</code>、
              自己搭的運作框架、Skill 與子代理的設定檔，全都會一起被記下來。
            </p>
            <p className="leading-relaxed border-t border-slate-950 pt-2">
              <strong className="text-slate-200">為什麼要留著這些紀錄：</strong>規矩會越改越多，總有一次會改壞。
              有紀錄，你查得到是哪一次改的、那一次改了什麼、跟現在差在哪，然後退回上一版。
              沒紀錄，你只能靠印象猜自己上禮拜寫了什麼。
            </p>
            <p className="text-slate-500 leading-relaxed border-t border-slate-950 pt-2">
              🔍 <strong>延伸練習：</strong>去 GitHub 上翻一個專案的 Commit 紀錄，比對每一次的 Diff。這能幫你看懂 Agent 到底改了哪些檔案。
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 min-h-[400px] flex flex-col justify-center relative">
          <h3 className="text-xl font-bold text-slate-300 text-center mb-12">時光機運作示意</h3>
          
          <div className="relative w-full max-w-md mx-auto flex items-center justify-between">
            {/* Base line */}
            <div className="absolute left-0 right-0 h-1 bg-slate-800 top-1/2 -translate-y-1/2"></div>
            
            {/* Commits */}
            <div className="relative w-full flex justify-between">
              {[
                { id: 1, msg: "init", color: "bg-slate-600" },
                { id: 2, msg: "add login", color: "bg-sky-500" },
                { id: 3, msg: "fix bug", color: "bg-emerald-500" }
              ].map((commit, i) => (
                <motion.div 
                  key={commit.id}
                  className="relative z-10 flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.6, duration: 0.4, ease: "easeOut" }}
                >
                  <div className="text-xs text-slate-400 absolute -top-8 whitespace-nowrap font-mono">{commit.msg}</div>
                  <div className={`w-6 h-6 rounded-full border-4 border-slate-900 ${commit.color}`}></div>
                </motion.div>
              ))}
            </div>

            {/* AI Agent integration branch */}
            <motion.div 
              className="absolute top-[50%] left-[50%] w-[50%] h-[40px] border-b-2 border-l-2 border-sky-500 rounded-bl-xl opacity-0"
              style={{ transformOrigin: "top left" }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4, duration: 0.5 }}
            />

            <motion.div 
              className="absolute -bottom-[50px] right-0 translate-x-[10%] bg-sky-950/80 border border-sky-500/50 p-2 rounded-lg text-xs text-sky-300 flex items-center gap-2 shadow-lg whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.5 }}
            >
              <FolderGit2 size={14} /> Agent 自動幫你 Commit 存檔
            </motion.div>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
