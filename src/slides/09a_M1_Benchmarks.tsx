import { Rocket, Scale } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 這一頁整頁都是外部事實，而且是會被人拿去查的那種，所以 C-1 的查證紀錄寫在這裡。
 *
 * ── Bun 那一段：最後查證 2026-10-05，對照 bun.com/blog/bun-in-rust（Jarred Sumner 的公告）
 * 當時的現況：「Excluding comments, Bun is 535,496 lines of Zig.」，重寫期間 2026-05-03 到 05-14，
 * 也就是 11 天；diff 是 +1,009,272 行。所以畫面上的「53 萬行」與「11 天完成」都對。
 *
 * ⚠️ **不要照二手報導把 11 天改成 4 個月。** InfoQ 那篇的標題寫的是
 * 「Bun Rewrites 535K Lines of Zig into Rust in Four Months」，另外也有媒體把
 * diff 的一百萬行寫成「rewrote 1 million lines」。數字對不上的時候以官方那篇為準（C-2）。
 *
 * Andrew Kelley 的批評也查過：他質疑的是「既然測試不足以抓出 Zig 的 bug，
 * 為什麼足以抓出 Rust 的」這個推論不一致，以及出貨未經審查的機器產出。
 * 畫面上那兩句是這個意思的中文說法，不是逐字翻譯。
 *
 * ── ⚠️ 待查證：Anthropic 內部那組「2~3 週 → 2~3 天」
 * 2026-10-05 查不到出處。官方的 best practices 那一頁（已搬到
 * code.claude.com/docs/en/best-practices）只寫「improving ramp-up time」，沒有數字；
 * claude.com/blog/running-an-ai-native-engineering-org 只寫「ship real code within their first week」。
 * 二手來源找得到的版本是「2-3 週 → **3-4 天**」，跟畫面上的 2~3 天對不起來。
 * **這是 D-2 禁的那種沒有可查證來源的量化數據**，下一輪要嘛找到官方出處並改成正確數字，
 * 要嘛把那兩個數字拿掉改成定性的說法。先標在這裡，不要當作已經查過。
 */

export default function SlideBenchmarks() {
  return (
    <SlideLayout
      title="AI 真的做得出完整專案嗎？"
      subtitle="Real-world Benchmarks — and the Argument About Them"
      icon={Rocket}
    >
      <div className="max-w-5xl mx-auto mt-4 text-left space-y-5">

        <AnimatedBlock stepIndex={1} className="text-center">
          <p className="text-slate-300 text-base leading-relaxed">
            它到底能做到什麼程度？
          </p>
        </AnimatedBlock>

        {/* Case 1: Bun */}
        <AnimatedBlock stepIndex={2} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-base font-bold text-emerald-300 mb-4">
            Bun：把 53 萬行程式碼換一種語言重寫
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { v: '53 萬', l: '行程式碼' },
              { v: '11', l: '天完成' },
              { v: '64', l: '個 AI 代理並行' },
              { v: '$16.5 萬', l: 'API 費用' }
            ].map((s, i) => (
              <div key={i} className="bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-3 text-center">
                <div className="text-white font-mono font-bold text-lg">{s.v}</div>
                <div className="text-slate-500 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Bun 團隊把整個專案從 Zig 改寫成 Rust。這種規模的重寫，過去通常被認為「不值得做」。
          </p>
        </AnimatedBlock>

        {/* Case 2: Anthropic */}
        <AnimatedBlock stepIndex={3} className="bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 flex items-center gap-5">
          <div className="text-slate-300 text-sm leading-relaxed flex-1">
            <strong className="text-slate-100">Anthropic 內部：</strong>
            新人從摸熟架構、裝好環境到能實際動工的時間
          </div>
          <div className="flex items-center gap-3 shrink-0 font-mono">
            <span className="text-slate-500 text-sm line-through">2~3 週</span>
            <span className="text-slate-600">→</span>
            <span className="text-emerald-400 font-bold text-lg">2~3 天</span>
          </div>
        </AnimatedBlock>

        {/* The controversy */}
        <AnimatedBlock stepIndex={4} className="bg-amber-950/15 border border-amber-900/40 rounded-2xl p-6">
          <h3 className="text-base font-bold text-amber-300 mb-3 flex items-center gap-2">
            <Scale size={17} />
            但這個案例有爭議
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Zig 語言作者 Andrew Kelley 公開批評這是「<strong className="text-amber-200">未經審查的產出</strong>」，
            並指出一個關鍵問題：<span className="text-slate-200">既有測試沒抓到的 bug，改寫成 Rust 後一樣抓不到。</span>
          </p>
          {/*
            原本收在「這門課要談的，正是後面這一半」，那是在講課程結構，不是給學員的東西。
            換成一條他拿得走的判斷標準：爭議的點不是 AI 寫得好不好，是沒有人驗得動。
            這條也是後面監督、邊界、品質防線幾段共用的那個判斷標準。
          */}
          <p className="text-slate-400 text-sm leading-relaxed mt-3 pt-3 border-t border-amber-900/30">
            爭議的點不是 AI 寫得好不好，是<strong className="text-slate-200">沒有人驗得動</strong>：
            既有測試抓不到的 bug，換一種語言重寫還是抓不到。寫的速度變快了，能檢查的量並沒有跟著變快。
            <strong className="text-slate-100 block mt-2">所以判斷標準只有一條：你驗得動多少，就只能放手多少。</strong>
          </p>
        </AnimatedBlock>


      </div>
    </SlideLayout>
  );
}
