import { Database, KeyRound, UserCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyBlock } from '../components/CopyBlock';
import { Callout } from '../components/Callout';
import { LiveDemo } from '../components/LiveDemo';

/**
 * 接在〈手機打開，紀錄卻是空的〉後面。那一頁的職務是把問題攤開
 * （localStorage 只記在那一台），原本結尾只寫「接資料庫留作延伸練習」加一句起步的 prompt。
 * 這一頁把它做完，因為整章的主線就是計時器，而「換一台裝置看不到」是學員一定會撞到的
 * 最後一個缺口，留成作業等於課程停在一個沒解決的問題上。
 *
 * 排在〈DEPLOY.md〉前面是刻意的：接完 Supabase 之後，那份 DEPLOY.md 的四欄
 * （服務、資料、排程、金鑰）才有東西可以寫，不然學員只有一個純前端的專案，
 * 寫出來的那份文件四欄有三欄是空的。
 *
 * **最後那一塊（沒有登入就是共用一份）不要拿掉。** 沒有它，這一頁會教出一個錯的東西：
 * 學員以為接上資料庫就等於「我的紀錄跟著我走」，但沒有帳號的話，所有打開那個網址的人
 * 看到的是同一份。章節三說 Supabase 是「資料庫 ＋ 會員登入」兩件一起，原因就在這裡。
 *
 * ⚠️ 待查證。這一頁寫了 Supabase 後台的三個東西（Table、Project API Keys 那兩把、
 * RLS 的開關位置）。各家後台改版頻繁，屬於 C-3 那一類，要實際開一次後台看畫面才算數。
 * 2026-10-05 本輪沒有重查，所以畫面上刻意不寫「按鈕在左邊第幾個」，只寫名字與用途。
 * 下次改版前連同 27b8d、27b9 的後台名稱一起走一遍，查完換成 C-1 的三行格式。
 */
const STEPS = [
  {
    n: '01',
    t: '開一個 Supabase 專案，建一張表',
    d: '欄位就是前面那三個：出發時間、飛行分鐘數、有沒有完成。表讓它幫你建，你只要在後台看一眼欄位對不對。',
    self: false,
  },
  {
    n: '02',
    t: '複製那把「可以公開」的金鑰',
    d: 'Supabase 給你兩把。前端用的那把本來就設計成會被看到；另一把是後台用的，權限很大，這個題目完全用不到，不要複製它。',
    self: true,
  },
  {
    n: '03',
    t: '把金鑰貼進 Vercel 的環境變數',
    d: '不要讓它寫進程式碼，也不要貼進對話。那是你的帳號，你自己貼。',
    self: true,
  },
  {
    n: '04',
    t: '打開 RLS，再寫一條規則',
    d: 'RLS 沒開，任何人拿到那把公開金鑰就能讀光、刪光你的表。這一步不能跳過，案例三會整段講這個取捨。',
    self: false,
  },
];

const PROMPT = `把計時器的航行日誌從 localStorage 改存到 Supabase。

1. 先列出你要做哪幾步，等我說可以再動檔案
2. 表的欄位沿用現在的三個：出發時間、飛行分鐘數、有沒有完成
3. 金鑰我自己填，你只要告訴我要填在哪裡、變數要叫什麼名字
4. 幫我開啟這張表的 RLS，並說明你寫的那條規則允許誰做什麼
5. 做完告訴我怎麼確認：我要能在手機上打開同一個網址，看到電腦上記的那幾趟`;

export default function SlideSupabaseStore() {
  return (
    <SlideLayout
      title="把紀錄搬上 Supabase，換台裝置也看得到"
      subtitle="Mission Timer v4: Shared Data"
      icon={Database}
    >
      <LiveDemo kind="claude" note="做完手機跟電腦看到的會是同一份紀錄" />

      <div className="max-w-6xl mx-auto w-full space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          把紀錄從「這台電腦的瀏覽器」搬到「一個雲端的共用地方」，就是接資料庫。
          <strong className="text-slate-100">程式那一段你不用寫</strong>，但下面四步裡有兩步得你自己動手，
          因為那是你的帳號跟你的金鑰。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs text-slate-600">{s.n}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    s.self
                      ? 'bg-slate-800 text-slate-200 font-bold'
                      : 'border border-slate-800 text-slate-500'
                  }`}
                >
                  {s.self ? '你自己做' : '可以發包'}
                </span>
              </div>
              <div className="text-sm font-bold text-slate-100 leading-snug">{s.t}</div>
              <p className="mt-2 border-t border-slate-800 pt-2 text-sm leading-relaxed text-slate-400">
                {s.d}
              </p>
            </div>
          ))}
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-5 items-start">
          <AnimatedBlock stepIndex={3}>
            <CopyBlock text={PROMPT} size="xs" note="第 1 點跟第 3 點不要刪，那兩句是煞車" />
          </AnimatedBlock>

          <div className="space-y-5">
            <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center gap-2.5 mb-2">
                <KeyRound size={18} className="text-slate-400 shrink-0" />
                <h4 className="text-base font-bold text-slate-100">兩把金鑰，只有一把該出現在前端</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                純前端的網頁藏不住任何字串，使用者打開開發者工具就看得到。
                所以能放前端的只有那把<strong className="text-slate-200">本來就設計成可以公開</strong>的，
                真正擋住別人的不是金鑰，是下一塊那條規則。
              </p>
            </AnimatedBlock>

            <Callout tone="warn" label="沒有登入，大家就是共用同一份" stepIndex={5}>
              接上資料庫之後，換一台裝置確實看得到同一份紀錄。
              但這個計時器沒有帳號，所以<strong className="text-slate-100">別人打開你的網址，看到的也是同一份</strong>。
              要變成「我的紀錄跟著我走」，還要再加一個登入，而那正是
              Supabase 把「資料庫」跟「會員登入」放在一起賣的理由。
              <span className="block mt-2 text-slate-400">
                只是自己用的話，這樣就夠了；要給別人用，就把登入加上去。
              </span>
            </Callout>
          </div>
        </div>

        <AnimatedBlock stepIndex={6} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-2.5 mb-1.5">
            <UserCheck size={18} className="text-slate-400 shrink-0" />
            <h4 className="text-base font-bold text-slate-100">做完怎麼確認，不要只看它說好了</h4>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            在電腦上跑一趟，然後拿手機開同一個網址。
            <strong className="text-slate-200">手機上看得到那一趟，才算接上了。</strong>
            看不到的話，九成是金鑰沒設進環境變數，或是 RLS 的規則把讀取也一起擋掉了，
            把畫面截圖連同網址貼回去給它。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
