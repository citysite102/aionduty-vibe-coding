import { SectionDivider } from '../components/SectionDivider';

/**
 * 從這裡開始幾乎全是預錄頁（現場 3 頁，預錄 42 頁），跟前半以現場講解為主的節奏不同，
 * 所以獨立成一節，讓講者與學員都知道換了一種上課形式。
 *
 * number 沿用 MODULE 2：這一節仍屬第三個單元，只是後半段。
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
