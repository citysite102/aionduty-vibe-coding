import { useState } from 'react';
import { Panel, Field, TextInput, Note, Mono, CopyButton } from '../ui';
import { RotateCcw } from 'lucide-react';

/**
 * 課程階段三那四問，做成一次一題。
 *
 * 重點是順序：第一個答「是」的就是答案，後面不用再問。
 * 所以畫面一次只出一題，答完才出下一題，不要四題一起攤開讓人挑一個順眼的。
 */
const QUESTIONS = [
  {
    q: '違反了會出事，絕對不能發生嗎？',
    hint: '例如把金鑰寫進程式碼、刪掉別人的檔案、直接推上正式環境',
    place: '交給 Hook 或 CI',
    how: '寫在手冊裡它可能忘、可能被繞過。這一層是程式在擋，不經過 AI 判斷。Hook 擋你這台機器，CI 擋整個團隊。',
    prompt: (r: string) => `幫我在專案的 .claude/settings.json 加一條 Hook，擋住這件事：${r}。做完告訴我怎麼測試它真的擋得住。`,
  },
  {
    q: '只有動到某一區才適用嗎？',
    hint: '例如只有前端要遵守的樣式規範、只有資料處理那段要用的欄位命名',
    place: '放到那一區的子目錄',
    how: '寫在根目錄的手冊每一輪都佔位置。放到子目錄，它碰到那一區才會讀進來。',
    prompt: (r: string) => `這條規則只有動到某個子資料夾才適用：${r}。幫我在那個資料夾裡建一份 CLAUDE.md 放這條，並告訴我怎麼確認它只在該載入的時候載入。`,
  },
  {
    q: '有固定步驟，而且只有做某件事才會用到嗎？',
    hint: '例如每週報表的產出流程、發稿前的檢查清單',
    place: '寫成 Skill 或斜線指令',
    how: '這種東西平常不需要佔空間，要用的時候叫一次就展開。寫成 Skill 之後，它會照著同一套步驟跑。',
    prompt: (r: string) => `幫我把這套固定步驟做成一個 Skill：${r}。放在 .claude/skills/ 底下，做完告訴我怎麼叫它。`,
  },
  {
    q: '每一輪都用得到，而且是這個專案的通則嗎？',
    hint: '例如回覆語言、改檔案前要先說、什麼叫做完',
    place: '寫進根目錄的 CLAUDE.md',
    how: '這一層是每次開新對話都會載入的東西，所以只放真的每一輪都用得到的。',
    prompt: (r: string) => `幫我把這條加進根目錄的 CLAUDE.md，放在最合適的那一節底下：${r}。加完把整份念一次給我確認。`,
  },
];

/**
 * 使用者打規則的時候很自然會自己加句號，而每一句 prompt 都在插值後面接一個
 * 「。」，兩個湊在一起畫面上就出現兩個句號。收尾的標點在這裡先剝掉，
 * prompt 那邊的句號才是唯一的那一個。
 */
function trimTail(r: string) {
  return r.trim().replace(/[。，、；：.,;:!！?？\s]+$/, '');
}

const FALLBACK = {
  place: '先不要寫進任何一份手冊',
  how: '四題都答「否」，代表這件事只發生過一次，或還沒穩定成規矩。等它再發生第二次，你會知道它該進哪一層。多寫一條的成本不是那一行字，是它每一輪都在稀釋其他規則。',
};

export default function RuleRouter() {
  const [rule, setRule] = useState('');
  const [step, setStep] = useState(0);
  const [hit, setHit] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  function answer(yes: boolean) {
    if (yes) {
      setHit(step);
      setDone(true);
      return;
    }
    if (step === QUESTIONS.length - 1) {
      setHit(null);
      setDone(true);
      return;
    }
    setStep(step + 1);
  }

  function reset() {
    setStep(0);
    setHit(null);
    setDone(false);
  }

  const result = hit === null ? FALLBACK : QUESTIONS[hit];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Panel
        title="這條規則該放哪"
        desc="照順序問，第一個答「是」的就是它該去的地方，後面不用再問。順序不能換：先擋得住的，再看範圍，最後才是手冊。"
      >
        <Field label="先把那條規則寫下來" hint="用你會對同事說的話寫就好">
          <TextInput
            value={rule}
            onChange={(e) => setRule(e.target.value)}
            placeholder="例如：不要把 .env 的內容貼進對話"
          />
        </Field>
      </Panel>

      {!done ? (
        <Panel title={`第 ${step + 1} 題`} desc={QUESTIONS[step].hint}>
          <p className="text-slate-100 text-xl font-bold leading-snug mb-5">{QUESTIONS[step].q}</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => answer(true)}
              className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-base font-bold text-emerald-300 hover:bg-emerald-500/15"
            >
              是
            </button>
            <button
              type="button"
              onClick={() => answer(false)}
              className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-5 py-3 text-base font-bold text-slate-400 hover:border-slate-700"
            >
              否
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2">
            {QUESTIONS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-sky-400/70' : 'bg-slate-800'}`}
              />
            ))}
          </div>
        </Panel>
      ) : (
        <>
          <div className="rounded-2xl border border-sky-500/25 bg-sky-500/5 p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">放這裡</div>
            <p className="text-slate-100 text-2xl font-bold leading-snug mb-3">{result.place}</p>
            <p className="text-slate-300 text-base leading-relaxed">{result.how}</p>
          </div>

          {hit !== null && (
            <Panel title="接下來這樣做" desc="這句貼給它，它會幫你放到對的位置。">
              <div className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 mb-3">
                <p className="text-sm leading-relaxed text-slate-200">
                  {QUESTIONS[hit].prompt(trimTail(rule) || '（把你的規則填在上面）')}
                </p>
              </div>
              <CopyButton text={QUESTIONS[hit].prompt(trimTail(rule) || '（把你的規則填在上面）')} label="複製這句" />
              <Note>
                放進去之後打 <Mono>/context</Mono> 確認它在載入清單裡。看不到就是位置錯了，
                不是它不聽話。
              </Note>
            </Panel>
          )}

          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-400 hover:border-slate-700"
          >
            <RotateCcw size={14} />
            換下一條規則
          </button>
        </>
      )}
    </div>
  );
}
