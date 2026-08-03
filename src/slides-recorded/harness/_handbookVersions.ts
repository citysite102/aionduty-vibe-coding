/**
 * 手冊在這一段裡的五個時間點。
 *
 * 成長軸那幾頁和隨時可以叫出來的面板共用這一份，兩邊各寫一次一定會不同步。
 *
 * 內容刻意寫成一份真的會長成的樣子：有分節、有專案說明、有「不要做」那一區，
 * 而不是六行乾淨的條列。現實裡的第一版就是這樣，混著該留的、該搬的、該刪的、
 * 以及一條寫了等於沒寫的。這一段的五輪就是把那四種分開。
 */
export type Line = {
  text: string;
  /** heading 分節標題、note 說明文字，其餘是規則 */
  kind?: 'heading' | 'note';
  /** added 新增、removed 這一輪刪掉、moved 搬去別的地方 */
  state?: 'added' | 'removed' | 'moved';
  /** moved 專用，搬去哪 */
  to?: string;
};

/** 需要被處理掉的那幾條，用文字當 key，才不會因為插行就對錯 */
const TO_HOOK = '- 絕對不要刪掉我的檔案';
const TO_DELETE = '- 一律用繁體中文回答';
const TO_REWRITE = '- 畫面要好看，風格保持一致';
const REWRITTEN = '- 背景固定 #020617，強調色只用一種，其他一律灰階';

type Raw = [string, Line['kind']?];

const DRAFT: Raw[] = [
  ['# 任務計時器', 'heading'],
  ['一頁式倒數計時器，太空任務的外觀。純前端，沒有後端。', 'note'],
  ['', 'note'],
  ['## 畫面', 'heading'],
  ['- 深色星空背景，主色只給要強調的元素'],
  ['- 星球與火箭用 canvas 或 CSS 畫，禁止外部圖片'],
  ['- 按鈕文案：發射、待機、返航、補給'],
  [TO_REWRITE],
  ['', 'note'],
  ['## 程式', 'heading'],
  ['- 倒數分鐘數集中成設定，不要散在程式碼裡'],
  ['- 一個檔案不超過 300 行'],
  [TO_DELETE],
  ['', 'note'],
  ['## 不要做', 'heading'],
  [TO_HOOK],
  ['- 時間快到時不要跳 alert，也不要用閃爍'],
];

function build(round: number): Line[] {
  const out: Line[] = [];
  for (const [text, kind] of DRAFT) {
    if (text === TO_HOOK) {
      if (round === 1) out.push({ text, state: 'added' });
      else if (round === 2) out.push({ text, state: 'moved', to: '搬去 Hook' });
      else if (round < 5) out.push({ text, state: 'moved', to: '在 Hook' });
      continue;
    }
    if (text === TO_DELETE) {
      if (round === 1) out.push({ text, state: 'added' });
      else if (round === 2) out.push({ text });
      else if (round < 5) out.push({ text, state: 'removed' });
      continue;
    }
    if (text === TO_REWRITE) {
      if (round <= 3) out.push({ text, state: round === 1 ? 'added' : undefined });
      else if (round === 4) {
        out.push({ text, state: 'removed' });
        out.push({ text: REWRITTEN, state: 'added' });
      } else out.push({ text: REWRITTEN });
      continue;
    }
    out.push({ text, kind, state: round === 1 && kind !== 'note' ? 'added' : undefined });
  }
  return out;
}

export const VERSIONS: { label: string; note: string; lines: Line[] }[] = [
  {
    label: '剛寫好',
    note: '照想到的寫，還沒篩選過。裡面混著該留的、該搬走的、該刪的，還有一條寫了等於沒寫。',
    lines: build(1),
  },
  {
    label: '分流之後',
    note: '「絕對不要刪掉我的檔案」違反了會出事，這種不能只靠手冊。搬去 Hook，讓程式擋。',
    lines: build(2),
  },
  {
    label: '健檢之後',
    note: '「一律用繁體中文回答」不是寫錯，是全域手冊已經有了。同一條寫兩個地方，改的時候只會改到一份。',
    lines: build(3),
  },
  {
    label: '改寫之後',
    note: '「畫面要好看」無法判定，它做完自己也不知道有沒有達成。換成別人只看結果就能回答有或沒有的寫法。',
    lines: build(4),
  },
  {
    label: '定稿',
    note: '從十四行變成十一行，但每一條都能被檢查。換到網頁版或桌面版，內容一個字都不用改。',
    lines: build(5),
  },
];
