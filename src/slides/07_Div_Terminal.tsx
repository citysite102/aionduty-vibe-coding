import { SectionDivider } from '../components/SectionDivider';

export default function SlideDivTerminal() {
  return (
    <SectionDivider
      number="MODULE 1"
      subtitle="Claude Code & Web Development Basics"
      title="Claude Code 實作與網頁開發基礎"
      roadmap={[
        { label: '為什麼要能動手', weight: 2, note: '顧問與執行者的差別' },
        { label: '桌面版做一個', weight: 2, note: '四步，不用終端機' },
        { label: '前置觀念', weight: 5, note: 'API、前後端、資料庫、上線、版控' },
        { label: '做出作品', weight: 4, note: '任務計時器，然後換你寫' },
      ]}
    />
  );
}
