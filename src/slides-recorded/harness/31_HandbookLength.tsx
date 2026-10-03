import { Ruler } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 這一頁只給「變長了就回頭整理」跟先砍哪三類，實際的整理演練在
 * harness/17_HealthOverview 到 harness/56_HandbookV3（章節六，中間隔了三十幾頁）。
 * 2026-10-04：原本這一頁還列著「整理的時候先砍這三類」，那三類正好是章節六健檢五步裡
 * 減法、歸位、修剪各一條的濃縮答案。先把結論講完，學員走到那一段就只剩重複。
 * **同一個判斷這一頁自己做過一次**：17_HealthOverview 的檔頭記著它刪掉一塊 callout 的理由是
 * 「那句話就是第二步那一頁整頁的主張，預告先把結論講完，走到那一頁時只剩重複」。
 * 所以那三類刪掉，這一頁的職務收回到長度本身（200 行、越長被遵守的比例越低、第一版用 /init），
 * 整理的方法整段留給章節六。口白改成指路到章節六，不要再把那三類寫回來。
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

export const meta: RecordedMeta = {
  id: 'harness-31-handbook-length',
  title: '一份手冊該寫多長？',
  script:
    '再來是文件大小的問題。一份大約控制在 200 行以內，這是官方文件給的目標值，不是硬規定：越長，被遵守的比例越低，因為規則越多，每一條分到的份量就越少。所以手冊變長的時候，動作不是接著往下加，是回頭整理。怎麼整理？那是一整套流程，章節六會整段講，連要砍哪幾類、順序為什麼不能換都在那裡。這一頁你只要先記住那個動作：變長了就回頭整理，不是再往下加。另外第一版不必從零寫，輸入斜線 init，它會讀過你的專案生一份草稿。但它只寫得出現況，不是規則，所以拿到草稿第一件事是改，不是存。',
  seconds: 52,
  from: 55,
};

export default function RecHandbookLength() {
  return (
    <SlideLayout title={meta.title} subtitle="Keep It Short" icon={Ruler}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-2xl font-bold leading-snug">一份大約 <Key>200 行以內</Key></p>
          <p className="text-slate-400 text-base leading-relaxed mt-4">
            越長被遵守的比例越低。規則越多，每一條分到的份量就越少。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <p className="text-slate-300 text-base leading-relaxed">
            所以變長的時候，動作不是往下加，是回頭整理。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-sm shrink-0">第一版</span>
          <span className="text-slate-300 text-base">
            用 <code className="font-mono text-orange-300">/init</code> 生一份草稿，你在上面改
          </span>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
