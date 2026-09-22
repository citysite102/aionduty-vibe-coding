import { Ruler } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 這一頁只給「變長了就回頭整理」跟先砍哪三類，實際的整理演練在
 * harness/17_HealthOverview 到 harness/56_HandbookV3（章節六，中間隔了三十幾頁）。
 * 2026-09-22 改口白之後，這一頁不再點名那一段，所以搬頁不會指錯；
 * 但兩邊教的「先砍哪些」要一致，動那一組之前先回來對一次。
 *
 * 200 行的出處：官方文件 code.claude.com/docs/en/memory 的「**Size**: target under 200 lines
 * per CLAUDE.md file」（查證日期與原文記在 21b3_M2_ContextCheck.tsx 的檔頭）。它是官方給的
 * 目標值，不是硬規定，也不是這門課的個人觀察，口白要照這個講法，不要改回「實務上的觀察」。
 *
 * 2026-09-22 這一段（Slide 65 到 70）改走現場頁的字級，內容也講深了一層。
 * 講師的判斷是：這六頁夾在前後都是現場頁的中間，原本 rec 的大字級讓字忽大忽小，
 * 而且一頁只講一句話，三個追問（放哪／多長／換工具）各 45 秒，聽起來像三件不相干的事。
 * 所以這一頁的口白會超過 45 秒，`check:rec` 會提醒，那是預期中的，不要把它砍回 45 秒。
 * 要動的話，動的是「這一段要不要拆成兩支影片」，不是把內容削短。
 */

const CUT_FIRST = [
  '它讀程式碼就查得到的：用了哪些套件、檔案放在哪',
  '只在某一區成立的：搬到子目錄那一層，動到才載入',
  '寫了也驗不出來的：像「回覆要專業一點」',
];

export const meta: RecordedMeta = {
  id: 'harness-31-handbook-length',
  title: '一份手冊該寫多長？',
  script:
    '一份大約控制在 200 行以內。這是官方文件給的目標值，不是硬規定：越長，被遵守的比例越低，因為規矩越多，每一條分到的份量就越少。所以手冊變長的時候，動作不是接著往下加，是回頭整理。那要砍哪些？先砍三類。第一類，它讀程式碼就查得到的，像是用了哪些套件、檔案放在哪。第二類，只在某一區成立的，搬到剛才講的子目錄那一層，動到那一區才載入。第三類，寫了也驗不出來的，例如回覆要專業一點，那種留著只佔位置。另外第一版不必從零寫，輸入斜線 init，它會讀過你的專案生一份草稿。但它只寫得出現況，不是規矩，所以拿到草稿第一件事是改，不是存。',
  seconds: 57,
  from: 55,
};

export default function RecHandbookLength() {
  return (
    <SlideLayout title={meta.title} subtitle="Keep It Short" icon={Ruler}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-2xl font-bold leading-snug">一份大約 <Key>200 行以內</Key></p>
          <p className="text-slate-400 text-base leading-relaxed mt-4">
            越長被遵守的比例越低。規矩越多，每一條分到的份量就越少。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <p className="text-slate-300 text-base leading-relaxed">
            所以變長的時候，動作不是往下加，是回頭整理。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <p className="text-slate-500 text-sm mb-3">整理的時候先砍這三類</p>
          <ul className="space-y-2 text-slate-300 text-base leading-relaxed">
            {CUT_FIRST.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="text-slate-600 shrink-0">·</span>
                {t}
              </li>
            ))}
          </ul>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-sm shrink-0">第一版</span>
          <span className="text-slate-300 text-base">
            用 <code className="text-sky-300 font-mono">/init</code> 生一份草稿，你在上面改
          </span>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
