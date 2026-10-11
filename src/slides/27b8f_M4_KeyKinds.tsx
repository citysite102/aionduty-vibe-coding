import { KeyRound, Eye, EyeOff, SlidersHorizontal } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 2026-10-10（講師）新增。缺口是學員走到這裡一定會糊掉：
 * 章節三教過「金鑰要放平台的環境變數」，而前面那一頁（`27b9b_M4_SupabaseStore`）
 * 叫他把 Supabase 那把金鑰直接寫進程式碼。兩句話都對，適用的對象不同，
 * 但在這之前沒有任何一頁替他把兩種分開。
 *
 * 這一塊原本寫在〈DEPLOY.md：服務、資料、排程、金鑰〉那一頁的金鑰欄底下，
 * 實機看過會溢出約 370px，所以拆成獨立一頁。同一輪（2026-10-10）那一頁整頁刪掉了：
 * 金鑰改成寫進程式碼之後，它四欄裡有兩欄的答案是「沒有」，而它自己的口白也寫著
 * 「叫它讀完產出一份文件」這個模式你已經做過兩次。
 *
 * 這一頁的頁尾一度有一段講架構與排程，2026-10-10 移到下一頁
 * （`27b8g_M4_ArchGap`，那裡有圖）。**不要搬回來**，兩頁講同一件事就是 B-5 那條。
 * 這一頁只講金鑰，架構交給下一頁。
 *
 * 2026-10-10（同日，講師說太抽象、太 AI）改寫兩次。
 * 第一次改成講後果：三格的中欄「拿到的人能做什麼」才是學員分得出來的差別，
 * 「公開金鑰」「環境變數」「伺服器端」這幾個詞他分不出來。**不要把中欄換回名詞定義。**
 * 第二次拆掉句型模具，那一版有五處 AI 腔：開場的「不是 X，是 Y」、
 * 「先驗一件事」與「同一類的還有一件事」兩個宣告句、三格標題工整對稱
 * （看到也不會怎樣／看到就出事／本來就不是祕密）、中欄三句都從「別人拿去」開頭。
 * 現在三格改用它本來的名字（前端那一把／後台那一把／不是金鑰），
 * 第三格刻意跟前兩格不同類，就不會讀起來像同一個模具印的。
 * **不要為了對稱把第三格改回「看到也不會怎樣」那種句式。**
 *
 * 同一輪補上「現在就可以驗一次」那一塊。這一頁的主張是「前端藏不住任何東西」，
 * 而學員手上剛好有一個真的網址可以當場驗證，講三次不如讓他自己看一次。
 * **這一塊要求他手上已經有部署好的網址**，所以它只能排在部署與接資料庫之後（D-2 最後那條）。
 *
 * 章節三的 `10c3_M1_Deploy` 用一個灰底 Callout 指出過同一個缺口
 * （純前端的專案金鑰藏不住），這兩頁是把它收掉的地方。
 *
 * 2026-10-10（講師）第一格原本舉「規則寫『只能讀』，他就只能讀」當例子，那跟這個專案
 * 對不起來：計時器要存紀錄，而它沒有登入，所以那條規則一定得允許匿名新增。
 * **不要再用「只能讀」當例子**，這個專案沒有那種規則。
 *
 * 風險那一塊的「擋得住／擋不住」照的是計時器**真實的** RLS 設定（2026-10-10 向講師核對）：
 * anon 只有 SELECT 與 INSERT 兩條 policy，沒有 UPDATE 與 DELETE；
 * INSERT 的 WITH CHECK 限制了分鐘數範圍與出發時間不能在未來；
 * `started_at` 另有唯一限制，所以補傳重送不會多記一筆。
 * **改那個專案的 policy 就要回來改這一塊**，第一格那句「可以讀全部、可以新增一筆」也是照它寫的。
 * 這一頁的說服力全部來自它是真的。
 *
 * 第二格開頭刻意寫「前面叫你不要複製的那一把」：這個專案從頭到尾沒有用過 service_role，
 * 學員唯一見過它的地方是接 Supabase 那一頁第二步（「另一把是後台用的，這個題目完全用不到，
 * 不要複製它」）。不接回去的話，「它無視 RLS」會變成在講一個他沒見過的東西。
 * **那一頁第二步改掉的話，這一句要跟著改。**
 * 不能防的那兩項（讀到全部、塞假紀錄）收起來的唯一方法是登入，接到下一頁。
 */
const KINDS = [
  {
    icon: Eye,
    tone: 'emerald' as const,
    title: '前端用的那一把',
    what: '我們剛剛貼進程式碼的就是它。',
    risk: '拿到它的人可以讀你全部的紀錄，也可以新增一筆，就這兩件。改跟刪做不到，那條 RLS 規則沒開放。',
    where: '可以寫進程式碼，跟著推上去。真正決定他能做什麼的是那條規則，不是它。',
  },
  {
    icon: EyeOff,
    tone: 'rose' as const,
    title: '後台用的那一把',
    what: 'Supabase 給你的第二把，前面叫你不要複製的那一把。同一類的還有要付費的 API 金鑰、資料庫密碼。',
    risk: '它無視 RLS，所以拿到的人可以把整張表清空；API 金鑰則是被人用你的帳號一直打，帳單算你的。公開的 repo 還會被程式掃。',
    where: '不寫進程式碼，也不跟著推上去。填在平台後台那一欄（Vercel 叫 Environment Variables），給跑在伺服器上的程式讀。',
  },
  {
    icon: SlidersHorizontal,
    tone: 'slate' as const,
    title: '不是金鑰，只是設定',
    what: '專案網址、表的名字、某個功能的開關。',
    risk: '知道了也做不了什麼，只是以後可能會改。',
    where: '放哪裡都行。放後台是為了換的時候不用動程式碼。',
  },
];

const TONE = {
  emerald: { box: 'border-emerald-500/25 bg-emerald-500/5', text: 'text-emerald-300', line: 'border-emerald-500/20', note: 'text-emerald-200/70' },
  rose: { box: 'border-rose-500/25 bg-rose-500/5', text: 'text-rose-300', line: 'border-rose-500/20', note: 'text-rose-200/70' },
  slate: { box: 'border-slate-800 bg-slate-950', text: 'text-slate-300', line: 'border-slate-800', note: 'text-slate-500' },
};

export default function SlideKeyKinds() {
  return (
    <SlideLayout
      title="哪一種金鑰可以寫進程式碼，哪一種不行"
      subtitle="Three Kinds of Secrets"
      icon={KeyRound}
    >
      <div className="max-w-6xl mx-auto w-full space-y-3.5 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          我們剛剛把一把金鑰直接寫進程式碼，而前面講部署的時候說的是「金鑰不要寫進程式碼」。
          兩句話都對，差別在是哪一種。
          <strong className="text-slate-100">要分它只要問一件事：這串字被別人看到，他能拿去做什麼。</strong>
        </AnimatedBlock>

        {/*
          這一塊是這一頁的證據。學員手上剛好有一個真的網址，
          讓他自己看一次，比在畫面上宣稱「前端藏不住」有用得多。
          **這個動作要求他已經部署過**，所以這一頁不能往前搬。
        */}
        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-3.5">
          <h4 className="text-base font-bold text-slate-100 mb-1.5">打開你的網址，那串金鑰就印在原始碼裡</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            在頁面上按右鍵選「檢視網頁原始碼」，用{' '}
            <code className="font-mono text-slate-300">Ctrl + F</code> 搜我們剛剛貼的那串字。
            <strong className="text-slate-200">它就在那裡，每一個訪客都看得到。</strong>
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {KINDS.map((k, i) => {
            const Icon = k.icon;
            const t = TONE[k.tone];
            return (
              <AnimatedBlock key={k.title} stepIndex={i + 3} className={`rounded-2xl border p-4 ${t.box}`}>
                <div className={`flex items-center gap-2 font-bold text-base mb-2.5 ${t.text}`}>
                  <Icon aria-hidden="true" size={18} className="shrink-0" />
                  {k.title}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed font-bold">{k.what}</p>
                <p className="text-slate-400 text-sm leading-relaxed mt-1.5">{k.risk}</p>
                <p className={`mt-3 border-t pt-2.5 text-sm leading-relaxed ${t.line} ${t.note}`}>
                  {k.where}
                </p>
              </AnimatedBlock>
            );
          })}
        </div>

        {/*
          2026-10-10（講師）補這一塊。缺口是這一頁原本只說那一把「看到也沒差」，
          學員一定會接著問「那它的風險是什麼」，而答案是：它沒事的前提是 RLS，
          不是它本身安全。少了這一段，這一頁就是 D-2 的過度承諾，
          而且學員會以為接完資料庫就不用管權限了。
          **這一塊要留在三格後面**，它是三格第一格那句「前提是 RLS 真的開了」的落點。
        */}
        <Callout tone="focus" label="那我們剛剛寫進去的那一把，風險在哪" stepIndex={6}>
          它安全不是因為藏得好，是因為 RLS 那條規則擋著。而你是
          <strong className="text-slate-100">前端直接對資料庫，中間沒有你寫的程式在把關</strong>，
          那條規則就是唯一的一道。拿計時器現在這兩條來看：
          <span className="block mt-2">
            <strong className="text-emerald-300">擋得住</strong>
            ：別人改不掉也刪不掉你的紀錄，規則只開放讀取與新增；離譜的資料也進不來，分鐘數範圍與出發時間都有限制。
          </span>
          <span className="block mt-1.5">
            <strong className="text-rose-300">擋不住</strong>
            ：讀全部跟塞假紀錄這兩件攔不下來，因為沒有登入，規則認不出是誰。
            而這不是藏金鑰能解的，網頁一定要把金鑰送出去才呼叫得到 Supabase。要收起來，得讓它認得人，下一頁講。
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
