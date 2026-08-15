import { useState } from 'react';
import { Panel, TextInput, Note, Mono, CopyButton } from '../ui';

/**
 * 部署卡關對照表。內容跟簡報那一頁同一份，差別是這裡可以搜尋，
 * 而且每一條都給一句可以直接貼回對話框的話。
 *
 * 排序照真的會遇到的順序，不是照嚴重程度。
 */
const CASES = [
  {
    sign: '它停下來，叫我去瀏覽器點同意',
    what: '正常的。授權這一步只有你點得下去，它沒辦法幫你點。',
    fix: '切到瀏覽器完成授權，回來跟它說「我點完了，繼續」。',
    say: '我已經在瀏覽器完成授權了，請繼續。',
    tags: ['授權', '同意', '登入', 'oauth'],
  },
  {
    sign: '推不上去，說認證失敗',
    what: 'GitHub 現在不收密碼，要用它自己的登入方式。',
    fix: '讓它幫你走一次登入流程，不要自己找密碼欄位。',
    say: '推上去的時候顯示認證失敗，請幫我用 GitHub CLI 重新登入一次，然後再推一次。',
    tags: ['認證', '密碼', 'push', 'github', '失敗'],
  },
  {
    sign: 'Vercel 找不到我的 repo',
    what: '多半是那個 repo 是私人的，或授權時沒有勾到它。',
    fix: '回 Vercel 的 GitHub 授權設定，把那個 repo 加進允許清單；或把 repo 改成 public。',
    say: 'Vercel 的清單裡看不到我的 repo，請告訴我要去哪裡把它加進授權範圍。',
    tags: ['vercel', 'repo', '找不到', '私人', 'private'],
  },
  {
    sign: 'GitHub Pages 那邊找不到設定，或存了也沒生效',
    what: '免費帳號只掛得起 public 的 repo。repo 是 private 的話，這個功能是關著的。',
    fix: '把 repo 改成 public，或改用 Vercel，它吃 private。改成 public 之前先確認金鑰沒跟著上去。',
    say: '我的 repo 是 private，GitHub Pages 掛不上去。請先幫我確認 .gitignore 有沒有擋掉金鑰跟 .env，確認乾淨之後再告訴我怎麼把 repo 改成 public。',
    tags: ['pages', 'github pages', 'private', '公開', '沒生效', '灰的'],
  },
  {
    sign: '部署成功，打開卻一片空白',
    what: '多半是 index.html 不在最外層，或路徑寫死成你電腦上的位置。',
    fix: '請它檢查 index.html 的位置與所有引用路徑，改成相對路徑。',
    say: '網站部署成功但打開是空白的，請檢查 index.html 的位置跟裡面的引用路徑，並修好。',
    tags: ['空白', '白畫面', '404', '路徑'],
  },
  {
    sign: '我改了東西，但網址還是舊的',
    what: '部署平台看的是 GitHub 上的版本。你改在自己電腦上，那邊還沒收到。',
    fix: '再 commit 一次、再 push 一次，網址那邊會自己重新上線。',
    say: '我改完了，請幫我 commit 並 push，讓線上那版更新。',
    tags: ['沒更新', '舊的', '同步', 'push', 'commit'],
  },
  {
    sign: '我不確定我到底推上去了沒有',
    what: '看 GitHub 上那個 repo 的檔案列表，那才是部署平台看得到的東西。',
    fix: '打開你的 repo 頁面，確認檔案跟時間戳記跟你電腦上的一致。',
    say: '請告訴我我的 repo 網址，我要去確認檔案有沒有真的上去。',
    tags: ['確認', '推上去', 'repo', '檢查'],
  },
];

export default function DeployHelp() {
  const [q, setQ] = useState('');
  const kw = q.trim().toLowerCase();
  const list = kw
    ? CASES.filter(
        (c) =>
          c.sign.toLowerCase().includes(kw) ||
          c.what.toLowerCase().includes(kw) ||
          c.tags.some((t) => t.toLowerCase().includes(kw)),
      )
    : CASES;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Panel
        title="部署卡在哪裡"
        desc="真正花掉時間的不是那句部署指令，是下面這幾件事。找到你的症狀，右邊那句可以直接貼回對話框。"
      >
        <TextInput
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜尋症狀或關鍵字，例如「空白」「認證」「沒更新」"
        />
      </Panel>

      <div className="space-y-4">
        {list.map((c) => (
          <div key={c.sign} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-base font-bold text-slate-100 mb-3">{c.sign}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1.5">為什麼會這樣</div>
                <p className="text-sm leading-relaxed text-slate-300">{c.what}</p>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1.5">怎麼辦</div>
                <p className="text-sm leading-relaxed text-slate-300">{c.fix}</p>
              </div>
            </div>
            <div className="rounded-lg border border-sky-900/50 bg-sky-950/20 px-4 py-3 flex items-start gap-4">
              <p className="text-sm leading-relaxed text-sky-100 flex-1">「{c.say}」</p>
              <CopyButton text={c.say} />
            </div>
          </div>
        ))}
        {!list.length && (
          <p className="text-sm text-slate-500 px-1">
            這裡沒有你的症狀。把畫面截圖貼給它，加一句「這是我現在看到的，請幫我修」，多數情況它讀得懂。
          </p>
        )}
      </div>

      <Panel title="還沒走到部署" desc={undefined}>
        <p className="text-sm leading-relaxed text-slate-400">
          順序是這樣：先在自己電腦上做出東西 → <Mono>git commit</Mono> 存檔 → 推上 GitHub →
          接部署平台。中間任何一步卡住，都不要跳過去做下一步，跳過去只會多一層問題。
        </p>
        <Note>
          金鑰、密碼、<Mono>.env</Mono> 這類東西推上去之前要先確認擋掉了。
          一旦推上公開的 repo，就當它已經外洩，回後台重新產一組。
        </Note>
      </Panel>
    </div>
  );
}
