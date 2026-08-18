import { SectionDivider } from '../components/SectionDivider';
import type { RecordedMeta } from '../slides-recorded/types';

/**
 * 這一頁是現場頁，但整段課程已經改成預錄，所以它一樣要有口白，
 * 否則錄影時這裡會變成無聲的一頁。kind 標 reference：分節頁不套 160 字與 45 秒。
 */
export const meta: RecordedMeta = {
  id: 'live-82-div-handbook',
  title: '手冊（CLAUDE.md）的疑難雜症與轉移',
  script:
    '你已經寫出一份 CLAUDE.md 了，接下來這一段處理它的四個常見問題：為什麼沒生效、規則該放哪、越寫越長怎麼辦、每一條到底怎麼寫。最後把同一套方法搬到不是程式的工作上。',
  seconds: 22,
  kind: 'reference',
};

/**
 * 從這裡開始幾乎全是預錄頁（現場 3 頁，預錄 42 頁），跟前半以現場講解為主的節奏不同，
 * 所以獨立成一節，讓講者與學員都知道換了一種上課形式。
 *
 * number 沿用 MODULE 2：這一節仍屬階段 03，只是後半段。
 * weight 是相對比例，不要改回絕對頁碼。
 */
export default function SlideDivHandbook() {
  return (
    <SectionDivider
      number="MODULE 2"
      subtitle="Handbook Troubleshooting"
      title="手冊（CLAUDE.md）的疑難雜症與轉移"
      roadmap={[
        { label: '四個常見問題', weight: 8, note: '沒生效、放哪層、太肥、怎麼寫' },
        { label: '換成你的工作', weight: 3, note: '不是程式也用得上' },
      ]}
    />
  );
}
