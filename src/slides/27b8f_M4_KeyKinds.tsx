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
 * 「叫它讀完產出一份文件」這個模式你已經做過兩次。排程那個陷阱是從它搬過來的，
 * 現在併在頁尾那個 Callout 的第二段。**全片只有那一段在講它，不要再刪。**
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
 * 頁尾那個 Callout 不能拿掉：它回答的是「那我什麼時候才會用到環境變數」，
 * 而答案是純前端的專案根本沒有那個位置。章節三的 `10c3_M1_Deploy`
 * 已經用一個灰底 Callout 指出同一個缺口，這一頁是把它收掉的地方。
 */
const KINDS = [
  {
    icon: Eye,
    tone: 'emerald' as const,
    title: '前端用的那一把',
    what: '你剛貼進程式碼的就是它。',
    risk: '複製走也只能做你那條 RLS 規則允許的事。規則寫「只能讀」，他就只能讀。',
    where: '寫進程式碼，跟著推上去。',
  },
  {
    icon: EyeOff,
    tone: 'rose' as const,
    title: '後台用的那一把',
    what: '它無視 RLS。同一類的還有要付費的 API 金鑰、資料庫密碼。',
    risk: '拿到的人可以把整張表清空，或用你的帳號一直打 API，帳單算你的。公開的 repo 還會被程式掃，金鑰掃到就被人拿走了。',
    where: '不寫進程式碼，也不跟著推上去。填在平台的後台。',
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
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-8">

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
            <code className="font-mono text-slate-300">Ctrl + F</code> 搜你剛貼的那串字。
            <strong className="text-slate-200">它就在那裡，每一個訪客都看得到。</strong>
            純前端的網頁就是這樣，藏不住任何東西。
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
          環境變數與排程原本是兩塊（一個 Callout 加一段頁尾灰字），2026-10-10 併成這一塊。
          併的理由不只是版面：它們是同一件事的兩半，純前端的專案就是少了這兩個位置，
          一個藏東西的、一個不會睡著的。分開寫的時候排程那一段讀起來像硬接上去的。
          **全片只剩這裡在講排程這個陷阱，要砍之前先確認別的地方有人講。**
        */}
        <Callout tone="muted" label="純前端的專案少了兩個位置" stepIndex={6}>
          <p className="leading-relaxed">
            <strong className="text-slate-200">一個是藏東西的地方。</strong>
            「填在平台的後台」指的是環境變數那一欄：那串字填在 Vercel 的後台，程式碼裡只留一個名字，
            執行的時候平台才交給它。但這要程式跑在機房那台電腦上才成立，
            而計時器整個跑在訪客的瀏覽器裡。所以後台那把金鑰在這個題目裡不是放哪裡的問題，是它不該出現。
          </p>
          <p className="leading-relaxed mt-2">
            <strong className="text-slate-200">一個是不會睡著的地方。</strong>
            每天定時寄一封信、每小時抓一次資料，不能靠「有人打開網頁才跑」。
            這兩件在你自己的電腦上都測不出來，換一個題目才會冒出來。
          </p>
        </Callout>

      </div>
    </SlideLayout>
  );
}
